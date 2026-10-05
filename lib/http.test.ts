import { describe, expect, it } from "vitest";
import { jsonError, jsonOk, readJsonBody } from "./http";

describe("jsonOk / jsonError", () => {
  it("builds the response shapes the forms expect", async () => {
    const ok = jsonOk({ dryRun: true });
    expect(ok.status).toBe(200);
    expect(await ok.json()).toEqual({ ok: true, dryRun: true });

    const err = jsonError("Nope", 418);
    expect(err.status).toBe(418);
    expect(await err.json()).toEqual({ error: "Nope" });
  });
});

describe("readJsonBody", () => {
  const req = (body: string) => new Request("http://x", { method: "POST", body });

  it("parses a JSON object", async () => {
    expect(await readJsonBody(req('{"a":1}'))).toEqual({ a: 1 });
  });

  it.each(["not json", "null", "[1,2]", '"str"'])("returns null for %j", async (body) => {
    expect(await readJsonBody(req(body))).toBeNull();
  });
});
