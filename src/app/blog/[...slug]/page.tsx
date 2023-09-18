import React from 'react';
import PostDetail from '@/components/blog/detail';
import { getPost } from '@/utils/get-posts';
import { Metadata } from 'next';

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

const DetailPage = async ({ params }: { params: { slug: string } }) => {
  const postDetails = await getPost(params.slug);
  const passingData = Array(postDetails).map(({ code, frontmatter }) => ({ code, frontmatter }));

  return (
    <div className="ml-80 post-width space-y-5 overflow-y-scroll scrollbar-hide">
      {passingData && <PostDetail post={passingData} />}
    </div>
  );
};

export default DetailPage;
