"use client";

import Link from "next/link";
import { useState } from "react";
import { filterMovies } from "@/lib/filter-movies";
import type { MovieSummary } from "@/lib/tmdb";

type QuickFinderProps = {
  trending: MovieSummary[];
  popular: MovieSummary[];
};

export function QuickFinder({ trending, popular }: QuickFinderProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim();
  const matches = filterMovies(trending, popular, query);
  const status = normalizedQuery
    ? `${matches.length} ${matches.length === 1 ? "movie" : "movies"} found`
    : "Start typing to find a movie loaded on this page.";

  return (
    <section className="quick-finder" aria-labelledby="quick-finder-heading">
      <div className="quick-finder-copy">
        <p className="eyebrow">Quick finder</p>
        <h2 id="quick-finder-heading">Find a movie on this page</h2>
        <p id="quick-finder-help">
          Searches only the trending and popular movies already loaded here.
        </p>
      </div>

      <div className="quick-finder-control">
        <label htmlFor="movie-query">Movie title</label>
        <div className="quick-finder-input-row">
          <input
            id="movie-query"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-describedby="quick-finder-help quick-finder-status"
            autoComplete="off"
          />
          {query ? (
            <button type="button" onClick={() => setQuery("")}>
              Clear
            </button>
          ) : null}
        </div>
        <p id="quick-finder-status" className="quick-finder-status" role="status" aria-live="polite">
          {status}
        </p>
      </div>

      {normalizedQuery ? (
        matches.length ? (
          <ul className="quick-finder-results" aria-label="Matching movies">
            {matches.map((movie) => (
              <li key={movie.id}>
                <Link href={`/movies/${movie.id}`}>
                  <span>{movie.title}</span>
                  <span>{movie.releaseDate?.slice(0, 4) || "Coming soon"}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="quick-finder-empty">No movies on this page match “{normalizedQuery}”.</p>
        )
      ) : null}
    </section>
  );
}
