import { Metadata } from 'next';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import Services from '@/components/sections/Services';
import Fleet from '@/components/sections/Fleet';
import WhyUs from '@/components/sections/WhyUs';
import Pricing from '@/components/sections/Pricing';
import BookingForm from '@/components/sections/BookingForm';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';
import FloatingContact from '@/components/ui/FloatingContact';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Hanoi Tourism | Cho Thuê Xe Tự Lái & Thuê Xe Dài Hạn Hà Nội',
  description:
    'Cho thuê xe tự lái tại Hà Nội uy tín, giá rẻ. Đa dạng xe từ 4 chỗ đến 7 chỗ. Thuê xe dài hạn cho văn phòng, doanh nghiệp. Bảo hiểm đầy đủ, hỗ trợ 24/7.',
};

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <Services />
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
