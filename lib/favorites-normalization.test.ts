import { describe, expect, it } from "vitest";
import { FAVORITES_KEY, writeFavorites, type FavoriteMovie } from "./favorites";

describe("favorite persistence normalization", () => {
  it("strips surplus movie fields before persisting the favorite", () => {
    const values = new Map<string, string>();
    const storage = {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
    };
    const movie = {
      id: 603,
      title: "The Matrix",
      posterPath: "/poster.jpg",
      releaseDate: "1999-03-31",
      voteAverage: 8.2,
      overview: "This field must not be persisted.",
    } satisfies FavoriteMovie & { overview: string };

    expect(writeFavorites(storage, [movie])).toBe(true);
    expect(JSON.parse(values.get(FAVORITES_KEY) ?? "null")).toEqual([
      {
        id: 603,
        title: "The Matrix",
        posterPath: "/poster.jpg",
        releaseDate: "1999-03-31",
        voteAverage: 8.2,
      },
    ]);
  });
});
