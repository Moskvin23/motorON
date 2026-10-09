import type { Metadata, Viewport } from 'next';
import { Manrope, Michroma } from 'next/font/google';
import { PrefsProvider, themeScript } from '@/components/Prefs';
import { GEO, INSTAGRAM, PHONE } from '@/lib/i18n';
import './globals.css';

const font = Manrope({ subsets: ['latin', 'cyrillic'], display: 'swap' });
const wordmark = Michroma({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--font-wordmark' });

export const metadata: Metadata = {
  title: 'MotorON СТО Брюховичі — ремонт двигунів, ГРМ, ходової, ТО',
  description: 'СТО MotorON у Брюховичах: діагностика і ремонт двигунів, ГРМ, ходової, ТО та автоелектрики. Понад 7 років досвіду. Онлайн-запис.',
  openGraph: { title: 'MotorON СТО — Брюховичі', description: 'Двигуни, ГРМ, ходова, ТО, автоелектрика. Онлайн-запис.', locale: 'uk_UA', type: 'website' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#0b0f0d' }, { media: '(prefers-color-scheme: light)', color: '#f6f8f7' }] };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  name: 'MotorON СТО',
  telephone: PHONE,
  address: { '@type': 'PostalAddress', streetAddress: 'вул. Львівська', addressLocality: 'Брюховичі', addressRegion: 'Львівська обл.', postalCode: '79491', addressCountry: 'UA' },
  geo: { '@type': 'GeoCoordinates', latitude: GEO.lat, longitude: GEO.lng },
  sameAs: [INSTAGRAM],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', reviewCount: '10' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${font.className} ${wordmark.variable}`}><PrefsProvider>{children}</PrefsProvider></body>
    </html>
  );
}
