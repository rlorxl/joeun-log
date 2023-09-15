import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import * as Icon from '../../../public/icon';
import { usePathname } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { postState } from '@/recoil/posts';
import { getMDXComponent } from 'mdx-bundler/client';

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
  const [isMainIconHover, setIsMainIconHover] = useState<boolean>(false);
  const path = usePathname(); // /blog/develop/2023/8/develop
  const currentPostSource = useRecoilValue(postState);

  useEffect(() => {
    const paths = path.split('/');

    if (paths.length > 3) setIsDetailPage(true);
    else setIsDetailPage(false);
  }, [path]);

  const componentStyle = {
    myH1: 'cursor-pointer text-second-color hover:text-base-color',
  };

  return (
    <div className="flex flex-col justify-between h-4/5">
      {!isDetailPage && (
        <ul className="space-y-8">
          {navLinkto.map(({ name, link }) => (
            <li key={name}>
              <Link href={link}>{name}</Link>
            </li>
          ))}
        </ul>
      )}
      {isDetailPage && (
        <div>
          {currentPostSource.map(({ code, frontmatter }) => {
            const Component = getMDXComponent(code);
            return (
              <Component
                key={frontmatter.title}
                components={{
                  p: () => null,
                  pre: () => null,
                  ul: () => null,
                  ol: () => null,
                  br: () => null,
                  hr: () => null,
                  a: () => null,
                  h3: () => null,
                  h1: props => <div className={componentStyle.myH1} {...props} />,
                  h2: props => <div className={componentStyle.myH1 + ' pl-2'} {...props} />,
                }}
              />
            );
          })}
        </div>
      )}
      <div className="space-y-10 flex-col flex">
        {!isDetailPage && (
          <button type="button">
            <Image src={Icon.Search} alt="검색" />
          </button>
        )}
        <button type="button">
          <Image src={Icon.Light} alt="다크모드" />
        </button>
        {!isDetailPage && (
          <Link
            href="/"
            className="h-11 w-7"
            onMouseEnter={() => setIsMainIconHover(true)}
            onMouseLeave={() => setIsMainIconHover(false)}>
            <div className="h-[46px] w-[34px] relative flex justify-start items-start group">
              <Image src={Icon.Door} alt="" className="w-full h-full absolute top-0 left-0" />
              {isMainIconHover && (
                <Image
                  src={Icon.DoorLight}
                  alt="메인으로 이동"
                  className="w-full h-full absolute top-0 left-0 group-hover:animate-lighton"
                />
              )}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BlogNavigation;
