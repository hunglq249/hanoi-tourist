import { createNavigation } from 'next-intl/navigation';

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales: ['vi', 'en'] as const,
  defaultLocale: 'vi',
  localePrefix: 'as-needed',
});
