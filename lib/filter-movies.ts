import type { MovieSummary } from "./tmdb";

export function filterMovies(
  trending: MovieSummary[],
  popular: MovieSummary[],
  query: string,
): MovieSummary[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) return [];

  const uniqueMovies = new Map<number, MovieSummary>();
  for (const movie of [...trending, ...popular]) {
    if (!uniqueMovies.has(movie.id)) uniqueMovies.set(movie.id, movie);
  }

  return [...uniqueMovies.values()].filter((movie) =>
    movie.title.toLocaleLowerCase().includes(normalizedQuery),
  );
}
