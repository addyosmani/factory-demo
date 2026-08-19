import Link from "next/link";

export default function NotFound() {
  return (
    <section className="empty-state page-shell">
      <p className="eyebrow">404</p>
      <h1>That film left the building.</h1>
      <p>We could not find a matching TMDB movie.</p>
      <Link className="button" href="/">Back to discover</Link>
    </section>
  );
}
