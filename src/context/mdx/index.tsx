import { createContext, useState } from 'react';

type TPosts = {
  title: string;
  category: string;
  date: string;
  tags: string;
  description: string;
  __content: string;
};

const MdxContext = createContext({
  posts: [
    {
      title: '',
      category: '',
      date: '',
      tags: '',
      description: '',
      __content: '',
    },
  ],
  setList: (list: TPosts[]) => {},
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const MdxProvider = ({ children }: Props): JSX.Element => {
  const [posts, setPosts] = useState<TPosts[]>([]);

  const setList = (list: TPosts[]): void => {
    setPosts(list);
  };

  return (
    <MdxContext.Provider
      value={{
        posts,
        setList,
      }}>
      {children}
    </MdxContext.Provider>
  );
};

export { MdxContext, MdxProvider };
