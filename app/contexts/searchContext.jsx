import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

const SearchContext = createContext();
export const SearchContextComponent = ({ children }) => {
  const [result, setResult] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(true);
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const mmObj = window.matchMedia("(max-width: 768px)");
  const mapRef = useRef();
  const listRef = useRef();

  const handleResize = useCallback(() => {
    if (mmObj.matches) {
      /* 視窗小於或等768 像素 */
      setIsSmallScreen(true);
    } else {
      /*視窗大於768像素 */
      setIsSmallScreen(false);
    }
  }, []);

  useEffect(() => {
    mmObj.addEventListener("change", handleResize);

    return () => {
      mmObj.removeEventListener("change", handleResize);
    };
  }, [handleResize]);

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
