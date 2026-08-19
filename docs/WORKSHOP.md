# Build this factory demo yourself

**This workshop starts with a small movie app and ends with a GitHub issue becoming a
verified draft PR. You can use Claude Code Desktop or Codex in the ChatGPT desktop app. A
subscription is enough for the interactive path; you do not need an Anthropic or OpenAI
API key.**

Allow 30 to 45 minutes for a first pass. The code change may take only a few minutes. Most
of the workshop is about making the queue, constraints, evidence, and human decisions
visible. That overhead should become smaller and more selective after you have evidence
about what your repository can safely automate.

## The two keys are unrelated

The movie app needs a TMDB API key. Claude Code and Codex do not.

Create a local environment file from the committed placeholder:

```bash
cp .env.example .env.local
```

Then add your own TMDB v3 key:

```text
TMDB_API_KEY=your_own_key_here
```

Never paste the value into an issue, prompt, run record, PR, or committed file. The factory
checks use fixtures and do not need the credential. I prefer this boundary for a workshop:
an agent can prove the build without inheriting access to a service it does not need.

## Choose a starting point

### Path A: install Factory yourself

Fork [`addyosmani/factory-demo`](https://github.com/addyosmani/factory-demo), then clone
your fork and create a working branch from the pre-factory checkpoint:

```bash
git clone https://github.com/YOUR_NAME/factory-demo.git
cd factory-demo
git switch -c workshop origin/workshop-start
git push -u origin workshop
```

In GitHub, open **Settings → Branches** and make `workshop` the default branch while you
follow the workshop. Cloud sessions clone the default branch on every run, so this detail
matters. You can switch it back to `main` later.

Install the same Factory revision used for this demo:

```bash
cd ..
git clone https://github.com/addyosmani/factory.git
git -C factory checkout 3702988427ceb894038050e306b9bf09a0777d74
cd factory-demo
../factory/install.sh --dry-run .
../factory/install.sh .
```

The dry run is worth reading. The installer adds ordinary committed files and refuses to
overwrite an existing path.

### Path B: begin with a configured factory

If you want to focus on the queue rather than installation, start from `factory-ready`:

```bash
git switch -c workshop origin/factory-ready
git push -u origin workshop
```

This checkpoint already has a project-specific charter, server-key guardrail, GitHub label
bootstrap script, Claude Code skills, Codex adapters, and working gates.

## Open it in Claude Code Desktop

The current [Claude Code Desktop guide](https://code.claude.com/docs/en/desktop) describes
local projects, diff review, previews, parallel worktrees, and scheduled tasks.

1. Open the **Code** tab.
2. Choose a local project and select your `factory-demo` folder.
3. Begin in Plan mode or another read-only permission mode.
4. Paste this prompt:

```text
Read CLAUDE.md, docs/factory/CONTRACT.md, docs/factory/CHARTER.md,
package.json, and the application data boundary in lib/tmdb.ts.

Report only. Explain what work this factory permits, what is load-bearing,
which commands form the full gate, how GitHub issues become claimed branches,
and where a human must decide. Do not edit files, labels, issues, branches,
pull requests, routines, or settings.
```

For Path A, follow with this configuration prompt after you approve its proposal:

```text
Configure this installed factory for the Reel Good demo. Use greenfield tier.
Keep TMDB_API_KEY server-only; protect environment files, lib/tmdb.ts,
package manifests, workflow files, and factory policy. Permit small approved
movie-browsing UI features that do not cross those boundaries. Require types,
lint, tests, and build for full gates.

Update only docs/factory/CHARTER.md, .factory/gates.conf, CLAUDE.md, and any
project-specific architecture assertion required in the gate script. Run fast,
full, and deep gates plus the doctor. Show me the diff and exact verdict lines.
Do not commit, push, create labels, create routines, or merge.
```

Review the diff before authorizing commits or GitHub writes.

## Open it in Codex

Open the folder as a Codex project in the ChatGPT desktop app. Codex reads `AGENTS.md` and
discovers the adapters under `.agents/skills/`. Inspect `/hooks` and trust the committed
hook only after its protected paths match your expectations.

Start with:

```text
Read AGENTS.md, CLAUDE.md, docs/factory/CONTRACT.md,
docs/factory/CHARTER.md, package.json, and lib/tmdb.ts.

Use the factory-status skill to explain the control room in report-only mode.
Tell me what can run unattended, what must stop, and which exact checks decide
whether a PR may be opened. Change nothing.
```

Path A can then use the same configuration prompt as Claude Code. The factory keeps one
canonical contract and thin harness adapters, so the policy is not rewritten for each
agent.

## Confirm the local factory

Run these in the integrated terminal:

```bash
./.claude/scripts/gates.sh fast
./.claude/scripts/gates.sh full
./.claude/scripts/gates.sh deep
./.factory/scripts/doctor.sh
```

Healthy full-gate output ends with:

```text
FACTORY_GATES: level=full status=GREEN passed=4 failed=0 failing=none skipped=none misconfigured=none
```

Deep gates also assert that application code has no `NEXT_PUBLIC_TMDB` variable, no local
environment file is tracked, and `lib/tmdb.ts` retains its `server-only` import.

Preview and then create the live GitHub labels:

```bash
./.factory/scripts/bootstrap-github.sh
./.factory/scripts/bootstrap-github.sh --apply
```

Configure a GitHub ruleset or branch protection for the default branch before unattended
work. The repository hook catches common merge commands, but GitHub is the enforcement
boundary.

Commit and push the installation. Cloud agents cannot see local-only files:

```bash
git add CLAUDE.md AGENTS.md .agents .claude .codex .factory docs/factory
git commit -m "chore: install and configure Factory"
git push
```

## Create one useful issue

Use a small, checkable feature that stays outside load-bearing paths. For example:

```markdown
Title: Add a persistent light and dark theme toggle

Add an accessible theme control to the header. Use system preference when no
choice is stored, persist an explicit choice locally, avoid a flash of the wrong
theme, retain visible focus, and keep both navigation links usable at 375px.

Done when a new test covers resolution and persistence, full gates pass, and
manual checks pass at 375px and 1440px.
```

Do not add factory labels yourself yet. The first workflow demonstrates that handoff.

## Triage is a separate run

In either desktop app, ask:

```text
Use the factory-triage skill to triage the open issue. Follow the charter,
update the live GitHub label and existing factory-handoff:v1 comment, write
the queue snapshot and immutable run record, and open the required draft
triage PR. Do not implement the issue in this run.
```

Inspect the result on GitHub. A ready item has one state label and exactly one comment like:

```text
<!-- factory-handoff:v1 -->
disposition: ready-to-implement
done_when: <literal checkable outcome>
files_expected: <bounded list>
load_bearing: false
gate_level: full
confidence: high
triaged_at: <UTC timestamp>
```

The label and comment are the live queue. `docs/factory/QUEUE.md` is an audit snapshot and
may lag behind a newer GitHub write.

## Implement exactly one queue item

Start a fresh task and ask:

```text
Use the factory-implement skill to implement the ready issue. Claim the
deterministic claude/fq-<issue> branch before editing. Add a new failing test
first, make the smallest change that satisfies done_when, run the required
gates and negative-test proof, obtain fresh independent verification, write
the run record, and open a draft PR. Never merge.
```

The branch claim is a small but important detail. Two agents may read the same label, but
only one can create `claude/fq-<number>` without force. The winner changes the label to
`factory:in-progress`; the loser stops.

The final PR should quote the exact `FACTORY_GATES:` result and the verifier verdict. The
source issue moves to `factory:awaiting-review`. You now own the merge decision.

## What a real rejection looks like

This demo's favorites run is useful because it did not take the happy path.

1. Full gates were green and the negative test proof succeeded.
2. The first verifier found an unsafe throwing-storage path.
3. A fix passed the gates again.
4. The second verifier found that local storage contained more TMDB fields than the issue
   allowed.
5. The factory stopped after two rejections and moved the issue to `factory:needs-info`.

A human resumed it with this ordinary GitHub comment:

```text
Approved: continue on claude/fq-1. Normalize persisted favorites to exactly
id, title, posterPath, releaseDate, and voteAverage, add a regression test
proving surplus fields are stripped, then rerun full gates and independent
verification. Do not change the issue's broader scope.
```

The next triage run read that decision, updated the existing handoff rather than adding a
second one, and moved the already-claimed item back to `factory:in-progress`. The resumed
implementation became [draft PR #7](https://github.com/addyosmani/factory-demo/pull/7).

This is the practical human loop: leave a specific decision in the issue, then ask the
factory to re-triage that issue. You should not need to hand-edit labels or machine fields.

## Inspect the finished evidence

The reference run left these artifacts open for inspection:

| Stage | Evidence |
|---|---|
| Initial triage | [PR #4](https://github.com/addyosmani/factory-demo/pull/4) |
| Human-decision re-triage | [PR #5](https://github.com/addyosmani/factory-demo/pull/5) |
| Theme implementation | [PR #6](https://github.com/addyosmani/factory-demo/pull/6) |
| Favorites recovery | [PR #7](https://github.com/addyosmani/factory-demo/pull/7) |
| Quick finder implementation | [PR #8](https://github.com/addyosmani/factory-demo/pull/8) |

Nothing is merged automatically. That is a feature of the reference, not unfinished wiring.

## Add scheduling after the interactive loop works

I would run the interactive path several times before scheduling it. Wrong dispositions
usually mean the charter needs tightening, and an hourly routine can multiply that mistake.

Claude Code currently offers local Desktop scheduled tasks and cloud routines. The
[official routines guide](https://code.claude.com/docs/en/web-scheduled-tasks) documents
scheduled, API, and supported GitHub-event triggers. Start with report-only triage on a
daily schedule. Add implementation only after the queue has stayed accurate for several
runs.

Codex can run the same repository skills interactively from `AGENTS.md`. If your Codex
product surface offers goals or scheduled automation, point it at the same report-only
factory skill first. Product scheduling is account-level state and is intentionally not
pretended to be portable repository configuration.

One limitation matters: an unqualified "new GitHub issue" trigger is not available across
every harness. Factory therefore supports scheduled triage by default. The reference also
has an optional API-trigger bridge for Claude routines when near-real-time issue intake is
worth the extra setup.

## What I would measure next

This demo proved the mechanics. It also exposed the cost.

- How long did implementation take versus verification and setup?
- How often did the verifier reject something the deterministic gates missed?
- How many items are waiting for a human, and for how long?
- Which checks were duplicated without finding a new problem?

The favorites run justified independent verification. Repeating broad browser QA in every
fresh context did not. That is exactly the kind of evidence that should tune a factory:
keep the controls that catch defects, remove repeated work that only adds latency, and
never confuse more agent activity with more throughput.

## Further reading

- [Factory reference](https://github.com/addyosmani/factory)
- [Claude Code Desktop](https://code.claude.com/docs/en/desktop)
- [Claude Code routines](https://code.claude.com/docs/en/web-scheduled-tasks)
- [Codex project instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [Codex skills](https://learn.chatgpt.com/docs/build-skills)
- [TMDB API getting started](https://developer.themoviedb.org/docs/getting-started)
