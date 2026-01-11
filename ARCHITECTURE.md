# ARCHITECTURE.md

## Purpose

Republic is not a traditional web framework. It is a compiler-driven system designed to treat intent as the primary artefact and code as a derived output. This document describes the architecture that makes that possible: deterministic compilation, enforced idioms, AI-first tooling, and multi-target emission.

The goal of Republic is to reliably produce applications that conform to strongly defined framework shapes, regardless of whether intent originates from humans, AI agents, or automated systems.

## Core architectural goals

### Intent over code
Intent is authoritative. Code, tests, and infrastructure are compiled artefacts and may be regenerated at any time.

### Deterministic outputs
Given the same intent and toolchain versions, Republic must always produce the same outputs.

### Framework-owned idioms
Republic defines and enforces canonical application shapes. These are not conventions; they are compiler rules.

### AI-first tooling
All interactions flow through a structured, machine-first CLI that agents and humans use equally.

### Target agnosticism
The same intent can compile to different languages, runtimes, or cloud platforms.

### Mandatory correctness
Structure, formatting, and tests are required. Incomplete systems do not compile.

## High-level system

```
Humans, AI agents, or automated systems
→ republic CLI
→ Constitution (intent IR)
→ Deterministic compiler
→ Idiom harness
→ Code, tests, and/or cloud deployments
```

There is no alternative path. All state changes flow through this pipeline.

## The Constitution (intermediate representation)

The Constitution is the canonical representation of an application. It is a strict, versioned, language-agnostic intermediate representation.

### Properties

- Fully schema-validated
- Canonically ordered
- Explicitly referenced (no implicit coupling)
- Designed to fit within AI context limits
- Extensible via namespaced extensions

### The Constitution describes:

- Models and data schemas
- Routes and actions
- Policies and authentication
- Background jobs and mailers
- Feature specifications and acceptance criteria
- Deployment targets
- Explicit overrides for custom implementations

The Constitution is always complete and always valid. Partial or inconsistent states are not permitted.

## Feature specifications

Feature specifications describe system behaviour independently of implementation. They are structured, declarative, and executable.

Feature specs:

- Define acceptance criteria
- Describe observable behaviour
- Are compiled into end-to-end tests
- Serve as a shared language between intent authors and the compiler

A feature without acceptance criteria is considered incomplete and cannot compile.

## The CLI as the primary tool

The `republic` CLI is the only interface to the system.

It is:

- The compiler frontend
- The idiom enforcer
- The test harness runner
- The deployment orchestrator

There is no separate SDK or agent API. Agents invoke the same CLI as humans.

The CLI is:

- JSON-first
- Schema-driven
- Deterministic
- Fully inspectable
- Machine-readable by default

Human-friendly aliases and prompts are optional layers over the same interface.

## Determinism model

Determinism is a core invariant.

A build is deterministic if:

- The Constitution is identical after canonicalisation
- All toolchain versions are pinned
- No randomness, timestamps, or environment variance affect outputs

A `republic.lock` file pins:

- Compiler version
- Idiom pack versions
- Target emitters
- Formatters
- Test harness components

Any change to these inputs must be explicit and traceable.

## Idiom harness

The idiom harness is the enforcement layer that guarantees applications conform to Republic-defined shapes.

The harness enforces:

### Structure

- Required files exist
- Directory layouts are correct
- Naming is canonical

### Interfaces

- Controller and action signatures
- Service and repository contracts
- Error handling and policy checks

### Style

- Canonical formatting
- No stylistic variance

### Tests

- Required unit, integration, and end-to-end tests
- Minimum coverage or scenario requirements
- Deterministic test setup

If any rule fails, compilation fails.

## Code emission

Republic emits outputs via target-specific compiler backends.

Targets may be:

- Language runtimes
- Cloud platforms
- Hybrid combinations

Each target implements:

- IR validation
- Deterministic build planning
- Code or artefact emission
- Formatting and normalisation
- Test integration
- Optional deployment

Emission strategies may be AST-based or template-based, but outputs must always be canonicalised and verified.

## Escape hatches and overrides

Republic allows explicit overrides for custom implementations.

Rules:

- Overrides must be declared in the Constitution
- Signatures and contracts are enforced
- Wiring remains generated
- Tests remain mandatory

Overrides are escape hatches, not alternative sources of truth.

## Testing architecture

Testing is a first-class concern.

Republic mandates:

- Unit tests
- Integration tests
- End-to-end tests derived from feature specifications

The harness controls:

- Time
- Randomness
- Fixtures
- External dependencies

No test coverage means no successful build.

## Multi-target compilation

The same Constitution can compile to multiple targets simultaneously.

Examples:

- TypeScript API + edge workers
- Go service + managed database
- Serverless-only deployments

Targets are independent compiler backends and may be combined.

## Upgrade model

Upgrades are compiler-driven transformations.

Upgrade flow:

1. Validate the existing Constitution
2. Migrate schema if required
3. Recompile all outputs
4. Run idiom harness
5. Run full test suite
6. Produce an upgrade report

Overrides are preserved and flagged where incompatible.

## Why this architecture exists

Republic exists to make intent-first, AI-driven development reliable.

By codifying intent, enforcing idioms deterministically, and treating code as a compiled artefact, Republic enables systems that can evolve indefinitely without losing coherence, correctness, or structure.

This architecture is how intent becomes law.
