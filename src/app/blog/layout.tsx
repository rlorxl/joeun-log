'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../../public/logo.svg';
import BlogNavigation from '@/components/blog/navigation';

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-between items-start py-20 h-screen">
      <nav className="flex-col flex justify-between w-[120px] h-full">
        <Link href="/blog" className="mb-8">
          <Image src={Logo} alt="logo" width={40} />
        </Link>
        <BlogNavigation />
        <div className="mt-8 text-sm text-second-color">©rlorxl 2023</div>
      </nav>
      {children}
    </div>
  );
};

export default BlogLayout;
