import { useState, useEffect, use } from "react";

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
      <div className="w-full h-full bg-gray-900">
        <div>
          <input
            className="searchBar"
            placeholder="Search devices..."
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </div>
        <div>
          {devices.map((data, index) => (
            <div className="w-20px h-25x bg-white" key={index}>
              {" "}
              <div className="text-bold">{data.name}</div>{" "}
              <img
                src={catagoryImageMap[devices.catagory]}
                alt={data.name}
                className="w-full h-15 object-contain"
              />
              <div>{data.price}</div>
              <div>{data.rating}</div>
              <div>{data.description}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
