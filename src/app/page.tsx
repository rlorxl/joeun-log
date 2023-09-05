import Test from '/public/posts/test.mdx';
import Main from '../pages/main';
import fs from 'fs';
import { Metadata } from 'next';
import path from 'path';
const yamlFront = require('yaml-front-matter'); // import는 오류. require는 오류 x

const getPostData = async () => {
  const filePath = path.join(process.cwd(), '/public/posts', 'test.mdx'); // 상대경로로 하면 왜 오류?
  const fileContent = fs.readFileSync(filePath);
  // console.log(yamlFront.loadFront(fileContent)); 이 함수내부에서만 가능하고 반환할 때는 toString()을 해줘야 한다.
  return yamlFront.loadFront(fileContent.toString());
  // JSON.parse(fileContent) -> x

  // fs.readFile(filePath, 'utf8', contents => {
  //   console.log(yamlFront.loadFront(contents));
  // });
};

// export const generateMetadata = async (): Promise<Metadata> => {
//   const res = await getPostData();

//   return {
//     title: res.title,
//     description: res.description,
//   };
// };

const Home = async () => {
  return <Main />;
};

export default Home;
