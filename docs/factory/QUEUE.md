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

## FQ-1: Add a local favorites watchlist
- disposition: ready-to-implement
- source: https://github.com/addyosmani/factory-demo/issues/1
- last_triaged: 2026-08-19
- repro: confirmed by the stopped implementation run; full gates were green, but independent verification found that persisted favorites retained surplus fields
- files_expected: lib/favorites.ts, lib/favorites.test.ts, components/favorite-button.tsx, components/movie-card.tsx, app/movies/[id]/page.tsx, app/favorites/page.tsx, app/layout.tsx, app/globals.css
- load_bearing: false
- gate_level: full
- done_when: The local watchlist meets issue #1's existing acceptance criteria; every persisted favorite contains exactly `id`, `title`, `posterPath`, `releaseDate`, and `voteAverage`; a new regression assertion proves surplus fields are discarded; full gates pass; and fresh independent verification accepts the result.
- confidence: high
- notes: The owner approved continuing on the already-claimed `claude/fq-1` branch without broadening scope. The live state is therefore `factory:in-progress`; this snapshot retains the triage disposition that made the item implementable.

---
