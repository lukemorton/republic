# 🏛️ Republic

<img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Plato-raphael.jpg" width="150" />

Republic is a batteries-included web framework for **human-led, AI-assisted development**.

It is designed for a world where software is continuously generated, refactored, upgraded, and deployed with the help of AI — but where humans still define intent, behaviour, and architecture.

Republic feels familiar, like Rails, but is built around a fundamentally different idea:

> **Code is not the source of truth. Intent is.**

---

## What Republic Is

- A **framework** with strong, opinionated idioms
- A **compiler** that deterministically enforces those idioms
- A **CLI** that is the primary tool for both humans and AI agents
- A **harness** that guarantees structure, style, and tests
- A **multi-target system** that can emit code or deploy directly to cloud platforms

Republic is not a loose collection of generators.
It is a governed system.

---

## Core Concepts

### The Constitution

Every Republic app has a **Constitution**: a declarative, language-agnostic specification that defines the entire application.

It includes:
- models and data schemas
- routes and actions
- authentication and policies
- background jobs and mailers
- feature specifications and acceptance criteria
- deployment targets
- explicit overrides for custom code

The Constitution is the **single source of truth**.
All code, tests, and infrastructure are derived from it.

---

### CLI as the Tool

The `republic` CLI is the **only interface** to the framework.

- Humans use it directly.
- AI agents (Claude Code, Cursor, CI bots) use the same binary.
- There is no separate SDK or agent API.

The CLI is:
- deterministic
- schema-driven
- machine-readable (JSON in, JSON out)
- responsible for validation, compilation, enforcement, and testing

If something cannot be done through the CLI, it is not part of Republic.

---

### Tool-first, not command-first

Republic is designed around **structured operations**, not free-form commands.

Examples:

```bash
republic add model --input '{"name":"Post","fields":[{"name":"title","type":"string"}]}'
republic add route --input '{"path":"/posts","handler":"posts.index","guard":"auth"}'
republic build
republic test required
```

Every operation:
- updates intent (the Constitution)
- produces a deterministic plan
- enforces framework idioms
- reports structured results

---

## Idiomatic by Construction

Republic enforces a single, canonical way of structuring applications per target.

Like Rails, it defines:
- how controllers look
- how models are structured
- how routing is expressed
- how errors are handled
- how tests are written

Unlike Rails:
- these idioms are compiler-enforced
- AI cannot accidentally drift from them
- formatting, structure, and tests are mandatory

Formatting is canonical.
Structure is verified.
Tests are required.

There is no "almost correct".

---

## Tests Are Not Optional

Every feature in Republic must produce:
- unit tests
- integration tests
- end-to-end tests (derived from feature specs)

`republic build` will fail if required tests are missing.

This is a design choice.
Republic treats tests as part of the application definition, not as an afterthought.

---

## Escape Hatches Without Chaos

Republic is opinionated, not restrictive.

Any generated component can be replaced with custom, user-authored code by explicitly wiring it into the Constitution.

The framework:
- validates the override
- enforces required interfaces
- preserves deterministic generation
- keeps upgrades possible

You can drop down when needed — without breaking the system.

---

## Multi-Language and Cloud-Native

Republic does not bind you to a single language or runtime.

The Constitution is compiled into:
- language runtimes (TypeScript, Go, etc.)
- cloud targets (serverless, edge, managed platforms)
- or both, in combination

This allows teams to think in terms of systems and features, not infrastructure glue.

---

## Built for Change

Because structure is explicit and enforced:
- upgrades are compiler-driven
- migrations are predictable
- AI can safely keep projects up to date
- framework evolution does not rot codebases

Republic is designed for long-lived software.

---

## Philosophy

Republic treats software as something to be governed, not handcrafted.

Humans define intent and policy.
Tools and AI execute deterministically.
The Constitution keeps everything coherent over time.

From idea → intent → compilation → deployment.
