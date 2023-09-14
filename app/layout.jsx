"use client";
import React, { useMemo } from "react";
import { useLoadScript } from "@react-google-maps/api";
import Map from "./components/Map";
import { SearchContextComponent } from "./contexts/searchContext";
import { MarkerContextProvider } from "./contexts/hoverMarkerContext";
import SearchBar from "./components/SearchBar";
import LocationButton from "./components/LocationButton";
import "./globals.css";
// 以上從page.jsx移來
import { Raleway } from "next/font/google";

const raleway = Raleway({ weight: "400", subsets: ["latin"] });
// matadata不可在client component export
const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
const libraries = ["places", "routes"];

export default function RootLayout({ children }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: useMemo(() => libraries, []),
    region: "TW",
    language: "zh-TW",
  });
  return (
    <html lang="en">
      <body className={`${raleway.className}`}>
        {/* 原本加上px-3 */}
        <div className="container mx-auto my-0 ">
          {isLoaded && (
            <SearchContextComponent>
              <div className="relative h-screen w-full">
                <MarkerContextProvider>
                  <Map />
                  {children}
                </MarkerContextProvider>
              </div>
              <SearchBar />
              <LocationButton />
            </SearchContextComponent>
          )}
        </div>
      </body>
    </html>
  );
}