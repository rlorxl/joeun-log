'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import * as Icon from '../../../public/icon';
import { usePathname } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { postState } from '@/recoil/posts';
import { getMDXComponent } from 'mdx-bundler/client';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

type TBlogNav = {
  name: string;
  link: string;
};

const navLinkto: TBlogNav[] = [
  { name: '개발얘기', link: '/blog/develop' },
  { name: '취준일기', link: '/blog/diary' },
  { name: '그냥생각', link: '/blog/daily' },
];

const setCookie = (value: string) => {
  let exdate = new Date();
  exdate.setDate(exdate.getDate() + 7);
  let cookieValue = value;
  document.cookie = `theme=${cookieValue}`;
};

const BlogNavigation = ({ cookie }: { cookie?: string }) => {
  const { theme, setTheme } = useTheme();

  const [isDetailPage, setIsDetailPage] = useState<boolean>(false);
  const [isMainIconHover, setIsMainIconHover] = useState<boolean>(false);
  const [clickTheme, setClickTheme] = useState<boolean>(false);
  const path = usePathname(); // /blog/develop/2023/8/develop
  const currentPostSource = useRecoilValue(postState);

  const router = useRouter();

  useEffect(() => {
    const paths = path.split('/');

    if (paths.length > 3) setIsDetailPage(true);
    else setIsDetailPage(false);
  }, [path]);

  const changeMode = () => {
    setClickTheme(true);
    router.refresh();

    if (!theme) return;

    if (theme === 'light') {
      setTheme('dark');
      setCookie('dark');
    } else {
      setTheme('light');
      setCookie('light');
    }

    setTimeout(() => {
      setClickTheme(false);
    }, 700);
  };

  const componentStyle = {
    myH1: 'cursor-pointer text-second-color hover:text-base-color',
  };

  return (
    <div className="flex flex-col justify-between h-4/5 font-semibold">
      {!isDetailPage && (
        <ul className="space-y-8 sm:space-y-5">
          {navLinkto.map(({ name, link }) => (
            <li key={name} className="hover:text-second-color transition">
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
      <div className="space-y-10 flex-col flex sm:flex-row sm:justify-between sm:items-center sm:space-y-0 sm: sm:w-36 sm:absolute sm:top-0 sm:p-8 sm:right-0">
        {/* {!isDetailPage && (
          <button type="button">
            <Image src={Icon.Search} alt="검색" />
          </button>
        )} */}
        <button
          type="button"
          onClick={changeMode}
          className="w-10 h-10 transition duration-200 ease relative overflow-hidden flex hover:bg-slate-100 rounded-full justify-center items-center">
          <div
            className={
              'absolute top-1/2 -translate-y-1/2 w-[104px] h-6' +
              (theme === 'light' ? ' left-2' : theme === 'dark' ? ' -left-8' : '') +
              (clickTheme && theme === 'dark'
                ? ' animate-todarkmode'
                : clickTheme && theme === 'light'
                ? ' animate-tolightmode'
                : '')
            }>
            <Image src={Icon.Mode} alt="라이트모드" />
          </div>
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
