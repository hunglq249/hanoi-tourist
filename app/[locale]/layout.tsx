import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { ThemeProvider } from '@/lib/theme-provider';
import '../globals.css';

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL('https://hanoitourism.vn'),
    title: {
      default: t('title'),
      template: '%s | Hanoi Tourism',
    },
    description: t('description'),
    keywords: locale === 'vi'
      ? ['cho thuê xe tự lái Hà Nội', 'thuê xe dài hạn Hà Nội', 'cho thuê xe văn phòng', 'thuê xe ô tô Hà Nội', 'Hanoi Tourism', 'cho thuê xe tháng Hà Nội']
      : ['car rental Hanoi', 'self-drive car rental Hanoi', 'long-term car rental Hanoi', 'Hanoi Tourism', 'rent a car Hanoi'],
    authors: [{ name: 'Hanoi Tourism' }],
    creator: 'Hanoi Tourism',
    openGraph: {
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      url: 'https://hanoitourism.vn',
      siteName: 'Hanoi Tourism',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Hanoi Tourism' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
      images: ['/og-image.jpg'],
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://hanoitourism.vn',
      languages: { vi: 'https://hanoitourism.vn', en: 'https://hanoitourism.vn/en' },
    },
  };
}

export function generateStaticParams() {
  return [{ locale: 'vi' }, { locale: 'en' }];
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('ht-theme')||'light';document.documentElement.classList.toggle('dark',t==='dark');})();`,
          }}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="geo.region" content="VN-HN" />
        <meta name="geo.placename" content="Hanoi" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Hanoi Tourism',
              description: 'Dịch vụ cho thuê xe tự lái và cho thuê xe dài hạn tại Hà Nội',
              url: 'https://hanoitourism.vn',
              telephone: '+84912345678',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '123 Phố Huế',
                addressLocality: 'Hai Bà Trưng',
                addressRegion: 'Hà Nội',
                postalCode: '100000',
                addressCountry: 'VN',
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                opens: '07:00',
                closes: '22:00',
              },
              priceRange: '$$',
            }),
          }}
        />
      </head>
      <body className="font-body antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
