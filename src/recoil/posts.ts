import { TPosts } from '@/types/post';
import { atom } from 'recoil';

export const postsState = atom<{ code: string; frontmatter: { [key: string]: string } }[]>({
  key: 'postsState',
  default: [],
});
