import './globals.css';
import type { Metadata } from 'next';
import RecoilRootWrapper from '../../lib/recoil-wrapper';
import { Sofia_Sans } from 'next/font/google';
import getCookie from '@/utils/get-cookie';

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

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = getCookie();

  return (
    <html lang="en">
      <body data-theme={theme?.value} className={`${sofia.className} transition-all duration-75`}>
        <main className="w-full min-h-screen relative flex-col flex-center">
          <RecoilRootWrapper>{children}</RecoilRootWrapper>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
