export const toUrl = (post: { [key: string]: any }) => {
  const datePath = post.published.split('-').slice(0, 2).join('/');
  const filename = post.title.replaceAll(' ', '-');
  return `/blog/${post.category}/${datePath}/${filename}`;
};
