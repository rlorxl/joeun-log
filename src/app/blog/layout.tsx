// 'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../../public/assets/logo.svg';
import LogoWhite from '../../../public/assets/logo-white.svg';
import BlogNavigation from '@/components/blog/navigation';
import getCookie from '@/utils/common/get-cookie';

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = getCookie();

  return (
    <div className="relative py-20 h-screen sm:py-0 sm:w-full">
      <nav className="flex-col flex justify-between fixed h-4/5 sm:dark:bg-darkmode-base-color sm:bg-white sm:w-full sm:p-8 sm:h-auto sm:z-10 sm:sticky sm:top-0">
        <Link href="/blog" className="mb-8">
          {theme?.value === 'dark' ? (
            <Image src={LogoWhite} alt="logo" width={40} />
          ) : (
            <Image src={Logo} alt="logo" width={40} />
          )}
        </Link>
        <BlogNavigation cookie={theme?.value} />
      </nav>
      {children}
      <div className="text-sm text-second-color fixed bottom-20 sm:static sm:py-5 sm:text-center">
        ©rlorxl. 2023
      </div>
    </div>
  );
};

export default BlogLayout;
