# Factory queue snapshot

The operational queue lives in GitHub issue labels. This file is a reviewable snapshot
written by `factory-triage` and reported by `/factory`; implementation routines query
GitHub directly.

An unmerged update to this file must never block a later routine from seeing work. Durable
run evidence lives in one file per run under `docs/factory/runs/`.

**Dispositions**

| Disposition | Next stage |
|---|---|
| `ready-to-implement` | factory-implement picks it up |
| `ready-to-spec` | human runs factory-spec |
| `needs-info` | parked, question is on the issue |
| `wait-to-implement` | parked, blocker named below |
| `awaiting-review` | PR open, human owns it |
| `done` | merged by a human |

The corresponding live labels use the `factory:` prefix, for example
`factory:ready-to-implement` and `factory:awaiting-review`. The live issue also carries a
`factory-handoff:v1` comment with the fields needed by implementation.

---

Snapshot generated from the live GitHub queue on 2026-08-19. All three items were
explicitly approved by a human and can be implemented independently from `main`.

## FQ-1: Add a local favorites watchlist
- disposition: ready-to-implement
- source: https://github.com/addyosmani/factory-demo/issues/1
- last_triaged: 2026-08-19
- repro: not-attempted (approved feature request; no implementation exists yet)
- files_expected: lib/favorites.ts, lib/favorites.test.ts, components/favorite-button.tsx, components/movie-card.tsx, app/movies/[id]/page.tsx, app/favorites/page.tsx, app/layout.tsx, app/globals.css
- load_bearing: false
- gate_level: full
- done_when: A movie can be favorited and unfavorited from its discovery card and detail page, the deduplicated watchlist round-trips through localStorage and renders at `/favorites` after reload, the empty state and keyboard-accessible pressed controls work, and a new favorites unit test plus full gates pass.
- confidence: high
- notes: Keep the watchlist browser-local. TMDB account auth, write APIs, and changes to the server API boundary are out of scope.

## FQ-2: Add a persistent light and dark theme toggle
- disposition: ready-to-implement
- source: https://github.com/addyosmani/factory-demo/issues/2
- last_triaged: 2026-08-19
- repro: not-attempted (approved feature request; no implementation exists yet)
- files_expected: lib/theme.ts, lib/theme.test.ts, components/theme-toggle.tsx, app/layout.tsx, app/globals.css
- load_bearing: false
- gate_level: full
- done_when: With no stored choice the initial theme follows `prefers-color-scheme`, the accessible header toggle switches and persists an explicit light or dark choice without a visible wrong-theme flash, invalid storage falls back safely, and a new theme unit test plus full gates pass.
- confidence: high
- notes: Use platform APIs and existing CSS only; no dependency or package-file change is needed.

## FQ-3: Add an accessible quick finder for loaded movies
- disposition: ready-to-implement
- source: https://github.com/addyosmani/factory-demo/issues/3
- last_triaged: 2026-08-19
- repro: not-attempted (approved feature request; no implementation exists yet)
- files_expected: lib/filter-movies.ts, lib/filter-movies.test.ts, components/quick-finder.tsx, app/page.tsx, app/globals.css
- load_bearing: false
- gate_level: full
- done_when: The labeled discovery-page quick finder filters and deduplicates only the already loaded trending and popular movies by partial title without issuing a request, announces result counts, handles clear and no-match states, and a new filter unit test plus full gates pass.
- confidence: high
- notes: This is intentionally not full TMDB search. The implementation must not add an endpoint or fetch while filtering.

---
