'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ArrowRight from '~/public/assets/icon/arrow-right.svg';

import { getMDXComponent } from 'mdx-bundler/client';

import { sortingData } from '@/utils/data-sorting';
import { toUrl } from '@/utils/url';
import { fadeInAnimate } from '@/utils/fadeIn-animate';
import { blogPageComponents } from '@/custom/mdx-styling';
import { TPost } from '@/types/post';

const Posts = ({ posts }: { posts: TPost[] }) => {
  const [mounted, setMounted] = useState<boolean>(false);

  const paragraph = useRef<string[][]>(Array(posts?.length).fill([]));

  const renderparagraph = (props: any, idx: number) => {
    let text = props.children;
    let _paragraph = paragraph.current;

    if (typeof text !== 'string') {
      return;
    }

    if (_paragraph[idx].length < 3) {
      // index 0,1,2일 때까지 배열에 추가
      _paragraph[idx] = _paragraph[idx].concat(text);

      return null;
    }

    if (_paragraph[idx].length === 3) {
      return <>{_paragraph[idx].join(' ')}</>;
    }
  };

  // 렌더링될 때마다 ref값 초기화.
  useEffect(() => {
    paragraph.current = Array(posts?.length).fill([]);
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
              'border-b last:border-b-0 pb-8 mr-20 border-b-darkmode-text-color space-y-4 sm:px-8 sm:mr-0' +
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
                    p: (props: any) => {
                      return renderparagraph(props, idx);
                    },
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
