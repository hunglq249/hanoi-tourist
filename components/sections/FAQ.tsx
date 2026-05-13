import { getFaqs } from '@/lib/content';
import { COMPANY_INFO } from '@/lib/data';
import FAQClient from './FAQClient';

export default async function FAQ() {
  const faqs = await getFaqs();

  return (
    <section id="faq" className="section-padding bg-[#0A0A0A]">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="lg:sticky lg:top-28">
            <div className="section-label mb-4">Câu hỏi thường gặp</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Giải Đáp
              <br />
              <span className="gradient-text">Thắc Mắc</span>
            </h2>
            <p className="text-[#8A8A8A] text-lg leading-relaxed mb-8">
              Không tìm thấy câu trả lời? Liên hệ trực tiếp với chúng tôi qua hotline hoặc Zalo.
            </p>
            <a
              href={`https://zalo.me/${COMPANY_INFO.zaloNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2"
            >
              Chat qua Zalo
            </a>
          </div>

          <FAQClient faqs={faqs} />
        </div>
      </div>
    </section>
  );
}
