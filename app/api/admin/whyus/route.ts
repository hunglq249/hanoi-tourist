import { NextResponse } from 'next/server';
import { getWhyUs, createReason, setPartners } from '@/lib/content';
import type { WhyUsReason } from '@/lib/types';

export async function GET() {
  return NextResponse.json(await getWhyUs());
}

export async function POST(req: Request) {
  const body = await req.json() as Omit<WhyUsReason, 'id'>;
  const item = await createReason(body);
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(req: Request) {
  const body = await req.json() as { partners: string[] };
  await setPartners(body.partners);
  return NextResponse.json({ ok: true });
}
