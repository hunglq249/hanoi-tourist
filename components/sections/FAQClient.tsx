'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FAQItem } from '@/lib/types';

export default function FAQClient({ faqs }: { faqs: FAQItem[] }) {
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className={`border rounded-xl overflow-hidden transition-all ${
            open === faq.id ? 'border-[#006400]/40' : 'border-[#2A2A2A]'
          }`}
        >
          <button
            className="w-full flex items-center justify-between p-5 text-left bg-[#141414] hover:bg-[#1A1A1A] transition-colors"
            onClick={() => setOpen(open === faq.id ? null : faq.id)}
          >
            <span className={`font-medium text-sm pr-4 ${open === faq.id ? 'text-[#006400]' : 'text-white'}`}>
              {faq.q}
            </span>
            <ChevronDown
              size={18}
              className={`flex-shrink-0 transition-transform text-[#8A8A8A] ${open === faq.id ? 'rotate-180 text-[#006400]' : ''}`}
            />
          </button>
          {open === faq.id && (
            <div className="px-5 pb-5 bg-[#141414]">
              <div className="h-px bg-[#2A2A2A] mb-4" />
              <p className="text-[#AAAAAA] text-sm leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
