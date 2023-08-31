import { createContext, useContext, useState } from "react";

const SearchContext = createContext();
export const SearchContextComponent = ({ children }) => {
  const [result, setResult] = useState(null);

  return (
    <SearchContext.Provider value={{ result, setResult }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};
