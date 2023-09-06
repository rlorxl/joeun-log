import React from 'react';
import fs from 'fs';
import path from 'path';
import { TPosts } from '@/types/post';
import { sortingData } from '@/utils/data-sorting';
import Post from '@/components/blog/post';
const yamlFront = require('yaml-front-matter');

const getCategoryPosts = async (categoryId: string) => {
  try {
    const rootDirectory = `public/posts/${categoryId}`;
    const posts = fs.readdirSync(rootDirectory);

    let files: TPosts[] = [];
    posts.forEach(post => {
      const filePath = path.join(process.cwd(), rootDirectory, post);
      try {
        const fileContent = fs.readFileSync(filePath);
        files = [...files, yamlFront.loadFront(fileContent)];
      } catch (err) {
        console.log(err);
      }
    });
    return files;
  } catch (err) {
    console.log(err);
  }
};

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  const categoryPosts = await getCategoryPosts(params.slug);

  return (
    <div className="ml-52 blog-width space-y-5">
      {categoryPosts &&
        sortingData(categoryPosts).map((post: TPosts) => <Post key={post.title} post={post} />)}
    </div>
  );
};

export default CategoryPage;
