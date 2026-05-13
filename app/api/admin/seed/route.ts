import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { CARS } from '@/lib/data';
import { DEFAULT_SERVICES, DEFAULT_PRICING, DEFAULT_TESTIMONIALS, DEFAULT_FAQS, DEFAULT_WHYUS } from '@/lib/defaults';

export async function POST() {
  const errors: string[] = [];

  const upsert = async (table: string, data: unknown[]) => {
    const { error } = await supabase.from(table).upsert(data as never[]);
    if (error) errors.push(`${table}: ${error.message}`);
  };

  await upsert('cars', CARS.map((c) => ({
    id: c.id, name: c.name, brand: c.brand, category: c.category,
    seats: c.seats, year: c.year, transmission: c.transmission, fuel: c.fuel,
    price_per_day: c.pricePerDay, price_per_month: c.pricePerMonth,
    image: c.image, features: c.features, available: c.available,
  })));

  await upsert('services', DEFAULT_SERVICES);
  await upsert('pricing_plans', DEFAULT_PRICING);
  await upsert('testimonials', DEFAULT_TESTIMONIALS);
  await upsert('faqs', DEFAULT_FAQS);
  await upsert('whyus_reasons', DEFAULT_WHYUS.reasons);

  const { error: partnersErr } = await supabase
    .from('settings')
    .upsert({ key: 'partners', value: DEFAULT_WHYUS.partners });
  if (partnersErr) errors.push(`settings: ${partnersErr.message}`);

  if (errors.length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 500 });
  }
  return NextResponse.json({ ok: true, message: 'Database seeded successfully' });
}
