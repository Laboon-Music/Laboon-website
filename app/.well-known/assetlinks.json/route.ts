import { NextResponse } from "next/server";

// Android App Links (Digital Asset Links) — serves Android App Links verification.
// Served at https://<domain>/.well-known/assetlinks.json as application/json.
// Canonical reference: Laboon/docs/deeplinks/assetlinks.json
// Keep both files in sync.
//
// SHA256 of the Android signing certificates:
// - staging debug: already filled in (shared debug key).
// - TODO (ticket APP-19): prod release + staging release
//   (Play Console -> App integrity -> App signing).
const STAGING_DEBUG_SHA256 =
  "82:C0:10:ED:CB:32:28:A4:F1:86:80:90:1C:F5:59:CE:27:57:13:8F:A4:50:08:24:9D:4D:80:21:6F:D7:64:29";
const STAGING_RELEASE_SHA256 = "REPLACE_WITH_STAGING_RELEASE_SHA256";
const PROD_RELEASE_SHA256 = "REPLACE_WITH_PROD_RELEASE_SHA256";

const ASSET_LINKS = [
  {
    relation: ["delegate_permission/common.handle_all_urls"],
    target: {
      namespace: "android_app",
      package_name: "com.laboon.app",
      sha256_cert_fingerprints: [PROD_RELEASE_SHA256],
    },
  },
  {
    relation: ["delegate_permission/common.handle_all_urls"],
    target: {
      namespace: "android_app",
      package_name: "com.laboon.app.staging",
      sha256_cert_fingerprints: [STAGING_DEBUG_SHA256, STAGING_RELEASE_SHA256],
    },
  },
];

// Static file: prerendered and cached by the CDN.
export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(ASSET_LINKS);
}
