import type { Metadata } from 'next';
import { Nunito, DM_Sans } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
  weight: ['400', '600', '700', '800', '900'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-nunito',
  display: 'swap',
});

const dmSans = DM_Sans({
  weight: ['300', '400', '500'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Yerby — Již brzy.',
  description:
    'Rituál pro aktivní a uvědomělé. Čistý fokus, přírodní energie. Již brzy.',
  openGraph: {
    title: 'Yerby — Již brzy.',
    description: 'Rituál pro aktivní a uvědomělé. Čistý fokus, přírodní energie.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Yerby — Již brzy.',
    description: 'Rituál pro aktivní a uvědomělé. Čistý fokus, přírodní energie.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${nunito.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
