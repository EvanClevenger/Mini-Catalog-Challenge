import { useState, useEffect } from "react";
import "./index.css";
import { SearchBar } from "../components/SearchBar";
import { CategoryFilters } from "../components/CategoryFilters";
import { FavoriteButton } from "../components/FavoriteButton";
import { Spinner } from "../components/Spinner";
import { CategoryImages as categoryImageMap } from "../components/CatagoryImages";
import { HoverModal } from "../components/HoverModal";

import { useFavorites } from "../hooks/useFavorite";

type Device = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  description: string;
  hoverTimer?: number;
}; // types go above the component

function App() {
  // const [darkMode, setDarkMode] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<Array<any>>([]);
  const [categoryId, setCategoryId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [devices, setDevices] = useState<Device[]>([]);
  const [sortBy, setSortBy] = useState<"none" | "price" | "rating">("none");
  const [hoverModalData, setHoverModalData] = useState<Device | null>(null);

  const { toggleFavorite, favorites, favoritesLoaded } = useFavorites();

  let filteredDevices = devices.filter((device) => {
    const matchSearch = device.name
      .toLowerCase()
      .includes(search.toLowerCase()); //search bar functionality
    const matchCategory = categoryId ? device.category === categoryId : true;
    // category filter functionality
    return matchSearch && matchCategory;
  });

  if (sortBy === "price") {
    filteredDevices = [...filteredDevices].sort((a, b) => a.price - b.price);
  } else if (sortBy === "rating") {
    filteredDevices = [...filteredDevices].sort((a, b) => b.rating - a.rating);
  } // Sort devices based on selected criteria , ... ensures we don't mutate original array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.allSettled([
          fetch("/devices.json"),
          fetch("/categories.json"),
        ]);

        const [devicesData, categoriesData] = results;

        if (devicesData.status === "fulfilled") {
          const devices = await devicesData.value.json();
          setDevices(devices);
        }

        if (categoriesData.status === "fulfilled") {
          const categories = await categoriesData.value.json();
          setCategory(categories);
        }
      } finally {
        setLoading(false); // Set loading to false after both fetches complete
      }
    };

    fetchData();
    //We fetch data from these mock APIs independently, as to not have both fetches fail if only one fails
  }, []);

  return (
    <>
      <div className="min-h-screen w-full bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <SearchBar setSearch={setSearch} />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <CategoryFilters category={category} setCategoryId={setCategoryId} />
          <button
            onClick={() => setSortBy(sortBy === "price" ? "none" : "price")}
            className={`px-4 py-2 m-4 rounded-lg border transition shadow-sm ${
              sortBy === "price"
                ? "bg-blue-600 border-blue-500 text-white"
                : "bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700 hover:border-gray-600"
            }`}
          >
            Sort by Price
          </button>
          <button
            onClick={() => setSortBy(sortBy === "rating" ? "none" : "rating")}
            className={`px-4 py-2 m-4 rounded-lg border transition shadow-sm ${
              sortBy === "rating"
                ? "bg-blue-600 border-blue-500 text-white"
                : "bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700 hover:border-gray-600"
            }`}
          >
            Sort by Rating
          </button>
        </div>

        {loading || !favoritesLoaded ? ( //loading tracks device fetch, loaded tracks favorites fetch
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        ) : filteredDevices.length === 0 ? (
          <div className="col-span-full flex justify-center py-10">
            <p className="px-4 py-4 rounded-lg bg-red-200 text-red-800 text-center font-medium select-none ">
              No devices found, please try a different device name.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-4">
            {filteredDevices.map((data) => (
              <div
                key={data.id + (favorites[data.id] ? "-fav" : "")}
                className="relative rounded-xl bg-gray-800 border border-gray-700 p-5 shadow-md hover:shadow-lg transition"
                onMouseEnter={() => {
                  const timer = setTimeout(() => {
                    setHoverModalData(data);
                  }, 3500);
                  data.hoverTimer = timer;
                }}
                onMouseLeave={() => {
                  clearTimeout(data.hoverTimer);
                  // setHoverModalData(null);
                }}
              >
                <FavoriteButton
                  id={data.id}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
                <img
                  src={categoryImageMap[data.category]}
                  className="w-full h-40 object-contain mb-4"
                />

                <h1 className="text-lg font-semibold text-gray-100 mb-1">
                  {data.name}
                </h1>

                <div className="text-blue-300 font-medium mb-1">
                  ${data.price}
                </div>
                <div className="text-blue-200 text-sm mb-2">
                  {data.rating} / 5
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {data.description}
                </p>
              </div>
            ))}
          </div>
        )}
        {hoverModalData && (
          <HoverModal
            data={hoverModalData}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            onClose={() => setHoverModalData(null)}
          />
        )}
      </div>
    </>
  );
}

export default App;
