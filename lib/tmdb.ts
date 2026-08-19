import "server-only";
import { mockDetail, mockPopular, mockTrending } from "./tmdb-fixtures";

const TMDB_API_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p";

export type MovieSummary = {
  id: number;
  title: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  voteAverage: number;
};

export type MovieDetail = MovieSummary & {
  genres: Array<{ id: number; name: string }>;
  homepage: string | null;
  runtime: number | null;
  tagline: string;
};

type TmdbMovie = {
  id: number;
  title: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  vote_average?: number;
  genres?: Array<{ id: number; name: string }>;
  homepage?: string | null;
  runtime?: number | null;
  tagline?: string;
};

export class MissingTmdbKeyError extends Error {}
export class TmdbNotFoundError extends Error {}

export function imageUrl(path: string, size: "w500" | "original" = "w500") {
  return `${TMDB_IMAGE_URL}/${size}${path}`;
}

export async function getHomeMovies(): Promise<{ trending: MovieSummary[]; popular: MovieSummary[] }> {
  if (mocksEnabled()) return { trending: mockTrending.map(toSummary), popular: mockPopular.map(toSummary) };
  const [trending, popular] = await Promise.all([
    request<{ results: TmdbMovie[] }>("/trending/movie/week"),
    request<{ results: TmdbMovie[] }>("/movie/popular"),
  ]);
  return { trending: trending.results.map(toSummary), popular: popular.results.map(toSummary) };
}

export async function getMovie(id: string): Promise<MovieDetail> {
  if (mocksEnabled()) {
    if (id !== String(mockDetail.id)) throw new TmdbNotFoundError(`Movie ${id} was not found`);
    return toDetail(mockDetail);
  }
  return toDetail(await request<TmdbMovie>(`/movie/${encodeURIComponent(id)}`));
}

async function request<T>(path: string): Promise<T> {
  const apiKey = process.env.TMDB_API_KEY?.trim();
  if (!apiKey) throw new MissingTmdbKeyError("TMDB_API_KEY is not configured");

  const url = new URL(`${TMDB_API_URL}${path}`);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("language", "en-US");

  const response = await fetch(url, { next: { revalidate: 900 } });
  if (response.status === 404) throw new TmdbNotFoundError(`${path} was not found`);
  if (!response.ok) throw new Error(`TMDB request failed with ${response.status}`);
  return response.json() as Promise<T>;
}

function toSummary(movie: TmdbMovie): MovieSummary {
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview ?? "",
    posterPath: movie.poster_path ?? null,
    backdropPath: movie.backdrop_path ?? null,
    releaseDate: movie.release_date ?? "",
    voteAverage: movie.vote_average ?? 0,
  };
}

function toDetail(movie: TmdbMovie): MovieDetail {
  return {
    ...toSummary(movie),
    genres: movie.genres ?? [],
    homepage: movie.homepage ?? null,
    runtime: movie.runtime ?? null,
    tagline: movie.tagline ?? "",
  };
}

function mocksEnabled() {
  return process.env.TMDB_USE_MOCKS === "true";
}
