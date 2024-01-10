'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ArrowRight from '~/public/assets/icon/arrow-right.svg';

import { useRecoilValue } from 'recoil';
import { postsState } from '@/recoil/posts';

import { toUrl } from '@/utils/url';
import { fadeInAnimate } from '@/utils/fadeIn-animate';
import { TPost } from '@/types/post';

const RecentPosts = () => {
  const posts = useRecoilValue(postsState);
  const [openPosts, setOpenPosts] = useState<TPost[]>([]);

  useEffect(() => {
    if (!posts) return;
    const filteredPosts = posts.filter(post => !post.frontmatter.secret);
    setOpenPosts(filteredPosts);
  }, [posts]);

  return (
    <>
      {openPosts.length > 0 && (
        <div className="flex justify-between items-start sm:p-5">
          <h2 className="mr-10 text-2xl font-bold sm:hidden">최근 글</h2>
          <div className="shrink-0">
            <ul className="space-y-2 sm:hidden">
              {openPosts.slice(0, 4).map(({ frontmatter }, idx) => (
                <li key={frontmatter.title} className={'flex-between' + fadeInAnimate(idx)}>
                  <Link href={toUrl(frontmatter)} className="mr-12 text-lg hover:underline">
                    {frontmatter.title}
                  </Link>
                  <p className="text-sm">{frontmatter.published}</p>
                </li>
              ))}
            </ul>
            <Link href="/blog" className="flex justify-center items-center gap-1 mt-8 w-fit group">
              전체보기
              <div className="group-hover:animate-moveright">
                <Image src={ArrowRight} alt="전체보기" />
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default RecentPosts;
