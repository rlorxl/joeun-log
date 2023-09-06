'use client';
import Link from 'next/link';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { postsState } from '@/recoil/posts';
import Image from 'next/image';
import ArrowRight from '../../../public/icon/arrow-right.svg';
import { toUrl } from '../../utils/url';

const RecentPosts = () => {
  const posts = useRecoilValue(postsState);

  return (
    <div className="flex justify-between items-start">
      <h2 className="mr-10 text-2xl font-bold">최근 글</h2>
      <div className="shrink-0">
        <ul className="space-y-2">
          {posts.length > 0 &&
            posts.map(post => (
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
