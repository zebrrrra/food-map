import { NextResponse } from "next/server";
import { getOption } from "@/app/utils/getOption";

const BASE_URL =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const obj = Object.fromEntries(searchParams.entries());
    console.log(obj)

    const keyword = obj["keyword"];
    const lat = obj.lat;
    const lng = obj.lng;
    const options = JSON.parse(obj.options);
    const { openNow, distance, min, max } = getOption(options);

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
