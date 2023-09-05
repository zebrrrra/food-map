export const getSearchLatLng = (data) => {
  if (!data) return;
  const locationArr = data
    .map(({ geometry, place_id, name }) => ({
      location: geometry.location,
      id: place_id,
      name,
    }))
    .map(({ location, id, name }) => ({
      latLng: new google.maps.LatLng(location.lat, location.lng),
      id,
      name,
    }));

  console.log(locationArr);

  return locationArr;
};
