export interface Booking {
  id: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  type: 'self-drive' | 'long-term';
  // Customer info
  fullName: string;
  phone: string;
  email?: string;
  // Booking details
  carModel: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  notes?: string;
  // Pricing
  estimatedPrice?: number;
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  category: 'sedan' | 'suv' | 'mpv' | 'luxury';
  seats: number;
  year: number;
  transmission: 'auto' | 'manual';
  fuel: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  pricePerDay: number;
  pricePerMonth: number;
  image: string;
  features: string;
  available: boolean;
}

export interface BookingFormData {
  type: 'self-drive' | 'long-term';
  fullName: string;
  phone: string;
  email?: string;
  carModel: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  notes?: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string;
  highlight: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  unit: string;
  description: string;
  features: string;
  cta: string;
  highlight: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

export interface FAQItem {
  id: string;
  q: string;
  a: string;
}

export interface WhyUsReason {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface WhyUsData {
  reasons: WhyUsReason[];
  partners: string[];
}

export interface AboutUs {
  whoWeAre: string;
  history: string;
  vision: string;
  coreValues: string;
}
