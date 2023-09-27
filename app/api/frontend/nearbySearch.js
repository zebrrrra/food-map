import { getOption } from "@/app/utils/getOption";
export const nearbySearch = ({ map, keyword, options, location }) => {
  return new Promise((resolve, reject) => {
    const service = new google.maps.places.PlacesService(map);
    const { openNow, distance, min, max } = getOption(options);

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
        const data = results.filter((item) =>
          item.hasOwnProperty("opening_hours"),
        );
        // 處理搜索結果
        resolve(data);
      } else {
        reject(new Error(`搜尋失敗: ${status}`))
      }
    });
  });
};
