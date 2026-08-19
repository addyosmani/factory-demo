# Reel Good: a Factory demo

Reel Good is a small TMDB movie browser and the starting point for a worked software
factory example. At this checkpoint it has a discovery page, movie details, tests around
the API boundary, and a deliberately short setup path.

The finished demo will show how a GitHub issue moves through Factory into a claimed branch,
a tested implementation, an independently verified draft pull request, and a human review.

## Run it locally

You need Node.js 20.9 or newer and your own [TMDB API key](https://www.themoviedb.org/settings/api).

```bash
npm install
cp .env.example .env.local
# Add your key to TMDB_API_KEY in .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The key is read only by the server-side
TMDB client. `.env.local` is ignored by Git and must not be committed.

For a keyless local preview using the committed fixture data:

```bash
TMDB_USE_MOCKS=true npm run dev
```

## Checks

```bash
npm run typecheck
npm run lint
npm test
TMDB_USE_MOCKS=true npm run build
```

## TMDB attribution

This product uses the TMDB API but is not endorsed or certified by TMDB. See the
[TMDB API terms](https://www.themoviedb.org/documentation/api/terms-of-use).

## License

[MIT](LICENSE)
