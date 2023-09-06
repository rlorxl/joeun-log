import fs from 'fs';
import { Metadata } from 'next';
import path from 'path';
const yamlFront = require('yaml-front-matter'); // import는 오류. require는 오류 x
import Image from 'next/image';
import BlogLogo from '../../public/mainlogo.svg';
import TabContents from '@/components/main/tab-contents';

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

const Home = async () => {
  const allPosts = await getAllPosts();

  return (
    <>
      <Image src={BlogLogo} alt="logo" />
      <TabContents data={allPosts} />
      <footer className="text-sm text-second-color fixed bottom-10">© rlorxl 2023</footer>
    </>
  );
};

export default Home;
