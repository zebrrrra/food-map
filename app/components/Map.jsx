"use client";
import React, { useMemo, useCallback } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useSearch } from "../contexts/searchContext";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const Map = ({ children }) => {
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
          </GoogleMap>
        </div>
      </div>
    </>
  );
};

export default Map;
