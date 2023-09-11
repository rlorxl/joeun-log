import { TPosts } from '@/types/post';

// export const sortingData = (data: TPosts[]) => {
//   const translate_1 = data.map(item => ({ ...item, date: item.date.split('-') }));
//   const translate_2 = translate_1.map(item => ({
//     ...item,
//     date: item.date.map(num => (Number(num) < 10 ? '0' + num : num)).join(''),
//   }));
//   const sortedData = translate_2.sort((a, b) => Number(b.date) - Number(a.date));
//   const resultData = sortedData.map(data => ({
//     ...data,
//     date: data.date.slice(0, 4) + '.' + data.date.slice(4, 6) + '.' + data.date.slice(6, 8),
//   }));
//   return resultData;
// };

export const sortingData = (data: { [key: string]: any }[]) => {
  const matters = data.map(item => item.frontmatter);

  const withIndex = matters.map((matter, idx) => {
    const dates = matter.published.split('-');
    const newDate = dates.map((num: number) => (Number(num) < 10 ? '0' + num : num)).join('');
    return { index: idx, date: newDate };
  });

  const sortingDate = withIndex.sort((a, b) => Number(b.date) - Number(a.date));

  const indexes = sortingDate.map(item => item.index);

  const sortedData: { [key: string]: any }[] = [];

  indexes.forEach((index, i) => {
    sortedData[i] = data[index];
  });

  return sortedData;
};
