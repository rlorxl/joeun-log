export const toSmallDevice = (str: string) => {
  const result = str.split(' ').map(str => `sm:${str}`);
  return result.join(' ');
};
