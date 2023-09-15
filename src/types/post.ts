export type TPosts = {
  title: string;
  category: string;
  published: string;
  keywords: string;
  description?: string;
};

export type TPost = {
  code: string;
  frontmatter: {
    [key: string]: string;
  };
};
