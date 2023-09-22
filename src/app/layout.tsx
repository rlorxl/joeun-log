import './globals.css';
import type { Metadata } from 'next';
import RecoilRootWrapper from '../wrapper/recoil-wrapper';
import { Sofia_Sans } from 'next/font/google';
import getCookie from '@/utils/common/get-cookie';
import CheckDefaultScheme from '@/wrapper/default-scheme';

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
      <CheckDefaultScheme cookie={theme}>
        <main className={`${sofia.className} w-full min-h-screen relative flex-col flex-center`}>
          <RecoilRootWrapper>{children}</RecoilRootWrapper>
        </main>
      </CheckDefaultScheme>
    </html>
  );
};

export default RootLayout;
