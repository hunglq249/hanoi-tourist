import { Car, Building2, MapPin, Clock, Shield, Headphones, type LucideIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { getServices } from '@/lib/content';
import type { Service } from '@/lib/types';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaggerContainer from '@/components/ui/StaggerContainer';
import StaggerItem from '@/components/ui/StaggerItem';

const ICON_MAP: Record<string, LucideIcon> = { Car, Building2, MapPin };

const SERVICE_IMAGES: Record<string, string> = {
  Car: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80',
  Building2: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
  MapPin: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
};

const PERK_ICON_MAP: Record<string, LucideIcon> = { Clock, Shield, Headphones };
const PERK_ICONS = ['Clock', 'Shield', 'Headphones'] as const;

function ServiceCard({
  service,
  bookBtn,
  popularBadge,
}: {
  service: Service;
  bookBtn: string;
  popularBadge: string;
}) {
  const Icon = ICON_MAP[service.icon] ?? Car;
  const imageSrc = SERVICE_IMAGES[service.icon] ?? SERVICE_IMAGES.Car;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-[#1A1A1A] ${
        service.highlight
          ? 'border-[#006400]/40 shadow-lg shadow-green-900/10 dark:shadow-green-900/20'
          : 'border-[#DDE8DD] dark:border-[#2A2A2A] hover:border-[#006400]/40 hover:shadow-md hover:shadow-green-900/8'
      }`}
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={imageSrc}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {service.highlight && (
          <div className="absolute top-3 right-3 bg-[#006400] text-white text-xs font-bold px-3 py-1 rounded-full">
            {popularBadge}
          </div>
        )}
        <div
          className={`absolute bottom-3 left-4 w-10 h-10 rounded-xl flex items-center justify-center ${
            service.highlight ? 'bg-[#006400]' : 'bg-white/95'
          }`}
        >
          <Icon size={20} className={service.highlight ? 'text-white' : 'text-[#006400]'} />
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-[#1A2B1A] dark:text-white mb-3">
          {service.title}
        </h3>
        <div
          className="text-[#546A54] dark:text-[#8A8A8A] text-sm leading-relaxed mb-4 service-prose"
          dangerouslySetInnerHTML={{ __html: service.description }}
        />
        <div
          className="service-features-html"
          dangerouslySetInnerHTML={{ __html: service.features }}
        />
        <a
          href="#booking"
          className={`mt-6 block text-center py-3 px-6 rounded-xl text-sm font-semibold transition-all ${
            service.highlight
              ? 'btn-gold'
              : 'border border-[#DDE8DD] dark:border-[#3A3A3A] text-[#006400] dark:text-[#CCCCCC] hover:border-[#006400] hover:bg-[#F0F6F0] dark:hover:bg-[#006400]/10'
          }`}
        >
          {bookBtn}
        </a>
      </div>
    </div>
  );
}

export default async function Services() {
  const t = await getTranslations('services');
  const services = await getServices();

  const perks = PERK_ICONS.map((icon, i) => ({
    icon,
    title: t(`perk${i + 1}_title` as any),
    desc: t(`perk${i + 1}_desc` as any),
  }));

  return (
    <section id="services" className="section-padding section-alt bg-[#F8FAF8] dark:bg-[#0D0D0D]">
      <div className="container-custom">
        <ScrollReveal className="text-center mb-16">
          <div className="section-label justify-center mb-4">{t('label')}</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1A2B1A] dark:text-white mb-4">
            {t('heading')}
          </h2>
          <p className="text-[#546A54] dark:text-[#8A8A8A] text-lg max-w-2xl mx-auto">
            {t('description')}
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 mb-16">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <ServiceCard
                service={service}
                bookBtn={t('book_btn')}
                popularBadge={t('popular_badge')}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <StaggerContainer className="grid md:grid-cols-3 gap-5">
          {perks.map(({ icon, title, desc }) => {
            const PerkIcon = PERK_ICON_MAP[icon];
            return (
              <StaggerItem key={icon}>
                <div className="flex items-center gap-4 bg-white dark:bg-[#141414] border border-[#DDE8DD] dark:border-[#2A2A2A] rounded-xl p-5 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#E8F5E8] dark:bg-[#006400]/10 border border-[#C0DFC0] dark:border-[#006400]/20 flex items-center justify-center flex-shrink-0">
                    <PerkIcon size={20} className="text-[#006400]" />
                  </div>
                  <div>
                    <div className="text-[#1A2B1A] dark:text-white font-semibold text-sm">{title}</div>
                    <div className="text-[#546A54] dark:text-[#8A8A8A] text-xs mt-0.5">{desc}</div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
