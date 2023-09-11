import React from 'react';
import fs from 'fs';
import path from 'path';
import { TPosts } from '@/types/post';
import { sortingData } from '../../utils/data-sorting';
import Post from '@/components/blog/post';
import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent } from 'mdx-bundler/client';
import Link from 'next/link';
import Image from 'next/image';
import ArrowRight from '../../../public/icon/arrow-right.svg';
const yamlFront = require('yaml-front-matter');

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
  const sortingPost = sortingData(allPosts);

  return <div className="ml-52 blog-width space-y-5">{/* BlogPost */}</div>;
};

export default BlogPage;
