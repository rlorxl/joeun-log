import React from 'react';
import fs from 'fs';
import path from 'path';
import { sortingData } from '../../utils/data-sorting';
import { bundleMDX } from 'mdx-bundler';
import BlogPosts from './posts';

const getAllPosts = async () => {
  const rootDirectory = fs.readdirSync('public/posts');
  const posts = rootDirectory.map(folder => fs.readdirSync(`public/posts/${folder}`)).flat();

  let files: { [key: string]: any }[] = [];

  const makeMdxSources = async (dir: string) => {
    for (const post of posts) {
      const filePath = path.join(process.cwd(), `public/posts/${dir}`, post);
      if (!filePath) continue;
      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const mdxSource = await bundleMDX({ source: fileContent });
        return mdxSource;
      } catch (err) {
        // console.log(err);
      }
    }
  };

  for (const dir of rootDirectory) {
    const file = await makeMdxSources(dir);
    if (file) files.push(file);
  }

  return files;
  // let files: any = [];
  // rootDirectory.forEach(dir => {
  //   posts.forEach(post => {
  //     const filePath = path.join(process.cwd(), `public/posts/${dir}`, post);
  //     try {
  //       const fileContent = fs.readFileSync(filePath);
  //       files = [...files, yamlFront.loadFront(fileContent)];
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   });
  // });
  // return files;
};

const BlogPage = async () => {
  const allPosts = await getAllPosts();
  const passingData = allPosts.map(({ code, frontmatter }) => ({ code, frontmatter }));
  const sortingPost = sortingData(passingData);

  return (
    <div className="ml-52 blog-width space-y-5">
      <BlogPosts posts={sortingPost} />
    </div>
  );
};

export default BlogPage;
