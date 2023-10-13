"use client";
import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import Map from "./components/Map";
import SearchBar from "./components/SearchBar";
import LocationButton from "./components/LocationButton";
import Providers from "./components/Providers";
import { GlobalContextComponent } from "./contexts/globalContext";
import { MarkerContextProvider } from "./contexts/hoverMarkerContext";
import "./globals.css";
import { Raleway } from "next/font/google";

const raleway = Raleway({ weight: "400", subsets: ["latin"] });

const libraries = ["places", "routes"];

export default function RootLayout({ children }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
    region: "TW",
    language: "zh-TW",
  });
  return (
    <html lang="en">
      <body className={`${raleway.className}`}>
        {isLoaded && (
          <Providers>
            <GlobalContextComponent>
              <div className="relative h-screen w-full">
                <MarkerContextProvider>
                  <Map>
                    {children}
                  </Map>
                </MarkerContextProvider>
              </div>
              <SearchBar />
              <LocationButton />
            </GlobalContextComponent>
          </Providers>
        )}
      </body>
    </html>
  );
}
