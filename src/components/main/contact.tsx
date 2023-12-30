import Image from 'next/image';
import React from 'react';
import GithubIcon from '~/public/assets/icon/github.svg';
import VelogIcon from '~/public/assets/icon/velog.svg';
import Link from 'next/link';

const Contact = () => {
  return (
    <div className="space-y-6 flex flex-col items-center">
      <p>imjoeun08@naver.com</p>
      <div className="flex gap-3">
        <Link href={'https://github.com/rlorxl'}>
          <Image src={GithubIcon} width={'24'} alt="깃허브 바로가기" />
        </Link>
        <Link href={'https://velog.io/@rlorxl'}>
          <Image src={VelogIcon} width={'24'} alt="벨로그 바로가기" />
        </Link>
      </div>
    </div>
  );
};

export default Contact;
