import Image from 'next/image';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1A1A1A]">
      {/* CTA Banner */}
      <div
        className="py-16 dark-section"
        style={{ background: 'linear-gradient(135deg, #071A10 0%, #040F08 100%)' }}
      >
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Sẵn sàng lên đường?
          </h2>
          <p className="text-[#8A8A8A] mb-8 max-w-xl mx-auto">
            Đặt xe ngay hôm nay — nhận xe trong 30 phút, không cần thanh toán trước.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#booking" className="btn-gold">Đặt xe ngay</a>
            <a href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`} className="btn-outline-gold">
              Gọi {COMPANY_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="py-16 border-t border-[#1A1A1A]">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0 p-0.5">
                  <Image src="/logo.svg" alt="Ha noi Tourism logo" width={36} height={36} />
                </div>
                <div>
                  <div className="font-display font-bold text-white text-lg leading-tight">
                    Ha noi <span className="text-[#008000]">Tourism</span>
                  </div>
                  <div className="text-[9px] text-[#8A8A8A] tracking-widest uppercase">Car Rental Service</div>
                </div>
              </div>
              <p className="text-[#8A8A8A] text-sm leading-relaxed mb-4">
                Dịch vụ cho thuê xe tự lái uy tín số 1 Hà Nội từ năm 2015.
              </p>
              <div className="flex gap-3">
                {['ZA', 'FB', 'YT'].map((social) => (
                  <div key={social} className="w-9 h-9 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#8A8A8A] text-xs font-bold hover:border-[#006400]/40 hover:text-[#006400] cursor-pointer transition-all">
                    {social}
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <div className="text-white font-semibold text-sm mb-4">Dịch vụ</div>
              <ul className="space-y-2.5">
                {['Thuê xe tự lái', 'Thuê xe dài hạn', 'Thuê xe văn phòng', 'Xe đưa đón sân bay', 'Xe theo tháng', 'Xe kèm tài xế'].map((item) => (
                  <li key={item}>
                    <a href="#services" className="text-[#8A8A8A] text-sm hover:text-[#006400] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Car types */}
            <div>
              <div className="text-white font-semibold text-sm mb-4">Dòng xe</div>
              <ul className="space-y-2.5">
                {['Sedan 4 chỗ', 'SUV 5 chỗ', 'MPV 7 chỗ', 'Xe sang luxury', 'Xe bán tải', 'Xe điện'].map((item) => (
                  <li key={item}>
                    <a href="#fleet" className="text-[#8A8A8A] text-sm hover:text-[#006400] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <div className="text-white font-semibold text-sm mb-4">Liên hệ</div>
              <ul className="space-y-3">
                {[
                  { icon: Phone, text: COMPANY_INFO.phone, href: `tel:${COMPANY_INFO.phone.replace(/\s/g, '')}` },
                  { icon: Mail, text: COMPANY_INFO.email, href: `mailto:${COMPANY_INFO.email}` },
                  { icon: MapPin, text: COMPANY_INFO.address, href: '#' },
                  { icon: Clock, text: COMPANY_INFO.workingHours, href: '#' },
                ].map(({ icon: Icon, text, href }) => (
                  <li key={text}>
                    <a href={href} className="flex items-start gap-2.5 text-[#8A8A8A] text-sm hover:text-[#006400] transition-colors group">
                      <Icon size={14} className="mt-0.5 flex-shrink-0 text-[#006400]" />
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1A1A1A] py-6">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[#666] text-xs">
            © 2024 Hanoi Tourism. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex gap-6">
            {['Chính sách bảo mật', 'Điều khoản dịch vụ', 'Chính sách đặt xe'].map((item) => (
              <a key={item} href="#" className="text-[#666] text-xs hover:text-[#006400] transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
