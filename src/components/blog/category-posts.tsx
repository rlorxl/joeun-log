import { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react';
import { MDXContentProps, getMDXComponent } from 'mdx-bundler/client';
import Link from 'next/link';

const CategoryPosts = ({
  codes,
  frontmatters,
}: {
  codes: any[];
  frontmatters: { [key: string]: any }[];
}) => {
  const [mdxComponents, setMdxComponents] = useState<{ [key: string]: any }>([]);
  const firstSentence = useRef<boolean>(false);

  useEffect(() => {
    if (!codes) return;

    let source: { [key: string]: any }[] = [];

    for (let i = 0; i < codes.length; i++) {
      const newObj = {
        component: getMDXComponent(codes[i]),
        matters: frontmatters[i],
      };
      source.push(newObj);
    }

    setMdxComponents(source);
  }, [codes]);

  const renderFirstP = (props: any) => {
    let sentences = '';
    const text = props.children;

    if (!firstSentence.current) {
      sentences = text;
      firstSentence.current = true;
      return <p>{sentences}</p>;
    }

    return null;
  };

  return (
    <>
      {mdxComponents.map((item: any) => (
        <div
          key={item.matters.title}
          className="border-b last:border-b-0 pb-5 border-b-second-color space-y-4">
          <h1 className="text-2xl font-semibold hover:underline">
            <Link href={'#'}>{item.matters.title}</Link>
          </h1>
          <item.component
            components={{
              h1: () => null,
              h2: () => null,
              h3: () => null,
              ol: () => null,
              li: () => null,
              p: renderFirstP,
            }}
          />
        </div>
      ))}
    </>
  );
};

export default CategoryPosts;
