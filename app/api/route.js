import { NextResponse } from "next/server";
import { priceFormat } from "../utils/price";
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

export const getDistance = ({ id, location }) => {
  return new Promise((resolve, reject) => {
    const DistanceService = new google.maps.DistanceMatrixService();
    const distanceRequest = {
      origins: [location],
      destinations: [{ placeId: `${id}` }],
      travelMode: "DRIVING",
    };

    DistanceService.getDistanceMatrix(distanceRequest, (result, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        const data = {
          distance: result.rows[0].elements[0].distance.text,
          duration: result.rows[0].elements[0].duration.text,
        };
        resolve(data);
      } else {
        reject("請求距離失敗", status);
      }
    });
  });
};

export const getDetail = ({ map, id }) => {
  return new Promise((resolve, reject) => {
    const service = new google.maps.places.PlacesService(map);
    const detailRequest = {
      placeId: id,
      fields: [
        "name",
        "formatted_address",
        "photo",
        "opening_hours",
        "formatted_phone_number",
        "rating",
        "reviews",
      ],
      language: "zh-TW",
    };

    service.getDetails(detailRequest, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        const photoArr = results.photos.map(({ getUrl }) =>
          getUrl({ maxWidth: 200, maxHeight: 200 }),
        );
        resolve({ photos: photoArr, data: results });
      } else {
        reject("請求詳細失敗", status);
      }
    });
  });
};
