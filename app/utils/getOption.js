import { priceFormat } from "./price";

export const getOption = (options) => {
  if (Object.keys(options).length === 0) {
    return { openNow: false, distance: 3000, min: null, max: null }
  } else {
    const openNow = options.openNow === "yes";
    const distance = options.distance;
    const min = options.prices.length !== 0
      ? priceFormat(options.prices).min
      : null;
    const max = options.prices.length !== 0
      ? priceFormat(options.prices).max
      : null;
    return { openNow, distance, min, max }
  }
}