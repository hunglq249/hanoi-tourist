import { NextResponse } from 'next/server';
import { getTestimonials, createTestimonial } from '@/lib/content';
import type { Testimonial } from '@/lib/types';

export async function GET() {
  return NextResponse.json(await getTestimonials());
}

export async function POST(req: Request) {
  const body = await req.json() as Omit<Testimonial, 'id'>;
  const item = await createTestimonial(body);
  return NextResponse.json(item, { status: 201 });
}
