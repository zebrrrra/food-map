"use client";
import React, { useMemo } from "react";
import { useLoadScript } from "@react-google-maps/api";
import Map from "./components/Map";
import { SearchContextComponent } from "./contexts/searchContext";

const libraries = ["places", "routes"];
const Home = () => {
  // const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  // const [position, setPosition] = useState(null);
  // const { result } = useSearch()

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: useMemo(() => libraries, []),
    region: "TW",
    language: "zh-TW",
  });

  if (!isLoaded) {
    return <div>loading...</div>;
  }

  return (
    isLoaded && (
      <>
        <SearchContextComponent>
          <Map />
        </SearchContextComponent>
      </>
    )
  );
};
export default React.memo(Home);

// h-[calc(100vh-theme(space.52))]
