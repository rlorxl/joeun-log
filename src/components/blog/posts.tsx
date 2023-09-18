'use client';
import React, { useEffect, useRef, useState } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import Link from 'next/link';
import ArrowRight from '../../../public/icon/arrow-right.svg';
import Image from 'next/image';
import { sortingData } from '@/utils/data-sorting';
import { TPost } from '@/types/post';
import { toUrl } from '@/utils/url';

const popupAni = (i: number): string => {
  let classname = '';
  switch (i) {
    case 0:
      classname = ' animate-show1';
      break;
    case 1:
      classname = ' animate-show2';
      break;
    case 2:
      classname = ' animate-show3';
      break;
    case 3:
      classname = ' animate-show4';
      break;
    case 4:
      classname = ' animate-show5';
  }
  return classname;
};

const Posts = ({ posts }: { posts: TPost[] }) => {
  const [mounted, setMounted] = useState<boolean>(false);

  const firstSentenceArr = useRef<string[]>(Array(posts.length).fill(''));

  const renderFirstSentence = (props: any, idx: number, frontmatter: { [key: string]: string }) => {
    const text = props.children;

    if (firstSentenceArr.current[idx] === '') {
      firstSentenceArr.current[idx] = text;
      return (
        <Link
          href={toUrl(frontmatter)}
          className="hover:underline hover:text-second-color dark:text-darkmode-text-color">
          {text}
        </Link>
      );
    }

    return null;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {sortingData(posts).map(({ code, frontmatter }, idx) => {
        const Component = getMDXComponent(code);
        return (
          <div
            key={frontmatter.title}
            className={
              'border-b last:border-b-0 pb-5 border-b-darkmode-text-color space-y-4' + popupAni(idx)
            }>
            <h1 className="text-2xl font-semibold hover:underline mb-4">
              <Link href={toUrl(frontmatter)}>{frontmatter.title}</Link>
            </h1>
            <Component
              components={{
                h1: () => null,
                h2: () => null,
                h3: () => null,
                ol: () => null,
                li: () => null,
                img: () => null,
                pre: () => null,
                hr: () => null,
                p: props => renderFirstSentence(props, idx, frontmatter),
              }}
            />
            <div className="dark:text-darkmode-text-color">
              <span className="mr-2 ">{frontmatter.published}</span>
              {frontmatter.keywords.split(',').map((tag: string, i: number) => (
                <span key={tag + i} className="mr-2">
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href={toUrl(frontmatter)}
              className="text-sm w-fit flex justify-start items-center group dark:text-darkmode-text-color">
              <span className="mr-1">더보기</span>
              <div className="group-hover:animate-moveright">
                <Image src={ArrowRight} alt="더보기" />
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default Posts;
