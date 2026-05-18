import { Shield, Award, Headphones, MapPin, CreditCard, RefreshCw, type LucideIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { getWhyUs } from '@/lib/content';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaggerContainer from '@/components/ui/StaggerContainer';
import StaggerItem from '@/components/ui/StaggerItem';

const ICON_MAP: Record<string, LucideIcon> = { Shield, Award, Headphones, MapPin, CreditCard, RefreshCw };

export default async function WhyUs() {
  const t = await getTranslations('whyUs');
  const { reasons, partners } = await getWhyUs();

  return (
    <section className="section-padding bg-[#F8FAF8] dark:bg-[#0A0A0A]">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <ScrollReveal direction="right">
            <div className="section-label mb-4">{t('label')}</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1A2B1A] dark:text-white mb-6">
              {t('heading1')}
              <br />
              <span className="gradient-text">{t('headingGreen')}</span>
            </h2>
            <p className="text-[#546A54] dark:text-[#8A8A8A] text-lg leading-relaxed mb-8">
              {t('description')}
            </p>

            <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6">
              <div className="text-[#8A8A8A] text-xs uppercase tracking-wider mb-4">
                {t('partners_label')}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {partners.map((partner) => (
                  <div
                    key={partner}
                    className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-3 text-center text-[11px] text-[#666] hover:border-[#006400]/30 hover:text-[#AAAAAA] transition-colors"
                  >
                    {partner}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right grid */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map(({ id, icon, title, description }) => {
              const Icon = ICON_MAP[icon] ?? Shield;
              return (
                <StaggerItem key={id}>
                  <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5 hover:border-[#006400]/30 transition-all group h-full">
                    <div className="w-10 h-10 rounded-lg bg-[#006400]/10 border border-[#006400]/20 flex items-center justify-center mb-4 group-hover:bg-[#006400]/20 transition-colors">
                      <Icon size={18} className="text-[#006400]" />
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-2">{title}</h3>
                    <p className="text-[#8A8A8A] text-xs leading-relaxed">{description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
