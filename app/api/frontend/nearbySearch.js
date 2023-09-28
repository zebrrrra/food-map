export const nearbySearch = async ({ keyword, lat, lng, encodeOptions }) => {
  const url = `https://zebrrrra.github.io/food-map/api/search?keyword=${keyword}&lat=${lat}&lng=${lng}&options=${encodeOptions}`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
};