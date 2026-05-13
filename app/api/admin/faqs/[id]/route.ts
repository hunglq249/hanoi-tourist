import { NextResponse } from 'next/server';
import { updateFaq, deleteFaq } from '@/lib/content';
import type { FAQItem } from '@/lib/types';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json() as FAQItem;
  await updateFaq(params.id, { ...body, id: params.id });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await deleteFaq(params.id);
  return NextResponse.json({ ok: true });
}
