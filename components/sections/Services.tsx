import { Car, Building2, MapPin, Clock, Shield, Headphones, type LucideIcon } from 'lucide-react';
import { getServices } from '@/lib/content';
import type { Service } from '@/lib/types';

const ICON_MAP: Record<string, LucideIcon> = { Car, Building2, MapPin };

const PERKS = [
  { icon: 'Clock', title: 'Nhận xe trong 30 phút', desc: 'Thủ tục nhanh gọn, đơn giản' },
  { icon: 'Shield', title: 'Bảo hiểm toàn diện', desc: 'An tâm suốt hành trình' },
  { icon: 'Headphones', title: 'Hỗ trợ 24/7', desc: 'Luôn có mặt khi bạn cần' },
];

const PERK_ICON_MAP: Record<string, LucideIcon> = { Clock, Shield, Headphones };

function ServiceCard({ service }: { service: Service }) {
  const Icon = ICON_MAP[service.icon] ?? Car;
  return (
    <div
      className={`relative card-dark p-8 ${
        service.highlight ? 'border-[#006400]/40 bg-gradient-to-b from-[#071A10] to-[#1A1A1A]' : ''
      }`}
    >
      {service.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#006400] to-[#008000] text-white text-xs font-bold px-4 py-1 rounded-full">
          PHỔ BIẾN NHẤT
        </div>
      )}
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
          service.highlight ? 'bg-gradient-to-br from-[#006400] to-[#008000]' : 'bg-[#2A2A2A]'
        }`}
      >
        <Icon size={26} className={service.highlight ? 'text-white' : 'text-[#006400]'} />
      </div>
      <h3 className="font-display text-xl font-bold text-white mb-3">{service.title}</h3>
      <div
        className="text-[#8A8A8A] text-sm leading-relaxed mb-6 service-prose"
        dangerouslySetInnerHTML={{ __html: service.description }}
      />
      <div
        className="service-features-html"
        dangerouslySetInnerHTML={{ __html: service.features }}
      />
      <a
        href="#booking"
        className={`mt-8 block text-center py-3 px-6 rounded-lg text-sm font-semibold transition-all ${
          service.highlight
            ? 'btn-gold'
            : 'border border-[#3A3A3A] text-[#CCCCCC] hover:border-[#006400] hover:text-[#006400]'
        }`}
      >
        Đặt ngay
      </a>
    </div>
  );
}

export default async function Services() {
  const services = await getServices();

  return (
    <section id="services" className="section-padding bg-[#0D0D0D]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="section-label justify-center mb-4">Dịch vụ của chúng tôi</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Giải Pháp <span className="gradient-text">Di Chuyển</span>
            <br />
            Toàn Diện
          </h2>
          <p className="text-[#8A8A8A] text-lg max-w-2xl mx-auto">
            Từ thuê xe ngắn ngày đến dài hạn cho doanh nghiệp — chúng tôi có tất cả những gì bạn cần.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PERKS.map(({ icon, title, desc }) => {
            const PerkIcon = PERK_ICON_MAP[icon];
            return (
              <div key={title} className="flex items-center gap-4 bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
                <div className="w-12 h-12 rounded-lg bg-[#006400]/10 border border-[#006400]/20 flex items-center justify-center flex-shrink-0">
                  <PerkIcon size={20} className="text-[#006400]" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{title}</div>
                  <div className="text-[#8A8A8A] text-xs mt-0.5">{desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
