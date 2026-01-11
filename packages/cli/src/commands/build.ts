import { Command } from "commander";
import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import {
  parseConstitution,
  generateModel,
  generateHandler,
  generateRouter,
  generateTests,
  generateLockFile,
} from "@republic/core";

export const buildCommand = new Command("build")
  .description("Compile Constitution to generated code")
  .option("-o, --output <dir>", "Output directory", "generated")
  .action((options) => {
    const cwd = process.cwd();
    const configPath = join(cwd, "republic.json");

    if (!existsSync(configPath)) {
      console.error("Error: republic.json not found. Run 'republic init' first.");
      process.exit(1);
    }

    const rawConfig = readFileSync(configPath, "utf-8");
    const result = parseConstitution(rawConfig);

    if (!result.success) {
      console.error("Error: Invalid republic.json");
      for (const error of result.errors) {
        console.error(`  - ${error}`);
      }
      process.exit(1);
    }

    const constitution = result.data;
    const outDir = join(cwd, options.output);

    // Create output directories
    const dirs = [
      join(outDir, "models"),
      join(outDir, "handlers"),
      join(outDir, "__tests__"),
    ];
    for (const dir of dirs) {
      mkdirSync(dir, { recursive: true });
    }

    // Generate code for each resource
    for (const resource of constitution.resources) {
      // Generate model
      const modelCode = generateModel(resource);
      writeFileSync(join(outDir, "models", `${resource.name}.ts`), modelCode);

      // Generate handler
      const handlerCode = generateHandler(resource);
      writeFileSync(join(outDir, "handlers", `${resource.name}Handler.ts`), handlerCode);

      // Generate tests
      const testCode = generateTests(resource);
      writeFileSync(join(outDir, "__tests__", `${resource.name}.test.ts`), testCode);
    }

    // Generate router
    const routerCode = generateRouter(constitution.resources);
    writeFileSync(join(outDir, "routes.ts"), routerCode);

    // Generate lock file
    const lockContent = generateLockFile(constitution);
    writeFileSync(join(cwd, "republic.lock"), lockContent);

    console.log(`Generated code in ${options.output}/`);
    console.log(`  - ${constitution.resources.length} resource(s)`);
    console.log(`  - republic.lock`);
  });
