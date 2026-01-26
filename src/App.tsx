import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [catagories, setCatagories] = useState<Array<any>>([]);
  const [devices, setDevices] = useState<Array<any>>([
    {
      // default item to show before fetch
      id: "item-001",
      name: "Wireless Earbuds",
      category: "category-001",
      price: 49.99,
      rating: 4.2,
      description:
        "Audio gear with clear, balanced sound and reliable components.",
    },
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const [catagorySelected, setCatagorySelected] = useState<string>("");

  const catagoryImageMap: Record<string, string> = {
    "category-001": "/images/Audio.png",
    "category-002": "/images/Peripherals.png",
    "category-003": "/images/Displays.png",
    "category-004": "/images/Accessories.png",
    "category-005": "/images/Gadgets.png",
  };

  const filteredDevices = devices.filter((device) =>
    device.name.toLowerCase().includes(search.toLowerCase()),
  ); // Filter devices based on search input

  useEffect(() => {
    const fetchData = async () => {
      const results = await Promise.allSettled([
        fetch("/devices.json"),
        fetch("/categories.json"),
      ]);

      const [devicesData, categoriesData] = results;

      // Devices fetch
      if (devicesData.status === "fulfilled") {
        try {
          const devices = await devicesData.value.json();
          setDevices(devices);
        } catch (err) {
          console.error("Failed to parse devices JSON:", err);
        }
      } else {
        console.error("Failed to fetch devices");
      }

      // Categories fetch
      if (categoriesData.status === "fulfilled") {
        try {
          const categories = await categoriesData.value.json();
          setCatagories(categories);
        } catch (err) {
          console.error("Failed to parse categories JSON:", err);
        }
      } else {
        console.error("Failed to fetch categories");
      }
    };
    // We want fetch data from these mock APIs independently, as to not have both fetches fail if only one fails
    fetchData();
  }, []);

  return (
    <>
      <div className="min-h-screen w-full bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <input
            className="w-full rounded-xl border border-gray-600 bg-gray-800 text-gray-100 placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            placeholder="Search devices..."
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {catagories.map((data, index) => (
            <button
              key={index}
              className="px-4 py-2 m-4 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 hover:bg-gray-700 hover:border-gray-600 transition shadow-sm"
            >
              {data.name}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-4">
          {filteredDevices.map((data, index) => (
            <div
              key={index}
              className="rounded-xl bg-gray-800 border border-gray-700 p-5 shadow-md hover:shadow-lg transition"
            >
              <img
                src={catagoryImageMap[data.catagory]}
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
      </div>
    </>
  );
}

export default App;
