import { cookies } from 'next/headers';

const getCookie = () => cookies().get('theme');

export default getCookie;
