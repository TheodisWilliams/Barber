import { NextResponse } from 'next/server';
import { getServerUser } from '@/lib/auth';

export async function GET() {
  try {
    const authData = await getServerUser();

    if (!authData) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    return NextResponse.json({ user: authData.user });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get user' },
      { status: 500 }
    );
  }
}
