import { atom } from 'recoil';

type TPosts = {
  title: string;
  category: string;
  date: string;
  tags: string;
  description: string;
  __content: string;
};

export const postsState = atom<TPosts[]>({
  key: 'postsState',
  default: [],
});
