// import server-only

import fs from 'fs';
import path from 'path';
const yamlFront = require('yaml-front-matter');

export const getAllPosts = () => {
  try {
    const rootDirectory = fs.readdirSync('public/posts');
    const posts = rootDirectory.map(folder => fs.readdirSync(`public/posts/${folder}`)).flat();

    let files: any = [];
    rootDirectory.forEach(dir => {
      posts.forEach(post => {
        const filePath = path.join(process.cwd(), `public/posts/${dir}`, post);
        try {
          const fileContent = fs.readFileSync(filePath);
          files = [...files, yamlFront.loadFront(fileContent)];
        } catch (err) {
          console.log(err);
        }
      });
    });
    return files;
  } catch (err) {
    console.log(err);
  }
};
