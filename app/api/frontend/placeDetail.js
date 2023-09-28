const getDistance = ({ id, location }) => {
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
        reject(new Error(`請求距離失敗:${status}`));
      }
    });
  });
};

const getDetail = ({ map, id }) => {
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
          getUrl({ maxWidth: 640 }),
        );
        resolve({ photos: photoArr, data: results });
      } else {
        reject(new Error(`請求詳細失敗:${status}`));
      }
    });
  });
};

export const getDetailData = async ({ id, map, location }) => {
  try {
    const distanceData = getDistance({ id, location });
    const detailData = getDetail({ map, id });
    const [distance, detail] = await Promise.all([distanceData, detailData]);
    return { distance, detail };
  } catch (error) {
    alert(error.message);
    console.error(error.message);
  }
};
