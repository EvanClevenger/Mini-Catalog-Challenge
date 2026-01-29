type FavoriteButtonProps = {
  id: string;
  favorites: Record<string, boolean>;
  toggleFavorite: (id: string) => void;
};

export function FavoriteButton({
  id,
  favorites,
  toggleFavorite,
}: FavoriteButtonProps) {
  return (
    <button
      onClick={() => toggleFavorite(id)}
      className="absolute bottom-3 right-3 text-lg"
      title={"Favorite this item"}
    >
      {favorites[id] ? "❤️" : "🤍"}
    </button>
  );
}
