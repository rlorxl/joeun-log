// import fs from 'fs';
// import path from 'path';
// import compile from '@next/mdx';

// const rootDirectory = path.join(process.cwd(), 'app', 'posts');

// export const getPostBySlug = async (slug: any) => {
//   const realSlug = slug.replace(/\.mdx$/, '');
//   const filePath = path.join(rootDirectory, `${realSlug}.mdx`);
//   const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });

//   const { frontmatter, content } = await compile({
//     source: fileContent,
//     options: { parseFrontmatter: true },
//   });
// };
