import { NextResponse } from 'next/server';
import { updateTestimonial, deleteTestimonial } from '@/lib/content';
import type { Testimonial } from '@/lib/types';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json() as Testimonial;
  await updateTestimonial(params.id, { ...body, id: params.id });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await deleteTestimonial(params.id);
  return NextResponse.json({ ok: true });
}
