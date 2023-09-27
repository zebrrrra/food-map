"use client";
import React, { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import FilterModal from "./FilterModal";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useGlobal } from "../contexts/globalContext";
import { useRouter } from "next/navigation";
import { nearbySearch } from "../api/frontend/nearbySearch";
import { useMarkerContext } from "../contexts/hoverMarkerContext";
// import { getNearbySearch } from "../api/frontend/getNearbySearch";
const SearchBar = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [options, setOptions] = useState({});
  const { currentPosition, mapRef, setResult } = useGlobal();
  // const { setResult } = useMarkerContext()
  const router = useRouter();
  const northEast = new google.maps.LatLng(
    currentPosition.lat + 0.05,
    currentPosition.lng + 0.05,
  );
  const southWest = new google.maps.LatLng(
    currentPosition.lat - 0.05,
    currentPosition.lng - 0.05,
  );

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      region: "TW",
      language: "zh-TW",
      locationRestriction: new google.maps.LatLngBounds(southWest, northEast),
      type: ["restaurant"],
    },
    // 停止输入后等待1500毫秒
    debounce: 1000
  });

  const onSearchNavigate = async (e) => {
    e.preventDefault();
    if (!currentPosition) return alert("請提供位置");
    if (!value.trim()) return alert("請輸入文字");
    clearSuggestions();
    try {
      const encodeOptions = encodeURIComponent(JSON.stringify(options));
      const searchData = await nearbySearch({
        map: mapRef.current, keyword: value, options, location: new google.maps.LatLng(
          currentPosition.lat,
          currentPosition.lng,
        )
      })
      // 成功取得data再setresult
      if (searchData) {
        console.log(searchData)
        setResult(searchData)
      }
      // search/keyword/location/options
      router.push(
        `/search/${value}/@${currentPosition.lat},${currentPosition.lng}/options=${encodeOptions}`,
      );
      mapRef.current.panTo(
        new google.maps.LatLng(currentPosition.lat, currentPosition.lng),
      );
      mapRef.current.setZoom(13);

    } catch (error) {
      alert(error.message)
    }
  };

  const test = () => {
    console.log("options", options);
    console.log("location", currentPosition);
  };

  return (
    <>
      <FilterModal
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        onConfirm={(selectedData) => setOptions(selectedData)}
      />
      <div
        className={`fixed left-4 top-4 w-[50vw] md:left-0 md:top-0 md:ml-2 md:mt-1 md:w-[30vw] md:translate-x-[unset]`}
      >
        <button onClick={test}>測試測試</button>
        <Combobox value={value} onChange={setValue}>
          <div className="relative mt-1 md:w-[calc(18rem-58px)] lg:w-[412px]">
            {/* filter鈕 */}
            <button
              onClick={() => setOpenFilter(true)}
              className={`absolute right-[-30%] top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1 shadow-md md:right-[-50px]`}
            >
              <AdjustmentsHorizontalIcon />
            </button>
            <form
              className=" relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md sm:text-sm"
              onSubmit={onSearchNavigate}
            >
              <Combobox.Input
                className="w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 outline-none"
                disabled={!ready}
                placeholder="search restaurant.."
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              {/* 搜尋鈕 */}
              <Combobox.Button
                className="absolute inset-y-0 right-0 flex items-center pr-2"
                onClick={onSearchNavigate}
              >
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </form>
            {data.length !== 0 && (
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm">
                {status === "OK" &&
                  data.map(({ place_id, description }) => (
                    <Combobox.Option
                      key={place_id}
                      className={({ active }) =>
                        `relative cursor-default select-none px-2 py-3 ${active ? "bg-brand-700 text-white" : "text-gray-500"
                        }`
                      }
                      value={description}
                    >
                      {({ selected }) => (
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"
                            }`}
                        >
                          {description}
                        </span>
                      )}
                    </Combobox.Option>
                  ))}
              </Combobox.Options>
            )}
          </div>
        </Combobox>
      </div>
    </>
  );
};

export default SearchBar;
