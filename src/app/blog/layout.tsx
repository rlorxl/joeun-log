import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../../public/logo.svg';
import Door from '../../../public/icon/door.svg';
import Search from '../../../public/icon/search.svg';
import Sun from '../../../public/icon/sun.svg';

type TBlogNav = {
  name: string;
  link: string;
};

const navLinkto: TBlogNav[] = [
  { name: '개발얘기', link: '/develop' },
  { name: '취준일기', link: '/diary' },
  { name: '그냥생각', link: '/daily' },
];

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-between py-20">
      <nav
        className="flex-col flex justify-between items-start w-[120px] h-full"
        suppressHydrationWarning>
        <div>
          <Link href="/main">
            <Image src={Logo} alt="logo" width={40} />
          </Link>
          <ul className="text-lg space-y-8 mt-16">
            {navLinkto.map(({ name, link }) => (
              <li key={name}>
                <Link href={link}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-10 flex-col flex">
          <button type="button">
            <Image src={Search} alt="검색" />
          </button>
          <button type="button">
            <Image src={Sun} alt="다크모드" />
          </button>
          <button type="button">
            <Image src={Door} alt="메인으로 이동" />
          </button>
          <div className="mt-8">© rlorxl 2023</div>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default BlogLayout;
