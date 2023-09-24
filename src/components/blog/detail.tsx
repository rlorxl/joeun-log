'use client';
import { TPost } from '@/types/post';
import { getMDXComponent } from 'mdx-bundler/client';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { postState } from '@/recoil/posts';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import {
  MyH1,
  MyH2,
  MyH3,
  MyParagraph,
  MyHr,
  MyBr,
  MyOl,
  MyUl,
  MyCode,
  MyPre,
  MyBlockquote,
  MyATag,
} from '@/custom/mdx-styling';

const detailPageComponents = {
  h1: MyH1,
  h2: MyH2,
  h3: MyH3,
  p: MyParagraph,
  hr: MyHr,
  br: MyBr,
  ol: MyOl,
  ul: MyUl,
  code: MyCode,
  pre: MyPre,
  blockquote: MyBlockquote,
  a: MyATag,
};

const PostDetail = ({ post, cookie }: { post: TPost[]; cookie?: RequestCookie }) => {
  const setPost = useSetRecoilState(postState);
  // const [cookieValue, setCookieValue] = useState<string>('');

  // useEffect(() => {
  //   if (!cookie) return;
  //   setCookieValue(cookie.value);
  // }, [cookie]);

  useEffect(() => {
    if (!post) return;
    setPost(post);
  }, [post]);

  return (
    <div className="pb-14">
      {post.map(({ code, frontmatter }, idx) => {
        const Comopnent = getMDXComponent(code);
        return (
          <div key={idx}>
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
    </div>
  );
};

export default PostDetail;
