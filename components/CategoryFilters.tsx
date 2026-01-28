type CategoryFiltersProps = {
  category: Array<{ id: string; name: string }>;
  setCategoryId: (id: string) => void;
};

export function CategoryFilters({
  category,
  setCategoryId,
}: CategoryFiltersProps) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {category.map((data) => (
        <button
          key={data.id}
          className="px-4 py-2 m-4 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 hover:bg-gray-700 hover:border-gray-600 transition shadow-sm"
          onClick={() => setCategoryId(data.id)}
        >
          {data.name}
        </button>
      ))}
    </div>
  );
}
