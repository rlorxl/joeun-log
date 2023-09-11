import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import * as Icon from '../../../public/icon';
import { usePathname } from 'next/navigation';

type TBlogNav = {
  name: string;
  link: string;
};

const navLinkto: TBlogNav[] = [
  { name: '개발얘기', link: '/blog/develop' },
  { name: '취준일기', link: '/blog/diary' },
  { name: '그냥생각', link: '/blog/daily' },
];

const BlogNavigation = () => {
  const [isDetailPage, setIsDetailPage] = useState<boolean>(false);
  const path = usePathname();

  useEffect(() => {
    const paths = path.split('/');
    if (paths.length > 3) setIsDetailPage(true);
    else setIsDetailPage(false);
  }, [path]);

  return (
    <div className="flex flex-col justify-between h-4/5">
      <ul className="space-y-8">
        {!isDetailPage &&
          navLinkto.map(({ name, link }) => (
            <li key={name}>
              <Link href={link}>{name}</Link>
            </li>
          ))}
      </ul>
      <div className="space-y-10 flex-col flex">
        {!isDetailPage && (
          <button type="button">
            <Image src={Icon.Search} alt="검색" />
          </button>
        )}
        <button type="button">
          <Image src={Icon.Sun} alt="다크모드" />
        </button>
        {!isDetailPage && (
          <Link href="/">
            <Image src={Icon.Door} alt="메인으로 이동" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default BlogNavigation;