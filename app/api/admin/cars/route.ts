import { NextResponse } from 'next/server';
import { getCars, createCar } from '@/lib/content';
import type { Car } from '@/lib/types';

export async function GET() {
  return NextResponse.json(await getCars());
}

export async function POST(req: Request) {
  const body = await req.json() as Omit<Car, 'id'>;
  const newCar = await createCar(body);
  return NextResponse.json(newCar, { status: 201 });
}
