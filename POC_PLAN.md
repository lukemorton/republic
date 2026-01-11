# Republic PoC Plan

## Goal

Demonstrate the core Republic concept: **Constitution → Compiler → Idiomatic Code** in the smallest possible scope.

## Scope: "Hello Republic"

A single end-to-end flow: Define an API resource in a Constitution file, compile it with the `republic` CLI, and output generated TypeScript code with tests.

---

## What We'll Build

### 1. Constitution Schema (Input)

A minimal JSON schema that describes a single resource:

```json
{
  "version": "0.1.0",
  "name": "my-app",
  "resources": [
    {
      "name": "Post",
      "fields": [
        { "name": "id", "type": "string" },
        { "name": "title", "type": "string" },
        { "name": "body", "type": "string" }
      ],
      "operations": ["list", "get", "create"]
    }
  ]
}
```

### 2. CLI (`republic` command)

Two commands:

| Command | Description |
|---------|-------------|
| `republic init` | Create a starter `republic.json` Constitution |
| `republic build` | Compile Constitution → generated code |

### 3. Generated Output

From the Constitution above, generate:

```
generated/
├── models/
│   └── Post.ts          # TypeScript interface
├── handlers/
│   └── PostHandler.ts   # Route handlers (list, get, create)
├── routes.ts            # Express router wiring
└── __tests__/
    └── Post.test.ts     # Generated unit tests
```

**Note**: Generated code is **not committed** to version control. The `generated/` directory is added to `.gitignore`. Users regenerate by running `republic build`.

### 4. Determinism

- `republic.lock` file pins versions
- Running `republic build` twice produces byte-identical output
- Output files include generation metadata as comments

---

## Implementation Plan

### Phase 1: CLI Foundation
**Package**: `packages/cli/`

- [ ] Set up CLI package with TypeScript
- [ ] Implement `republic init` command
- [ ] Implement `republic build` command (skeleton)
- [ ] Add CLI tests

### Phase 2: Constitution Parser
**Location**: `packages/core/`

- [ ] Define Constitution JSON schema (TypeScript types)
- [ ] Implement schema validation (with Zod)
- [ ] Add parser tests

### Phase 3: Code Generator
**Location**: `packages/core/`

- [ ] Model generator (TypeScript interfaces)
- [ ] Handler generator (Express handlers)
- [ ] Router generator (route wiring)
- [ ] Test generator (unit test stubs)
- [ ] Add generator tests

### Phase 4: Determinism
**Location**: `packages/core/`

- [ ] Implement `republic.lock` generation
- [ ] Add generation metadata (checksum, timestamp-free)
- [ ] Verify deterministic output in tests

### Phase 5: Integration
**Location**: Root

- [ ] End-to-end test: init → build → verify output
- [ ] Example project in `apps/hello-republic/`
- [ ] Update documentation

---

## Package Structure After PoC

```
packages/
├── core/                    # Constitution types, parser, generators
│   └── src/
│       ├── constitution/    # Schema types and validation
│       ├── generators/      # Code generators
│       └── index.ts
└── cli/                     # republic CLI
    └── src/
        ├── commands/        # init, build
        └── index.ts

apps/
├── website/                 # Existing docs website
└── hello-republic/          # Working example app
    ├── republic.json        # Constitution (committed)
    ├── republic.lock        # Lock file (committed)
    └── generated/           # Output (gitignored)
```

---

## Success Criteria

1. **Runs**: `republic init && republic build` produces working TypeScript
2. **Deterministic**: Two builds are byte-identical
3. **Tested**: All components have unit tests, E2E test passes
4. **Documented**: README explains how to try the PoC

---

## Non-Goals (for this PoC)

- Multi-language targets (TypeScript only)
- Database integration
- Authentication/authorization
- Deployment targets
- Feature specifications / E2E test generation
- Custom escape hatches
- IDE integration

---

## Time Investment

This PoC focuses on proving the core concept works. Each phase is independent and can be validated before moving to the next.

---

## Next Steps After PoC

If the PoC validates the approach:
1. Add more resource operations (update, delete)
2. Add relationships between resources
3. Add database target (Prisma schema generation)
4. Add feature specs and E2E test generation
5. Add second language target (Go)
