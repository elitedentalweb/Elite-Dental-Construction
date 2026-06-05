import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { globalApi } from '../serverConfig';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const response = await globalApi.get('/users', {
      headers: { Cookie: cookieStore.toString() },
    });
    return NextResponse.json(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      error?.response?.data || { message: 'Failed to fetch users' },
      { status: error?.response?.status || 500 }
    );
  }
}
