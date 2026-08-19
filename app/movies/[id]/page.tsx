import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FavoriteButton } from "@/components/favorite-button";
import { SetupNotice } from "@/components/setup-notice";
import { getMovie, imageUrl, MissingTmdbKeyError, TmdbNotFoundError } from "@/lib/tmdb";

type MoviePageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  try {
    const movie = await getMovie((await params).id);
    return { title: movie.title, description: movie.overview };
  } catch {
    return { title: "Movie" };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const result = await loadMovie(id);
  if (result.status === "missing-key") return <SetupNotice />;

  const movie = result.movie;
  const year = movie.releaseDate?.slice(0, 4);

  return (
    <article className="detail">
      <div className="detail-backdrop">
        {movie.backdropPath ? (
          <Image src={imageUrl(movie.backdropPath, "original")} alt="" fill priority sizes="100vw" />
        ) : null}
        <div className="detail-shade" />
      </div>
      <div className="detail-content page-shell">
        <Link className="back-link" href="/">← Back to discover</Link>
        <div className="detail-layout">
          <div className="detail-poster">
            {movie.posterPath ? (
              <Image src={imageUrl(movie.posterPath, "w500")} alt={`${movie.title} poster`} fill sizes="(max-width: 700px) 70vw, 320px" />
            ) : <div className="poster-placeholder">No poster</div>}
          </div>
          <div className="detail-copy">
            <p className="eyebrow">{movie.genres.map((genre) => genre.name).join(" · ")}</p>
            <h1>{movie.title}</h1>
            {movie.tagline ? <p className="tagline">{movie.tagline}</p> : null}
            <div className="facts" aria-label="Movie facts">
              {year ? <span>{year}</span> : null}
              {movie.runtime ? <span>{formatRuntime(movie.runtime)}</span> : null}
              <span>{movie.voteAverage.toFixed(1)} / 10</span>
            </div>
            <p className="overview">{movie.overview || "TMDB does not have a synopsis for this film yet."}</p>
            <div className="detail-actions">
              <FavoriteButton movie={movie} />
              {movie.homepage ? <a className="button" href={movie.homepage}>Official site <span aria-hidden="true">↗</span></a> : null}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

async function loadMovie(id: string) {
  try {
    return { status: "ready" as const, movie: await getMovie(id) };
  } catch (error) {
    if (error instanceof MissingTmdbKeyError) return { status: "missing-key" as const };
    if (error instanceof TmdbNotFoundError) notFound();
    throw error;
  }
}

function formatRuntime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return `${hours}h ${remainder}m`;
}
