// Availability slot generation algorithm
import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz';
import { addMinutes, parse, isWithinInterval, isBefore, isAfter, areIntervalsOverlapping } from 'date-fns';
import type { WorkingHours, TimeSlot, Appointment } from '@/types';

const TIMEZONE = process.env.TIMEZONE || 'America/Chicago';
const SLOT_INTERVAL = parseInt(process.env.BOOKING_SLOT_INTERVAL_MINUTES || '15');
const LEAD_TIME_HOURS = parseInt(process.env.BOOKING_LEAD_TIME_HOURS || '2');
const BUFFER_MINUTES = parseInt(process.env.BOOKING_BUFFER_MINUTES || '0');

export interface AvailabilityInput {
  barberId: number;
  date: string; // YYYY-MM-DD
  serviceDuration: number; // minutes
  workingHours: WorkingHours;
  existingAppointments: Appointment[];
  exceptions?: any[]; // Schedule exceptions for holidays
}

export interface AvailabilitySlot {
  time: string; // HH:mm format
  available: boolean;
  reason?: string; // Why slot is unavailable
}

/**
 * Generate available time slots for a barber on a specific date
 */
export function generateAvailableSlots(input: AvailabilityInput): AvailabilitySlot[] {
  const { date, serviceDuration, workingHours, existingAppointments, exceptions = [] } = input;

  // Parse the date
  const targetDate = new Date(date);
  const dayName = format(targetDate, 'EEEE').toLowerCase() as keyof WorkingHours;

  // Check if barber works on this day
  const daySchedule = workingHours[dayName];
  if (!daySchedule.enabled || !daySchedule.start || !daySchedule.end) {
    return [];
  }

  // Check for exceptions (holidays, closures)
  const hasException = exceptions.some(exc => {
    const excDate = new Date(exc.date);
    return excDate.toDateString() === targetDate.toDateString() && exc.isClosed;
  });

  if (hasException) {
    return [];
  }

  // Generate all possible slots for the day
  const slots: AvailabilitySlot[] = [];
  const startTime = parse(daySchedule.start, 'HH:mm', targetDate);
  const endTime = parse(daySchedule.end, 'HH:mm', targetDate);

  let currentSlot = startTime;

  while (isBefore(addMinutes(currentSlot, serviceDuration), endTime) ||
         currentSlot.getTime() === endTime.getTime()) {
    const slotTime = format(currentSlot, 'HH:mm');

    // Check if slot is available
    const isAvailable = isSlotAvailable(
      currentSlot,
      serviceDuration,
      daySchedule.breaks || [],
      existingAppointments,
      targetDate
    );

    slots.push({
      time: slotTime,
      available: isAvailable,
      reason: !isAvailable ? 'Booked or unavailable' : undefined,
    });

    currentSlot = addMinutes(currentSlot, SLOT_INTERVAL);
  }

  return slots;
}

/**
 * Check if a specific slot is available
 */
function isSlotAvailable(
  slotStart: Date,
  serviceDuration: number,
  breaks: TimeSlot[],
  appointments: Appointment[],
  targetDate: Date
): boolean {
  const slotEnd = addMinutes(slotStart, serviceDuration + BUFFER_MINUTES);
  const now = new Date();
  const leadTimeThreshold = addMinutes(now, LEAD_TIME_HOURS * 60);

  // Check if slot is in the past or within lead time
  if (isBefore(slotStart, leadTimeThreshold)) {
    return false;
  }

  // Check if slot overlaps with breaks
  for (const breakPeriod of breaks) {
    const breakStart = parse(breakPeriod.start, 'HH:mm', targetDate);
    const breakEnd = parse(breakPeriod.end, 'HH:mm', targetDate);

    if (areIntervalsOverlapping(
      { start: slotStart, end: slotEnd },
      { start: breakStart, end: breakEnd },
      { inclusive: false }
    )) {
      return false;
    }
  }

  // Check if slot overlaps with existing appointments
  for (const appointment of appointments) {
    if (appointment.status === 'cancelled') continue;

    const apptStart = new Date(appointment.startAt);
    const apptEnd = new Date(appointment.endAt);

    if (areIntervalsOverlapping(
      { start: slotStart, end: slotEnd },
      { start: apptStart, end: apptEnd },
      { inclusive: false }
    )) {
      return false;
    }
  }

  return true;
}

/**
 * Find next available slot for a barber
 */
export function findNextAvailableSlot(
  barberId: number,
  serviceDuration: number,
  workingHours: WorkingHours,
  appointments: Appointment[],
  startDate: Date = new Date(),
  maxDaysAhead: number = 30
): { date: string; time: string } | null {
  for (let i = 0; i < maxDaysAhead; i++) {
    const checkDate = new Date(startDate);
    checkDate.setDate(checkDate.getDate() + i);
    const dateStr = format(checkDate, 'yyyy-MM-dd');

    const slots = generateAvailableSlots({
      barberId,
      date: dateStr,
      serviceDuration,
      workingHours,
      existingAppointments: appointments,
    });

    const availableSlot = slots.find(slot => slot.available);
    if (availableSlot) {
      return { date: dateStr, time: availableSlot.time };
    }
  }

  return null;
}

/**
 * Validate appointment time doesn't conflict
 */
export function validateAppointmentTime(
  startAt: string,
  endAt: string,
  barberId: number,
  existingAppointments: Appointment[]
): boolean {
  const newStart = new Date(startAt);
  const newEnd = new Date(endAt);

  for (const appointment of existingAppointments) {
    if (appointment.status === 'cancelled') continue;

    const apptStart = new Date(appointment.startAt);
    const apptEnd = new Date(appointment.endAt);

    if (areIntervalsOverlapping(
      { start: newStart, end: newEnd },
      { start: apptStart, end: apptEnd },
      { inclusive: true }
    )) {
      return false;
    }
  }

  return true;
}

/**
 * Generate confirmation code
 */
export function generateConfirmationCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
