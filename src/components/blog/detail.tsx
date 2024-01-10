'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import TopButton from '~/public/assets/icon/top.svg';

import { useSetRecoilState } from 'recoil';
import { postState } from '@/recoil/posts';
import { getMDXComponent } from 'mdx-bundler/client';

import { detailPageComponents } from '@/custom/mdx-styling';
import { TPost } from '@/types/post';

const PostDetail = ({ post }: { post: TPost[] }) => {
  const setPost = useSetRecoilState(postState);
  const mainRef = useRef<HTMLDivElement>(null);

  const scrollTop = () => {
    const $mainBox = mainRef.current;
    if (!$mainBox) return;

    $mainBox.scrollIntoView({ block: 'start', inline: 'nearest' });
  };

  useEffect(() => {
    if (!post) return;

    setPost(post);
  }, [post, setPost]);

  return (
    <div
      data-class="detail"
      className="post-width min-h-[1200px] pb-14 py-20 overflow-y-scroll scrollbar-hide sm:w-full"
      ref={mainRef}>
      {post.map(({ code, frontmatter }, idx) => {
        const Comopnent = getMDXComponent(code);
        return (
          <div key={idx} className="sm:">
            <section className="mb-16">
              <p className="text-4xl font-bold mb-4">{frontmatter.title}</p>
              <div>
                {frontmatter.keywords.split(',').map((tag: string, i: number) => (
                  <span key={tag + i} className="mr-2 font-semibold">
                    {tag}
                  </span>
                ))}
                <span className="text-second-color">{frontmatter.published}</span>
              </div>
            </section>
            <Comopnent components={detailPageComponents} />
          </div>
        );
      })}
      <button type="button" className="fixed right-20 bottom-16" onClick={scrollTop}>
        <Image src={TopButton} alt="위로" width={'18'} />
      </button>
    </div>
  );
};

export default PostDetail;
