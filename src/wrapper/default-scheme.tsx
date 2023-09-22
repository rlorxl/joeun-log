'use client';
import { DARK_MODE, LIGHT_MODE, MEDIA } from '@/constants';
import setCookie from '../utils/common/set-cookie';
import { useEffect, useState } from 'react';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const CheckDefaultScheme = ({
  children,
  cookie,
}: {
  children: React.ReactNode;
  cookie?: RequestCookie;
}) => {
  // const [defaultScheme, setDefaultScheme] = useState<string>(LIGHT_MODE);

  // useEffect(() => {
  //   const isDarkmode = window.matchMedia(MEDIA).matches;
  //   if (!isDarkmode) {
  //     setCookie(LIGHT_MODE);
  //   } else {
  //     setCookie(DARK_MODE);
  //     setDefaultScheme(DARK_MODE);
  //   }
  // }, []);

  // return <body data-theme={defaultScheme}>{children}</body>;

  const [defaultScheme, setDefaultScheme] = useState<string | null>(null);

  useEffect(() => {
    const isDarkmode = window.matchMedia(MEDIA).matches;

    if (!isDarkmode) {
      setCookie(LIGHT_MODE);
    } else {
      setCookie(DARK_MODE);
      setDefaultScheme(DARK_MODE);
    }
  }, []);

  if (cookie) return <body data-theme={cookie.value}>{children}</body>;

  return <body data-theme={defaultScheme}>{children}</body>;
};

export default CheckDefaultScheme;
