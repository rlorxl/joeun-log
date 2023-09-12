import React from 'react';
import BlogPosts from './posts';
import { getAllPosts } from '@/utils/get-posts';

const BlogPage = async () => {
  const allPosts = await getAllPosts();
  const passingData = allPosts?.map(({ code, frontmatter }) => ({ code, frontmatter }));

  return (
    <div className="ml-52 blog-width space-y-5">
      {passingData && <BlogPosts posts={passingData} />}
    </div>
  );
};

export default BlogPage;
