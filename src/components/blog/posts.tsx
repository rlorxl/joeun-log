'use client';
import React, { useEffect, useRef, useState } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import Link from 'next/link';
import ArrowRight from '~/public/assets/icon/arrow-right.svg';
import Image from 'next/image';
import { sortingData } from '@/utils/data-sorting';
import { TPost } from '@/types/post';
import { toUrl } from '@/utils/url';
import { fadeInAnimate } from '@/utils/fadeIn-animate';
import { blogPageComponents } from '@/custom/mdx-styling';

const Posts = ({ posts }: { posts: TPost[] }) => {
  const [mounted, setMounted] = useState<boolean>(false);

  const paragraph = useRef<any[]>([]);
  const paragraphList = useRef<any[]>(Array(posts?.length).fill(''));

  const renderparagraph = (props: any, idx: number) => {
    let text = props.children;

    if (paragraph.current.length <= 5 && paragraphList.current[idx] === '') {
      paragraph.current.push(text);
      paragraph.current.push(' ');

      return;
    }

    if (paragraphList.current[idx] === '') {
      paragraphList.current[idx] = paragraph.current;
      paragraph.current = [];

      return <> {paragraphList.current[idx]}</>;
    }

    return null;
  };

  // 렌더링될 때마다 ref값 초기화.
  useEffect(() => {
    paragraph.current = [];
    paragraphList.current = Array(posts?.length).fill('');
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!posts) return <div className="italic text-sm flex-center p-5">아직 아무것도 없어요 !</div>;

  return (
    <>
      {sortingData(posts).map(({ code, frontmatter }, idx) => {
        const Component = getMDXComponent(code);
        if (frontmatter.secret) return null;
        return (
          <div
            data-class="post"
            key={frontmatter.title}
            className={
              'border-b last:border-b-0 pb-8 border-b-darkmode-text-color space-y-4 sm:px-8' +
              fadeInAnimate(idx)
            }>
            <h1 className="text-2xl font-semibold mb-4">
              <Link href={toUrl(frontmatter)} className="hover:underline">
                {frontmatter.title}
              </Link>
            </h1>
            <Link
              href={toUrl(frontmatter)}
              className="block h-12 overflow-hidden hover:text-second-color">
              <Component
                components={Object.assign(
                  {
                    p: (props: any) => renderparagraph(props, idx),
                  },
                  blogPageComponents,
                )}
              />
            </Link>
            <div className="flex-between">
              <div>
                {frontmatter.keywords.split(',').map((tag: string, i: number) => (
                  <span
                    key={tag + i}
                    data-class="tag"
                    className="mr-2 text-sm bg-slate-200 rounded-lg py-1 px-2">
                    {tag}
                  </span>
                ))}
                <span className="mr-2 text-second-color">{frontmatter.published}</span>
              </div>
              <Link
                href={toUrl(frontmatter)}
                className="text-sm w-fit flex justify-start items-center group pr-2">
                <span className="mr-1">더보기</span>
                <div className="group-hover:animate-moveright">
                  <Image src={ArrowRight} alt="더보기" />
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Posts;
