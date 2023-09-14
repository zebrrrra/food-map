import { useState, useEffect, useMemo } from "react";
import { useSearch } from "../contexts/searchContext";
import { getDetail, getDistance } from "../api/route";
import { useRouter } from "next/navigation";

const useSelectMarkerHook = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const { isSmallScreen, listRef, mapRef, currentPosition } = useSearch();
  const router = useRouter();
  const latLng = new google.maps.LatLng(
    currentPosition.lat,
    currentPosition.lng,
  );

  const getDetailData = async (id) => {
    try {
      const distance = await getDistance({ id, location: latLng });
      const detail = await getDetail({ map: mapRef.current, id });
      console.log(distance);
      console.log(detail);
      return { distance, detail };
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // 每次點擊marker
    if (selectedMarker) {
      if (isSmallScreen) {
        const target = listRef.current.querySelector(`#${selectedMarker}`);
        target.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/detail/${selectedMarker}`);
      }
    }
  }, [selectedMarker]);

  return {
    setSelectedMarker,
    selectedMarker,
    getDetailData,
  };
};

export default useSelectMarkerHook;
