// export const nearbySearch = async ({ keyword, lat, lng, encodeOptions }) => {
//   const url = `http://localhost:3000/api/search?keyword=${keyword}&lat=${lat}&lng=${lng}&options=${encodeOptions}`;
//   const response = await fetch(url);
//   const data = await response.json();

//   return data;
// };
import { getOption } from "@/app/utils/getOption";

export const nearbySearch = ({ map, keyword, options, location }) => {
  return new Promise((resolve, reject) => {
    // accept object
    const { openNow, distance, min, max } = getOption(options)
    const service = new google.maps.places.PlacesService(map);
    const request = {
      keyword,
      language: "zh-TW",
      region: "TW",
      type: ["restaurant"],
      openNow,
      radius: distance,
      location,
      maxPriceLevel: max,
      minPriceLevel: min,
    };
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // 處理搜索結果
        const data = results.filter((item) => item.hasOwnProperty("opening_hours"))
        resolve(data);
      } else {
        reject(new Error(status));
      }
    });
  });
};
