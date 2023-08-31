"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { GoogleMap, Marker, Circle, InfoWindow } from "@react-google-maps/api";
import { useSearch } from "../contexts/searchContext";
import RestaurantScroller from "./RestaurantScroller";
import SearchBar from "./SearchBar";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { getSearchLatLng } from "../utils/getSearchLatLng";
import { getPosition } from "../utils/getPosition";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 23.771,
  lng: 120.921,
};

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [hoveredMarkerId, setHoveredMarkerId] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markerName, setMarkerName] = useState("");
  // const [selectedRadius, setSelectedRadius] = useState(0)
  const { result } = useSearch();
  const latLngArr = getSearchLatLng(result);
  console.log(latLngArr);
  const mapRef = useRef();

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      mapId: "82bd6041d8ef1156",
    }),
    [],
  );

  const handlePanToLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      // setCurrentPosition((prev) => ({
      //   ...prev,
      //   lat: position.coords.latitude,
      //   lng: position.coords.longitude,
      // }));
      setCurrentPosition(
        new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude,
        ),
      );

      mapRef.current.panTo(
        new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude,
        ),
      );
    });
  };

  // 載入時請求位置
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latLng = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude,
      );
      setCurrentPosition(latLng);
      mapRef.current.panTo(latLng);
    });
  }, []);

  const handleMarkerClick = ({ latLng, name }) => {
    mapRef.current.panTo(latLng);
    setSelectedMarker(latLng);
    setMarkerName(name);
  };
  useEffect(() => {
    let bounceTimeout;
    if (hoveredMarkerId) {
      bounceTimeout = setTimeout(() => {
        setHoveredMarkerId(null);
      }, 2000);
    }
    return () => {
      clearTimeout(bounceTimeout);
    };
  }, [hoveredMarkerId]);

  const defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
  };
  return (
    <>
      {/* 3000 radius搭配zoom=14,5000 radius搭配zoom=13 */}
      <div className="relative h-screen w-full">
        <div className="fixed inset-0">
          <div className=" absolute left-0 top-0 h-full w-full">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={13}
              options={options}
              onLoad={onLoad}
            >
              {currentPosition && <Marker position={currentPosition} />}

              {result &&
                latLngArr.map(({ id, latLng, name }) => (
                  <Marker
                    key={id}
                    position={latLng}
                    icon="https://img.icons8.com/color/48/food-bar.png"
                    animation={
                      hoveredMarkerId === id
                        ? google.maps.Animation.BOUNCE
                        : null
                    }
                    onClick={() => handleMarkerClick({ latLng, name })}
                  />
                ))}
              {selectedMarker && (
                <InfoWindow position={selectedMarker}  >
                  <div>{markerName}</div>
                </InfoWindow>
              )}

              {/* FIXME 希望radius以變數代入 */}
              <Circle
                center={currentPosition}
                radius={5000}
                options={defaultOptions}
              />
            </GoogleMap>
          </div>
        </div>
        <RestaurantScroller
          mapRef={mapRef}
          currentPosition={currentPosition}
          onHover={(value) => setHoveredMarkerId(value)}
        />
      </div>
      <SearchBar mapRef={mapRef} currentPosition={currentPosition} />
      <div className="fixed bottom-[210px] left-2 h-10 w-10 rounded-full bg-white md:bottom-[93vh] md:left-[32vw]">
        <MapPinIcon
          onClick={handlePanToLocation}
          className="mx-auto my-2 w-6 cursor-pointer"
        />
      </div>
    </>
  );
};

export default Map;
