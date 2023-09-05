'use client';
import React, { useContext } from 'react';
import BlogLogo from '../../public/mainlogo.svg';
import Image from 'next/image';
import { MainTabContext } from '@/contexts/tab';

const Main = () => {
  const { changeTab } = useContext(MainTabContext);
  const changeTabName = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const name = target.textContent;
    if (typeof name !== 'string') return;
    changeTab(name);
  };

  return (
    <div className="w-full bg-white flex-col mb-16">
      <div className="text-2xl w-full mt-10 space-x-8">
        <button type="button" onClick={changeTabName}>
          me
        </button>
        <button type="button" onClick={changeTabName}>
          contact
        </button>
      </div>
    </div>
  );
};

export default Main;
