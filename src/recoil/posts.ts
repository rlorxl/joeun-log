import { TPost } from '@/types/post';
import { atom } from 'recoil';

const postsState = atom<TPost[]>({
  key: 'postsState',
  default: [],
});

const postState = atom<TPost[]>({
  key: 'postState',
  default: [],
});

export { postsState, postState };
