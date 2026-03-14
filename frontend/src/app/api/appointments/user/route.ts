import { NextResponse } from 'next/server';
import { getServerUser } from '@/lib/auth';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1338';

export async function GET() {
  try {
    const authData = await getServerUser();

    if (!authData) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Fetch user's appointments from Strapi
    const response = await fetch(
      `${STRAPI_URL}/api/appointments?` + new URLSearchParams({
        'filters[clientEmail][$eq]': authData.user.email,
        'populate': 'barber,service',
        'sort': 'startAt:asc',
      }),
      {
        headers: {
          Authorization: `Bearer ${authData.jwt}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch appointments');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching user appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}
