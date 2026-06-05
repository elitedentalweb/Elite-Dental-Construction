import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { globalApi } from '../serverConfig';

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const { searchParams } = new URL(req.url);
    const sectionId = searchParams.get('sectionId');
    const url = sectionId ? `/photos?sectionId=${sectionId}` : '/photos';
    const response = await globalApi.get(url, {
      headers: { Cookie: cookieStore.toString() },
    });
    return NextResponse.json(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      error?.response?.data || { message: 'Failed to fetch photos' },
      { status: error?.response?.status || 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const body = await req.json();
    console.log('body:', body); // ← добавь
    const response = await globalApi.post('/photos', body, {
      headers: { Cookie: cookieStore.toString() },
    });
    return NextResponse.json(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('error:', error?.response?.data); // ← добавь
    return NextResponse.json(
      error?.response?.data || { message: 'Failed to create photo' },
      { status: error?.response?.status || 500 }
    );
  }
}
