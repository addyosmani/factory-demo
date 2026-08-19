# Factory charter

**This file is the human judgment, upstream.** Every factory skill reads it before acting.
It is the primary policy file a human must review, and an agent must never edit it on its
own initiative.

Fill it in once per repo. Revisit it deliberately (see "Constraint review" at the bottom),
not continuously.

Set this to `ready` only after reviewing every section:

```
CHARTER_STATUS: ready
```

---

## 1. Tier

Delete all but one. This single choice sets how much autonomy every routine gets.

| Tier | Means | Autonomy |
|---|---|---|
| `revival` | Unlaunched, no users, no revenue. Migration and resurrection work. | Widest. Long runs, wide fan-out, human reads samples not diffs. |
| `greenfield` | Personal project, users not yet depending on it. | Wide. Gates carry it; human samples. |
| `oss` | Published, other people depend on it, contributions arrive. | Moderate. Agent ranks attention, human owns every merge. |
| `client-production` | Someone else's business depends on this. | Narrow. Short loops, no unattended merges, everything read. |

```
TIER: greenfield
```

**Why the tier and not the difficulty:** autonomy tracks who gets hurt when it is wrong.
A ten-thousand-line migration on an unlaunched project is a safer bet than a fifty-line
change to a client's auth path.

---

## 2. Load-bearing paths

Globs that no routine may modify unattended, regardless of tier. A change touching any of
these is forced to `deep` gates and a human read, and may never be auto-merged.

```
LOAD_BEARING:
  - ".env*"
  - "lib/tmdb.ts"
  - "next.config.ts"
  - "package.json"
  - "package-lock.json"
  - ".github/workflows/**"
  - ".factory/**"
  - ".claude/**"
  - ".agents/**"
  - ".codex/**"
  - "AGENTS.md"
  - "CLAUDE.md"
  - "docs/factory/CHARTER.md"
  - "docs/factory/CONTRACT.md"
```

`.claude/**` is on the list on purpose. An agent that can rewrite the factory's own rules
has no constraints at all.

---

## 3. Test-file rule

```
TESTS_ARE_LOAD_BEARING: true
```

When true, an unattended run may not modify an existing test file. An interactive session
may do so only after explicit human approval, and the resulting draft PR requires a human
read even when every gate is green. Agents routinely rewrite assertions to match broken
behavior, so an unexplained green suite after an agent edited the tests is weak evidence.

Adding a *new* test file is not covered by this rule.

---

## 4. What is automatable here

The triage skill uses this to decide `ready-to-implement` versus `ready-to-spec`.
Be specific. Vague entries produce vague triage.

```
AUTOMATABLE:
  - User-visible movie browsing features already approved in a GitHub issue
  - Category, cast, search, favorites, and theme UI that uses the existing TMDB boundary
  - Accessibility improvements with a reproducible check
  - Documentation, fixture, and comment corrections
  - Test coverage added in a new test file
  - Single-purpose bug fixes with a reproducible failing test
  - Dependency bumps that do not introduce a new runtime dependency and pass deep gates

NEEDS_SPEC:
  - TMDB account authentication, remote favorites, ratings, or any other write API
  - Any change to the server-side API-key boundary
  - A new runtime dependency or a change of framework
  - Anything touching more than 8 files
  - Anything touching a load-bearing path

NEVER_AUTOMATE:
  - Merge decisions
  - Publishing secrets or moving TMDB_API_KEY into browser code
  - Architectural direction and framework choices
  - Product intent not already approved in an issue
  - Anything the charter does not cover (default deny)
```

The last line matters. Silence in this file means stop, not proceed.

---

## 5. Definition of done

An item may only move to `verified` when all of these hold. The verify skill checks each
one independently and does not accept the implementer's word on any of them.

```
DONE:
  - gates.sh reports FACTORY_GATES status=GREEN at the required level
  - The change is covered by a test that fails without it
  - No existing test file was modified, or an interactive human explicitly approved it
    and the draft PR is flagged for human read
  - The diff does the one thing the queue item describes and nothing else
  - The behavior was manually checked at mobile and desktop widths when UI changed
  - TMDB attribution remains visible and the API key remains server-only
  - A human can read the PR body and understand why this is safe
```

That last criterion is the answerability bar. On `client-production` it means explainable
in six months by someone who is not you, which is tighter than verifiable today.

---

## 6. Gate level by change type

```
GATES:
  default: full
  load_bearing: deep
  docs_only: fast
```

---

## 7. Stop conditions

The factory halts and asks for a human when any of these is true. This is the back-pressure
valve. It exists so that a routine cannot grind through a bad assumption at volume.

```
STOP_IF:
  - Gates were red twice in a row on the same item
  - The fix requires touching a load-bearing path
  - The change would exceed 400 changed lines
  - The queue item is ambiguous after one clarification attempt
  - More than 3 items are already awaiting human review
```

The last one is the orchestration-tax limit. The constraint on a factory is not how many
agents can run, it is how many decisions can be pending your judgment at once. When the
review queue is full, stop producing.

---

## 8. Constraint review

Constraints set once become either a permanent tax or a permanent hole. Review this file:

- **Loosen** when a class of change has been green across a long enough run, and record
  the run of evidence in `docs/factory/DECISIONS.md`.
- **Tighten** immediately when an escaped defect traces back to an automated gate you
  trusted. Record what the gate missed.

```
LAST_REVIEWED: 2026-08-18
NEXT_REVIEW: 2026-09-18
```
