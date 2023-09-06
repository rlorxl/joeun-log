'use client';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { MdxContext } from '@/context/mdx';

type TPosts = {
  title: string;
  category: string;
  date: string;
  tags: string;
  description: string;
  __content: string;
};

const RecentPosts = () => {
  const { posts } = useContext(MdxContext);
  const [recentPost, setRecentPost] = useState<TPosts[] | []>([]);

  useEffect(() => {
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

    /* Array(3)
    0: ['2023', '9', '7'],
    1: ['2023', '9', '7'],
    2: ['2023', '9', '7']

    ['2023', '9', '7'] -> ['2023','09','07'] -> 20230907
    */

    if (posts) sortingData(posts);
  }, [posts]);
  return <Link href="/blog">전체보기</Link>;
};

export default RecentPosts;
