import { TBlogNav } from '@/types/post';

const LIGHT_MODE = 'light';

const DARK_MODE = 'dark';

const MEDIA = '(prefers-color-scheme: dark)';

const LINKTO: TBlogNav[] = [
  { name: '개발얘기', link: '/blog/develop' },
  { name: '취준일기', link: '/blog/diary' },
  { name: '그냥생각', link: '/blog/daily' },
];

export { LIGHT_MODE, DARK_MODE, MEDIA, LINKTO };
