# Project and factory guidance for Codex

Read `CLAUDE.md` for the project's commands and conventions, then read
`docs/factory/CONTRACT.md` and `docs/factory/CHARTER.md` before changing anything.
For first-time setup and the local dry run, follow `docs/factory/README.md`.

The contract is shared with Claude Code. If this adapter and the contract disagree, the
contract wins. Use the repo-scoped skills under `.agents/skills/` for factory workflows.

Repository hooks in `.codex/hooks.json` are defense in depth. They require local trust and
do not replace GitHub branch protection.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
