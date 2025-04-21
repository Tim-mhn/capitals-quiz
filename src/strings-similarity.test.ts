import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { stringsAreSimilar } from "./strings-similarty.ts";

describe("similar strings", () => {
  it("accept similar answers ", () => {
    const acceptedAnswers: Array<[string, string]> = [
      ["Paris", "Pariss"],
      ["Ulaanbaatar", "Oulan-Bator"],
      ["Addis-Adeba", "Addis Adaba"],
      ["Helsinki", "Helsinkki"],
      ["Mogadishu", "Mogadishoo"],
      ["Mogadishu", "Mogadichu"],
    ];

    for (const [answer, guess] of acceptedAnswers) {
      assert.equal(stringsAreSimilar(answer, guess).isSimilar, true);
    }
  });
});
