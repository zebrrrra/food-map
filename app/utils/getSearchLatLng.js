export const getSearchLatLng = (data) => {
  if (!data) return;
  console.log(data)
  const locationArr = data.map(({ geometry, place_id, name }) => ({
    location: new google.maps.LatLng(
      geometry.location.lat(),
      geometry.location.lng(),
    ),
    id: place_id,
    name,
  }));

  return locationArr;
};
