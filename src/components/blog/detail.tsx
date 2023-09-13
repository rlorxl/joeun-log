import { TPost } from '@/types/post';
import { getMDXComponent } from 'mdx-bundler/client';
import React from 'react';

const PostDetail = ({ post }: { post: TPost[] }) => {
  return (
    <>
      {post.map(({ code, frontmatter }, idx) => {
        const Comopnent = getMDXComponent(code);
        return (
          <div key={idx}>
            <section className="mb-10">
              <p className="text-4xl font-bold mb-4">{frontmatter.title}</p>
              <div>
                {frontmatter.tags.split(',').map((tag: string, i: number) => (
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
                pre: props => (
                  <pre className="bg-gray-800 rounded-lg mt-6 p-5 text-sm text-white" {...props} />
                ),
                code: props => <code className=" bg-[#E9EAEE] rounded-md p-1 text-sm" {...props} />,
              }}
            />
          </div>
        );
      })}
    </>
  );
};

export default PostDetail;
