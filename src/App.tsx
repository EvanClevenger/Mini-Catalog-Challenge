import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [devices, setDevices] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);

  const catagoryImageMap: Record<string, string> = {
    "category-001": "/images/audio.png",
    "category-002": "/images/peripherals.png",
    "category-003": "/images/displays.png",
    "category-004": "/images/accessories.png",
    "category-005": "/images/gadgets.png",
  };

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch("/devices.json");
        const data = await response.json();
        setDevices(data);

        if (!response.ok) {
          throw new Error("Failed to fetch devices");
        }
      } catch (error) {
        console.error("Error fetching devices:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDevices();
  }, []);

  return (
    <>
      <div className="min-h-screen w-full bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <input
            className="w-full rounded-xl border border-gray-600 bg-gray-800 text-gray-100 placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            placeholder="Search devices..."
            type="text"
            onChange={(e) => setSearch(e.target.value)}></input>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {devices.map((data, index) => (
            <div
              key={index}
              className="rounded-xl bg-gray-800 border border-gray-700 p-5 shadow-md hover:shadow-lg transition">
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
              <div className="text-gray-400 text-sm mb-2">
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
