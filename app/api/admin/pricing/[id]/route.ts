import { NextResponse } from 'next/server';
import { updatePricingPlan, deletePricingPlan } from '@/lib/content';
import type { PricingPlan } from '@/lib/types';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json() as PricingPlan;
  await updatePricingPlan(params.id, { ...body, id: params.id });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await deletePricingPlan(params.id);
  return NextResponse.json({ ok: true });
}
