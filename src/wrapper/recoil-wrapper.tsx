'use client';

import React from 'react';

import { RecoilRoot } from 'recoil';
import { themeState } from '@/recoil/theme';

import { DARK_MODE, LIGHT_MODE, MEDIA } from '@/constant/constants';

function RecoilRootWrapper({ theme, children }: { theme?: string; children: React.ReactNode }) {
  const initializeState = ({ set }: { set: any }) => {
    if (theme) {
      set(themeState, theme);

      return;
    }

    window.matchMedia(MEDIA).matches ? set(themeState, DARK_MODE) : set(themeState, LIGHT_MODE);
  };

  return <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>;
}

export default RecoilRootWrapper;
