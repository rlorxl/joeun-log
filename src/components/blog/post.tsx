import { TPosts } from '@/types/post';
import { toUrl } from '@/utils/url';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ArrowRight } from '../../../public/icon';

const Post = ({ post }: { post: TPosts }) => {
  const { title, __content, tags, date } = post;
  return (
    <div key={title} className="border-b last:border-b-0 pb-5 border-b-second-color space-y-4">
      <h2 className="text-2xl font-semibold hover:underline">
        <Link href={'#'}>{title}</Link>
      </h2>
      <p className="hover:underline">
        <Link href={'#'}>{__content}</Link>
      </p>
      <div>
        <span className="mr-2">{date}</span>
        {tags.split(',').map(tag => (
          <span className="mr-2">{tag}</span>
        ))}
      </div>
      <Link href={toUrl(post)} className="text-sm w-fit flex justify-start items-center">
        <span className="mr-1">더보기</span>
        <Image src={ArrowRight} alt="더보기" />
      </Link>
    </div>
  );
};

export default Post;
