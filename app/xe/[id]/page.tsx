import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Users, Fuel, Settings, Calendar, ArrowLeft, CheckCircle, Tag, Star } from 'lucide-react';
import '@/app/xe/[id]/features.css';
import { getCars } from '@/lib/content';
import { formatCurrency } from '@/lib/data';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import type { Car } from '@/lib/types';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

const FUEL_LABEL: Record<string, string> = {
  gasoline: 'Xăng',
  diesel: 'Dầu diesel',
  electric: 'Điện',
  hybrid: 'Hybrid',
};

const CATEGORY_LABEL: Record<string, string> = {
  sedan: 'Sedan',
  suv: 'SUV',
  mpv: 'MPV',
  luxury: 'Xe sang',
};

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cars = await getCars();
  const car = cars.find((c) => c.id === params.id);
  if (!car) return { title: 'Xe không tồn tại' };
  return {
    title: `${car.name} | Hanoi Tourism`,
    description: `Thuê ${car.name} ${car.year} tại Hà Nội. Giá chỉ từ ${formatCurrency(car.pricePerDay)}/ngày. Bảo hiểm đầy đủ, hỗ trợ 24/7.`,
  };
}

function SpecBadge({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-[#141414] dark:bg-[#141414] rounded-xl border border-[#2A2A2A]">
      <Icon size={20} className="text-[#006400]" />
      <div className="text-[#8A8A8A] text-xs">{label}</div>
      <div className="text-white dark:text-white text-sm font-semibold text-center">{value}</div>
    </div>
  );
}

export default async function CarDetailPage({ params }: Props) {
  const cars = await getCars();
  const car: Car | undefined = cars.find((c) => c.id === params.id);

  if (!car) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen dark:bg-[#0A0A0A] bg-gray-50 pt-20">
        {/* Breadcrumb */}
        <div className="container-custom py-6">
          <Link
            href="/#fleet"
            className="inline-flex items-center gap-2 text-[#8A8A8A] hover:text-[#006400] text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            Quay lại đội xe
          </Link>
        </div>

        <div className="container-custom pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left — Image */}
            <div className="lg:sticky lg:top-28">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                  <span className="bg-[#0A0A0A]/80 backdrop-blur-sm border border-[#006400]/30 rounded-full px-3 py-1 text-xs font-semibold text-[#006400]">
                    {car.year}
                  </span>
                  {car.fuel === 'hybrid' && (
                    <span className="bg-green-900/80 border border-green-500/30 rounded-full px-3 py-1 text-xs font-semibold text-green-400">
                      ECO
                    </span>
                  )}
                  {!car.available && (
                    <span className="bg-red-900/80 border border-red-500/30 rounded-full px-3 py-1 text-xs font-semibold text-red-400">
                      Hết xe
                    </span>
                  )}
                </div>

                {/* Category badge bottom-left */}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-[#0A0A0A]/80 backdrop-blur-sm border border-[#2A2A2A] rounded-full px-3 py-1 text-xs text-[#CCCCCC]">
                    {CATEGORY_LABEL[car.category] ?? car.category}
                  </span>
                </div>
              </div>

              {/* Price card below image */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-[#141414] dark:bg-[#141414] border border-[#006400]/30 rounded-xl p-4 text-center">
                  <div className="text-[#8A8A8A] text-xs mb-1">Giá thuê / ngày</div>
                  <div className="text-[#006400] font-bold text-xl">{formatCurrency(car.pricePerDay)}</div>
                </div>
                <div className="bg-[#141414] dark:bg-[#141414] border border-[#2A2A2A] rounded-xl p-4 text-center">
                  <div className="text-[#8A8A8A] text-xs mb-1">Giá thuê / tháng</div>
                  <div className="text-[#006400] font-bold text-xl">{formatCurrency(car.pricePerMonth)}</div>
                </div>
              </div>
            </div>

            {/* Right — Details */}
            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="text-[#8A8A8A] text-sm mb-1">{car.brand}</div>
                <h1 className="font-display text-4xl md:text-5xl font-bold dark:text-white text-[#0A0A0A] mb-3">
                  {car.name}
                </h1>
                <div className="flex items-center gap-3">
                  {car.available ? (
                    <span className="inline-flex items-center gap-1.5 text-green-400 text-sm font-medium">
                      <CheckCircle size={15} />
                      Còn xe — sẵn sàng giao
                    </span>
                  ) : (
                    <span className="text-red-400 text-sm font-medium">Tạm hết xe</span>
                  )}
                  <span className="text-[#3A3A3A]">·</span>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    <Star size={13} fill="currentColor" />
                    <Star size={13} fill="currentColor" />
                    <Star size={13} fill="currentColor" />
                    <Star size={13} fill="currentColor" />
                    <Star size={13} fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Specs grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                <SpecBadge icon={Users} label="Số chỗ" value={`${car.seats} chỗ`} />
                <SpecBadge icon={Settings} label="Hộp số" value={car.transmission === 'auto' ? 'Số tự động' : 'Số sàn'} />
                <SpecBadge icon={Fuel} label="Nhiên liệu" value={FUEL_LABEL[car.fuel] ?? car.fuel} />
                <SpecBadge icon={Calendar} label="Đời xe" value={String(car.year)} />
              </div>

              {/* Features */}
              {car.features && (() => {
                const featuresHtml = Array.isArray(car.features)
                  ? (car.features as string[]).length > 0
                    ? `<ul>${(car.features as string[]).map((f) => `<li>${f}</li>`).join('')}</ul>`
                    : ''
                  : (car.features as string);
                return featuresHtml ? (
                  <div className="mb-8">
                    <h2 className="dark:text-white text-[#0A0A0A] font-semibold text-base mb-4 flex items-center gap-2">
                      <Tag size={15} className="text-[#006400]" />
                      Tính năng nổi bật
                    </h2>
                    <div
                      className="car-features-html"
                      dangerouslySetInnerHTML={{ __html: featuresHtml }}
                    />
                  </div>
                ) : null;
              })()}

              {/* Info box */}
              <div className="bg-[#141414] dark:bg-[#141414] border border-[#006400]/20 rounded-2xl p-5 mb-8">
                <div className="text-[#006400] text-sm font-semibold mb-2">✦ Dịch vụ bao gồm</div>
                <ul className="space-y-1.5">
                  {[
                    'Bảo hiểm xe toàn diện',
                    'Hỗ trợ kỹ thuật 24/7',
                    'Giao xe tận nơi trong Hà Nội',
                    'Không cần đặt cọc trước khi xác nhận',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#8A8A8A]">
                      <CheckCircle size={13} className="text-[#006400] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`/#booking`}
                  className="btn-gold flex-1 flex items-center justify-center gap-2 text-base py-4"
                >
                  Đặt xe này ngay
                </a>
                <a
                  href="tel:+84912345678"
                  className="btn-outline-gold flex-1 flex items-center justify-center gap-2 text-base py-4"
                >
                  Gọi tư vấn ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
