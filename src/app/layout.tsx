import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import BlogLogo from '../../public/mainlogo.svg';

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
          <Image src={BlogLogo} alt="logo" />
          <div>{children}</div>
          <footer className="text-sm text-second-color fixed bottom-10">© rlorxl 2023</footer>
        </main>
      </body>
    </html>
  );
}
