"use client";

import Image from "next/image";
import Link from "next/link";
import { FavoriteButton, useFavorites } from "@/components/favorite-button";

export default function FavoritesPage() {
  const favorites = useFavorites();

  return (
    <section className="favorites page-shell">
      <p className="eyebrow">Your watchlist</p>
      <h1>Favorites</h1>
      {favorites.length ? (
        <div className="movie-grid">
          {favorites.map((movie) => (
            <article className="movie-card" key={movie.id}>
              <FavoriteButton movie={movie} />
              <Link href={`/movies/${movie.id}`} aria-label={`View ${movie.title}`}>
                <div className="movie-poster">
                  {movie.posterPath ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                      alt=""
                      fill
                      sizes="(max-width: 620px) 70vw, (max-width: 1000px) 31vw, 15vw"
                    />
                  ) : <div className="poster-placeholder">No poster</div>}
                  <div className="poster-score">{movie.voteAverage.toFixed(1)}</div>
                </div>
                <div className="card-copy">
                  <h2>{movie.title}</h2>
                  <p>{movie.releaseDate?.slice(0, 4) || "Coming soon"}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>Your watchlist is ready when you are. Add a film from Discover to keep it here.</p>
          <Link className="button" href="/">Browse Discover</Link>
        </div>
      )}
    </section>
  );
}
