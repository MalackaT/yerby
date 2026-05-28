import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Yerby — Something pure is coming.',
  description:
    'Clean energy for the conscious mover. Pure focus, naturally refined. Coming soon.',
  openGraph: {
    title: 'Yerby — Something pure is coming.',
    description: 'Clean energy for the conscious mover. Pure focus, naturally refined.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Yerby — Something pure is coming.',
    description: 'Clean energy for the conscious mover. Pure focus, naturally refined.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
