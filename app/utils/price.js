export const priceFormat = (data) => {
  const priceLevels = {
    low: { max: 1, min: 0 },
    middle: { max: 3, min: 1 },
    high: { max: 4, min: 3 },
  };

  if (data?.length === 1) {
    return priceLevels[data[0]];
  } else if (data.length === 2) {
    const min = Math.min(priceLevels[data[0]].min, priceLevels[data[1]].min);
    const max = Math.max(priceLevels[data[0]].max, priceLevels[data[1]].max);
    return { max, min };
  } else {
    return { max: 4, min: 0 };
  }
};

export const dollar = (number) => {
  if (!number) return "$";
  return "$".repeat(number);
};
