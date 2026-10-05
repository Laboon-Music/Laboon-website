import { describe, expect, it } from "vitest";
import { GET as appleAssociation } from "./apple-app-site-association/route";
import { GET as assetLinks } from "./assetlinks.json/route";

describe("deep link association files", () => {
  it("serves the iOS association for /reset-password", async () => {
    const res = appleAssociation();
    expect(res.headers.get("content-type")).toContain("application/json");
    const { applinks } = await res.json();
    expect(applinks.details[0].components.map((c: { "/": string }) => c["/"])).toContain(
      "/reset-password",
    );
  });

  it("serves the Android asset links for both app flavors", async () => {
    const links = await assetLinks().json();
    expect(
      links.map((l: { target: { package_name: string } }) => l.target.package_name),
    ).toEqual(["com.laboon.app", "com.laboon.app.staging"]);
  });
});
