import React from 'react';
import fs from 'fs';
import path from 'path';
import ArrowRight from '../../../public/icon/arrow-right.svg';
import Image from 'next/image';
import Link from 'next/link';
import { TPosts } from '@/types/post';
import { toUrl } from '../../utils/url';
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
      {allPosts.map((post: TPosts) => (
        <div
          key={post.title}
          className="border-b last:border-b-0 pb-5 border-b-second-color space-y-4">
          <h2 className="text-2xl font-semibold hover:underline">
            <Link href={'#'}>{post.title}</Link>
          </h2>
          <p className="hover:underline">
            <Link href={'#'}>{post.__content}</Link>
          </p>
          <div>
            <span className="mr-2">{post.date}</span>
            {post.tags.split(',').map(tag => (
              <span className="mr-2">{tag}</span>
            ))}
          </div>
          <Link href={toUrl(post)} className="text-sm w-fit flex justify-start items-center">
            <span className="mr-1">더보기</span>
            <Image src={ArrowRight} alt="더보기" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogPage;