import { NextResponse } from "next/server";
import { priceFormat } from "@/app/utils/price";

const BASE_URL =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const obj = Object.fromEntries(searchParams.entries());
    const keyword = obj["keyword"];
    const lat = obj.lat;
    const lng = obj.lng;
    const options = JSON.parse(obj.options);
    const openNow = options.openNow === "yes";
    const max = priceFormat(options.prices)
      ? priceFormat(options.prices).max
      : null;
    const min = priceFormat(options.prices)
      ? priceFormat(options.prices).min
      : null;
    const distance = options.distance;
    const BasicUrl = `${BASE_URL}keyword=${keyword}&location=${lat},${lng}&maxprice=${max}&minprice=${min}&opennow=${openNow}&radius=${distance}&type=restaurant&language=zh-TW&key=${GOOGLE_API_KEY}`;
    const nonPriceLimitURL = `${BASE_URL}keyword=${keyword}&location=${lat},${lng}&opennow=${openNow}&radius=${distance}&type=restaurant&language=zh-TW&key=${GOOGLE_API_KEY}`;
    const searchURL = max ? BasicUrl : nonPriceLimitURL;

    const response = await fetch(searchURL, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { results, status } = await response.json();

    return NextResponse.json({ results, status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
};
