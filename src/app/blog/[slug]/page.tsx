import fs from 'fs';
import Posts from '@/components/blog/posts';
import { getFiles } from '@/utils/common/get-posts';

const getCategoryPosts = async (categoryId: string) => {
  const rootDirectory = `public/posts/${categoryId}`;
  const years = fs.readdirSync(rootDirectory); // ['2023','2024']

  let mdxSources: { [key: string]: any }[] = [];

  for (const year of years) {
    const dirpath = `${rootDirectory}/${year}`;
    const months = fs.readdirSync(dirpath);

    for (const month of months) {
      const dirpath_2 = `${dirpath}/${month}`;
      const files = fs.readdirSync(dirpath_2);
      const mdxs = await getFiles(dirpath_2, files);
      mdxSources = [...mdxSources, ...mdxs];
    }
  }
  return mdxSources.map(({ code, frontmatter }) => ({ code, frontmatter }));
};

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  const categoryPosts = await getCategoryPosts(params.slug);

  return (
    <div className="ml-60 blog-width min-h-[1200px] space-y-5 sm:w-full sm:ml-0 sm:mt-10 py-20">
      {categoryPosts.length > 0 ? (
        <Posts posts={categoryPosts} />
      ) : (
        <div className="italic text-sm flex-center p-5">아직 아무것도 없어요 !</div>
      )}
    </div>
  );
};

export default CategoryPage;
