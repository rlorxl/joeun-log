export type TPosts = {
  title: string;
  category: string;
  published: string;
  tags?: string;
  description?: string;
};

export type TPost = {
  code: string;
  frontmatter: {
    [key: string]: string;
  };
};
