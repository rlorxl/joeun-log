import fs from 'fs';
import path from 'path';
import { bundleMDX } from 'mdx-bundler';

const getFiles = async (dir: string, posts: string[]) => {
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
