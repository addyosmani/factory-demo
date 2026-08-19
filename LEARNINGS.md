# Learnings from building the Reel Good demo with Factory

**The setup and triage portions of Factory were fast. The first end-to-end run was not. It
took roughly 82 minutes from the first baseline commit to the final documented demo, and
most of that time accumulated in verification, repeated visual checks, and recovery after
a verifier rejection. Some of that cost found real defects. Some was duplicated work we
should tune away.**

I built Reel Good to answer a fairly practical question: can someone take a small existing
app, install [Factory](https://github.com/addyosmani/factory), open Claude Code or Codex,
and get from GitHub issues to reviewable pull requests without first building a custom
orchestrator?

The answer from this run is yes, with caveats. The repository ended with a working TMDB
baseline, a configured factory, three independently verified feature PRs, an installation
checkpoint, and a workshop another developer can follow. The process also felt much slower
than my normal back-and-forth with a coding agent. That experience is part of the result.

## How long did it take?

The observable commit window ran from the baseline app commit at 6:35 PM to the final demo
commit at 7:57 PM on August 18, 2026. That is 82 minutes. It excludes the initial research
and scaffolding before the first commit, so it is a lower bound for the whole session.

This was also the first run of the factory against this app. We were writing the workshop,
finding integration bugs, tuning the workflow, and building product features in the same
session. I would not treat the number as a benchmark for routine factory work.

| Stage | Observed time | What happened |
|---|---:|---|
| Baseline to configured factory | about 2 minutes | Installed the template, tailored the charter and gates, bootstrapped labels, and ran the doctor |
| Three issues to triage PR | under 3 minutes | Created issues, applied handoffs and labels, recorded the queue, and opened [PR #4](https://github.com/addyosmani/factory-demo/pull/4) |
| Favorites claim to PR | about 56 minutes | Two verifier rejections, a required stop, human decision, re-triage, resumed implementation, and [PR #7](https://github.com/addyosmani/factory-demo/pull/7) |
| Theme claim to PR | about 23 minutes | Test-first implementation, responsive correction, repeated verification, and [PR #6](https://github.com/addyosmani/factory-demo/pull/6) |
| Quick finder claim to PR | about 7 minutes | Test, implementation, focused verification, and [PR #8](https://github.com/addyosmani/factory-demo/pull/8) |

The quick finder is closest to the loop I wanted. Its branch was claimed at 7:42 PM, the
feature commit landed five minutes later, and the verified draft PR opened at 7:50 PM. The
theme implementation was also written quickly. Its feature commit landed less than five
minutes after the claim, while the PR arrived another 18 minutes later.

This distinction matters. Generation was rarely the bottleneck.

## Setup was the easy part

Factory installed cleanly into the app and immediately gave both harnesses a shared set of
artifacts: `CLAUDE.md`, `AGENTS.md`, the charter, gates, skills, hooks, and GitHub label
bootstrap. The app already had real `typecheck`, `lint`, `test`, and `build` commands, so
wiring the full gate did not require inventing a second test system.

The charter was more useful once it named concrete boundaries. For Reel Good, environment
files, `lib/tmdb.ts`, package manifests, workflow files, and factory policy are
load-bearing. That made one product decision explicit: a local quick finder could run
unattended, while remote TMDB search would cross the protected API boundary and require a
spec.

The setup did find one bug in the installed reference. The doctor script used a `gh label
view` command that the current GitHub CLI does not provide. Changing it to read the label
list once fixed the health check. Next.js 16.3 also added a managed `AGENTS.md` block when
the development server started, which was a useful reminder that framework-specific agent
guidance and factory guidance need to coexist rather than overwrite one another.

I would keep the installer model. A developer can inspect ordinary files, run a dry pass,
and remove the setup with Git if they dislike it. There is no service to provision before
the first control-room report.

## The GitHub queue made the methodology concrete

The factory became easier to understand once the issue labels were live. An issue moved
through `factory:ready-to-implement`, `factory:in-progress`, and
`factory:awaiting-review`. The latest `factory-handoff:v1` comment carried the checkable
outcome and expected files. A deterministic `claude/fq-<issue>` branch acted as the claim.

That is a better mental model than "an agent is working somewhere." I could look at GitHub
and see which items were available, owned, blocked, or waiting for me. The run records and
queue snapshots helped with audit, while the labels and handoff comments remained the live
state.

Separating triage from implementation also proved useful. The quick finder issue explicitly
said it filtered the movies already loaded on the page. Triage did not silently turn it
into a full remote search feature. The smaller interpretation stayed inside the charter
and produced a seven-minute run.

There is a cost here. Triage PRs, implementation PRs, run records, and labels create more
artifacts than an interactive coding session. For repeated or unattended work, that trail
is useful. For a single tiny change under direct supervision, it can feel heavy.

## Independent verification earned its place

The favorites run is the strongest argument for keeping a verifier. Full gates were green
and the negative-test proof succeeded, but the first cold review found that acquiring
`window.localStorage` could throw outside the protected path. A second pass found that the
implementation persisted entire TMDB objects rather than the five allowed fields:
`id`, `title`, `posterPath`, `releaseDate`, and `voteAverage`.

Neither finding was cosmetic. The first affected failure containment. The second widened
the local data footprint beyond the issue's contract. A normal implementation loop could
have shipped both because the happy-path tests passed.

The theme verifier also caught an unnecessary mobile navigation change. The implementation
had hidden the About link at a narrow width. Restoring it preserved the existing navigation
and still resolved the layout requirement.

This is why I would not respond to the slow run by deleting independent verification. It
found issues the deterministic checks missed. I would make the verifier more focused and
give the stage a time budget.

## Where the time went

Fresh contexts repeatedly ran full gates, negative-test proofs, dependency setup, and
browser checks at multiple widths. Some repetition was intentional. The writer should not
grade its own work. The amount of broad visual exploration was less defensible after the
implementation run had already checked the same 375px and 1440px layouts.

At one point I had to ask whether the work was stuck. The agents were technically active,
but "still running" is a weak progress signal. A verifier can remain busy while the user
has no idea whether it is installing packages, inspecting the diff, waiting on a browser,
or retrying the same check.

We added a hard bound late in the session. The remaining verification focused on the cold
diff, full gate, negative proof, declared scope, and literal `done_when`. Broad browser QA
stayed with the implementation run unless the verifier had a specific visual concern. The
quick finder completed much faster under that shape.

I would add a latency budget to Factory itself:

- Record time spent in claim, implementation, gates, browser QA, verification, and human
  wait separately.
- Surface the current operation and last completed checkpoint in the control room.
- Reuse package caches across isolated worktrees.
- Let a verifier consume the implementation's visual evidence, then spot-check the risky
  behavior instead of replaying the full tour.
- Stop or recover a stage when it exceeds a declared budget, with the issue state left
  accurate.

These are workflow performance budgets. The point is not to make every run short. It is to
make unexpected time visible and decide whether the extra check is buying confidence.

## The human recovery loop worked, but it was not obvious enough

After two verifier rejections, Factory stopped issue #1 and moved it to
`factory:needs-info`. That was correct. The unclear part was what I, as the human, needed to
do next.

The answer was an ordinary GitHub comment:

```text
Approved: continue on claude/fq-1. Normalize persisted favorites to exactly
id, title, posterPath, releaseDate, and voteAverage, add a regression test
proving surplus fields are stripped, then rerun full gates and independent
verification. Do not change the issue's broader scope.
```

I then asked Factory to re-triage issue #1. It updated the existing handoff, changed the
live label, and resumed from the already-claimed branch as a new implementation run.

This interaction should be clearer in the product experience. When Factory asks for a
decision, it should say where to put the answer, offer an exact comment template, and name
the command or routine that will consume it. A human should not need to understand the
internal label transition before they can unblock a feature.

## Three independent PRs create integration work

The factory correctly refused to merge. At the end of the session, the theme, favorites,
and quick finder existed as three verified draft PRs based on the same baseline. Several
touch layout or CSS files, so merging one may require the others to rebase and verify
again.

This is honest, though it means the finished feature set is not automatically assembled on
`main`. A software factory needs an integration strategy as it scales beyond isolated
changes. Options include smaller non-overlapping slices, explicit stacked work, or a human
merging and refreshing the queue between dependent items. I would avoid pretending that
parallel PR creation alone is end-to-end delivery.

The review queue limit helped here. Three awaiting-review issues filled the configured
capacity, so the factory stopped producing more. That matches the real constraint: I still
have to understand and integrate the work.

## What I would keep

- The repo-owned charter and contract. They made the TMDB key boundary and merge policy
  visible to Claude Code, Codex, and a human reviewer.
- Fail-closed gates with one exact verdict line.
- Deterministic branch claims for concurrency.
- New-test-first implementation and negative proof.
- Independent verification for behavior the main suite may not cover.
- GitHub as the live queue, with immutable run records for later measurement.
- A human-owned merge decision.

## What I would change next

I would tune for the common greenfield path before adding more routines. The target is
closer to the seven-minute quick-finder run than the 56-minute favorites recovery.

First, add per-stage timing and a verification budget. Second, make human decisions
self-explanatory in the issue. Third, distinguish targeted verifier checks from visual QA
the implementation has already recorded. I would also add a simple integration step that
flags overlapping verified PRs before a human discovers the conflict during merge.

The early result is still encouraging. Factory got from an ordinary Next.js app to a live
GitHub queue quickly, kept the TMDB credential out of agent runs, caught defects beyond the
happy path, and stopped when it needed human judgment. The first run also showed that
process can become its own source of latency. Measuring and pruning that overhead is now
part of making the factory useful.

## Artifacts from the run

- [Workshop](docs/WORKSHOP.md)
- [Initial triage PR](https://github.com/addyosmani/factory-demo/pull/4)
- [Human-decision re-triage PR](https://github.com/addyosmani/factory-demo/pull/5)
- [Theme PR](https://github.com/addyosmani/factory-demo/pull/6)
- [Favorites PR](https://github.com/addyosmani/factory-demo/pull/7)
- [Quick finder PR](https://github.com/addyosmani/factory-demo/pull/8)
