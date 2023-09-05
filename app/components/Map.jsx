"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { GoogleMap, Marker, Circle, InfoWindow } from "@react-google-maps/api";
import { useSearch } from "../contexts/searchContext";
import { getSearchLatLng } from "../utils/getSearchLatLng";
import useSelectMarkerHook from "../hooks/selectMarkerHook";
import { useMarkerContext } from "../contexts/hoverMarkerContext";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const Map = () => {
  const { setSelectedMarkerId } = useSelectMarkerHook();
  const [markerName, setMarkerName] = useState(""); //infoWindow使用
  const { hoveredMarkerId } = useMarkerContext();
  const { result, isSmallScreen, currentPosition, mapRef } = useSearch();

  console.log(isSmallScreen);

  const latLng = new google.maps.LatLng(
    currentPosition.lat,
    currentPosition.lng,
  );
  const latLngArr = getSearchLatLng(result);

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

            {/* 搜尋店家marker */}
            {result &&
              latLngArr.map(({ id, latLng, name }) => (
                <Marker
                  key={id}
                  position={latLng}
                  icon="https://img.icons8.com/color/48/food-bar.png"
                  animation={
                    hoveredMarkerId === id ? google.maps.Animation.BOUNCE : null
                  }
                  onClick={() => setSelectedMarkerId(id)}
                />
              ))}

            {/* FIXME 希望radius以變數代入 */}
            <Circle
              center={currentPosition}
              radius={5000}
              options={defaultOptions}
            />
          </GoogleMap>
        </div>
      </div>
    </>
  );
};

export default Map;
