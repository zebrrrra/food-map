"use client";
import React, { useState } from "react";
import { Combobox } from "@headlessui/react";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import FilterModal from "./FilterModal";
import { priceFormat } from "../utils/priceFormat";
import { getNearbySearch } from "../api/route";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useSearch } from "../contexts/searchContext";

const SearchBar = ({ mapRef, currentPosition }) => {
  const [selected, setSelected] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [options, setOptions] = useState({});
  const { setResult } = useSearch();
  // const location = new google.maps.LatLng(
  //   currentPosition.lat,
  //   currentPosition.lng,
  // );

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
  } = usePlacesAutocomplete({
    requestOptions: {
      region: "TW",
      language: "zh-TW",
      location: currentPosition,
      radius: 5000,
      type: ["restaurant"],
    },
  });

  const fetchResult = async () => {
    if (Object.keys(options).length === 0) return alert("請選擇條件");
    try {
      const data = await getNearbySearch({
        map: mapRef.current,
        keyword: selected,
        options,
        location: currentPosition,
      });
      console.log("data", data);
      setResult(data);
      // onselectRadius(options.distance)
    } catch (error) {
      console.error(error);
    }
  };

  const test = () => {
    console.log("options", options);
    console.log("location", currentPosition);
    console.log(priceFormat(options.prices));
  };
  // const handleConfirmFilter = (selectedData) => {
  //   setOptions(selectedData);
  // };

  return (
    <>
      <FilterModal
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        onConfirm={(selectedData) => setOptions(selectedData)}
      />
      <div
        className={`fixed left-[50%] top-16 w-52 translate-x-[-50%] md:left-0 md:top-8 md:ml-2 md:translate-x-[unset]`}
      >
        <button onClick={test}>測試測試</button>
        <Combobox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            {/* filter鈕 */}
            <button
              onClick={() => setOpenFilter(true)}
              className={`absolute right-[-26%] top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1 md:absolute md:ml-11`}
            >
              <AdjustmentsHorizontalIcon />
            </button>
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                disabled={!ready}
                placeholder="search restaurant.."
                onChange={(e) => setValue(e.target.value)}
              />
              {/* 搜尋鈕 */}
              <Combobox.Button
                className="absolute inset-y-0 right-0 flex items-center pr-2"
                onClick={fetchResult}
              >
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>

            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {data.length === 0 && value !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                status === "OK" &&
                data.map(({ place_id, description }) => (
                  <Combobox.Option
                    key={place_id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={description}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"
                            }`}
                        >
                          {description}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-teal-600"
                              }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </div>
        </Combobox>
      </div>
    </>
  );
};

export default SearchBar;