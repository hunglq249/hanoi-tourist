import { Check } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { getPricing } from '@/lib/content';
import type { PricingPlan } from '@/lib/types';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaggerContainer from '@/components/ui/StaggerContainer';
import StaggerItem from '@/components/ui/StaggerItem';

function PlanCard({ plan, highlightBadge }: { plan: PricingPlan; highlightBadge: string }) {
  return (
    <div
      className={`relative rounded-2xl p-8 border transition-all ${
        plan.highlight
          ? 'bg-gradient-to-b from-[#071A10] to-[#141414] border-[#006400]/50 shadow-[0_0_40px_rgba(0,100,0,0.12)]'
          : 'bg-[#141414] border-[#2A2A2A] hover:border-[#3A3A3A]'
      }`}
    >
      {plan.highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#006400] to-[#008000] text-white text-xs font-bold px-5 py-1.5 rounded-full whitespace-nowrap">
          {highlightBadge}
        </div>
      )}

      <div className="mb-6">
        <div className="text-[#8A8A8A] text-sm font-medium uppercase tracking-wider mb-1">
          {plan.name}
        </div>
        <div className="flex items-end gap-2 mb-2">
          <span className="font-display text-3xl font-bold text-white">{plan.price}</span>
          <span className="text-[#8A8A8A] text-sm pb-1">{plan.unit}</span>
        </div>
        <p className="text-[#8A8A8A] text-sm">{plan.description}</p>
      </div>

      <div className="h-px bg-[#2A2A2A] mb-6" />

      <ul className="space-y-3 mb-8">
        {(plan.features.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [])
          .map((m) => m.replace(/<[^>]+>/g, '').trim())
          .filter(Boolean)
          .map((f) => (
            <li key={f} className="flex items-center gap-3 text-sm text-[#CCCCCC]">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  plan.highlight ? 'bg-[#006400]/20' : 'bg-[#2A2A2A]'
                }`}
              >
                <Check size={11} className={plan.highlight ? 'text-[#006400]' : 'text-[#8A8A8A]'} />
              </div>
              {f}
            </li>
          ))}
      </ul>

      <a
        href="#booking"
        className={`block text-center py-3.5 px-6 rounded-xl font-semibold text-sm transition-all ${
          plan.highlight
            ? 'btn-gold'
            : 'border border-[#3A3A3A] text-[#CCCCCC] hover:border-[#006400] hover:text-[#006400]'
        }`}
      >
        {plan.cta}
      </a>
    </div>
  );
}

export default async function Pricing() {
  const t = await getTranslations('pricing');
  const plans = await getPricing();

  return (
    <section id="pricing" className="section-padding bg-[#0D0D0D]">
      <div className="container-custom">
        <ScrollReveal className="text-center mb-14">
          <div className="section-label justify-center mb-4">{t('label')}</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {t('heading1')} <span className="gradient-text">{t('headingGreen')}</span>
            <br />
            {t('heading2')}
          </h2>
          <p className="text-[#8A8A8A] text-lg max-w-xl mx-auto">
            {t('description')}
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <StaggerItem key={plan.id}>
              <PlanCard plan={plan} highlightBadge={t('highlight_badge')} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.15}>
          <p className="text-center text-[#666] text-sm mt-8">
            {t('disclaimer')}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
