export const getSearchLatLng = (data) => {
  if (!data) return;
  const locationArr = data.map(({ geometry, place_id, name }) => ({
    location: new google.maps.LatLng(
      geometry.location.lat,
      geometry.location.lng,
    ),
    id: place_id,
    name,
  }));

  console.log(locationArr);

  return locationArr;
};
