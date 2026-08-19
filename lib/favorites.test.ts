import { describe, expect, it } from "vitest";
import {
  accessFavoritesStorage,
  addFavorite,
  FAVORITES_KEY,
  readFavorites,
  removeFavorite,
  writeFavorites,
  type FavoriteMovie,
} from "./favorites";

const movie: FavoriteMovie = {
  id: 603,
  title: "The Matrix",
  posterPath: "/poster.jpg",
  releaseDate: "1999-03-31",
  voteAverage: 8.2,
};

function memoryStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
  };
}

describe("favorites", () => {
  it("adds once, removes, and round-trips through versioned storage", () => {
    const storage = memoryStorage();
    const added = addFavorite(addFavorite([], movie), movie);

    expect(added).toEqual([movie]);
    expect(writeFavorites(storage, added)).toBe(true);
    expect(readFavorites(storage)).toEqual([movie]);
    expect(removeFavorite(added, movie.id)).toEqual([]);
  });

  it("falls back safely for corrupt or unavailable storage", () => {
    expect(readFavorites(memoryStorage({ [FAVORITES_KEY]: "not-json" }))).toEqual([]);
    expect(readFavorites(null)).toEqual([]);
    expect(writeFavorites(null, [movie])).toBe(false);
  });

  it("contains errors while acquiring or using storage", () => {
    const unavailable = {
      getItem: () => { throw new Error("blocked"); },
      setItem: () => { throw new Error("blocked"); },
    };

    expect(accessFavoritesStorage(() => { throw new Error("blocked"); })).toBeNull();
    expect(readFavorites(unavailable)).toEqual([]);
    expect(writeFavorites(unavailable, [movie])).toBe(false);
  });
});
