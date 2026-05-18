'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Users, Fuel, Settings, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { formatCurrency } from '@/lib/data';
import type { Car } from '@/lib/types';

function parseFeatureItems(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw as string[];
  if (typeof raw !== 'string' || !raw) return [];
  return (raw.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [])
    .map((m) => m.replace(/<[^>]+>/g, '').trim())
    .filter(Boolean);
}

function CarCard({ car, index, t }: { car: Car; index: number; t: ReturnType<typeof useTranslations<'fleet'>> }) {
  const FUEL_LABEL: Record<string, string> = {
    gasoline: t('fuel_gasoline'),
    diesel: t('fuel_diesel'),
    electric: t('fuel_electric'),
    hybrid: t('fuel_hybrid'),
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, scale: 0.96 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.07 }}
      className="card-dark overflow-hidden group"
    >
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
            <div className="text-[#8A8A8A] text-[11px]">{t('per_day')}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-[#2A2A2A]">
          {[
            { icon: Users, value: t('seats', { count: car.seats }) },
            { icon: Settings, value: car.transmission === 'auto' ? t('transmission_auto') : t('transmission_manual') },
            { icon: Fuel, value: FUEL_LABEL[car.fuel] ?? car.fuel },
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
            {t('view_detail')}
            <ChevronRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
          </Link>
          <a
            href="#booking"
            className="py-3 px-4 rounded-lg bg-[#006400]/10 border border-[#006400]/30 text-[#006400] text-sm font-semibold hover:bg-[#006400]/20 transition-all"
          >
            {t('book_btn')}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

const headingVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function FleetClient({ cars }: { cars: Car[] }) {
  const t = useTranslations('fleet');
  const [active, setActive] = useState('all');

  const categories = [
    { key: 'all', label: t('cat_all') },
    { key: 'sedan', label: t('cat_sedan') },
    { key: 'suv', label: t('cat_suv') },
    { key: 'luxury', label: t('cat_luxury') },
  ];

  const filtered =
    active === 'all'
      ? cars
      : cars.filter((c) => {
          if (active === 'suv') return c.category === 'suv' || c.category === 'mpv';
          return c.category === active;
        });

  return (
    <section id="fleet" className="section-padding bg-[#F0F6F0] dark:bg-[#0A0A0A]">
      <div className="container-custom">
        <motion.div
          className="text-center mb-12"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="section-label justify-center mb-4">{t('label')}</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1A2B1A] dark:text-white mb-4">
            {t('heading')}
          </h2>
          <p className="text-[#546A54] dark:text-[#8A8A8A] text-lg max-w-xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {categories.map((cat) => (
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
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} t={t} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[#546A54] dark:text-[#8A8A8A] mb-4">{t('no_result')}</p>
          <a href="#booking" className="btn-gold">
            {t('consult_btn')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
