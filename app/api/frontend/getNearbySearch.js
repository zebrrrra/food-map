export const getNearbySearch = async ({ keyword, lat, lng, encodeOptions }) => {
  const url = `http://localhost:3000/api/search?keyword=${keyword}&lat=${lat}&lng=${lng}&options=${encodeOptions}`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
};
