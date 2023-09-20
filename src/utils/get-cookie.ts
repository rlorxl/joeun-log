import 'server-only';
import { cookies } from 'next/headers';

const getCookie = () => {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme');
  return theme;
};

export default getCookie;
