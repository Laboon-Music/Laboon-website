"use client";

import Script from "next/script";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

// Widget Cloudflare Turnstile (anti-robots, sans puzzle à résoudre).
// En mode "interaction-only", il reste invisible sauf si Cloudflare a un doute.
// Si NEXT_PUBLIC_TURNSTILE_SITE_KEY n'est pas configurée, rien n'est affiché.

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export const turnstileEnabled = !!SITE_KEY;
export const TURNSTILE_PENDING =
  "Vérification anti-robot en cours… réessaie dans quelques secondes.";

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

const Turnstile = forwardRef<TurnstileHandle, { onToken: (token: string) => void }>(
  function Turnstile({ onToken }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetId = useRef<string | null>(null);
    const onTokenRef = useRef(onToken);
    onTokenRef.current = onToken;
    const [loaded, setLoaded] = useState(
      () => typeof window !== "undefined" && !!window.turnstile
    );

    useImperativeHandle(ref, () => ({
      reset() {
        onTokenRef.current("");
        if (widgetId.current) window.turnstile?.reset(widgetId.current);
      },
    }));

    useEffect(() => {
      if (!SITE_KEY || !loaded || !containerRef.current || !window.turnstile) return;
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
    }, [loaded]);

    if (!SITE_KEY) return null;

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
);

export default Turnstile;
