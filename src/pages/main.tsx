// 'use client';

import React from 'react';
import BlogLogo from '../../public/mainlogo.svg';
import Image from 'next/image';

const Main = () => {
  return (
    <main className="w-full min-h-screen flex justify-center items-center">
      <Image src={BlogLogo} alt="logo" />
    </main>
  );
};

export default Main;
