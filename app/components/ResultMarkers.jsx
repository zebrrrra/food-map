import { Marker } from "@react-google-maps/api";
import { getSearchLatLng } from "../utils/getSearchLatLng";
import { useGlobal } from "../contexts/globalContext";
import { useMarkerContext } from "../contexts/hoverMarkerContext";
import useSelectMarkerHook from "../hooks/selectMarkerHook";

const ResultMarkers = () => {
  const { result } = useGlobal();
  const restaurants = getSearchLatLng(result);
  const { hoveredMarkerId } = useMarkerContext();
  const { setSelectedMarker } = useSelectMarkerHook();

  return (
    <>
      {restaurants &&
        restaurants.map((item) => (
          <Marker
            key={item.id}
            position={item.location}
            icon={{
              url: "https://img.icons8.com/tiny-glyph/32/visit.png",
            }}
            title={item.name}
            animation={
              hoveredMarkerId === item.id ? google.maps.Animation.BOUNCE : null
            }
            onClick={() => setSelectedMarker({ name: item.name, id: item.id })}
          />
        ))}
    </>
  );
};

export default ResultMarkers;
