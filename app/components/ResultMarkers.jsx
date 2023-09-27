import { Marker } from "@react-google-maps/api";
import { getSearchLatLng } from "../utils/getSearchLatLng";
import { useSearch } from "../contexts/searchContext";
import { useMarkerContext } from "../contexts/hoverMarkerContext";
import useSelectMarkerHook from "../hooks/selectMarkerHook";
import { useMemo } from "react";

const ResultMarkers = () => {
  const { result } = useSearch();
  const restaurants = getSearchLatLng(result)
  const { hoveredMarkerId } = useMarkerContext();
  const { setSelectedMarker, selectedMarker } = useSelectMarkerHook();
  console.log('marker', result)
  return (
    <>
      {restaurants &&
        restaurants.map((item) => (
          <Marker
            key={item.id}
            position={item.latLng}
            icon={{
              url: "https://img.icons8.com/tiny-glyph/32/visit.png",
            }}
            title={item.name}
            animation={
              hoveredMarkerId === item.id ? google.maps.Animation.BOUNCE : null
            }
            onClick={() => setSelectedMarker(item.id)}
          />
        ))}
    </>
  );
};

export default ResultMarkers;
