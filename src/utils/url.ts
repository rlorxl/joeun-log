import { TPosts } from '@/types/post';

export const toUrl = (post: TPosts) => `/${post.category}/${post.date.replaceAll('.', '/')}/post`;
