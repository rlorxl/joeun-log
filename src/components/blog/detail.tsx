'use client';
import { TPost } from '@/types/post';
import { getMDXComponent } from 'mdx-bundler/client';
import React, { useEffect, useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { useSetRecoilState } from 'recoil';
import { postState } from '@/recoil/posts';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const CustomCode = (props: any, cookie: string) => {
  const code = props.children.props.children.trim();
  const className = props.children.props.className || '';
  const language = className.replace(/language-/, '');

  return (
    <Highlight
      theme={cookie === 'dark' ? themes.nightOwl : themes.nightOwlLight}
      code={code}
      language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className="rounded-md p-4 text-sm mt-6 mb-6 overflow-x-scroll" style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

const PostDetail = ({ post, cookie }: { post: TPost[]; cookie?: RequestCookie }) => {
  const setPost = useSetRecoilState(postState);
  const [cookieValue, setCookieValue] = useState<string>('');

  useEffect(() => {
    console.log(cookie);
    if (!cookie) return;
    setCookieValue(cookie.value);
  }, [cookie]);

  useEffect(() => {
    if (!post) return;
    setPost(post);
  }, [post]);

  return (
    <>
      {post.map(({ code, frontmatter }, idx) => {
        const Comopnent = getMDXComponent(code);
        return (
          <div key={idx}>
            <section className="mb-10">
              <p className="text-4xl font-bold mb-4">{frontmatter.title}</p>
              <div>
                {frontmatter.keywords.split(',').map((tag: string, i: number) => (
                  <span key={tag + i} className="mr-2 font-semibold">
                    {tag}
                  </span>
                ))}
                <span>{frontmatter.published}</span>
              </div>
            </section>
            <Comopnent
              components={{
                h1: props => <h1 className="text-3xl font-semibold mb-3" {...props} />,
                h2: props => <h2 className="text-2xl font-semibold mb-3" {...props} />,
                h3: props => <h3 className="text-xl font-semibold mb-3" {...props} />,
                p: props => <p className="mb-2 leading-6" {...props} />,
                hr: props => <hr className="border-2 mt-6 mb-6" {...props} />,
                br: props => <br className="mb-12" {...props} />,
                ol: props => <ol className="list-decimal pl-5 mb-6 space-y-2" {...props} />,
                ul: props => <ul className="list-disc pl-5 mb-6 space-y-2" {...props} />,
                code: props => <code className=" bg-[#E9EAEE] rounded-md p-1 text-sm" {...props} />,
                pre: props => CustomCode(props, cookieValue),
              }}
            />
          </div>
        );
      })}
    </>
  );
};

export default PostDetail;
