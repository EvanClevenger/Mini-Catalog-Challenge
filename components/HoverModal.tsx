interface HoverModalData {
  name: string;
  price: number;
  rating: number;
  description?: string;
  id: string;
}

import { FavoriteButton } from "./FavoriteButton";

export function HoverModal({
  // props type definition
  data,
  favorites,
  toggleFavorite,
  onClose,
}: {
  // props
  data: HoverModalData | null;
  favorites: Record<string, boolean>;
  toggleFavorite: (id: string) => void;
  onClose: () => void;
}) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex justify-center items-center z-50">
      <div className="relative bg-gray-800 text-gray-100 pt-12 px-6 pb-6 rounded-xl shadow-xl max-w-md w-full">
        {/* Favorite button in top-right */}
        <div className="absolute top-3 right-3 z-50 pointer-events-auto">
          <FavoriteButton
            id={data.id}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        </div>

        <h2 className="text-xl font-semibold mb-2">{data.name}</h2>

        <p className="text-blue-300 font-medium mb-1">${data.price}</p>
        <p className="text-blue-200 mb-4">{data.rating} / 5</p>

        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {data.description ||
            "Lorum ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
        </p>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-400 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
