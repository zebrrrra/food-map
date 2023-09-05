import { createContext, useContext, useState, useEffect, useRef } from "react";

const SearchContext = createContext();
export const SearchContextComponent = ({ children }) => {
  const [result, setResult] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(true);
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });

  const mapRef = useRef();
  const listRef = useRef();

  useEffect(() => {
    const mmObj = window.matchMedia("(max-width: 768px)");
    const handleResize = () => {
      if (mmObj.matches) {
        /* 窗口小于或等于 768 像素 */
        setIsSmallScreen(true);
      } else {
        /*窗口大于 768 像素 */
        setIsSmallScreen(false);
      }
    };

    handleResize();
    mmObj.addEventListener("resize", handleResize);

    return () => {
      mmObj.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latLng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setCurrentPosition(latLng);
    });
  }, []);

  return (
    <SearchContext.Provider
      value={{
        result,
        setResult,
        isSmallScreen,
        currentPosition,
        setCurrentPosition,
        mapRef,
        listRef,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};
