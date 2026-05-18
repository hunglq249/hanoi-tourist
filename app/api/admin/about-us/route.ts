import { NextResponse } from 'next/server';
import { getAboutUs, updateAboutUs } from '@/lib/content';
import type { AboutUs } from '@/lib/types';

export async function GET() {
  return NextResponse.json(await getAboutUs());
}

export async function PUT(req: Request) {
  const body = (await req.json()) as AboutUs;
  await updateAboutUs(body);
  return NextResponse.json({ ok: true });
}
