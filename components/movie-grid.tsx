import { MovieCard } from "./movie-card";
import type { MovieSummary } from "@/lib/tmdb";

type MovieGridProps = {
  eyebrow: string;
  title: string;
  description: string;
  movies: MovieSummary[];
};

export function MovieGrid({ eyebrow, title, description, movies }: MovieGridProps) {
  return (
    <section className="movie-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <p>{description}</p>
      </div>
      <div className="movie-grid">
        {movies.map((movie, index) => <MovieCard key={movie.id} movie={movie} index={index} />)}
      </div>
    </section>
  );
}
