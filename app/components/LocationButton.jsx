import Image from "next/image";
import location from "@/public/images/worldwideLocation.png";
import { useGlobal } from "../contexts/globalContext";

const LocationButton = () => {
  const { mapRef, setCurrentPosition } = useGlobal();
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
    <div
      className="fixed right-4 top-4 flex h-10 w-10 items-center rounded bg-white shadow-md "
      onClick={handlePanToLocation}
    >
      <Image
        src={location}
        alt="worldwide location"
        width={30}
        height={30}
        className="mx-auto cursor-pointer"
      />
    </div>
  );
};

export default LocationButton;
