'use client';

import { Phone, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* Zalo button */}
      <a
        href={`https://zalo.me/${COMPANY_INFO.zaloNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        style={{ background: 'linear-gradient(135deg, #0068FF, #004FBF)' }}
        aria-label="Chat Zalo"
      >
        <span className="text-white font-bold text-sm">Za</span>
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#141414] text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-[#2A2A2A]">
          Chat qua Zalo
        </span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0A0A0A] animate-pulse" />
      </a>

      {/* Phone button */}
      <a
        href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
        className="group relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        style={{ background: 'linear-gradient(135deg, #006400, #008000)' }}
        aria-label="Gọi điện"
      >
        <Phone size={22} className="text-white" />
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#141414] text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-[#2A2A2A]">
          {COMPANY_INFO.phone}
        </span>
      </a>
    </div>
  );
}
