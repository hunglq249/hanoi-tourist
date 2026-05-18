import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/navigation';
import { getAboutUs } from '@/lib/content';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default async function AboutUsSnippet() {
  const t = await getTranslations('aboutUs');
  const { whoWeAre } = await getAboutUs();

  return (
    <section className="section-padding bg-[#F8FAF8] dark:bg-[#141414]">
      <div className="container-custom">
        <ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left: text */}
            <div>
              <div className="section-label mb-4">{t('label')}</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1A2B1A] dark:text-white mb-6">
                {t('snippet_heading')}
              </h2>
              <div className="about-prose mb-8" dangerouslySetInnerHTML={{ __html: whoWeAre }} />
              <Link
                href="/about-us"
                className="btn-gold inline-flex items-center gap-2"
              >
                {t('snippet_cta')}
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right: stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '10+', label: 'Năm kinh nghiệm', sub: 'Thành lập 2015' },
                { value: '200+', label: 'Xe cho thuê', sub: 'Đa dạng dòng xe' },
                { value: '15K+', label: 'Khách hàng', sub: 'Tin dùng dịch vụ' },
                { value: '24/7', label: 'Hỗ trợ', sub: 'Luôn sẵn sàng' },
              ].map(({ value, label, sub }) => (
                <div
                  key={label}
                  className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 text-center hover:border-[#006400]/30 transition-colors group"
                >
                  <div className="font-display text-3xl font-bold gradient-text mb-1 group-hover:scale-105 transition-transform">
                    {value}
                  </div>
                  <div className="text-white font-semibold text-sm mb-1">{label}</div>
                  <div className="text-[#8A8A8A] text-xs">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
