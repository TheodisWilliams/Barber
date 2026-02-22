import { NextRequest, NextResponse } from 'next/server';
import { getServices } from '@/lib/strapi';

export async function GET(request: NextRequest) {
  try {
    const data = await getServices();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
