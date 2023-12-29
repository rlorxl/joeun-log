import './globals.css';
import type { Metadata } from 'next';
import RecoilRootWrapper from '../wrapper/recoil-wrapper';
import { Sofia_Sans } from 'next/font/google';
import getCookie from '@/utils/common/get-cookie';
import CheckDefaultScheme from '@/wrapper/default-scheme';

export const metadata: Metadata = {
  title: '주니어 프론트엔드 개발자 개인블로그: 조은씀',
  description:
    '주니어 개발자 조은의 개발 블로그입니다. 개발도중 새롭게 알게 된 내용에 대한 정리와 글을 공유합니다. 이 블로그는 NEXT.js의 app router를 활용하여 제작되었습니다.',
  keywords: ['개발블로그', '개발자 블로그', '프론트엔드'],

  icons: [
    {
      rel: 'icon',
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
      <head>
        <meta
          name="google-site-verification"
          content="5Hoc5w7TAtymO_efS0zVrlyI3_ivotkExZNVKiPTs4Y"
        />
        <link rel="canonical" href="https://rlorxl.me/blog"></link>
      </head>
      <CheckDefaultScheme cookie={theme}>
        <main className={`${sofia.className} w-full min-h-screen relative flex-col flex-center`}>
          <RecoilRootWrapper>{children}</RecoilRootWrapper>
        </main>
      </CheckDefaultScheme>
    </html>
  );
};

export default RootLayout;
