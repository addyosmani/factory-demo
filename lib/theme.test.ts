import { describe, expect, it } from "vitest";
import { resolveTheme } from "./theme";

describe("resolveTheme", () => {
  it("uses the system preference when no choice has been saved", () => {
    expect(resolveTheme(null, true)).toBe("dark");
    expect(resolveTheme(null, false)).toBe("light");
  });

  it("keeps a valid saved choice even when the system preference differs", () => {
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme("dark", false)).toBe("dark");
  });

  it("falls back to the system preference for an invalid saved value", () => {
    expect(resolveTheme("sepia", true)).toBe("dark");
    expect(resolveTheme("sepia", false)).toBe("light");
  });
});
