import { Command } from "commander";
import { writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createDefaultConstitution } from "@republic/core";

export const initCommand = new Command("init")
  .description("Create a new republic.json Constitution file")
  .option("-n, --name <name>", "Project name", "my-app")
  .option("-f, --force", "Overwrite existing republic.json", false)
  .action((options) => {
    const cwd = process.cwd();
    const configPath = join(cwd, "republic.json");

    if (existsSync(configPath) && !options.force) {
      console.error("Error: republic.json already exists. Use --force to overwrite.");
      process.exit(1);
    }

    const constitution = createDefaultConstitution(options.name);
    writeFileSync(configPath, JSON.stringify(constitution, null, 2) + "\n");
    console.log(`Created republic.json for "${options.name}"`);
  });
