import { supabase } from './supabase';
import type { Car, Service, PricingPlan, Testimonial, FAQItem, WhyUsData, WhyUsReason, Booking, AboutUs } from './types';
import { CARS } from './data';
import { DEFAULT_SERVICES, DEFAULT_PRICING, DEFAULT_TESTIMONIALS, DEFAULT_FAQS, DEFAULT_WHYUS, DEFAULT_ABOUT_US } from './defaults';

// ── Cars ──────────────────────────────────────────────────────────────────────

type DbCar = {
  id: string; name: string; brand: string; category: string; seats: number;
  year: number; transmission: string; fuel: string; price_per_day: number;
  price_per_month: number; image: string; features: string | string[]; available: boolean;
};

function normalizeFeatures(raw: string | string[]): string {
  if (Array.isArray(raw)) {
    return raw.length > 0
      ? `<ul>${raw.map((f) => `<li>${f}</li>`).join('')}</ul>`
      : '';
  }
  return raw ?? '';
}

function dbToCar(r: DbCar): Car {
  return {
    id: r.id, name: r.name, brand: r.brand, category: r.category as Car['category'],
    seats: r.seats, year: r.year, transmission: r.transmission as Car['transmission'],
    fuel: r.fuel as Car['fuel'], pricePerDay: Number(r.price_per_day),
    pricePerMonth: Number(r.price_per_month), image: r.image,
    features: normalizeFeatures(r.features), available: r.available,
  };
}

function carToDb(car: Omit<Car, 'id'>) {
  return {
    name: car.name, brand: car.brand, category: car.category, seats: car.seats,
    year: car.year, transmission: car.transmission, fuel: car.fuel,
    price_per_day: car.pricePerDay, price_per_month: car.pricePerMonth,
    image: car.image,
    // Store as single-element array until DB migration converts column to text
    features: car.features ? [car.features] : [],
    available: car.available,
  };
}

export async function getCars(): Promise<Car[]> {
  const { data, error } = await supabase.from('cars').select('*').order('created_at');
  if (error || !data?.length) return CARS;
  return (data as DbCar[]).map(dbToCar);
}

export async function createCar(body: Omit<Car, 'id'>): Promise<Car> {
  const id = crypto.randomUUID();
  const { data, error } = await supabase.from('cars').insert({ id, ...carToDb(body) }).select().single();
  if (error) throw error;
  return dbToCar(data as DbCar);
}

export async function updateCar(id: string, body: Car): Promise<void> {
  const { error } = await supabase.from('cars').update(carToDb(body)).eq('id', id);
  if (error) throw error;
}

export async function deleteCar(id: string): Promise<void> {
  const { error } = await supabase.from('cars').delete().eq('id', id);
  if (error) throw error;
}

// ── Services ──────────────────────────────────────────────────────────────────

function normalizeServiceFeatures(raw: string | string[]): string {
  if (Array.isArray(raw)) {
    return raw.length > 0
      ? `<ul>${raw.map((f) => `<li>${f}</li>`).join('')}</ul>`
      : '';
  }
  return raw ?? '';
}

export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase.from('services').select('*').order('created_at');
  if (error || !data?.length) return DEFAULT_SERVICES;
  return (data as (Omit<Service, 'features'> & { features: string | string[] })[]).map(
    (s) => ({ ...s, features: normalizeServiceFeatures(s.features) })
  );
}

export async function createService(body: Omit<Service, 'id'>): Promise<Service> {
  const item: Service = { ...body, id: crypto.randomUUID() };
  const { error } = await supabase.from('services').insert({
    ...item,
    features: item.features ? [item.features] : [],
  });
  if (error) throw error;
  return item;
}

export async function updateService(id: string, body: Service): Promise<void> {
  const { error } = await supabase.from('services').update({
    ...body, id,
    features: body.features ? [body.features] : [],
  }).eq('id', id);
  if (error) throw error;
}

export async function deleteService(id: string): Promise<void> {
  const { error } = await supabase.from('services').delete().eq('id', id);
  if (error) throw error;
}

// ── Pricing ───────────────────────────────────────────────────────────────────

function normalizePricingFeatures(raw: string | string[]): string {
  if (Array.isArray(raw)) {
    return raw.length > 0
      ? `<ul>${raw.map((f) => `<li>${f}</li>`).join('')}</ul>`
      : '';
  }
  return raw ?? '';
}

export async function getPricing(): Promise<PricingPlan[]> {
  const { data, error } = await supabase.from('pricing_plans').select('*').order('created_at');
  if (error || !data?.length) return DEFAULT_PRICING;
  return (data as (Omit<PricingPlan, 'features'> & { features: string | string[] })[]).map(
    (p) => ({ ...p, features: normalizePricingFeatures(p.features) })
  );
}

export async function createPricingPlan(body: Omit<PricingPlan, 'id'>): Promise<PricingPlan> {
  const item: PricingPlan = { ...body, id: crypto.randomUUID() };
  const { error } = await supabase.from('pricing_plans').insert({
    ...item,
    features: item.features ? [item.features] : [],
  });
  if (error) throw error;
  return item;
}

export async function updatePricingPlan(id: string, body: PricingPlan): Promise<void> {
  const { error } = await supabase.from('pricing_plans').update({
    ...body, id,
    features: body.features ? [body.features] : [],
  }).eq('id', id);
  if (error) throw error;
}

export async function deletePricingPlan(id: string): Promise<void> {
  const { error } = await supabase.from('pricing_plans').delete().eq('id', id);
  if (error) throw error;
}

// ── Testimonials ──────────────────────────────────────────────────────────────

export async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase.from('testimonials').select('*').order('created_at');
  if (error || !data?.length) return DEFAULT_TESTIMONIALS;
  return data as Testimonial[];
}

export async function createTestimonial(body: Omit<Testimonial, 'id'>): Promise<Testimonial> {
  const item: Testimonial = { ...body, id: crypto.randomUUID() };
  const { error } = await supabase.from('testimonials').insert(item);
  if (error) throw error;
  return item;
}

export async function updateTestimonial(id: string, body: Testimonial): Promise<void> {
  const { error } = await supabase.from('testimonials').update({ ...body, id }).eq('id', id);
  if (error) throw error;
}

export async function deleteTestimonial(id: string): Promise<void> {
  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  if (error) throw error;
}

// ── FAQs ──────────────────────────────────────────────────────────────────────

export async function getFaqs(): Promise<FAQItem[]> {
  const { data, error } = await supabase.from('faqs').select('*').order('created_at');
  if (error || !data?.length) return DEFAULT_FAQS;
  return data as FAQItem[];
}

export async function createFaq(body: Omit<FAQItem, 'id'>): Promise<FAQItem> {
  const item: FAQItem = { ...body, id: crypto.randomUUID() };
  const { error } = await supabase.from('faqs').insert(item);
  if (error) throw error;
  return item;
}

export async function updateFaq(id: string, body: FAQItem): Promise<void> {
  const { error } = await supabase.from('faqs').update({ ...body, id }).eq('id', id);
  if (error) throw error;
}

export async function deleteFaq(id: string): Promise<void> {
  const { error } = await supabase.from('faqs').delete().eq('id', id);
  if (error) throw error;
}

// ── Why Us ────────────────────────────────────────────────────────────────────

export async function getWhyUs(): Promise<WhyUsData> {
  const [reasonsRes, settingsRes] = await Promise.all([
    supabase.from('whyus_reasons').select('*').order('created_at'),
    supabase.from('settings').select('value').eq('key', 'partners').single(),
  ]);
  if (reasonsRes.error || !reasonsRes.data?.length) return DEFAULT_WHYUS;
  return {
    reasons: reasonsRes.data as WhyUsReason[],
    partners: (settingsRes.data?.value as string[]) ?? DEFAULT_WHYUS.partners,
  };
}

export async function createReason(body: Omit<WhyUsReason, 'id'>): Promise<WhyUsReason> {
  const item: WhyUsReason = { ...body, id: crypto.randomUUID() };
  const { error } = await supabase.from('whyus_reasons').insert(item);
  if (error) throw error;
  return item;
}

export async function updateReason(id: string, body: WhyUsReason): Promise<void> {
  const { error } = await supabase.from('whyus_reasons').update({ ...body, id }).eq('id', id);
  if (error) throw error;
}

export async function deleteReason(id: string): Promise<void> {
  const { error } = await supabase.from('whyus_reasons').delete().eq('id', id);
  if (error) throw error;
}

export async function setPartners(partners: string[]): Promise<void> {
  const { error } = await supabase.from('settings').upsert({ key: 'partners', value: partners });
  if (error) throw error;
}

// ── About Us ──────────────────────────────────────────────────────────────────

const ABOUT_KEYS = ['about_who_we_are', 'about_history', 'about_vision', 'about_core_values'] as const;

export async function getAboutUs(): Promise<AboutUs> {
  const { data, error } = await supabase
    .from('settings')
    .select('key, value')
    .in('key', [...ABOUT_KEYS]);
  if (error || !data?.length) return DEFAULT_ABOUT_US;
  const map: Record<string, string> = {};
  for (const row of data) map[row.key as string] = row.value as string;
  return {
    whoWeAre: map['about_who_we_are'] ?? DEFAULT_ABOUT_US.whoWeAre,
    history: map['about_history'] ?? DEFAULT_ABOUT_US.history,
    vision: map['about_vision'] ?? DEFAULT_ABOUT_US.vision,
    coreValues: map['about_core_values'] ?? DEFAULT_ABOUT_US.coreValues,
  };
}

export async function updateAboutUs(about: AboutUs): Promise<void> {
  const rows = [
    { key: 'about_who_we_are', value: about.whoWeAre },
    { key: 'about_history', value: about.history },
    { key: 'about_vision', value: about.vision },
    { key: 'about_core_values', value: about.coreValues },
  ];
  for (const row of rows) {
    const { error } = await supabase.from('settings').upsert(row);
    if (error) throw error;
  }
}

// ── Bookings ──────────────────────────────────────────────────────────────────

type DbBooking = {
  id: string; created_at: string; status: string; type: string;
  full_name: string; phone: string; email?: string; car_model: string;
  start_date: string; end_date: string; pickup_location: string;
  notes?: string; estimated_price?: number;
};

function dbToBooking(r: DbBooking): Booking {
  return {
    id: r.id, createdAt: r.created_at, status: r.status as Booking['status'],
    type: r.type as Booking['type'], fullName: r.full_name, phone: r.phone,
    email: r.email, carModel: r.car_model, startDate: r.start_date,
    endDate: r.end_date, pickupLocation: r.pickup_location,
    notes: r.notes, estimatedPrice: r.estimated_price,
  };
}

function bookingToDb(b: Omit<Booking, 'id' | 'createdAt'>) {
  return {
    status: b.status, type: b.type, full_name: b.fullName, phone: b.phone,
    email: b.email, car_model: b.carModel, start_date: b.startDate,
    end_date: b.endDate, pickup_location: b.pickupLocation,
    notes: b.notes, estimated_price: b.estimatedPrice,
  };
}

export async function getBookings(): Promise<Booking[]> {
  const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
  if (error) return [];
  return (data as DbBooking[]).map(dbToBooking);
}

export async function createBooking(body: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> {
  const id = crypto.randomUUID();
  const { data, error } = await supabase
    .from('bookings')
    .insert({ id, ...bookingToDb(body) })
    .select()
    .single();
  if (error) throw error;
  return dbToBooking(data as DbBooking);
}

export async function updateBookingStatus(id: string, status: Booking['status']): Promise<void> {
  const { error } = await supabase.from('bookings').update({ status }).eq('id', id);
  if (error) throw error;
}
