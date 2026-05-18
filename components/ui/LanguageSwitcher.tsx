'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/lib/navigation';

export default function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname(); // locale-stripped path from next-intl

  const otherLocale = locale === 'vi' ? 'en' : 'vi';

  const handleSwitch = () => {
    router.replace(pathname, { locale: otherLocale });
  };

  return (
    <button
      onClick={handleSwitch}
      className={className}
      aria-label={`Switch to ${otherLocale === 'en' ? 'English' : 'Tiếng Việt'}`}
    >
      {otherLocale.toUpperCase()}
    </button>
  );
}
