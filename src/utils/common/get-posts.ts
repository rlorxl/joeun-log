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

/* 
개별 포스트를 가져오는 함수.
인코딩된 문자 url을 디코딩해서 제대로 된 파일명으로 바꾸고 mdx파일을 가져온다.

findConnectedDash: '---'를 ' - '로 변환한다.
replaceWords: 변환된 특수문자를 올바른 특수문자로 변환한다. (문자 추가예정)

*/
export const getPost = cache(async (segments: string) => {
  let paths = Array.from(segments);
  let rootPath = '';
  let filename = '';

  const findConnectedDash = (target: string) => {
    // const dashIdx = target.indexOf('---'); // 6
    // const arr = target.split('-'); // [ 'Next13', '', '', 'cookie로', '다크모드', '구현하기' ]
    // const nogap = arr.filter(str => str !== ''); // [ 'Next13', 'cookie로', '다크모드', '구현하기' ]
    // const t1 = nogap.join(' ').split(''); // Next13 cookie로 다크모드 구현하기
    // t1.splice(dashIdx, 0, ' ');
    // t1.splice(dashIdx + 1, 0, '-');
    // return t1;
    let filename;
    let indexes: number[] = [];

    target.split('').forEach((str, i, arr) => {
      if (str === '-' && arr[i + 1] === '-' && arr[i + 2] === '-') indexes.push(i + 1);
    });

    filename = target.replaceAll('-', ' ');

    const filenameArr = filename.split('');

    indexes.forEach(idx => filenameArr.splice(idx, 1, '-'));
    filename = filenameArr.join('');

    return filename;
  };

  const replaceWords = (target: string): string => {
    let filename = target; // Next13---cookie로-다크모드-구현하기
    const comma = '%2C';
    const colon = '%3A';

    const replaceDash = findConnectedDash(filename);
    const replaceComma = replaceDash.replaceAll(comma, ',');
    const replaceColon = replaceComma.replaceAll(colon, ':');
    filename = replaceColon;

    return filename;
  };

  paths.forEach((path, i, paths) => {
    if (i !== paths.length - 1) {
      rootPath += `/${path}`;
    } else {
      /* 세그먼트에 한글이 있어서 인코딩된 문자로 반환되기 때문에 디코딩해서 한글로 변환해서 가져와야 한다. 디코딩할때는 전체 Url이 필요. 
        decodeURI(
          'http://localhost:3000/blog/develop/2023/8/%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C-%EB%B9%84%EB%8F%99%EA%B8%B0%EB%A1%9C%EC%A7%81-%EC%B2%98%EB%A6%AC%EC%99%80-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B4%80%EB%A6%AC',
        );
      */
      const url = process.env.LOCAL_URL + '/' + path;
      const decodedUri = decodeURI(url);
      const arr = decodedUri.split('/'); // [ 'http:', '', 'localhost:3000', 'title' ]
      filename = replaceWords(arr[arr.length - 1]);
    }
  });

  const rootDirectory = `public/posts${rootPath}`; // public/posts/develop/2023/8

  try {
    const files = fs.readdirSync(rootDirectory); // [ 'develop.mdx', 'test.mdx' ]

    const mdxs = await getFiles(rootDirectory, files);

    let mdx: { [key: string]: any } = {};
    mdxs.forEach(source => {
      if (source.frontmatter.title === filename) mdx = source;
    });

    const data = Array(mdx).map(({ code, frontmatter }) => ({ code, frontmatter }));

    return data;
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
});

/* 전체 포스트 리스트를 가져오는 함수 */
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
    if (err instanceof Error) console.log(err.message);
  }
};
