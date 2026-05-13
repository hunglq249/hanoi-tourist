'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Users, Fuel, Settings, ChevronRight } from 'lucide-react';
import { formatCurrency } from '@/lib/data';
import type { Car } from '@/lib/types';

const CATEGORIES = [
  { key: 'all', label: 'Tất cả' },
  { key: 'sedan', label: 'Sedan' },
  { key: 'suv', label: 'SUV / MPV' },
  { key: 'luxury', label: 'Xe sang' },
];

function parseFeatureItems(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw as string[];
  if (typeof raw !== 'string' || !raw) return [];
  return (raw.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [])
    .map((m) => m.replace(/<[^>]+>/g, '').trim())
    .filter(Boolean);
}

const FUEL_LABEL: Record<string, string> = {
  gasoline: 'Xăng',
  diesel: 'Dầu',
  electric: 'Điện',
  hybrid: 'Hybrid',
};

function CarCard({ car }: { car: Car }) {
  return (
    <div className="card-dark overflow-hidden group">
      <div className="relative overflow-hidden h-52">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        <div className="absolute top-3 right-3 bg-[#0A0A0A]/80 backdrop-blur-sm border border-[#006400]/30 rounded-full px-3 py-1 text-[11px] font-semibold text-[#006400]">
          {car.year}
        </div>
        {car.fuel === 'hybrid' && (
          <div className="absolute top-3 left-3 bg-green-900/80 border border-green-500/30 rounded-full px-3 py-1 text-[11px] font-semibold text-green-400">
            ECO
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-display text-lg font-bold text-white">{car.name}</h3>
            <div className="text-[#8A8A8A] text-xs mt-0.5">{car.brand}</div>
          </div>
          <div className="text-right">
            <div className="text-[#006400] font-bold text-base">{formatCurrency(car.pricePerDay)}</div>
            <div className="text-[#8A8A8A] text-[11px]">/ ngày</div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-[#2A2A2A]">
          {[
            { icon: Users, value: `${car.seats} chỗ` },
            { icon: Settings, value: car.transmission === 'auto' ? 'Tự động' : 'Số sàn' },
            { icon: Fuel, value: FUEL_LABEL[car.fuel] },
          ].map(({ icon: Icon, value }) => (
            <div key={value} className="flex items-center gap-1.5 text-xs text-[#8A8A8A]">
              <Icon size={12} className="text-[#006400]" />
              {value}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {parseFeatureItems(car.features).slice(0, 3).map((f) => (
            <span key={f} className="text-[11px] bg-[#2A2A2A] text-[#AAAAAA] px-2.5 py-1 rounded-full">
              {f}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <Link
            href={`/xe/${car.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-lg border border-[#3A3A3A] text-[#CCCCCC] text-sm font-semibold hover:border-[#006400] hover:text-[#006400] transition-all group/btn"
          >
            Xem chi tiết
            <ChevronRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
          </Link>
          <a
            href="#booking"
            className="py-3 px-4 rounded-lg bg-[#006400]/10 border border-[#006400]/30 text-[#006400] text-sm font-semibold hover:bg-[#006400]/20 transition-all"
          >
            Đặt xe
          </a>
        </div>
      </div>
    </div>
  );
}

export default function FleetClient({ cars }: { cars: Car[] }) {
  const [active, setActive] = useState('all');

  const filtered =
    active === 'all'
      ? cars
      : cars.filter((c) => {
          if (active === 'suv') return c.category === 'suv' || c.category === 'mpv';
          return c.category === active;
        });

  return (
    <section id="fleet" className="section-padding bg-[#0A0A0A]">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="section-label justify-center mb-4">Đội xe của chúng tôi</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Lựa Chọn <span className="gradient-text">Đa Dạng</span>
          </h2>
          <p className="text-[#8A8A8A] text-lg max-w-xl mx-auto">
            Hơn 200 xe từ các thương hiệu uy tín, mới nhất, bảo hiểm đầy đủ.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                active === cat.key
                  ? 'bg-gradient-to-r from-[#006400] to-[#008000] text-white'
                  : 'bg-[#1A1A1A] border border-[#2A2A2A] text-[#CCCCCC] hover:border-[#006400]/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-[#8A8A8A] mb-4">Không tìm thấy xe phù hợp? Liên hệ với chúng tôi</p>
          <a href="#booking" className="btn-gold">
            Tư vấn xe phù hợp
          </a>
        </div>
      </div>
    </section>
  );
}
