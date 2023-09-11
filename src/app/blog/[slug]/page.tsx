import fs from 'fs';
import path from 'path';
const yamlFront = require('yaml-front-matter');
import { bundleMDX } from 'mdx-bundler';
import CategoryPosts from './posts';
import { getMDXComponent } from 'mdx-bundler/client';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';

const getCategoryPosts = async (categoryId: string) => {
  const rootDirectory = `public/posts/${categoryId}`;
  const posts = fs.readdirSync(rootDirectory);

  let files: { [key: string]: any }[] = [];
  // posts.forEach(async post => {
  //   const filePath = path.join(process.cwd(), rootDirectory, post);
  //   if (!filePath) return;
  //   try {
  //     const fileContent = fs.readFileSync(filePath, 'utf8');
  //     const mdxSource = await serialize(fileContent, { parseFrontmatter: true });
  //     files = [...files, mdxSource];
  //   } catch (err) {
  //     // console.log(err);
  //   }
  // });
  for (const post of posts) {
    const filePath = path.join(process.cwd(), rootDirectory, post);
    if (!filePath) continue;
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const mdxSource = await bundleMDX({ source: fileContent });
      files.push(mdxSource);
    } catch (err) {
      // console.log(err);
    }
  }
  return files;
};

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  const categoryPosts = await getCategoryPosts(params.slug);

  const codes = categoryPosts.map(post => post.code);
  const frontmatters = categoryPosts.map(post => post.frontmatter);

  return (
    <div className="ml-52 blog-width space-y-5">
      <CategoryPosts codes={codes} frontmatters={frontmatters} />
      {/* {categoryPosts &&
        sortingData(categoryPosts).map((post: TPosts) => <Post key={post.title} post={post} />)} */}
    </div>
  );
};

export default CategoryPage;
