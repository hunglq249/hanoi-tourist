import { NextResponse } from 'next/server';
import { updateService, deleteService } from '@/lib/content';
import type { Service } from '@/lib/types';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json() as Service;
  await updateService(params.id, { ...body, id: params.id });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await deleteService(params.id);
  return NextResponse.json({ ok: true });
}
