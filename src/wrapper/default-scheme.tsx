'use client';

import { useRecoilValue } from 'recoil';
import { themeState } from '@/recoil/theme';

const CheckDefaultScheme = ({ children }: { children: React.ReactNode }) => {
  const recoilTheme = useRecoilValue(themeState);

  return <body data-theme={recoilTheme}>{children}</body>;
};

export default CheckDefaultScheme;
