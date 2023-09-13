export type TPosts = {
  title: string;
  category: string;
  date: string;
  tags: string;
  description: string;
  __content: string;
};

export type TPost = {
  code: string;
  frontmatter: { [key: string]: any };
};
