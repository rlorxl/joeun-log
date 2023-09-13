import React from 'react';
import { getAllPosts } from '@/utils/get-posts';
import Posts from '@/components/blog/posts';

const BlogPage = async () => {
  const allPosts = await getAllPosts();
  const passingData = allPosts?.map(({ code, frontmatter }) => ({ code, frontmatter }));

  return (
    <div className="ml-52 blog-width space-y-5">{passingData && <Posts posts={passingData} />}</div>
  );
};

export default BlogPage;
