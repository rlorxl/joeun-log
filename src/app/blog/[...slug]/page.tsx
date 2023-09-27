import React from 'react';
import PostDetail from '@/components/blog/detail';
import { Metadata } from 'next';
import { getAllPosts, getPost } from '@/utils/common/get-posts';
import getCookie from '@/utils/common/get-cookie';

const findConnectedDash = (target: string) => {
  let filename;
  let indexes: number[] = [];

  target.split('').forEach((str, i, arr) => {
    if (str === '-' && arr[i + 1] === '-' && arr[i + 2] === '-') indexes.push(i + 1);
  });

  filename = target.replaceAll('-', ' ');

  const filenameArr = filename.split('');

  indexes.forEach(idx => filenameArr.splice(idx, 1, '-'));
  filename = filenameArr.join('');

  return filename;
};

const replaceWords = (target: string): string => {
  let filename = target; // Next13---cookie로-다크모드-구현하기
  const comma = '%2C';
  const colon = '%3A';

  const replaceDash = findConnectedDash(filename);
  const replaceComma = replaceDash.replaceAll(comma, ',');
  const replaceColon = replaceComma.replaceAll(colon, ':');
  filename = replaceColon;

  return filename;
};

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const postDetails = await getPost(params.slug);
  if (!postDetails) return {};
  const { frontmatter } = postDetails[0];

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.keywords,
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
      },
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: 'https://nextjs.org',
      // images: [
      //   {
      //     url: 'https://nextjs.org/og.png',
      //     width: 800,
      //     height: 600,
      //   },
      //   {
      //     url: 'https://nextjs.org/og-alt.png',
      //     width: 1800,
      //     height: 1600,
      //     alt: 'My custom alt',
      //   },
      // ],
      // locale: 'en-US',
      type: 'website',
    },
  };
};

export const generateStaticParams = async () => {
  const posts = await getAllPosts();

  if (!posts) return [];

  const slugs = posts.map(({ matter }) => {
    const date = matter.data.published.split('-').slice(0, 2);
    const title = matter.data.title.replaceAll(' ', '-');

    const url = process.env.LOCAL_URL + '/' + title;
    const decodedUri = decodeURI(url);
    const arr = decodedUri.split('/'); // [ 'http:', '', 'localhost:3000', 'title' ]
    const decodedTitle = replaceWords(arr[arr.length - 1]);
    date.push(decodedTitle);
    return date;
  });

  return slugs.map(item => ({ slug: item }));
};

const DetailPage = async ({ params }: { params: { slug: string } }) => {
  // TODO: 물음표(?) 제거하기 - 쿼리스트링으로 인식

  const postDetails = await getPost(params.slug);

  const theme = getCookie();

  return (
    <div className="ml-80 relative space-y-5 sm:w-full sm:ml-0 sm:p-8">
      {postDetails && <PostDetail post={postDetails} cookie={theme} />}
    </div>
  );
};

export default DetailPage;
