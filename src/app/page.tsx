import Image from 'next/image';
import BlogLogo from '../../public/mainlogo.svg';
import TabContents from '@/components/main/tab-contents';
import { getAllPosts } from '@/utils/get-posts';

const Home = async () => {
  const allPosts = await getAllPosts();
  const passingData = allPosts?.map(({ code, frontmatter }) => ({ code, frontmatter }));

  return (
    <>
      <Image src={BlogLogo} alt="logo" className="sm:w-14" />
      {passingData && <TabContents data={passingData} />}
      <footer className="fixed bottom-0 bg-white w-full p-5 text-sm text-center text-second-color">
        ©rlorxl. 2023
      </footer>
    </>
  );
};

export default Home;
