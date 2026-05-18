import { getTranslations } from 'next-intl/server';
import { getFaqs } from '@/lib/content';
import { COMPANY_INFO } from '@/lib/data';
import FAQClient from './FAQClient';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default async function FAQ() {
  const t = await getTranslations('faq');
  const faqs = await getFaqs();

  return (
    <section id="faq" className="section-padding bg-[#0A0A0A]">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16">
          <ScrollReveal direction="right" className="lg:sticky lg:top-28">
            <div className="section-label mb-4">{t('label')}</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              {t('heading1')}
              <br />
              <span className="gradient-text">{t('headingGreen')}</span>
            </h2>
            <p className="text-[#8A8A8A] text-lg leading-relaxed mb-8">
              {t('description')}
            </p>
            <a
              href={`https://zalo.me/${COMPANY_INFO.zaloNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2"
            >
              {t('chat_zalo')}
            </a>
          </ScrollReveal>

          <FAQClient faqs={faqs} />
        </div>
      </div>
    </section>
  );
}
