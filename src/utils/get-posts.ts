import fs from 'fs';
import path from 'path';
import { bundleMDX } from 'mdx-bundler';

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

export const getPost = async (rootPath: string, filename: string) => {
  // let paths = Array.from(segments);
  // let rootPath = '';
  // let filename = '';

  // paths.forEach((path, i, paths) => {
  //   if (i === paths.length - 1) filename = `${path}.mdx`;
  //   else rootPath += `/${path}`;
  // });

  const rootDirectory = `public/posts${rootPath}`; // public/posts/develop/2023/8

  try {
    const files = fs.readdirSync(rootDirectory); // [ 'develop.mdx', 'test.mdx' ]
    const post = files.filter(file => file === filename);
    const mdxs = await getFiles(rootDirectory, post);
    return mdxs;
  } catch (err) {
    console.log(err);
  }
};

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
