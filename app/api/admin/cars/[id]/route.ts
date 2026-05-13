import { NextResponse } from 'next/server';
import { updateCar, deleteCar } from '@/lib/content';
import type { Car } from '@/lib/types';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json() as Car;
  await updateCar(params.id, { ...body, id: params.id });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await deleteCar(params.id);
  return NextResponse.json({ ok: true });
}
