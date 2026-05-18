import { Star, Quote } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { getTestimonials } from '@/lib/content';
import type { Testimonial } from '@/lib/types';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StaggerContainer from '@/components/ui/StaggerContainer';
import StaggerItem from '@/components/ui/StaggerItem';

function ReviewCard({ review }: { review: Testimonial }) {
  return (
    <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-7 hover:border-[#006400]/20 transition-all group h-full">
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#006400] to-[#008000] flex items-center justify-center text-white font-bold text-lg font-display">
            {review.avatar}
          </div>
          <div>
            <div className="text-white font-semibold">{review.name}</div>
            <div className="text-[#8A8A8A] text-xs">{review.role}</div>
          </div>
        </div>
        <Quote size={24} className="text-[#006400]/30 group-hover:text-[#006400]/60 transition-colors" />
      </div>

      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} size={14} className="text-[#006400] fill-[#006400]" />
        ))}
      </div>

      <p className="text-[#CCCCCC] text-sm leading-relaxed mb-4">{review.text}</p>
      <div className="text-[#666] text-xs">{review.date}</div>
    </div>
  );
}

export default async function Testimonials() {
  const t = await getTranslations('testimonials');
  const reviews = await getTestimonials();

  return (
    <section className="section-padding bg-[#0D0D0D]">
      <div className="container-custom">
        <ScrollReveal className="text-center mb-14">
          <div className="section-label justify-center mb-4">{t('label')}</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {t('heading1')}
            <br />
            <span className="gradient-text">{t('headingGreen')}</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={24} className="text-[#006400] fill-[#006400]" />
              ))}
            </div>
            <span className="text-white font-display text-2xl font-bold">4.9</span>
            <span className="text-[#8A8A8A]">{t('google_reviews')}</span>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <StaggerItem key={review.id}>
              <ReviewCard review={review} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
