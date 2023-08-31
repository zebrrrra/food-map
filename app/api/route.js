import { NextResponse } from "next/server";
import { priceFormat } from "../utils/priceFormat";
export const getNearbySearch = ({ map, keyword, options, location }) => {
  return new Promise((resolve, reject) => {
    const priceArr = options.prices;
    const service = new google.maps.places.PlacesService(map);
    const request = {
      keyword,
      language: "zh-TW",
      region: "TW",
      type: ["restaurant"],
      openNow: options.openNow === "yes",
      radius: options.distance,
      location,
      maxPriceLevel: priceFormat(priceArr).max,
      minPriceLevel: priceFormat(priceArr).min,
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // 處理搜索結果
        resolve(results);
      } else {
        reject("搜尋失敗", status);
      }
    });
  });
};
