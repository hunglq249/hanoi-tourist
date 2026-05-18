'use client';

import { Send } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function NewsletterForm() {
  const t = useTranslations('footer');

  return (
    <form className="flex gap-3 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder={t('newsletter_placeholder')}
        className="flex-1 md:w-72 border border-[#DDE8DD] dark:border-[#2A2A2A] rounded-lg px-4 py-2.5 text-sm bg-[#F8FAF8] dark:bg-[#1A1A1A] dark:text-white text-[#1A2B1A] placeholder-[#8A9A8A] dark:placeholder-[#666] focus:outline-none focus:border-[#006400] transition-colors"
      />
      <button
        type="submit"
        className="btn-gold text-sm py-2.5 px-5 whitespace-nowrap flex items-center gap-2"
      >
        <Send size={14} />
        {t('newsletter_btn')}
      </button>
    </form>
  );
}
