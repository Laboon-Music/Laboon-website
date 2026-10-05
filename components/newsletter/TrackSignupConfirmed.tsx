"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/** Records the end of the signup funnel when /inscription-confirmee is shown. */
export function TrackSignupConfirmed() {
  useEffect(() => {
    trackEvent("signup_confirmed", {});
  }, []);
  return null;
}
