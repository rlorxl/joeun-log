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
    <div className="relative sm:py-0 sm:w-full overflow-y-scroll">
      <nav className="flex-col pt-20 flex justify-between w-[195px] fixed h-4/5 sm:dark:bg-darkmode-base-color sm:bg-white sm:w-full sm:p-8 sm:h-auto sm:z-10 sm:sticky sm:top-0">
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
