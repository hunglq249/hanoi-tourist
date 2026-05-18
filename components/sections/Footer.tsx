import Image from 'next/image';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { COMPANY_INFO } from '@/lib/data';
import NewsletterForm from './NewsletterForm';

export default async function Footer() {
  const t = await getTranslations('footer');

  const services = [
    t('service_1'), t('service_2'), t('service_3'),
    t('service_4'), t('service_5'), t('service_6'),
  ];
  const carTypes = [
    t('car_1'), t('car_2'), t('car_3'),
    t('car_4'), t('car_5'), t('car_6'),
  ];
  const legalLinks = [t('privacy'), t('terms'), t('booking_policy')];

  return (
    <footer className="bg-[#F0F6F0] dark:bg-[#0A0A0A] border-t border-[#DDE8DD] dark:border-[#1A1A1A]">
      {/* Newsletter bar */}
      <div className="bg-white dark:bg-[#0D0D0D] border-b border-[#DDE8DD] dark:border-[#1A1A1A] py-10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-[#1A2B1A] dark:text-white mb-1">
                {t('newsletter_title')}
              </h3>
              <p className="text-[#546A54] dark:text-[#8A8A8A] text-sm">
                {t('newsletter_desc')}
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div
        className="py-14 dark-section"
        style={{ background: 'linear-gradient(135deg, #004800 0%, #006400 50%, #004800 100%)' }}
      >
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            {t('cta_title')}
          </h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto">
            {t('cta_desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#booking" className="btn-gold">
              {t('cta_book')}
            </a>
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
              className="font-semibold py-3 px-6 rounded-lg text-white transition-all text-base"
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1.5px solid rgba(255,255,255,0.35)',
              }}
            >
              {t('cta_call', { phone: COMPANY_INFO.phone })}
            </a>
          </div>
        </div>
      </div>

      {/* Main footer columns */}
      <div className="py-14 border-t border-[#DDE8DD] dark:border-[#1A1A1A]">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-white flex items-center justify-center flex-shrink-0 p-0.5 shadow-sm border border-[#DDE8DD]">
                  <Image src="/logo.svg" alt="Ha noi Tourism logo" width={36} height={36} />
                </div>
                <div>
                  <div className="font-display font-bold text-[#1A2B1A] dark:text-white text-lg leading-tight">
                    Ha noi <span className="text-[#006400]">Tourism</span>
                  </div>
                  <div className="text-[9px] text-[#8A9A8A] dark:text-[#8A8A8A] tracking-widest uppercase">
                    Car Rental Service
                  </div>
                </div>
              </div>
              <p className="text-[#546A54] dark:text-[#8A8A8A] text-sm leading-relaxed mb-5">
                {t('brand_desc')}
              </p>
              <div className="flex gap-2.5">
                {[
                  { label: 'Zalo', href: '#' },
                  { label: 'FB', href: '#' },
                  { label: 'YT', href: '#' },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="w-9 h-9 rounded-lg bg-white dark:bg-[#1A1A1A] border border-[#DDE8DD] dark:border-[#2A2A2A] flex items-center justify-center text-[#546A54] dark:text-[#8A8A8A] text-xs font-bold hover:border-[#006400]/50 hover:text-[#006400] dark:hover:text-[#006400] transition-all"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <div className="text-[#1A2B1A] dark:text-white font-semibold text-sm mb-4">
                {t('col_services')}
              </div>
              <ul className="space-y-2.5">
                {services.map((item) => (
                  <li key={item}>
                    <a
                      href="#services"
                      className="text-[#546A54] dark:text-[#8A8A8A] text-sm hover:text-[#006400] transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Car types */}
            <div>
              <div className="text-[#1A2B1A] dark:text-white font-semibold text-sm mb-4">
                {t('col_cars')}
              </div>
              <ul className="space-y-2.5">
                {carTypes.map((item) => (
                  <li key={item}>
                    <a
                      href="#fleet"
                      className="text-[#546A54] dark:text-[#8A8A8A] text-sm hover:text-[#006400] transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <div className="text-[#1A2B1A] dark:text-white font-semibold text-sm mb-4">
                {t('col_contact')}
              </div>
              <ul className="space-y-3">
                {[
                  { icon: Phone, text: COMPANY_INFO.phone, href: `tel:${COMPANY_INFO.phone.replace(/\s/g, '')}` },
                  { icon: Mail, text: COMPANY_INFO.email, href: `mailto:${COMPANY_INFO.email}` },
                  { icon: MapPin, text: COMPANY_INFO.address, href: '#' },
                  { icon: Clock, text: COMPANY_INFO.workingHours, href: '#' },
                ].map(({ icon: Icon, text, href }) => (
                  <li key={text}>
                    <a
                      href={href}
                      className="flex items-start gap-2.5 text-[#546A54] dark:text-[#8A8A8A] text-sm hover:text-[#006400] transition-colors group"
                    >
                      <Icon size={14} className="mt-0.5 flex-shrink-0 text-[#006400]" />
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#DDE8DD] dark:border-[#1A1A1A] py-5">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[#8A9A8A] dark:text-[#666] text-xs">{t('copyright')}</p>
          <div className="flex gap-6">
            {legalLinks.map((item) => (
              <a
                key={item}
                href="#"
                className="text-[#8A9A8A] dark:text-[#666] text-xs hover:text-[#006400] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
