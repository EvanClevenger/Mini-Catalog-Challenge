type SearchBarProps = {
  setSearch: (search: string) => void;
};

export function SearchBar({ setSearch }: SearchBarProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <input
        className="w-full rounded-xl border border-gray-600 bg-gray-800 text-gray-100 placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        placeholder="Search devices..."
        type="text"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
