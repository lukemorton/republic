#!/usr/bin/env node
import { Command } from "commander";
import { initCommand } from "./commands/init.js";
import { buildCommand } from "./commands/build.js";

const program = new Command();

program
  .name("republic")
  .description("Republic CLI - compile Constitution to code")
  .version("0.0.1");

program.addCommand(initCommand);
program.addCommand(buildCommand);

program.parse();
