import 'server-only';

import fs from 'fs';
import path from 'path';
import { cache } from 'react';
import { bundleMDX } from 'mdx-bundler';

export const revalidate = 3600;

// export const preload = (id: string) => {
//   // void evaluates the given expression and returns undefined
//   // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/void
//   void getPost(id);
// };

export const getFiles = async (dir: string, posts: string[]) => {
  let files: { [key: string]: any }[] = [];

  for (const post of posts) {
    const filePath = path.join(process.cwd(), dir, post);
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const mdxSource = await bundleMDX({ source: fileContent });
      files.push(mdxSource);
    } catch (err) {
      console.log(err);
    }
  }
  return files;
};

export const getPost = cache(async (segments: string) => {
  let paths = Array.from(segments);
  let rootPath = '';
  let filename = '';

  paths.forEach((path, i, paths) => {
    if (i !== paths.length - 1) {
      rootPath += `/${path}`;
    } else {
      /* 세그먼트에 한글이 있어서 인코딩된 문자로 반환되기 때문에 디코딩해서 한글로 변환해서 가져와야 한다. 디코딩할때는 전체 Url이 필요. 
        decodeURI(
          'http://localhost:3000/blog/develop/2023/8/%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C-%EB%B9%84%EB%8F%99%EA%B8%B0%EB%A1%9C%EC%A7%81-%EC%B2%98%EB%A6%AC%EC%99%80-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B4%80%EB%A6%AC',
        );
      */
      const url = process.env.LOCAL_URL + '/' + path; // 로컬 환경변수
      const decodedUri = decodeURI(url);
      const arr = decodedUri.split('/');
      filename = arr[arr.length - 1].replaceAll('-', ' ');
    }
  });

  const rootDirectory = `public/posts${rootPath}`; // public/posts/develop/2023/8

  try {
    const files = fs.readdirSync(rootDirectory); // [ 'develop.mdx', 'test.mdx' ]

    const mdxs = await getFiles(rootDirectory, files);
    // console.log(mdxs);
    let mdx;
    mdxs.forEach(source => {
      if (source.frontmatter.title === filename) mdx = source;
    });
    return mdx;
  } catch (err) {
    console.log(err);
  }
});

export const getAllPosts = async () => {
  try {
    let mdxSources: { [key: string]: any }[] = [];

    const rootDirectory = fs.readdirSync('public/posts'); // ['develop','daily','diary']

    for (const category of rootDirectory) {
      const dirpath = `public/posts/${category}`; // public/posts/develop
      const yearDirectory = fs.readdirSync(dirpath); // ['2023','2024']

      for (const year of yearDirectory) {
        const dirpath_2 = `${dirpath}/${year}`; // public/posts/develop/2023
        const months = fs.readdirSync(dirpath_2); // ['8','9']

        for (const month of months) {
          const dirpath_3 = `${dirpath_2}/${month}`; // public/posts/develop/2023/8
          const files = fs.readdirSync(dirpath_3); // ['develop.tsx', 'develop2.tsx']
          const mdxs = await getFiles(dirpath_3, files);
          mdxSources = [...mdxSources, ...mdxs];
        }
      }
    }
    return mdxSources;
  } catch (err) {
    console.log(err);
  }
};
