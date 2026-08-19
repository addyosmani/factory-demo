import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "@/components/favorite-button";
import { imageUrl, type MovieSummary } from "@/lib/tmdb";

export function MovieCard({ movie, index }: { movie: MovieSummary; index: number }) {
  return (
    <article className="movie-card">
      <FavoriteButton movie={movie} />
      <Link href={`/movies/${movie.id}`} aria-label={`View ${movie.title}`}>
        <div className="movie-poster">
          <span className="card-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          {movie.posterPath ? (
            <Image src={imageUrl(movie.posterPath, "w500")} alt="" fill sizes="(max-width: 620px) 70vw, (max-width: 1000px) 31vw, 15vw" />
          ) : <div className="poster-placeholder">No poster</div>}
          <div className="poster-score">{movie.voteAverage.toFixed(1)}</div>
        </div>
        <div className="card-copy">
          <h3>{movie.title}</h3>
          <p>{movie.releaseDate?.slice(0, 4) || "Coming soon"}</p>
        </div>
      </Link>
    </article>
  );
}
