import React from 'react';
import fs from 'fs';
import { getFiles } from '@/utils/get-posts';
import PostDetail from '@/components/blog/detail';

const getPost = async (segments: string) => {
  let paths = Array.from(segments);
  let rootPath = '';
  let filename = '';

  paths.forEach((path, i, paths) => {
    if (i === paths.length - 1) filename = `${path}.mdx`;
    else rootPath += `/${path}`;
  });

  const rootDirectory = `public/posts${rootPath}`; // public/posts/develop/2023/8

  try {
    const files = fs.readdirSync(rootDirectory); // [ 'develop.mdx', 'test.mdx' ]
    const post = files.filter(file => file === filename);
    const mdxs = await getFiles(rootDirectory, post);
    return mdxs;
  } catch (err) {
    console.log(err);
  }
};

const DetailPage = async ({ params }: { params: { slug: string } }) => {
  const postDetails = await getPost(params.slug);
  const passingData = postDetails?.map(({ code, frontmatter }) => ({ code, frontmatter }));

  return (
    <div className="ml-48 post-width space-y-5">
      {passingData && <PostDetail post={passingData} />}
    </div>
  );
};

export default DetailPage;
