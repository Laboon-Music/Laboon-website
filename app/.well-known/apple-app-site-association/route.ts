import { NextResponse } from "next/server";

// Apple App Site Association (AASA) — serves Laboon's iOS Universal Links.
// Served at https://<domain>/.well-known/apple-app-site-association as application/json.
// Canonical reference: Laboon/docs/deeplinks/apple-app-site-association
// Keep both files in sync.
//
// TODO (ticket APP-19): replace TEAM_ID with the real Apple Team ID
// (10 chars, Apple Developer -> Membership). Without it, iOS will not validate
// the Universal Links and the link will open Safari instead of the app.
const APPLE_TEAM_ID = "TEAM_ID";

const AASA = {
  applinks: {
    details: [
      {
        appIDs: [
          `${APPLE_TEAM_ID}.com.laboon.app`,
          `${APPLE_TEAM_ID}.com.laboon.app.staging`,
        ],
        components: [
          {
            "/": "/reset-password",
            comment: "Open the Laboon app for the password recovery deeplink",
          },
          {
            "/": "/reset-password/*",
            comment: "Match any subpath of /reset-password",
          },
        ],
      },
    ],
  },
};

// Static file: prerendered and cached by the CDN.
export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(AASA);
}
