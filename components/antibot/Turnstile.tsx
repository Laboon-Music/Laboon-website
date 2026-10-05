"use client";

import Script from "next/script";
import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import { publicEnv } from "@/lib/env";

// Cloudflare Turnstile widget (anti-bot, no puzzle to solve).
// In "interaction-only" mode it stays invisible unless Cloudflare has a doubt.
// Renders nothing when NEXT_PUBLIC_TURNSTILE_SITE_KEY is not configured.
// See docs/features/antibot.md.

const SITE_KEY = publicEnv.turnstileSiteKey;

export const turnstileEnabled = !!SITE_KEY;

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export type TurnstileHandle = { reset: () => void };

/**
 * Renders nothing until `active` (first interaction with the form), so the
 * Cloudflare script and challenge only run for visitors who start a form.
 */
export default function Turnstile({
  active = true,
  ref,
  onToken,
}: {
  active?: boolean;
  ref?: Ref<TurnstileHandle>;
  onToken: (token: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);
  const [loaded, setLoaded] = useState(
    () => typeof window !== "undefined" && !!window.turnstile,
  );

  useImperativeHandle(ref, () => ({
    reset() {
      onTokenRef.current("");
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
    },
  }));

  useEffect(() => {
    if (!SITE_KEY || !active || !loaded || !containerRef.current || !window.turnstile) {
      return;
    }
    const id = window.turnstile.render(containerRef.current, {
      sitekey: SITE_KEY,
      language: "fr",
      appearance: "interaction-only",
      theme: "dark",
      callback: (token: string) => onTokenRef.current(token),
      "expired-callback": () => onTokenRef.current(""),
      "error-callback": () => onTokenRef.current(""),
    });
    widgetId.current = id;
    return () => {
      window.turnstile?.remove(id);
      widgetId.current = null;
    };
  }, [active, loaded]);

  if (!SITE_KEY || !active) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setLoaded(true)}
      />
      <div ref={containerRef} />
    </>
  );
}
