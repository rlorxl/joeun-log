import fs from 'fs';
import path from 'path';
import { bundleMDX } from 'mdx-bundler';
import CategoryPosts from './posts';
import { sortingData } from '@/utils/data-sorting';

const getCategoryPosts = async (categoryId: string) => {
  const rootDirectory = `public/posts/${categoryId}`;
  const posts = fs.readdirSync(rootDirectory);

  let files: { [key: string]: any }[] = [];

  for (const post of posts) {
    const filePath = path.join(process.cwd(), rootDirectory, post);
    if (!filePath) continue;
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const mdxSource = await bundleMDX({ source: fileContent });
      files.push(mdxSource);
    } catch (err) {
      console.log(err);
    }
  }
  return files;
};

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  const categoryPosts = await getCategoryPosts(params.slug);
  const passingData = categoryPosts.map(({ code, frontmatter }) => ({ code, frontmatter }));
  const sortingPost = sortingData(passingData);

  return (
    <div className="ml-52 blog-width space-y-5">
      <CategoryPosts posts={sortingPost} />
    </div>
  );
};

export default CategoryPage;
