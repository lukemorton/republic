import { z } from "zod";

export const FieldTypeSchema = z.enum(["string", "number", "boolean", "date"]);
export type FieldType = z.infer<typeof FieldTypeSchema>;

export const FieldSchema = z.object({
  name: z.string().min(1),
  type: FieldTypeSchema,
  required: z.boolean().optional().default(true),
});
export type Field = z.infer<typeof FieldSchema>;

export const OperationSchema = z.enum(["list", "get", "create", "update", "delete"]);
export type Operation = z.infer<typeof OperationSchema>;

export const ResourceSchema = z.object({
  name: z.string().min(1).regex(/^[A-Z][a-zA-Z0-9]*$/, "Resource name must be PascalCase"),
  fields: z.array(FieldSchema).min(1),
  operations: z.array(OperationSchema).min(1),
});
export type Resource = z.infer<typeof ResourceSchema>;

export const ConstitutionSchema = z.object({
  version: z.string().regex(/^\d+\.\d+\.\d+$/, "Version must be semver format"),
  name: z.string().min(1),
  resources: z.array(ResourceSchema),
});
export type Constitution = z.infer<typeof ConstitutionSchema>;
