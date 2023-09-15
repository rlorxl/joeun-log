'use client';
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default ThemeWrapper;
