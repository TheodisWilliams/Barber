import { NextRequest, NextResponse } from 'next/server';
import { getAppointments, fetchAPI } from '@/lib/strapi';
import { generateAvailableSlots } from '@/lib/availability';
import type { Barber, Appointment } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const barberId = searchParams.get('barberId');
    const date = searchParams.get('date');
    const serviceDuration = searchParams.get('serviceDuration');

    if (!barberId || !date || !serviceDuration) {
      return NextResponse.json(
        { error: 'Missing required parameters: barberId, date, serviceDuration' },
        { status: 400 }
      );
    }

    // Fetch barber details
    const barberResponse = await fetchAPI(`/barbers/${barberId}?populate=*`);
    const barber: Barber = barberResponse.data;

    if (!barber) {
      return NextResponse.json(
        { error: 'Barber not found' },
        { status: 404 }
      );
    }

    // Fetch existing appointments for this barber on this date
    const appointmentsResponse = await getAppointments(parseInt(barberId), date);
    const appointments: Appointment[] = appointmentsResponse.data || [];

    // Generate available slots
    const slots = generateAvailableSlots({
      barberId: parseInt(barberId),
      date,
      serviceDuration: parseInt(serviceDuration),
      workingHours: barber.attributes.workingHours,
      existingAppointments: appointments,
    });

    return NextResponse.json({ slots });
  } catch (error) {
    console.error('Error generating availability:', error);
    return NextResponse.json(
      { error: 'Failed to generate availability' },
      { status: 500 }
    );
  }
}
