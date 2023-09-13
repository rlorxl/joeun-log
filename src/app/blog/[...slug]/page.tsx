import React from 'react';
import PostDetail from '@/components/blog/detail';
import { getPost } from '@/utils/get-posts';

const DetailPage = async ({ params }: { params: { slug: string } }) => {
  const postDetails = await getPost(params.slug);
  const passingData = Array(postDetails).map(({ code, frontmatter }) => ({ code, frontmatter }));

  return (
    <div className="ml-80 post-width space-y-5 overflow-y-scroll scrollbar-hide">
      {passingData && <PostDetail post={passingData} />}
    </div>
  );
};

export default DetailPage;
