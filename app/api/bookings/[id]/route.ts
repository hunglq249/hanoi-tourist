import { NextResponse } from 'next/server';
import { updateBookingStatus } from '@/lib/content';
import type { Booking } from '@/lib/types';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { status } = await req.json() as { status: Booking['status'] };
  await updateBookingStatus(params.id, status);
  return NextResponse.json({ ok: true });
}
