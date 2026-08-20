import { describe, expect, it } from "vitest";
import { filterMovies } from "./filter-movies";

type TestMovie = Parameters<typeof filterMovies>[0][number];

const movie = (id: number, title: string): TestMovie => ({
  id,
  title,
  overview: "",
  posterPath: null,
  backdropPath: null,
  releaseDate: "",
  voteAverage: 0,
});

describe("filterMovies", () => {
  const trending = [movie(1, "The Dark Knight"), movie(2, "Interstellar")];
  const popular = [movie(1, "The Dark Knight"), movie(3, "The Godfather")];

  it("matches partial titles without regard to case", () => {
    expect(filterMovies(trending, popular, "DARK").map(({ id }) => id)).toEqual([1]);
    expect(filterMovies(trending, popular, "stellar").map(({ id }) => id)).toEqual([2]);
  });

  it("deduplicates movies from the loaded collections by ID", () => {
    expect(filterMovies(trending, popular, "the").map(({ id }) => id)).toEqual([1, 3]);
  });

  it("trims surrounding whitespace and returns no matches for an empty query", () => {
    expect(filterMovies(trending, popular, "  godfather  ").map(({ id }) => id)).toEqual([3]);
    expect(filterMovies(trending, popular, "   ")).toEqual([]);
  });

  it("returns an empty list when no loaded movie matches", () => {
    expect(filterMovies(trending, popular, "Arrival")).toEqual([]);
  });
});
