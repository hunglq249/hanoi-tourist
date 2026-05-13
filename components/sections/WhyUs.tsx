import { Shield, Award, Headphones, MapPin, CreditCard, RefreshCw, type LucideIcon } from 'lucide-react';
import { getWhyUs } from '@/lib/content';

const ICON_MAP: Record<string, LucideIcon> = { Shield, Award, Headphones, MapPin, CreditCard, RefreshCw };

export default async function WhyUs() {
  const { reasons, partners } = await getWhyUs();

  return (
    <section className="section-padding" style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #0F0F0A 100%)' }}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label mb-4">Tại sao chọn chúng tôi</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              8 Năm Xây Dựng
              <br />
              <span className="gradient-text">Niềm Tin</span>
            </h2>
            <p className="text-[#8A8A8A] text-lg leading-relaxed mb-8">
              Từ năm 2015, Hanoi Tourism đã phục vụ hơn 15,000 khách hàng với cam kết chất lượng dịch vụ hàng đầu.
              Chúng tôi không chỉ cho thuê xe — chúng tôi cung cấp trải nghiệm di chuyển hoàn hảo.
            </p>

            <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6">
              <div className="text-[#8A8A8A] text-xs uppercase tracking-wider mb-4">Đối tác tin dùng</div>
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map(({ id, icon, title, description }) => {
              const Icon = ICON_MAP[icon] ?? Shield;
              return (
                <div
                  key={id}
                  className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5 hover:border-[#006400]/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#006400]/10 border border-[#006400]/20 flex items-center justify-center mb-4 group-hover:bg-[#006400]/20 transition-colors">
                    <Icon size={18} className="text-[#006400]" />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2">{title}</h3>
                  <p className="text-[#8A8A8A] text-xs leading-relaxed">{description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
