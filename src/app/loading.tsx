'use client';

import React from 'react';
import { Oval } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div>
      <Oval
        height={50}
        width={50}
        color="#535B77"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#9199B5"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default Loading;
