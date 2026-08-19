"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="empty-state page-shell">
      <p className="eyebrow">Something went wrong</p>
      <h1>The projector stopped.</h1>
      <p>TMDB may be unavailable. Try the request again in a moment.</p>
      <button className="button" onClick={reset}>Try again</button>
    </section>
  );
}
