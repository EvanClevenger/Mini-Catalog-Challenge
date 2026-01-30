import { describe, expect, it } from "vitest";

const mockDevices = [
  { id: 1, name: "Airpods", category: "audio", price: 100, rating: 4 },
  { id: 2, name: "Monitor", category: "display", price: 50, rating: 5 },
  { id: 3, name: "Speaker", category: "audio", price: 200, rating: 3 },
];

const filterByName = (devices: any[], search: string) => {
  return devices.filter((dev) =>
    dev.name.toLowerCase().includes(search.toLowerCase()),
  );
};

const filterByCategory = (devices: any[], categoryId: string) => {
  if (!categoryId) return devices;
  return devices.filter((dev) => dev.category === categoryId);
};

const sortDevices = (devices: any[], sortBy: string | null) => {
  const sortedDevices = [...devices];
  if (sortBy === "price") {
    return sortedDevices.sort((a, b) => a.price - b.price);
  }
  if (sortBy === "rating") {
    return sortedDevices.sort((a, b) => b.rating - a.rating);
  }
  if (sortBy === "name") {
    return sortedDevices.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "category") {
    return sortedDevices.sort((a, b) => a.category.localeCompare(b.category));
  }
  return sortedDevices;
};

describe("Device Filtering and Sorting", () => {
  it("filters by name", () => {
    const result = filterByName(mockDevices, "air");
    expect(result).toEqual([
      { id: 1, name: "Airpods", category: "audio", price: 100, rating: 4 },
    ]);
  });
  it("filters by category", () => {
    const result = filterByCategory(mockDevices, "audio");
    expect(result.length).toBe(2);
  });

  it("sorts by price", () => {
    const result = sortDevices(mockDevices, "price");
    expect(result[0].price).toBe(50);
  });

  it("sorts by rating", () => {
    const result = sortDevices(mockDevices, "rating");
    expect(result[0].rating).toBe(5);
  });

  it("sorts by name", () => {
    const result = sortDevices(mockDevices, "name");
    expect(result[0].name).toBe("Airpods");
  });

  it("sorts by category", () => {
    const result = sortDevices(mockDevices, "category");
    expect(result[0].category).toBe("audio");
  });
});
