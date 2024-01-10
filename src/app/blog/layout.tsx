import React from 'react';
import Link from 'next/link';

import BlogNavigation from '@/components/blog/navigation';
import BlogLogo from '@/components/blog/blog-logo';

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative sm:py-0 sm:w-full overflow-y-scroll">
      <nav className="flex-col pt-20 flex justify-between w-[195px] fixed h-4/5 sm:dark:bg-darkmode-base-color sm:bg-white sm:w-full sm:p-8 sm:h-auto sm:z-10 sm:sticky sm:top-0">
        <Link href="/blog" className="mb-8">
          <BlogLogo />
        </Link>
        <BlogNavigation />
      </nav>
      {children}
      <div className="text-sm text-second-color fixed bottom-20 sm:static sm:py-5 sm:text-center">
        ©rlorxl. 2023
      </div>
    </div>
  );
};

export default BlogLayout;
