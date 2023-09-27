"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useGlobal } from "../contexts/globalContext";
// import ResultMarkers from "./ResultMarkers";
import useSelectMarkerHook from "../hooks/selectMarkerHook";
import { useMarkerContext } from "../contexts/hoverMarkerContext";
import { getSearchLatLng } from "../utils/getSearchLatLng";

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

const Map = () => {
  const { isSmallScreen, currentPosition, mapRef, result } = useGlobal();
  const { hoveredMarkerId } = useMarkerContext();
  const restaurants = getSearchLatLng(result);
  // const {latLng,id,name} = useMemo(() => getSearchLatLng(result), [result]);

  const { setSelectedMarker } = useSelectMarkerHook();
  console.log(result);
  console.log(restaurants);
  console.log("視口大小", isSmallScreen);

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

            {/* 餐廳markers */}
            {restaurants
              ? restaurants.map(({ id, latLng, name }) => (
                <Marker
                  key={id}
                  position={latLng}
                  icon={{
                    url: "https://img.icons8.com/tiny-glyph/32/visit.png",
                  }}
                  title={name}
                  animation={
                    hoveredMarkerId === id
                      ? google.maps.Animation.BOUNCE
                      : null
                  }
                  onClick={() => setSelectedMarker(id)}
                />
              ))
              : null}
          </GoogleMap>
        </div>
      </div>
    </>
  );
};

export default Map;
