import { Search, CalendarCheck, Car } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaggerContainer from '@/components/ui/StaggerContainer';
import StaggerItem from '@/components/ui/StaggerItem';

export default async function HowItWorks() {
  const t = await getTranslations('howItWorks');

  const steps = [
    { icon: Search, title: t('step1_title'), description: t('step1_desc') },
    { icon: CalendarCheck, title: t('step2_title'), description: t('step2_desc') },
    { icon: Car, title: t('step3_title'), description: t('step3_desc') },
  ];

  return (
    <section id="how-it-works" className="section-padding bg-white dark:bg-[#0D0D0D]">
      <div className="container-custom">
        <ScrollReveal className="text-center mb-16">
          <div className="section-label justify-center mb-4">{t('label')}</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1A2B1A] dark:text-white mb-4">
            {t('heading1')} <span className="gradient-text">{t('headingGreen')}</span> {t('heading2')}
          </h2>
          <p className="text-[#546A54] dark:text-[#8A8A8A] text-lg max-w-xl mx-auto">
            {t('description')}
          </p>
        </ScrollReveal>

        <div className="relative">
          {/* Horizontal connector — desktop only */}
          <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+52px)] right-[calc(16.67%+52px)] h-px bg-gradient-to-r from-[#006400]/30 via-[#006400]/60 to-[#006400]/30" />

          <StaggerContainer className="grid md:grid-cols-3 gap-10 md:gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={step.title}>
                  <div className="relative flex flex-col items-center text-center group">
                    <div className="relative mb-8">
                      <div className="w-[104px] h-[104px] rounded-full border-4 border-[#E8F5E8] dark:border-[#1A2B1A] bg-white dark:bg-[#0D0D0D] flex items-center justify-center shadow-[0_0_0_4px_rgba(0,100,0,0.08)] group-hover:shadow-[0_0_0_6px_rgba(0,100,0,0.12)] transition-all">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#006400] to-[#008000] flex items-center justify-center shadow-lg shadow-green-900/20 group-hover:shadow-green-900/35 transition-shadow">
                          <Icon size={32} className="text-white" />
                        </div>
                      </div>
                      <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-white dark:bg-[#141414] border-2 border-[#006400] flex items-center justify-center shadow-md">
                        <span className="text-xs font-bold text-[#006400]">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-display text-xl font-bold text-[#1A2B1A] dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[#546A54] dark:text-[#8A8A8A] text-sm leading-relaxed max-w-xs">
                      {step.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        <ScrollReveal className="text-center mt-14" delay={0.2}>
          <a href="#fleet" className="btn-gold">
            {t('cta')}
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
