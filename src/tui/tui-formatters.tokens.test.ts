import { describe, expect, it } from "vitest";

import { getTokenUsageInfo } from "./tui-formatters.js";

describe("getTokenUsageInfo", () => {
  it("handles unknown totals", () => {
    expect(getTokenUsageInfo(null, null)).toEqual({
      text: "tokens ?",
      pctUsed: null,
      pctRemaining: null,
    });
  });

  it("handles context without total", () => {
    const info = getTokenUsageInfo(null, 1000);
    expect(info.text).toContain("tokens ?/1");
    expect(info.text).toContain("k");
    expect(info.pctUsed).toBeNull();
  });

  it("computes percent used/remaining", () => {
    const info = getTokenUsageInfo(380, 1000);
    expect(info.text).toContain("(38%)");
    expect(info.pctUsed).toBe(38);
    expect(info.pctRemaining).toBe(62);
  });
});
