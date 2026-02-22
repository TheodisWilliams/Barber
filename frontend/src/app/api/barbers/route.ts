import { NextRequest, NextResponse } from 'next/server';
import { getBarbers } from '@/lib/strapi';

export async function GET(request: NextRequest) {
  try {
    const data = await getBarbers();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching barbers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch barbers' },
      { status: 500 }
    );
  }
}
