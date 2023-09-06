import React from 'react';
import fs from 'fs';
import path from 'path';
import { TPosts } from '@/types/post';
import { sortingData } from '../../utils/data-sorting';
import Post from '@/components/blog/post';
const yamlFront = require('yaml-front-matter');

const getAllPosts = () => {
  try {
    const rootDirectory = fs.readdirSync('public/posts');
    const posts = rootDirectory.map(folder => fs.readdirSync(`public/posts/${folder}`)).flat();

    let files: any = [];
    rootDirectory.forEach(dir => {
      posts.forEach(post => {
        const filePath = path.join(process.cwd(), `public/posts/${dir}`, post);
        try {
          const fileContent = fs.readFileSync(filePath);
          files = [...files, yamlFront.loadFront(fileContent)];
        } catch (err) {
          console.log(err);
        }
      });
    });
    return files;
  } catch (err) {
    console.log(err);
  }
};

const BlogPage = async () => {
  const allPosts = await getAllPosts();

  return (
    <div className="ml-52 blog-width space-y-5">
      {sortingData(allPosts).map((post: TPosts) => (
        <Post key={post.title} post={post} />
      ))}
    </div>
  );
};

export default BlogPage;
