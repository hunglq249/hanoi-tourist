import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import { ThemeProvider } from '@/lib/theme-provider';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
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

export const metadata: Metadata = {
  metadataBase: new URL('https://hanoitourism.vn'),
  title: {
    default: 'Hanoi Tourism | Cho Thuê Xe Tự Lái & Thuê Xe Dài Hạn Hà Nội',
    template: '%s | Hanoi Tourism',
  },
  description:
    'Dịch vụ cho thuê xe tự lái uy tín số 1 Hà Nội. Đa dạng dòng xe từ sedan, SUV đến MPV và xe sang. Thuê xe dài hạn cho văn phòng, doanh nghiệp. Giá tốt, bảo hiểm đầy đủ, hỗ trợ 24/7.',
  keywords: [
    'cho thuê xe tự lái Hà Nội',
    'thuê xe dài hạn Hà Nội',
    'cho thuê xe văn phòng',
    'thuê xe ô tô Hà Nội',
    'Hanoi Tourism',
    'cho thuê xe tháng Hà Nội',
    'thuê xe 7 chỗ Hà Nội',
    'cho thuê xe sang Hà Nội',
  ],
  authors: [{ name: 'Hanoi Tourism' }],
  creator: 'Hanoi Tourism',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://hanoitourism.vn',
    siteName: 'Hanoi Tourism',
    title: 'Hanoi Tourism | Cho Thuê Xe Tự Lái & Xe Dài Hạn Hà Nội',
    description:
      'Dịch vụ cho thuê xe tự lái uy tín số 1 Hà Nội. Đa dạng dòng xe, giá tốt, bảo hiểm đầy đủ.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Hanoi Tourism' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hanoi Tourism | Cho Thuê Xe Tự Lái Hà Nội',
    description: 'Dịch vụ cho thuê xe tự lái uy tín số 1 Hà Nội.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://hanoitourism.vn' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${playfair.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Set theme class before paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('ht-theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark');})();`,
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
                dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                opens: '07:00',
                closes: '22:00',
              },
              priceRange: '$$',
            }),
          }}
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
