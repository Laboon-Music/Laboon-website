"use client";

import { useSyncExternalStore } from "react";

// Pages are prerendered at build time, so a server-side `new Date()` would
// freeze the year of the last deploy. The server snapshot (build year) is used
// for the HTML and hydration, then the browser renders the current year.
const BUILD_YEAR = new Date().getFullYear();
const subscribe = () => () => {};

export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => BUILD_YEAR,
  );
  return <>{year}</>;
}
