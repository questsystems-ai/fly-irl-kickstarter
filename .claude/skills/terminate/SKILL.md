---
name: terminate
description: End-of-session — generate handoff report, suggest commit, and wrap up
user-invocable: true
---

## Session Termination Procedure

The user is ending this session. Wrap up cleanly so the next session picks up instantly.

### Step 1: Gather state

For each project repo in this folder, run in parallel:
- `git status` and `git diff --stat` — find uncommitted work
- `git log --oneline -5` — recent commits

### Step 2: Check for unsaved work

If there are uncommitted changes in any repo, ask the user:
> "There are uncommitted changes in [repo]. Want me to commit before wrapping up?"

If they say yes, commit to the current branch with a descriptive message.

### Step 3: Write handoff reports

For each repo that had activity this session, write a **timestamped** handoff file to that repo: `scripts/output/session-handoff-YYYYMMDD-HHMM.md` (e.g. `session-handoff-20260331-1430.md`). Use today's date and approximate current time. Keep each under 80 lines. Include:

1. **The Product** — one paragraph: what this app/service does
2. **Stack** — one line
3. **Business Context** — one line
4. **Current State** — today's date, branch, what got done, what's pending
5. **Key files** — only files the next session will need
6. **Quick verify** — shell snippet to confirm things work

### Step 4: Append session summary to conversation log

Append a brief session summary block to `scripts/output/session-log.md`:

```
---
### Session [YYYY-MM-DD HH:MM] — [one-line topic]

**Key decisions/insights:**
- [bullet per significant thing discussed or decided]
- **Settled decisions** (names chosen, acronyms selected, options picked): log these explicitly as `[Thing]: chosen value` — e.g. `[Acronym]: PULSE = Portable Unified Lightweight Scalable Engine`. These are the facts most likely to be asked about in future sessions and least likely to survive as only a memory.

**Ideas captured:**
- [any new ideas, hypotheses, or directions that came up]

**Actions taken:**
- [what actually got built or changed]
---
```

### Step 5: Update notes/strategy.md if direction shifted

If this session changed or clarified the strategy — new project priority, pivot, key insight — update `notes/strategy.md`. Keep it as a living narrative, not a changelog.

If a raw insight or idea came up that should be preserved, append it to `notes/thoughts.md` with today's date.

### Step 6: Update memory if needed

If anything happened this session that future sessions should know about (feedback, corrections, project decisions), save it to the appropriate memory file in `~/.claude/projects/.../memory/`.

### Step 7: Sign off

```
## Session Complete

**Committed:** [yes/no — commit hashes if yes]
**Handoffs:** [list of handoff files written]
**Log:** scripts/output/session-log.md updated
**Key takeaway:** [one sentence — what was accomplished or decided]

Ready to close. Next session: run `/initiate` to pick up where we left off.
```
