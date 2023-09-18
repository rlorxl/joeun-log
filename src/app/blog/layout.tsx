'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../../public/logo.svg';
import LogoWhite from '../../../public/logo-white.svg';
import BlogNavigation from '@/components/blog/navigation';
import { useTheme } from 'next-themes';

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  return (
    <div className="flex justify-between items-start py-20 h-screen">
      <nav className="flex-col flex justify-between w-[120px] fixed h-4/5">
        <Link href="/blog" className="mb-8">
          {theme === 'dark' ? (
            <Image src={LogoWhite} alt="logo" width={40} />
          ) : (
            <Image src={Logo} alt="logo" width={40} />
          )}
        </Link>
        <BlogNavigation />
        <div className="mt-8 text-sm text-second-color">©rlorxl 2023</div>
      </nav>
      {children}
    </div>
  );
};

export default BlogLayout;
