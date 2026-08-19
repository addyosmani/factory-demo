# Reel Good

Reel Good is a greenfield Next.js movie browser powered by TMDB. This repository is also a
worked example of the Factory issue-to-PR loop for people using Claude Code or Codex. Keep
the demo easy to clone, keep the TMDB credential server-only, and preserve the evidence for
each factory run.

## Commands

```bash
npm install
TMDB_USE_MOCKS=true npm run dev
npm run typecheck
npm run lint
npm test
TMDB_USE_MOCKS=true npm run build
./.claude/scripts/gates.sh full   # the factory's deterministic verdict
```

## Conventions

- Use strict TypeScript and the Next.js App Router. Server data access belongs in `lib/`.
- Before changing a Next.js API or convention, read the matching versioned guide under
  `node_modules/next/dist/docs/`; this project runs Next.js 16.3 or later.
- Import `server-only` in modules that can read `TMDB_API_KEY`. Never introduce a
  `NEXT_PUBLIC_` copy of that key or commit an `.env.local` file.
- Keep server components as the default. Use client components only for browser state or
  interaction, and keep local-storage behavior behind a small tested boundary.
- Add new behavior with a new test. Do not rewrite an existing test to make a run green.
- Use committed TMDB fixtures for deterministic tests and builds. Live API calls are for
  manual verification only.
- Keep the UI keyboard accessible and useful at 375px, 768px, and 1440px widths.

---

# Factory rules

This repository runs a software factory. Read `docs/factory/CONTRACT.md`, then
`docs/factory/CHARTER.md`, before acting. The contract is shared with Codex through
`AGENTS.md`; it is the source of truth for queue semantics and non-negotiable rules.
For first-time setup and the local dry run, follow `docs/factory/README.md`.

## Read first

The live queue is GitHub issue labels plus `factory-handoff:v1` comments.
`docs/factory/QUEUE.md` is a snapshot for humans and audit, so an unmerged snapshot must
never be used as the handoff between routines.

## Non-negotiable

1. **Never merge.** GitHub branch protection is the enforcement boundary; the local hook is
   a second layer.
2. **Never edit factory policy** unless the human explicitly asks in this session. Protected
   paths are listed in the contract.
3. **Never modify an existing test in an unattended run.** An interactive change needs
   explicit human approval and a human read.
4. **Gates fail closed.** Quote the `FACTORY_GATES:` line verbatim. `RED`,
   `MISCONFIGURED`, and required skips all block progress.
5. **Verification uses a fresh context.** Delegate to `factory-verifier`.
6. **Claim one live issue per run.** Win the deterministic remote-branch claim described in
   the contract, then replace `factory:ready-to-implement` with `factory:in-progress`.

## Stopping conditions

Stop and hand back to a human when any of these is true:

- gates went red twice on the same item
- the work turns out to touch a `LOAD_BEARING` path
- the diff would exceed the charter's line limit
- the item is still ambiguous after one clarification attempt
- the review queue is already at the charter's limit

The last one is the important one and the easiest to ignore. The constraint on this factory
is not how many agents can run in parallel. It is how many decisions are pending a human's
judgment at once. When that queue is full, producing more is not progress.

## State lives in files, not conversations

Write one immutable record under `docs/factory/runs/` using its documented format. Update
GitHub labels for operational state. Sessions end and transcripts are not the queue.

## Writing for the next reader

Commit messages and PR bodies are written for someone who was not in this session and
cannot ask you what you were thinking. On a `client-production` repo, assume that reader is
not the author and the time is six months from now.
