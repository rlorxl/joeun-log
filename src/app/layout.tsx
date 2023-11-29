import './globals.css';
import type { Metadata } from 'next';
import RecoilRootWrapper from '../wrapper/recoil-wrapper';
import { Sofia_Sans } from 'next/font/google';
import getCookie from '@/utils/common/get-cookie';
import CheckDefaultScheme from '@/wrapper/default-scheme';

export const metadata: Metadata = {
  title: '조은씀',
  description: '주니어 개발자 조은의 개발 블로그',
  keywords: ['개발블로그', '개발자 블로그', '프론트엔드'],

  icons: [
    {
      rel: 'icon',
      // type: 'image/svg',
      sizes: '32x32',
      url: '/favicon.svg',
    },
  ],
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
