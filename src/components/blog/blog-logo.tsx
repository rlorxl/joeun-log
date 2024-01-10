'use client';

import React from 'react';
import Image from 'next/image';
import LogoWhite from '~/public/assets/logo-white.svg';
import Logo from '~/public/assets/logo.svg';

import { useRecoilValue } from 'recoil';
import { themeState } from '@/recoil/theme';

import { DARK_MODE } from '@/constant/constants';

const BlogLogo = () => {
  const recoilTheme = useRecoilValue(themeState);

  return (
    <>
      {recoilTheme === DARK_MODE ? (
        <Image src={LogoWhite} alt="logo" width={40} />
      ) : (
        <Image src={Logo} alt="logo" width={40} />
      )}
    </>
  );
};

export default BlogLogo;
