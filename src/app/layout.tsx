import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import RecoilRootWrapper from '../../lib/recoil-wrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'rlorxlblog',
  description: 'welcome to rlorxl blog',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="w-full min-h-screen flex-col flex-center">
          <RecoilRootWrapper>{children}</RecoilRootWrapper>
        </main>
      </body>
    </html>
  );
}
