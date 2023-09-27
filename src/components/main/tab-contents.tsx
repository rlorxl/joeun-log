'use client';
import React, { useEffect, useState } from 'react';
import RecentPosts from './recent-posts';
import Me from '../../../public/me.mdx';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSetRecoilState } from 'recoil';
import { postsState } from '@/recoil/posts';
import { sortingData } from '../../utils/data-sorting';
import Contact from './contact';

type TContents = {
  name: string;
  content: JSX.Element | string;
};

let contents: TContents[] = [
  { name: 'blog', content: <RecentPosts /> },
  { name: 'me', content: <Me /> },
  { name: 'contact', content: <Contact /> },
];

const TabContents = ({
  data,
}: {
  data: { code: string; frontmatter: { [key: string]: string } }[];
}) => {
  const [currentTab, setCurrentTab] = useState<string>('blog');
  const setPosts = useSetRecoilState(postsState);

  const changeTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const name = target.textContent;
    if (typeof name !== 'string') return;
    setCurrentTab(name);
  };

  const mainContent = contents.map(
    ({ name, content }) => name === currentTab && <div key={name}>{content}</div>,
  );

  useEffect(() => {
    if (data.length > 0) {
      const recents = sortingData(data);
      setPosts(recents);
    }
  }, [data]);

  return (
    <div className="w-full flex-col flex-center">
      <div
        className={`text-2xl font-bold w-full my-10 flex-center space-x-8 sm:flex-col sm:space-x-0`}>
        <button
          type="button"
          onClick={changeTab}
          className="relative h-10 hover:before:absolute hover:before:bottom-0 hover:before:left-1/2 hover:before:-translate-x-1/2 s hover:before:w-1/2 hover:before:h-1 hover:before:bg-base-color hover:before:animate-drawline">
          me
        </button>
        <button
          type="button"
          onClick={changeTab}
          className="relative h-10 hover:before:absolute hover:before:bottom-0 hover:before:left-1/2 hover:before:-translate-x-1/2 s hover:before:w-1/2 hover:before:h-1 hover:before:bg-base-color hover:before:animate-drawline">
          contact
        </button>
      </div>
      {currentTab !== 'blog' && (
        <button type="button" className="mb-10 flex-center" onClick={() => setCurrentTab('blog')}>
          <Icon icon="pajamas:go-back" className="mr-2" />
          뒤로
        </button>
      )}
      <div className="text-center sm:px-8 sm:pb-20">{mainContent}</div>
    </div>
  );
};

export default TabContents;
