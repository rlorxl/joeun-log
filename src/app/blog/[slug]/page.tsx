import fs from 'fs';
import { getFiles } from '@/utils/get-posts';
import Posts from '@/components/blog/posts';

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
  return mdxSources;
};

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  const categoryPosts = await getCategoryPosts(params.slug);
  const passingData = categoryPosts.map(({ code, frontmatter }) => ({ code, frontmatter }));

  return (
    <div className="ml-52 blog-width space-y-5">
      <Posts posts={passingData} />
    </div>
  );
};

export default CategoryPage;
