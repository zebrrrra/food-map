"use client"
import ResultMarkers from "../components/ResultMarkers"
export default function RestaurantLayout({ children }) {
  return (
    <>
      <ResultMarkers />
      {children}
    </>
  )
}