import React from 'react';
import PostDetail from '@/components/blog/detail';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getPost } from '@/utils/common/get-posts';

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const postDetails = await getPost(params.slug);
  const passingData = Array(postDetails).map(({ code, frontmatter }) => ({ code, frontmatter }));
  const { frontmatter } = passingData[0];

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

const getCookie = () => {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme');
  return theme;
};

const DetailPage = async ({ params }: { params: { slug: string } }) => {
  const postDetails = await getPost(params.slug);
  const passingData = Array(postDetails).map(({ code, frontmatter }) => ({ code, frontmatter }));

  const theme = getCookie();

  return (
    <div className="ml-80 post-width space-y-5 overflow-x-hidden overflow-y-scroll scrollbar-hide sm:w-full sm:ml-0 sm:p-8">
      {passingData && <PostDetail post={passingData} cookie={theme} />}
    </div>
  );
};

export default DetailPage;
