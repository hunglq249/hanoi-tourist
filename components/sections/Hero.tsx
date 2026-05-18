'use client';

import { useEffect, useRef } from 'react';
import { ChevronDown, Star, Shield, Clock, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { COMPANY_INFO } from '@/lib/data';

export default function Hero() {
  const t = useTranslations('hero');
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = heroRef.current?.querySelectorAll('.hero-animate');
    elements?.forEach((el, i) => {
      setTimeout(() => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'translateY(0)';
      }, i * 150);
    });
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col">
      {/* Background image with overlays */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1800&q=90"
          alt="Hanoi Tourism cho thuê xe"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(5,20,5,0.82) 0%, rgba(5,20,5,0.55) 55%, rgba(5,20,5,0.35) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center pt-28 md:pt-32">
        <div className="container-custom w-full py-12">
          <div className="max-w-2xl">
            <div
              className="hero-animate mb-5"
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                transition: 'all 0.6s ease',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#4ADE80',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span style={{ display: 'inline-block', width: 32, height: 2, background: '#22C55E' }} />
              {t('tagline')}
            </div>

            <h1
              className="hero-animate font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-5 text-white"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
            >
              {t('heading1')}{' '}
              <span style={{ color: '#4ADE80' }}>{t('headingGreen')}</span>
              {t('heading2') && <><br />{t('heading2')}</>}
            </h1>

            <p
              className="hero-animate text-gray-200 text-lg leading-relaxed mb-8 max-w-lg"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
            >
              {t('description')}
            </p>

            {/* Trust badges */}
            <div
              className="hero-animate flex flex-wrap gap-3 mb-8"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
            >
              {[
                { icon: Star, text: t('badge_rating') },
                { icon: Shield, text: t('badge_insurance') },
                { icon: Clock, text: t('badge_delivery') },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 rounded-full px-4 py-2"
                  style={{
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  <Icon size={14} style={{ color: '#4ADE80' }} />
                  <span className="text-sm text-white">{text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div
              className="hero-animate flex flex-col sm:flex-row gap-4"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
            >
              <a href="#booking" className="btn-gold text-center text-base">
                {t('cta_book')}
              </a>
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
                className="text-center text-base font-semibold py-3 px-6 rounded-lg text-white transition-all"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(8px)',
                  border: '1.5px solid rgba(255,255,255,0.3)',
                }}
              >
                {t('cta_call', { phone: COMPANY_INFO.phone })}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#services"
        className="absolute bottom-[130px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-colors animate-bounce z-10"
        style={{ color: 'rgba(255,255,255,0.5)' }}
      >
        <span className="text-xs tracking-widest uppercase">{t('scroll')}</span>
        <ChevronDown size={18} />
      </a>

      {/* Booking strip */}
      <div className="relative z-10">
        <div className="bg-white dark:bg-[#141414] shadow-[0_-8px_30px_rgba(0,0,0,0.15)] dark:shadow-none border-t dark:border-[#2A2A2A] border-transparent">
          <div className="container-custom py-5">
            <div className="flex flex-col md:flex-row items-end gap-4">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#006400] uppercase tracking-wide mb-1.5">
                    {t('search_type_label')}
                  </label>
                  <select className="w-full border border-[#DDE8DD] dark:border-[#2A2A2A] rounded-lg px-3 py-2.5 text-sm bg-[#F8FAF8] dark:bg-[#1A1A1A] dark:text-white text-[#1A2B1A] focus:outline-none focus:border-[#006400] transition-colors">
                    <option value="">{t('search_type_all')}</option>
                    <option value="sedan">{t('search_type_sedan')}</option>
                    <option value="suv">{t('search_type_suv')}</option>
                    <option value="luxury">{t('search_type_luxury')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#006400] uppercase tracking-wide mb-1.5">
                    {t('search_pickup_label')}
                  </label>
                  <input
                    type="date"
                    className="w-full border border-[#DDE8DD] dark:border-[#2A2A2A] rounded-lg px-3 py-2.5 text-sm bg-[#F8FAF8] dark:bg-[#1A1A1A] dark:text-white text-[#1A2B1A] focus:outline-none focus:border-[#006400] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#006400] uppercase tracking-wide mb-1.5">
                    {t('search_return_label')}
                  </label>
                  <input
                    type="date"
                    className="w-full border border-[#DDE8DD] dark:border-[#2A2A2A] rounded-lg px-3 py-2.5 text-sm bg-[#F8FAF8] dark:bg-[#1A1A1A] dark:text-white text-[#1A2B1A] focus:outline-none focus:border-[#006400] transition-colors"
                  />
                </div>
              </div>
              <a
                href="#fleet"
                className="btn-gold whitespace-nowrap flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Search size={16} />
                {t('search_btn')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
