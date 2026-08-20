import Image from "next/image";
import Link from "next/link";
import { MovieGrid } from "@/components/movie-grid";
import { QuickFinder } from "@/components/quick-finder";
import { SetupNotice } from "@/components/setup-notice";
import { getHomeMovies, imageUrl, MissingTmdbKeyError } from "@/lib/tmdb";

export const revalidate = 900;

export default async function Home() {
  const result = await loadHome();
  if (result.status === "missing-key") return <SetupNotice />;

  const { trending, popular } = result.data;
  const hero = trending[0];

  return (
    <>
      <section className="hero">
        {hero.backdropPath ? (
          <Image
            className="hero-image"
            src={imageUrl(hero.backdropPath, "original")}
            alt=""
            fill
            priority
            sizes="100vw"
          />
        ) : null}
        <div className="hero-shade" />
        <div className="hero-content page-shell">
          <p className="eyebrow">This week&apos;s conversation</p>
          <h1>{hero.title}</h1>
          <p className="hero-overview">{hero.overview}</p>
          <Link className="button" href={`/movies/${hero.id}`}>
            View the film <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <div className="page-shell home-content">
        <QuickFinder trending={trending} popular={popular} />
        <MovieGrid
          eyebrow="Updated weekly"
          title="Trending now"
          description="The films people are finding, sharing, and talking about this week."
          movies={trending.slice(1, 7)}
        />
        <MovieGrid
          eyebrow="Crowd favorites"
          title="Popular on TMDB"
          description="A broader look at what movie watchers are exploring right now."
          movies={popular.slice(0, 6)}
        />
      </div>
    </>
  );
}

async function loadHome() {
  try {
    return { status: "ready" as const, data: await getHomeMovies() };
  } catch (error) {
    if (error instanceof MissingTmdbKeyError) return { status: "missing-key" as const };
    throw error;
  }
}
