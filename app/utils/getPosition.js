export const getPosition = (map) => {

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
