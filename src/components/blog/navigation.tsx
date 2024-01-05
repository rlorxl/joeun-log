'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import * as Icon from '~/public/assets/icon';
import { Icon as GoBackIcon } from '@iconify/react/dist/iconify.js';
import { usePathname } from 'next/navigation';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { postState } from '@/recoil/posts';
import { getMDXComponent } from 'mdx-bundler/client';
import { useRouter } from 'next/navigation';
import { DARK_MODE, LIGHT_MODE } from '@/constant/constants';
import setCookie from '@/utils/common/set-cookie';
import { NavHeading, navigationComponents } from '@/custom/mdx-styling';
import { themeState } from '@/recoil/theme';

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
  const [mounted, setMounted] = useState<boolean>(false);
  const [isDetailPage, setIsDetailPage] = useState<boolean>(false);
  const [isMainIconHover, setIsMainIconHover] = useState<boolean>(false);

  const recoilTheme = useRecoilValue(themeState);
  const setRecoilTheme = useSetRecoilState(themeState);

  const names = useRef<{ name: string; position: number }[]>([]);

  const router = useRouter();
  const path = usePathname(); // /blog/develop/2023/8/develop
  const currentPostSource = useRecoilValue(postState);

  useEffect(() => {
    const paths = path.split('/');
    if (paths.length > 3) setIsDetailPage(true);
    else setIsDetailPage(false);
  }, [path]);

  useEffect(() => {
    if (!mounted) setMounted(true);
  }, []);

  const changeMode = () => {
    if (recoilTheme === LIGHT_MODE) {
      setCookie(DARK_MODE);
      setRecoilTheme(DARK_MODE);

      return;
    }

    setCookie(LIGHT_MODE);
    setRecoilTheme(LIGHT_MODE);
  };

  return (
    <div className="flex flex-col justify-between h-4/5">
      {!mounted && <div className="min-h-[300px]" />}
      {!isDetailPage && mounted && (
        <ul className="space-y-8 sm:space-y-5 font-semibold">
          {navLinkto.map(({ name, link }) => (
            <li key={name} className="hover:text-second-color transition">
              <Link href={link}>{name}</Link>
            </li>
          ))}
        </ul>
      )}
      {isDetailPage && (
        <div className="text-sm">
          <button className="mb-10 flex" onClick={() => router.back()}>
            <GoBackIcon icon="pajamas:go-back" className="mr-2" />
            목록
          </button>
          {currentPostSource.map(({ code, frontmatter }, idx) => {
            const Component = getMDXComponent(code);
            return (
              <div
                key={frontmatter.title}
                className="pl-3 border-l border-sPecond-color -pt-10 space-y-2">
                <Component
                  components={Object.assign(navigationComponents, {
                    h1: (props: any) => NavHeading(props, names, 'h1'),
                    h2: (props: any) => NavHeading(props, names, 'h2'),
                    h3: (props: any) => NavHeading(props, names, 'h3'),
                  })}
                />
              </div>
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
              'absolute top-1/2 -translate-y-1/2 w-[104px] h-6 transition-all ease-in-out duration-700' +
              (recoilTheme === DARK_MODE ? ' -left-8' : ' left-2')
            }>
            <Image src={Icon.Mode} alt="라이트모드" />
          </div>
        </button>
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
      </div>
    </div>
  );
};

export default BlogNavigation;
