'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import * as Icon from '../../../public/assets/icon';
import { usePathname } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { postState } from '@/recoil/posts';
import { getMDXComponent } from 'mdx-bundler/client';
import { useRouter } from 'next/navigation';
import { DARK_MODE, LIGHT_MODE, MEDIA } from '@/constants';
import setCookie from '@/utils/common/set-cookie';

type TBlogNav = {
  name: string;
  link: string;
};

const navLinkto: TBlogNav[] = [
  { name: '개발얘기', link: '/blog/develop' },
  { name: '취준일기', link: '/blog/diary' },
  { name: '그냥생각', link: '/blog/daily' },
];

const initialThemeChange = () => {
  const isDarkmode = window.matchMedia(MEDIA).matches;
  /* 
  isDarkmode : 현재설정이 다크모드인지 확인.
  다크모드 아님(윈도우 테마 설정이 light) : 클릭한 시점에서 다크모드로 바뀌어야함. (setCookie(DARK_MODE))
  */
  !isDarkmode ? setCookie(DARK_MODE) : setCookie(LIGHT_MODE);
};

const BlogNavigation = ({ cookie }: { cookie?: string }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [isDetailPage, setIsDetailPage] = useState<boolean>(false);
  const [isMainIconHover, setIsMainIconHover] = useState<boolean>(false);
  const [clickTheme, setClickTheme] = useState<boolean>(false);

  const router = useRouter();
  const path = usePathname(); // /blog/develop/2023/8/develo
  const currentPostSource = useRecoilValue(postState);

  useEffect(() => {
    const paths = path.split('/');

    if (paths.length > 3) setIsDetailPage(true);
    else setIsDetailPage(false);
  }, [path]);

  useEffect(() => {
    if (!mounted) setMounted(true);
    console.log(cookie);
  }, []);

  const changeMode = () => {
    setClickTheme(true);

    if (!cookie) {
      // 쿠키에 저장된 테마가 undefined일 때 (최초 클릭)
      initialThemeChange();
    } else if (cookie === LIGHT_MODE) {
      setCookie(DARK_MODE);
    } else {
      setCookie(LIGHT_MODE);
    }

    // 테마변경시 layout리렌더링 :data-theme변경
    router.refresh();
  };

  const componentStyle = {
    myH1: 'cursor-pointer hover:text-second-color',
  };

  return (
    <div className="flex flex-col justify-between h-4/5 font-semibold">
      {!mounted && <div className="min-h-[300px]" />}
      {!isDetailPage && mounted && (
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
              <div key={frontmatter.title} className="pl-3 border-l border-second-color">
                <Component
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
              'absolute top-1/2 -translate-y-1/2 w-[104px] h-6' +
              (cookie === DARK_MODE ? ' -left-8' : ' left-2') +
              (clickTheme && cookie === DARK_MODE
                ? ' animate-todarkmode'
                : clickTheme && cookie === LIGHT_MODE
                ? ' animate-tolightmode'
                : '')
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
