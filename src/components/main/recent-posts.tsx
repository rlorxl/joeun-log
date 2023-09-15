'use client';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { postsState } from '@/recoil/posts';
import Image from 'next/image';
import ArrowRight from '../../../public/icon/arrow-right.svg';
import { toUrl } from '../../utils/url';

const popupAni = (i: number): string => {
  let classname = '';
  switch (i) {
    case 0:
      classname = ' animate-show1';
      break;
    case 1:
      classname = ' animate-show2';
      break;
    case 2:
      classname = ' animate-show3';
      break;
    case 3:
      classname = ' animate-show4';
      break;
  }
  return classname;
};

const RecentPosts = () => {
  const posts = useRecoilValue(postsState);

  return (
    <>
      {posts.length > 0 && (
        <div className="flex justify-between items-start">
          <h2 className="mr-10 text-2xl font-bold">최근 글</h2>
          <div className="shrink-0">
            <ul className="space-y-2">
              {posts.slice(0, 4).map(({ frontmatter }, idx) => (
                <li
                  key={frontmatter.title}
                  className={'flex-between' + (idx >= 0 ? popupAni(idx) : '')}>
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
