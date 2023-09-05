// import { useState } from "react";
// const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
export const getPosition = (map) => {
  // 嘗試不用state
  if (!map) return;
  navigator.geolocation.getCurrentPosition((position) => {
    const origin = new google.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude,
    );
    map.panTo(origin);
    return origin;
  });
};
