'use client';

import { useEffect, useRef } from 'react';
import { ChevronDown, Star, Shield, Clock } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = heroRef.current?.querySelectorAll('.hero-animate');
    elements?.forEach((el, i) => {
      setTimeout(() => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'translateY(0)';
      }, i * 150);
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden noise-overlay"
      style={{
        background: 'linear-gradient(135deg, #0A0A0A 0%, #141414 40%, #071A10 100%)',
      }}
    >
      {/* Background decorative elements */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 70% 50%, rgba(212,160,23,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-20 right-10 w-96 h-96 rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #006400 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-20 left-10 w-64 h-64 rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #006400 0%, transparent 70%)' }}
      />

      {/* Grid lines decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(212,160,23,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container-custom relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh] py-20">
          {/* Left content */}
          <div>
            <div
              className="hero-animate section-label mb-6"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
            >
              Uy tín · Chuyên nghiệp · Đáng tin cậy
            </div>

            <h1
              className="hero-animate font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
            >
              Cho Thuê Xe{' '}
              <span className="gradient-text">Tự Lái</span>
              <br />
              Tại Hà Nội
            </h1>

            <p
              className="hero-animate text-[#AAAAAA] text-lg leading-relaxed mb-8 max-w-lg"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
            >
              Trải nghiệm tự do di chuyển với đội xe đa dạng từ sedan, SUV đến xe sang.
              Dịch vụ thuê xe dài hạn cho văn phòng &amp; doanh nghiệp với giá ưu đãi tốt nhất.
            </p>

            {/* Trust badges */}
            <div
              className="hero-animate flex flex-wrap gap-4 mb-10"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
            >
              {[
                { icon: Star, text: '4.9/5 đánh giá' },
                { icon: Shield, text: 'Bảo hiểm đầy đủ' },
                { icon: Clock, text: 'Giao xe tận nơi' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-full px-4 py-2">
                  <Icon size={14} className="text-[#006400]" />
                  <span className="text-sm text-[#CCCCCC]">{text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div
              className="hero-animate flex flex-col sm:flex-row gap-4"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
            >
              <a href="#booking" className="btn-gold text-center text-base">
                Đặt xe ngay hôm nay
              </a>
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
                className="btn-outline-gold text-center text-base"
              >
                Gọi: {COMPANY_INFO.phone}
              </a>
            </div>
          </div>

          {/* Right - Car visual */}
          <div
            className="hero-animate relative hidden lg:block"
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
          >
            <div className="relative">
              {/* Glow behind car */}
              <div
                className="absolute inset-0 rounded-3xl blur-3xl opacity-20"
                style={{ background: 'linear-gradient(135deg, #006400, #008000)' }}
              />
              {/* Car image */}
              <div className="relative rounded-3xl overflow-hidden border border-[#2A2A2A]">
                <img
                  src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=85"
                  alt="Xe cho thuê cao cấp Hanoi Tourism"
                  className="w-full h-[460px] object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 50%)',
                  }}
                />
                {/* Floating stats card */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#0A0A0A]/90 backdrop-blur-sm border border-[#2A2A2A] rounded-2xl p-5">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      { value: '200+', label: 'Xe sẵn có' },
                      { value: '15K+', label: 'Khách hàng' },
                      { value: '8+', label: 'Năm kinh nghiệm' },
                    ].map(({ value, label }) => (
                      <div key={label}>
                        <div className="font-display text-2xl font-bold text-[#006400]">{value}</div>
                        <div className="text-[11px] text-[#8A8A8A] mt-0.5">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8A8A8A] hover:text-[#006400] transition-colors animate-bounce"
      >
        <span className="text-xs tracking-widest uppercase">Khám phá</span>
        <ChevronDown size={18} />
      </a>
    </section>
  );
}
