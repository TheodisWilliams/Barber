import { NextRequest, NextResponse } from 'next/server';
import { getServerUser } from '@/lib/auth';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1338';

// Cancel appointment
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authData = await getServerUser();

    if (!authData) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const appointmentId = params.id;

    // First, get the appointment to verify ownership
    const getResponse = await fetch(
      `${STRAPI_URL}/api/appointments/${appointmentId}`,
      {
        headers: {
          Authorization: `Bearer ${authData.jwt}`,
        },
      }
    );

    if (!getResponse.ok) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    const appointment = await getResponse.json();

    // Verify the appointment belongs to the user
    if (appointment.data.attributes.clientEmail !== authData.user.email) {
      return NextResponse.json(
        { error: 'Unauthorized to cancel this appointment' },
        { status: 403 }
      );
    }

    // Update appointment status to cancelled
    const updateResponse = await fetch(
      `${STRAPI_URL}/api/appointments/${appointmentId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authData.jwt}`,
        },
        body: JSON.stringify({
          data: {
            status: 'cancelled',
          },
        }),
      }
    );

    if (!updateResponse.ok) {
      throw new Error('Failed to cancel appointment');
    }

    const updatedAppointment = await updateResponse.json();

    return NextResponse.json({
      message: 'Appointment cancelled successfully',
      appointment: updatedAppointment,
    });
  } catch (error: any) {
    console.error('Error cancelling appointment:', error);
    return NextResponse.json(
      { error: 'Failed to cancel appointment' },
      { status: 500 }
    );
  }
}
