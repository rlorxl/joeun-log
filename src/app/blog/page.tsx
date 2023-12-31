import React from 'react';
import Posts from '@/components/blog/posts';
import { getAllPosts } from '@/utils/common/get-posts';

const BlogPage = async () => {
  const allPosts = await getAllPosts();
  const passingData = allPosts?.map(({ code, frontmatter }) => ({ code, frontmatter }));

  return (
    <div className="ml-60 h-screen space-y-7 blog-width sm:w-full sm:ml-0 sm:mt-10 py-20">
      {passingData && <Posts posts={passingData} />}
    </div>
  );
};

export default BlogPage;
