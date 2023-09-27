import React from 'react';
import PostDetail from '@/components/blog/detail';
import { Metadata } from 'next';
import { getAllPosts, getPost } from '@/utils/common/get-posts';
import getCookie from '@/utils/common/get-cookie';

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const postDetails = await getPost(params.slug);
  if (!postDetails) return {};
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

export const generateStaticParams = async () => {
  const posts = await getAllPosts();

  if (!posts) return [];
  return posts.map((post: any) => ({ slug: post.slug }));
};

const DetailPage = async ({ params }: { params: { slug: string } }) => {
  // TODO: 물음표(?) 제거하기 - 쿼리스트링으로 인식

  const postDetails = await getPost(params.slug);
  if (!postDetails) return;
  const passingData = Array(postDetails).map(({ code, frontmatter }) => ({ code, frontmatter }));

  const theme = getCookie();

  return (
    <div className="ml-80 relative space-y-5 sm:w-full sm:ml-0 sm:p-8">
      {passingData && <PostDetail post={passingData} cookie={theme} />}
    </div>
  );
};

export default DetailPage;
