import { ConstitutionSchema, type Constitution } from "./schema.js";

export type ParseResult =
  | { success: true; data: Constitution }
  | { success: false; errors: string[] };

export function parseConstitution(jsonString: string): ParseResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonString);
  } catch {
    return { success: false, errors: ["Invalid JSON"] };
  }

  const result = ConstitutionSchema.safeParse(parsed);
  if (!result.success) {
    const errors = result.error.errors.map(
      (e) => `${e.path.join(".")}: ${e.message}`
    );
    return { success: false, errors };
  }

  return { success: true, data: result.data };
}

export function createDefaultConstitution(name: string): Constitution {
  return {
    version: "0.1.0",
    name,
    resources: [
      {
        name: "Post",
        fields: [
          { name: "id", type: "string", required: true },
          { name: "title", type: "string", required: true },
          { name: "body", type: "string", required: true },
          { name: "createdAt", type: "date", required: true },
        ],
        operations: ["list", "get", "create"],
      },
    ],
  };
}
