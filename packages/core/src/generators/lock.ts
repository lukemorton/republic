import type { Constitution } from "../constitution/schema.js";
import { createHash } from "node:crypto";

export interface LockFile {
  version: string;
  generatedAt: string;
  constitutionHash: string;
  compilerVersion: string;
}

export function generateLockFile(constitution: Constitution): string {
  const constitutionJson = JSON.stringify(constitution, null, 2);
  const hash = createHash("sha256").update(constitutionJson).digest("hex");

  const lock: LockFile = {
    version: "1",
    generatedAt: new Date().toISOString(),
    constitutionHash: hash,
    compilerVersion: "0.0.1",
  };

  return JSON.stringify(lock, null, 2) + "\n";
}
