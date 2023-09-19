"use client";
import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  Children,
} from "react";
import { GoogleMap, Marker, Circle, InfoWindow } from "@react-google-maps/api";
import { useSearch } from "../contexts/searchContext";

const containerStyle = {
  width: "100%",
  height: "100%",
};
const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};

const Map = ({ children }) => {
  const [markerName, setMarkerName] = useState(""); //infoWindow使用
  const { isSmallScreen, currentPosition, mapRef } = useSearch();

  console.log(isSmallScreen);

  const latLng = new google.maps.LatLng(
    currentPosition.lat,
    currentPosition.lng,
  );

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const center = useMemo(
    () => ({
      lat: currentPosition.lat,
      lng: currentPosition.lng,
    }),
    [currentPosition.lat, currentPosition.lng],
  );

  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      mapId: "82bd6041d8ef1156",
    }),
    [],
  );

  return (
    <>
      {/* 3000 radius搭配zoom=14,5000 radius搭配zoom=13 */}
      <div className="fixed inset-0">
        <div className=" absolute left-0 top-0 h-full w-full">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            options={options}
            onLoad={onLoad}
          >
            {/* 目前位置marker */}
            {latLng && <Marker position={latLng} />}
            {children}
            {/* FIXME 希望radius以變數代入 */}
            {/* <Circle
              center={currentPosition}
              radius={5000}
              options={defaultOptions}
            /> */}
          </GoogleMap>
        </div>
      </div>
    </>
  );
};

export default Map;
