import { createContext, useContext, useState, useEffect } from "react";

const MarkerContext = createContext();

export const useMarkerContext = () => {
  return useContext(MarkerContext);
};

export const MarkerContextProvider = ({ children }) => {
  const [hoveredMarkerId, setHoveredMarkerId] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    let bounceTimeout;
    if (hoveredMarkerId) {
      bounceTimeout = setTimeout(() => {
        setHoveredMarkerId(null);
      }, 2000);
    }
    return () => {
      clearTimeout(bounceTimeout);
    };
  }, [hoveredMarkerId]);
  return (
    <MarkerContext.Provider
      value={{ hoveredMarkerId, setHoveredMarkerId, result, setResult }}
    >
      {children}
    </MarkerContext.Provider>
  );
};
