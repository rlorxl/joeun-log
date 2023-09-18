import React from 'react';
import { getAllPosts } from '@/utils/get-posts';
import Posts from '@/components/blog/posts';

const BlogPage = async () => {
  const allPosts = await getAllPosts();
  const passingData = allPosts?.map(({ code, frontmatter }) => ({ code, frontmatter }));

  return (
    <div className="ml-60 blog-width space-y-5 sm:w-full sm:ml-0 sm:mt-10">
      {passingData && <Posts posts={passingData} />}
    </div>
  );
};

export default BlogPage;
