import React, { useCallback, useEffect, useState } from 'react';

const useScroll = (
  id: string,
  headings: React.MutableRefObject<{ name: string; position: number }[]>,
) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [content, setContent] = useState<string>('');

  const scroll = useCallback(() => {
    setScrollPosition(window.scrollY);

    headings.current.forEach(({ name, position }, _, self) => {
      if (window.scrollY > position) setContent(name);
      else if (window.scrollY < self[0].position) setContent('');
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', scroll);

    const $heading = document.getElementById(`${id}`);
    if (!$heading) return;

    const currentId = $heading.id;
    const headingPosition = $heading.offsetTop;

    const names = headings.current.map(({ name }) => name);
    if (!names.includes(currentId))
      headings.current.push({ name: currentId, position: headingPosition });

    // console.log(headings.current);

    return () => window.removeEventListener('scroll', scroll);
  }, []);

  return { scrollPosition, content };
};

export default useScroll;
