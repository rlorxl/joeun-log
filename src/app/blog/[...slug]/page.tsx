import React from 'react';
import PostDetail from '@/components/blog/detail';
import { getPost } from '@/utils/get-posts';

const DetailPage = async ({ params }: { params: { slug: string } }) => {
  let paths = Array.from(params.slug);
  let rootPath = '';
  let filename = '';

  paths.forEach((path, i, paths) => {
    if (i === paths.length - 1) filename = `${path}.mdx`;
    else rootPath += `/${path}`;
  });

  const postDetails = await getPost(rootPath, filename);
  const passingData = postDetails?.map(({ code, frontmatter }) => ({ code, frontmatter }));

  return (
    <div className="ml-80 post-width space-y-5 overflow-y-scroll scrollbar-hide">
      {passingData && <PostDetail post={passingData} />}
    </div>
  );
};

export default DetailPage;
