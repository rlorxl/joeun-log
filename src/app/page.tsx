'use client';
import Me from '../../public/me.mdx';
// import fs from 'fs';
import { Metadata } from 'next';
import path from 'path';
import { useState } from 'react';
const yamlFront = require('yaml-front-matter'); // import는 오류. require는 오류 x
import { Icon } from '@iconify/react';
import RecentPosts from '@/components/main/recent-posts';
import Image from 'next/image';
import BlogLogo from '../../public/mainlogo.svg';

const getPostData = async () => {
  const filePath = path.join(process.cwd(), '/public/posts', 'test.mdx'); // 상대경로로 하면 왜 오류?
  // const fileContent = fs.readFileSync(filePath);
  // console.log(yamlFront.loadFront(fileContent)); 이 함수내부에서만 가능하고 반환할 때는 toString()을 해줘야 한다.
  // return yamlFront.loadFront(fileContent.toString());
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

type TContents = {
  name: string;
  content: JSX.Element | string;
};

let contents: TContents[] = [
  { name: 'blog', content: <RecentPosts /> },
  { name: 'me', content: <Me /> },
  { name: 'contact', content: 'imjoeun08@naver.com' },
];

const Home = () => {
  const [currentTab, setCurrentTab] = useState<string>('blog');

  const changeTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const name = target.textContent;
    if (typeof name !== 'string') return;
    setCurrentTab(name);
  };

  const mainContent = contents.map(
    ({ name, content }) => name === currentTab && <div key={name}>{content}</div>,
  );

  return (
    <>
      <Image src={BlogLogo} alt="logo" />
      <div className="w-full bg-white flex-col flex-center">
        <div className="text-2xl w-full mt-10 flex-center space-x-8 mb-16">
          <button type="button" onClick={changeTab}>
            me
          </button>
          <button type="button" onClick={changeTab}>
            contact
          </button>
        </div>
        <div className="text-center">{mainContent}</div>
        {currentTab !== 'blog' && (
          <button type="button" className="mt-14 flex-center" onClick={() => setCurrentTab('blog')}>
            <Icon icon="pajamas:go-back" className="mr-2" />
            뒤로
          </button>
        )}
      </div>
      <footer className="text-sm text-second-color fixed bottom-10">© rlorxl 2023</footer>
    </>
  );
};

export default Home;
