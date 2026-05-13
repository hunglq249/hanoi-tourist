import { NextResponse } from 'next/server';
import { updateReason, deleteReason } from '@/lib/content';
import type { WhyUsReason } from '@/lib/types';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json() as WhyUsReason;
  await updateReason(params.id, { ...body, id: params.id });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await deleteReason(params.id);
  return NextResponse.json({ ok: true });
}
