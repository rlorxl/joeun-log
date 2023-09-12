import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import BlogLogo from '../../public/mainlogo.svg';
import TabContents from '@/components/main/tab-contents';
import { bundleMDX } from 'mdx-bundler';

// const getPostData = async () => {
//   const filePath = path.join(process.cwd(), 'public/posts/daily', 'daily.mdx'); // 상대경로로 하면 왜 오류?
//   const fileContent = fs.readFileSync(filePath);
//   // console.log(yamlFront.loadFront(fileContent)); 이 함수내부에서만 가능하고 반환할 때는 toString()을 해줘야 한다.
//   return yamlFront.loadFront(fileContent.toString());
// };

// export const generateMetadata = async (): Promise<Metadata> => {
//   const res = await getPostData();
//   return {
//     title: res.title,
//     description: res.description,
//   };
// };

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

const getAllPosts = async () => {
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

const Home = async () => {
  const allPosts = await getAllPosts();
  const passingData = allPosts?.map(({ code, frontmatter }) => ({ code, frontmatter }));

  return (
    <>
      <Image src={BlogLogo} alt="logo" />
      {passingData && <TabContents data={passingData} />}
      <footer className="text-sm text-second-color fixed bottom-10">© rlorxl 2023</footer>
    </>
  );
};

export default Home;
