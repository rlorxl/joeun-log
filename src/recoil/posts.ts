import { TPosts } from '@/types/post';
import { atom } from 'recoil';

export const postsState = atom<TPosts[]>({
  key: 'postsState',
  default: [],
});
