import { atom } from 'recoil';

const themeState = atom<string>({
  key: 'themeState',
  default: '',
});

export { themeState };
