import Image from 'next/image';
import BlogLogo from '../../public/mainlogo.svg';
import TabContents from '@/components/main/tab-contents';
import { getAllPosts } from '@/utils/get-posts';

const Home = async () => {
  const allPosts = await getAllPosts();
  const passingData = allPosts?.map(({ code, frontmatter }) => ({ code, frontmatter }));

  return (
    <>
      <Image src={BlogLogo} alt="logo" />
      {passingData && <TabContents data={passingData} />}
      <footer className="text-sm text-second-color fixed bottom-10">© rlorxl. 2023</footer>
    </>
  );
};

export default Home;
