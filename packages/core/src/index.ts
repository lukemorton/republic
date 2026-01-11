/**
 * Republic Core - Constitution schema, parser, and code generators
 */

// Constitution schema and parser
export {
  type Constitution,
  type Resource,
  type Field,
  type FieldType,
  type Operation,
  ConstitutionSchema,
  ResourceSchema,
  FieldSchema,
} from "./constitution/index.js";

export {
  parseConstitution,
  createDefaultConstitution,
  type ParseResult,
} from "./constitution/index.js";

// Code generators
export {
  generateModel,
  generateHandler,
  generateRouter,
  generateTests,
  generateLockFile,
} from "./generators/index.js";

// Version
export function version(): string {
  return "0.0.1";
}
