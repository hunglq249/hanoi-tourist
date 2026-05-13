import { NextResponse } from 'next/server';
import { getServices, createService } from '@/lib/content';
import type { Service } from '@/lib/types';

export async function GET() {
  return NextResponse.json(await getServices());
}

export async function POST(req: Request) {
  const body = await req.json() as Omit<Service, 'id'>;
  const item = await createService(body);
  return NextResponse.json(item, { status: 201 });
}
