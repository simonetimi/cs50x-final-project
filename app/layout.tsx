import { NextUIProvider } from '@nextui-org/react';
import type { Metadata } from 'next';
import { Inter, Montserrat, Mouse_Memoirs } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});
const mouse = Mouse_Memoirs({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mouse',
});

export const metadata: Metadata = {
  title: 'Trivia Quiz App',
  description: 'Project for the CS50 course',
  icons: [
    { rel: 'icon', url: '/favicon.ico', type: 'image/x-icon' },
    {
      rel: 'icon',
      url: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${montserrat.variable} ${mouse.variable} font-mouse text-lg text-slate-700`}
      >
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
