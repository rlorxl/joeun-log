import React, { Suspense } from 'react';
import PostDetail from '@/components/blog/detail';
import { Metadata } from 'next';
import { getAllPosts, getCategoryPosts, getPost, getPost2 } from '@/utils/common/get-posts';
import getCookie from '@/utils/common/get-cookie';
import Posts from '@/components/blog/posts';
import { TPost } from '@/types/post';

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  if (params.slug.length === 1) return {};

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

// export const generateStaticParams = async () => {
//   const data = await getAllPosts();

//   if (!data) return [];

//   const slugs = data.map(({ matter }) => {
//     let arr = [];
//     const category = matter.data.category;
//     const date = matter.data.published.split('-').slice(0, 2);
//     const title = matter.data.title.replaceAll(' ', '-');

//     // const url = process.env.LOCAL_URL + '/' + title;
//     // const decodedUri = decodeURI(url).split('/');
//     // const name = decodedUri[decodedUri.length - 1];
//     // const replaceComma = name.replaceAll('%2C', ',');
//     // const replaceColon = replaceComma.replaceAll('%3A', ':');

//     arr = [category, ...date, title];
//     // console.log(arr);
//     return arr;
//   });

//   return slugs.map(item => ({ slug: item }));
// };

const DetailPage = async ({ params }: { params: { slug: string } }) => {
  // TODO: 물음표(?) 제거하기 - 쿼리스트링으로 인식
  const data =
    params.slug.length === 1 ? await getCategoryPosts(params.slug) : await getPost(params.slug);

  const theme = getCookie();

  if (params.slug.length === 1) {
    return (
      <div className="ml-60 blog-width min-h-[1200px] space-y-5 sm:w-full sm:ml-0 sm:mt-10 py-20">
        <Posts posts={data as TPost[]} />
      </div>
    );
  }

  return (
    <div className="ml-80 relative space-y-5 sm:w-full sm:ml-0 sm:p-8">
      {data && <PostDetail post={data} cookie={theme} />}
    </div>
  );
};

export default DetailPage;
