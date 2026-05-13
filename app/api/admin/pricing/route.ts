import { NextResponse } from 'next/server';
import { getPricing, createPricingPlan } from '@/lib/content';
import type { PricingPlan } from '@/lib/types';

export async function GET() {
  return NextResponse.json(await getPricing());
}

export async function POST(req: Request) {
  const body = await req.json() as Omit<PricingPlan, 'id'>;
  const item = await createPricingPlan(body);
  return NextResponse.json(item, { status: 201 });
}
