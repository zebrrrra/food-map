import React from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";
// TODO mapRef取得
import { useSearch } from "../contexts/searchContext";

const LocationButton = () => {
  const { mapRef, setCurrentPosition } = useSearch();
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
  return (
    <div className="fixed bottom-[210px] left-2 h-10 w-10 rounded-full bg-white md:bottom-[93vh] md:left-[32vw]">
      <MapPinIcon
        onClick={handlePanToLocation}
        className="mx-auto my-2 w-6 cursor-pointer"
      />
    </div>
  );
};

export default LocationButton;
