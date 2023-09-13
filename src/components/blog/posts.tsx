'use client';
import React, { useRef } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import Link from 'next/link';
import ArrowRight from '../../../public/icon/arrow-right.svg';
import Image from 'next/image';
import { sortingData } from '@/utils/data-sorting';
import { TPost } from '@/types/post';

const Posts = ({ posts }: { posts: TPost[] }) => {
  const firstSentenceArr = useRef<string[]>(Array(posts.length).fill(''));

  const renderFirstSentence = (props: any, idx: number) => {
    const text = props.children;

    if (firstSentenceArr.current[idx] === '') {
      firstSentenceArr.current[idx] = text;
      return (
        <Link href={'#'} className="hover:underline hover:text-second-color">
          {text}
        </Link>
      );
    }

    return null;
  };

  return (
    <>
      {sortingData(posts).map(({ code, frontmatter }, idx) => {
        const Component = getMDXComponent(code);
        return (
          <div
            key={frontmatter.title}
            className="border-b last:border-b-0 pb-5 border-b-second-color space-y-4">
            <h1 className="text-2xl font-semibold hover:underline mb-4">
              <Link href={'#'}>{frontmatter.title}</Link>
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
                p: props => renderFirstSentence(props, idx),
              }}
            />
            <div>
              <span className="mr-2">{frontmatter.published}</span>
              {frontmatter.tags.split(',').map((tag: string, i: number) => (
                <span key={tag + i} className="mr-2">
                  {tag}
                </span>
              ))}
            </div>
            <Link href="#" className="text-sm w-fit flex justify-start items-center">
              <span className="mr-1">더보기</span>
              <Image src={ArrowRight} alt="더보기" />
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default Posts;
