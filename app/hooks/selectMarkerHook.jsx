import { useState, useEffect } from "react";
import { useSearch } from "../contexts/searchContext";
import { useRouter } from "next/navigation";

const useSelectMarkerHook = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const { isSmallScreen, listRef } = useSearch();
  const router = useRouter();

  useEffect(() => {
    // 每次點擊marker
    if (selectedMarker) {
      if (isSmallScreen) {
        const target = listRef.current.querySelector(`#${selectedMarker.id}`);
        target.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/detail/${selectedMarker.name}/${selectedMarker.id}`);
      }
    }
  }, [selectedMarker?.id, selectedMarker?.name]);

  return {
    setSelectedMarker,
    selectedMarker,
  };
};

export default useSelectMarkerHook;
