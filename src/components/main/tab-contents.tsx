'use client';
import React, { useEffect, useState } from 'react';
import RecentPosts from './recent-posts';
import Me from '../../../public/me.mdx';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSetRecoilState } from 'recoil';
import { postsState } from '@/recoil/posts';
import { TPosts } from '@/types/post';
import { sortingData } from '../../utils/data-sorting';

type TContents = {
  name: string;
  content: JSX.Element | string;
};

let contents: TContents[] = [
  { name: 'blog', content: <RecentPosts /> },
  { name: 'me', content: <Me /> },
  { name: 'contact', content: 'imjoeun08@naver.com' },
];

const TabContents = ({ data }: { data: TPosts[] }) => {
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
  );
};

export default TabContents;
