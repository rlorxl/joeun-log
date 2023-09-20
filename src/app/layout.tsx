import './globals.css';
import type { Metadata } from 'next';
import RecoilRootWrapper from '../../lib/recoil-wrapper';
import ThemeWrapper from '../../lib/theme-wrapper';
import { Sofia_Sans } from 'next/font/google';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { NavigationEvents } from '../../lib/navigation-events';

export const metadata: Metadata = {
  title: 'rlorxl',
  description: 'welcome to rlorxl blog',
};

const sofia = Sofia_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--sofia',
  preload: false,
});

const getCookie = () => {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme');
  return theme;
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = getCookie();

  return (
    <html lang="en">
      <body
        data-theme={theme?.value}
        className={`${sofia.className} dark:text-white dark:bg-darkmode-base-color transition-all duration-75`}>
        <main className="w-full min-h-screen relative flex-col flex-center">
          <ThemeWrapper>
            <RecoilRootWrapper>{children}</RecoilRootWrapper>
          </ThemeWrapper>
        </main>
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
