'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const STAT_VALUES = [
  { value: 200, suffix: '+', labelKey: 'cars_label', subKey: 'cars_sub' },
  { value: 15000, suffix: '+', labelKey: 'clients_label', subKey: 'clients_sub' },
  { value: 8, suffix: '+', labelKey: 'years_label', subKey: 'years_sub' },
  { value: 63, suffix: '', labelKey: 'provinces_label', subKey: 'provinces_sub' },
] as const;

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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Stats() {
  const t = useTranslations('stats');

  return (
    <section className="stats-section py-16 border-y border-[#DDE8DD] dark:border-[#2A2A2A] bg-[#F0F6F0] dark:bg-[#141414]">
      <div className="container-custom">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {STAT_VALUES.map((stat) => (
            <motion.div key={stat.labelKey} variants={itemVariants} className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-semibold text-sm md:text-base text-[#1A2B1A] dark:text-white">
                {t(stat.labelKey)}
              </div>
              <div className="text-xs mt-1 text-[#546A54] dark:text-[#8A8A8A]">{t(stat.subKey)}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
