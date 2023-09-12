import { useRef } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import Link from 'next/link';

const CategoryPosts = ({
  posts,
}: {
  posts: { code: string; frontmatter: { [key: string]: string } }[];
}) => {
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
      {posts.map(({ code, frontmatter }, idx) => {
        const Component = getMDXComponent(code);
        return (
          <div
            key={frontmatter.title}
            className="border-b last:border-b-0 pb-5 border-b-second-color space-y-4">
            <h1 className="text-2xl font-semibold hover:underline">
              <Link href={'#'}>{frontmatter.title}</Link>
            </h1>
            <Component
              components={{
                h1: () => null,
                h2: () => null,
                h3: () => null,
                ol: () => null,
                li: () => null,
                pre: () => null,
                p: props => renderFirstSentence(props, idx),
              }}
            />
          </div>
        );
      })}
    </>
  );
};

export default CategoryPosts;
