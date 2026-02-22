import { NextRequest, NextResponse } from 'next/server';
import { createAppointment, getAppointments, fetchAPI } from '@/lib/strapi';
import { validateAppointmentTime, generateConfirmationCode } from '@/lib/availability';
import { addMinutes } from 'date-fns';
import { z } from 'zod';

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];
  const recentRequests = requests.filter(time => now - time < windowMs);

  if (recentRequests.length >= maxRequests) {
    return false;
  }

  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return true;
}

const appointmentSchema = z.object({
  barberId: z.number().positive(),
  serviceId: z.number().positive(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  clientName: z.string().min(2).max(100),
  clientEmail: z.string().email(),
  clientPhone: z.string().regex(/^[\d\s\-\+\(\)]+$/),
  notes: z.string().max(500).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate input
    const validationResult = appointmentSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { barberId, serviceId, date, time, clientName, clientEmail, clientPhone, notes } = validationResult.data;

    // Fetch service details for duration
    const serviceResponse = await fetchAPI(`/services/${serviceId}`);
    const service = serviceResponse.data;

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    // Calculate start and end times
    const startAt = new Date(`${date}T${time}:00`);
    const endAt = addMinutes(startAt, service.attributes.durationMinutes);

    // Fetch existing appointments to check for conflicts
    const appointmentsResponse = await getAppointments(barberId, date);
    const existingAppointments = appointmentsResponse.data || [];

    // Validate no conflict
    const isValid = validateAppointmentTime(
      startAt.toISOString(),
      endAt.toISOString(),
      barberId,
      existingAppointments
    );

    if (!isValid) {
      return NextResponse.json(
        { error: 'This time slot is no longer available' },
        { status: 409 }
      );
    }

    // Generate confirmation code
    const confirmationCode = generateConfirmationCode();

    // Create appointment
    const appointmentData = {
      barber: barberId,
      service: serviceId,
      startAt: startAt.toISOString(),
      endAt: endAt.toISOString(),
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim().toLowerCase(),
      clientPhone: clientPhone.trim(),
      notes: notes?.trim() || '',
      status: 'confirmed',
      confirmationCode,
    };

    const result = await createAppointment(appointmentData);

    // TODO: Send confirmation email
    // await sendConfirmationEmail(result.data);

    return NextResponse.json({
      success: true,
      appointment: result.data,
      confirmationCode,
    });

  } catch (error: any) {
    console.error('Error creating appointment:', error);

    // Handle unique constraint violations
    if (error.message?.includes('unique')) {
      return NextResponse.json(
        { error: 'An appointment conflict occurred. Please try a different time.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const barberId = searchParams.get('barberId');
    const date = searchParams.get('date');

    const data = await getAppointments(
      barberId ? parseInt(barberId) : undefined,
      date || undefined
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}
