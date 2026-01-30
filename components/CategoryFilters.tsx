type CategoryFiltersProps = {
  category: Array<{ id: string; name: string }>;
  setCategoryId: (id: string) => void;
  categoryId: string;
};

export function CategoryFilters({
  category,
  setCategoryId,
  categoryId,
}: CategoryFiltersProps) {
  return (
    <div className="mt- flex flex-wrap gap-3">
      {category.map((data) => (
        <button
          key={data.id}
          className={`px-4 py-2 m-4 rounded-lg border transition shadow-sm ${
            categoryId === data.id
              ? "bg-blue-600 border-blue-500 text-white"
              : "bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700 hover:border-gray-600"
          }`}
          onClick={() => setCategoryId(categoryId === data.id ? "" : data.id)}
        >
          {data.name}
        </button>
      ))}
    </div>
  );
}
