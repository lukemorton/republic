import { describe, it, expect } from "vitest";
import { greeting, version } from "./index";

describe("greeting", () => {
  it("should return a greeting message", () => {
    expect(greeting("Republic")).toBe("Welcome to Republic!");
  });
});

describe("version", () => {
  it("should return the version string", () => {
    expect(version()).toBe("0.0.1");
  });
});
