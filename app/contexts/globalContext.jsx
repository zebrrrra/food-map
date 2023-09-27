import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

const GlobalContext = createContext();

export const GlobalContextComponent = ({ children }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(true);
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const [result, setResult] = useState(null);
  const mmObj = window.matchMedia("(max-width: 768px)");

  const mapRef = useRef();
  const listRef = useRef();

  const handleResize = useCallback(() => {
    if (mmObj.matches) {
      /* 窗口小于或等于 768 像素 */
      setIsSmallScreen(true);
    } else {
      /*窗口大于 768 像素 */
      setIsSmallScreen(false);
    }
  }, []);

  useEffect(() => {
    mmObj.addEventListener("resize", handleResize);

    return () => {
      mmObj.removeEventListener("resize", handleResize);
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
    <GlobalContext.Provider
      value={{
        isSmallScreen,
        currentPosition,
        setCurrentPosition,
        mapRef,
        listRef,
        result, setResult
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  return useContext(GlobalContext);
};
