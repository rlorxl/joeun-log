import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../../public/logo.svg';
import * as Icon from '../../../public/icon/index';

type TBlogNav = {
  name: string;
  link: string;
};

const navLinkto: TBlogNav[] = [
  { name: '개발얘기', link: '/blog/develop' },
  { name: '취준일기', link: '/blog/diary' },
  { name: '그냥생각', link: '/blog/daily' },
];

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-between items-start py-20 h-screen">
      <nav className="flex-col flex justify-between items-start w-[120px] h-full">
        <div>
          <Link href="/blog">
            <Image src={Logo} alt="logo" width={40} />
          </Link>
          <ul className="space-y-8 mt-16">
            {navLinkto.map(({ name, link }) => (
              <li key={name}>
                <Link href={link}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-10 flex-col flex">
          <button type="button">
            <Image src={Icon.Search} alt="검색" />
          </button>
          <button type="button">
            <Image src={Icon.Sun} alt="다크모드" />
          </button>
          <Link href="/">
            <Image src={Icon.Door} alt="메인으로 이동" />
          </Link>
          <div className="mt-8 text-sm text-second-color">©rlorxl 2023</div>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default BlogLayout;
