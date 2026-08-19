import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Reel Good", template: "%s | Reel Good" },
  description: "A small, editorial movie browser powered by TMDB and built with Factory.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link className="wordmark" href="/" aria-label="Reel Good home">
            <span className="wordmark-mark" aria-hidden="true">R</span>
            <span>Reel Good</span>
          </Link>
          <nav aria-label="Primary navigation">
            <Link href="/">Discover</Link>
            <a href="#about">About</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer id="about" className="site-footer">
          <div>
            <p className="eyebrow">About this demo</p>
            <p>A reference app for testing an issue-to-PR software factory with Claude Code and Codex.</p>
          </div>
          <div className="tmdb-credit">
            <Image src="/tmdb.svg" alt="TMDB" width="137" height="18" />
            <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
