import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import Services from '@/components/sections/Services';
import HowItWorks from '@/components/sections/HowItWorks';
import Fleet from '@/components/sections/Fleet';
import WhyUs from '@/components/sections/WhyUs';
import Pricing from '@/components/sections/Pricing';
import BookingForm from '@/components/sections/BookingForm';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';
import FloatingContact from '@/components/ui/FloatingContact';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: t('title'), description: t('description') };
}

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <HowItWorks />
      <Fleet />
      <WhyUs />
      <Pricing />
      <BookingForm />
      <Testimonials />
      <FAQ />
      <Footer />
      <FloatingContact />
    </main>
  );
}
