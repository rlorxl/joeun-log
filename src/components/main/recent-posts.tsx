'use client';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { postsState } from '@/recoil/posts';
import Image from 'next/image';
import ArrowRight from '../../../public/icon/arrow-right.svg';

type TPosts = {
  title: string;
  category: string;
  date: string;
  tags: string;
  description: string;
  __content: string;
};

const RecentPosts = () => {
  const [recentPost, setRecentPost] = useState<TPosts[] | []>([]);
  const posts = useRecoilValue(postsState);

  const sortingData = (data: TPosts[]) => {
    const translate_1 = data.map(item => ({ ...item, date: item.date.split('-') }));
    const translate_2 = translate_1.map(item => ({
      ...item,
      date: item.date.map(num => (Number(num) < 10 ? '0' + num : num)).join(''),
    }));
    const sortedData = translate_2.sort((a, b) => Number(b.date) - Number(a.date));
    const resultData = sortedData.map(data => ({
      ...data,
      date: data.date.slice(0, 4) + '.' + data.date.slice(4, 6) + '.' + data.date.slice(6, 8),
    }));
    setRecentPost(resultData);
  };

  useEffect(() => {
    sortingData(posts);
  }, [posts]);

  const toUrl = (post: TPosts) => `/${post.category}/${post.date.replaceAll('-', '/')}/post`;

  return (
    <div className="flex justify-between items-start">
      <h2 className="mr-10 text-2xl font-bold">최근 글</h2>
      <div className="shrink-0">
        <ul className="space-y-2">
          {recentPost.length > 0 &&
            recentPost.map(post => (
              <li key={post.title} className="flex-between">
                <Link href={toUrl(post)} className="mr-12 text-lg hover:underline">
                  {post.title}
                </Link>
                <p className="text-sm">{post.date}</p>
              </li>
            ))}
        </ul>
        <Link href="/blog" className="flex gap-1 mt-8 w-fit">
          전체보기
          <Image src={ArrowRight} alt="전체보기" />
        </Link>
      </div>
    </div>
  );
};

export default RecentPosts;
