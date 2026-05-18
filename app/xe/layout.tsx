import { Playfair_Display, DM_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from '@/lib/theme-provider';
import viMessages from '@/messages/vi.json';
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

export default function XeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
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
      </head>
      <body className="font-body antialiased">
        <NextIntlClientProvider locale="vi" messages={viMessages}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
