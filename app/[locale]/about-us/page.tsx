import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, Building2, Target, Heart } from 'lucide-react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import FloatingContact from '@/components/ui/FloatingContact';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { getAboutUs } from '@/lib/content';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'aboutUs' });
  return { title: t('pageTitle'), description: t('pageDescription') };
}

export default async function AboutUsPage() {
  const t = await getTranslations('aboutUs');
  const about = await getAboutUs();

  return (
    <main>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="dark-section bg-[#0A0A0A] pt-32 pb-24">
        <div className="container-custom text-center">
          <div className="section-label justify-center mb-4">{t('label')}</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            {t('pageHeading')}
          </h1>
          <p className="text-[#8A8A8A] text-lg max-w-2xl mx-auto leading-relaxed">
            {t('pageSubtitle')}
          </p>
        </div>
      </section>

      {/* ── Who we are ───────────────────────────────────────────────── */}
      <section className="section-padding bg-[#F8FAF8] dark:bg-[#0A0A0A]">
        <div className="container-custom">
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-14 items-start">
              <div>
                <div className="section-label mb-4">{t('section_who')}</div>
                <h2 className="font-display text-4xl font-bold text-[#1A2B1A] dark:text-white mb-8">
                  {t('section_who')}
                </h2>
                <div className="about-prose" dangerouslySetInnerHTML={{ __html: about.whoWeAre }} />
              </div>
              <div className="grid grid-cols-2 gap-4 lg:pt-16">
                {[
                  { value: '10+', label: 'Năm kinh nghiệm' },
                  { value: '200+', label: 'Xe cho thuê' },
                  { value: '15K+', label: 'Khách hàng' },
                  { value: '63', label: 'Tỉnh thành' },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 text-center hover:border-[#006400]/30 transition-colors"
                  >
                    <div className="font-display text-3xl font-bold gradient-text mb-2">{value}</div>
                    <div className="text-[#8A8A8A] text-sm">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── History ──────────────────────────────────────────────────── */}
      <section className="section-padding section-alt bg-[#F0F6F0] dark:bg-[#141414]">
        <div className="container-custom">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#006400]/10 border border-[#006400]/20 flex items-center justify-center">
                  <Building2 size={18} className="text-[#006400]" />
                </div>
                <div className="section-label">{t('section_history')}</div>
              </div>
              <h2 className="font-display text-4xl font-bold text-[#1A2B1A] dark:text-white mb-8">
                {t('section_history')}
              </h2>
              <div className="about-prose" dangerouslySetInnerHTML={{ __html: about.history }} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Vision & Mission ─────────────────────────────────────────── */}
      <section className="section-padding bg-[#F8FAF8] dark:bg-[#0A0A0A]">
        <div className="container-custom">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#006400]/10 border border-[#006400]/20 flex items-center justify-center">
                  <Target size={18} className="text-[#006400]" />
                </div>
                <div className="section-label">{t('section_vision')}</div>
              </div>
              <h2 className="font-display text-4xl font-bold text-[#1A2B1A] dark:text-white mb-8">
                {t('section_vision')}
              </h2>
              <div className="about-prose" dangerouslySetInnerHTML={{ __html: about.vision }} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Core Values ──────────────────────────────────────────────── */}
      <section className="section-padding section-alt bg-[#F0F6F0] dark:bg-[#141414]">
        <div className="container-custom">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#006400]/10 border border-[#006400]/20 flex items-center justify-center">
                  <Heart size={18} className="text-[#006400]" />
                </div>
                <div className="section-label">{t('section_values')}</div>
              </div>
              <h2 className="font-display text-4xl font-bold text-[#1A2B1A] dark:text-white mb-8">
                {t('section_values')}
              </h2>
              <div className="about-prose" dangerouslySetInnerHTML={{ __html: about.coreValues }} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
      <FloatingContact />
    </main>
  );
}
