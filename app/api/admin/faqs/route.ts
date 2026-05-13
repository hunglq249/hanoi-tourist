import { NextResponse } from 'next/server';
import { getFaqs, createFaq } from '@/lib/content';
import type { FAQItem } from '@/lib/types';

export async function GET() {
  return NextResponse.json(await getFaqs());
}

export async function POST(req: Request) {
  const body = await req.json() as Omit<FAQItem, 'id'>;
  const item = await createFaq(body);
  return NextResponse.json(item, { status: 201 });
}
