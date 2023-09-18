import './globals.css';
import type { Metadata } from 'next';
import RecoilRootWrapper from '../../lib/recoil-wrapper';
import ThemeWrapper from '../../lib/theme-wrapper';
import { Sofia_Sans } from 'next/font/google';

export const metadata: Metadata = {
  title: 'rlorxl',
  description: 'welcome to rlorxl blog',
};

const sofia = Sofia_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--sofia',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${sofia.className} dark:text-white dark:bg-darkmode-base-color transition-all duration-75`}>
        <main className="w-full min-h-screen flex-col flex-center">
          <RecoilRootWrapper>
            <ThemeWrapper>{children}</ThemeWrapper>
          </RecoilRootWrapper>
        </main>
      </body>
    </html>
  );
}
