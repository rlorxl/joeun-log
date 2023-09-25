import Image from 'next/image';
import BlogLogo from '../../public/assets/mainlogo.svg';
import TabContents from '@/components/main/tab-contents';
import { getAllPosts } from '@/utils/common/get-posts';

const Home = async () => {
  const allPosts = await getAllPosts();
  const passingData = allPosts?.map(({ code, frontmatter }) => ({ code, frontmatter }));

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Image src={BlogLogo} alt="logo" className="sm:w-14" />
      {passingData && <TabContents data={passingData} />}
      <footer className="fixed bottom-0 w-full p-5 text-sm text-center text-second-color">
        ©rlorxl. 2023
      </footer>
    </div>
  );
};

export default Home;
