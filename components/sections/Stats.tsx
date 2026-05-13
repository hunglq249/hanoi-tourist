'use client';

import { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: 200, suffix: '+', label: 'Xe cho thuê', sublabel: 'Đa dạng dòng xe' },
  { value: 15000, suffix: '+', label: 'Khách hàng tin dùng', sublabel: 'Từ năm 2015' },
  { value: 8, suffix: '+', label: 'Năm kinh nghiệm', sublabel: 'Uy tín #1 Hà Nội' },
  { value: 63, suffix: '', label: 'Tỉnh thành', sublabel: 'Hỗ trợ toàn quốc' },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString('vi-VN')}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-16 border-y border-[#2A2A2A]" style={{ background: 'linear-gradient(90deg, #0A0A0A, #141414, #0A0A0A)' }}>
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center group"
              style={{
                animation: `fadeUp 0.6s ease-out ${i * 0.1}s both`,
              }}
            >
              <div className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white font-semibold text-sm md:text-base">{stat.label}</div>
              <div className="text-[#8A8A8A] text-xs mt-1">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
