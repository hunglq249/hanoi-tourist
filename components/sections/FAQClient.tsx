'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FAQItem } from '@/lib/types';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.08 },
  }),
};

export default function FAQClient({ faqs }: { faqs: FAQItem[] }) {
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <motion.div
      className="space-y-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      {faqs.map((faq, i) => (
        <motion.div
          key={faq.id}
          custom={i}
          variants={itemVariants}
          className={`border rounded-xl overflow-hidden transition-colors ${
            open === faq.id
              ? 'border-[#006400]/40'
              : 'border-[#2A2A2A] dark:border-[#2A2A2A] border-[#DDE8DD]'
          }`}
        >
          <button
            className="w-full flex items-center justify-between p-5 text-left bg-[#141414] dark:bg-[#141414] hover:bg-[#1A1A1A] dark:hover:bg-[#1A1A1A] transition-colors"
            onClick={() => setOpen(open === faq.id ? null : faq.id)}
          >
            <span
              className={`font-medium text-sm pr-4 ${
                open === faq.id ? 'text-[#006400]' : 'text-white'
              }`}
            >
              {faq.q}
            </span>
            <motion.div
              animate={{ rotate: open === faq.id ? 180 : 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="flex-shrink-0"
            >
              <ChevronDown
                size={18}
                className={open === faq.id ? 'text-[#006400]' : 'text-[#8A8A8A]'}
              />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {open === faq.id && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ overflow: 'hidden' }}
              >
                <div className="px-5 pb-5 bg-[#141414] dark:bg-[#141414]">
                  <div className="h-px bg-[#2A2A2A] mb-4" />
                  <p className="text-[#AAAAAA] text-sm leading-relaxed">{faq.a}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
}
