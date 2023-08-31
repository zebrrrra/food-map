export const getDay = ({ index, array }) => {
  const reOderedWeekArr = [
    array[array.length - 1],
    ...array.slice(0, array.length - 1),
  ];
  return reOderedWeekArr[index];
};
