export const FAVORITES_KEY = "reel-good:favorites:v1";

export type FavoriteMovie = {
  id: number;
  title: string;
  posterPath: string | null;
  releaseDate: string;
  voteAverage: number;
};

type FavoritesStorage = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

export function addFavorite(favorites: FavoriteMovie[], movie: FavoriteMovie) {
  return [movie, ...favorites.filter((favorite) => favorite.id !== movie.id)];
}

export function removeFavorite(favorites: FavoriteMovie[], movieId: number) {
  return favorites.filter((favorite) => favorite.id !== movieId);
}

export function readFavorites(storage: FavoritesStorage | null): FavoriteMovie[] {
  if (!storage) return [];

  try {
    const value: unknown = JSON.parse(storage.getItem(FAVORITES_KEY) ?? "[]");
    if (!Array.isArray(value)) return [];

    const unique = new Map<number, FavoriteMovie>();
    for (const item of value) {
      if (isFavoriteMovie(item) && !unique.has(item.id)) unique.set(item.id, item);
    }
    return [...unique.values()];
  } catch {
    return [];
  }
}

export function writeFavorites(storage: FavoritesStorage | null, favorites: FavoriteMovie[]) {
  if (!storage) return false;

  try {
    storage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return true;
  } catch {
    return false;
  }
}

function isFavoriteMovie(value: unknown): value is FavoriteMovie {
  if (!value || typeof value !== "object") return false;
  const movie = value as Record<string, unknown>;
  return typeof movie.id === "number"
    && typeof movie.title === "string"
    && (typeof movie.posterPath === "string" || movie.posterPath === null)
    && typeof movie.releaseDate === "string"
    && typeof movie.voteAverage === "number";
}
