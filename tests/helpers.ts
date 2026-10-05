import { vi } from "vitest";

/** Builds a JSON POST request as the forms send it. */
export function jsonRequest(
  url: string,
  body: unknown,
  headers: Record<string, string> = {},
): Request {
  return new Request(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

/** Replaces global fetch with a mock answering `status` + JSON `data`. */
export function mockFetch(status = 200, data: unknown = {}) {
  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) =>
    Response.json(data, { status }),
  );
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

export type FetchMock = ReturnType<typeof mockFetch>;

/** JSON body sent with the n-th fetch call. */
export function sentJson(fetchMock: FetchMock, call = 0) {
  return JSON.parse(fetchMock.mock.calls[call][1]?.body as string);
}

/** Silences console output for the current test (and lets it be asserted). */
export function silenceConsole() {
  return {
    log: vi.spyOn(console, "log").mockImplementation(() => {}),
    warn: vi.spyOn(console, "warn").mockImplementation(() => {}),
    error: vi.spyOn(console, "error").mockImplementation(() => {}),
  };
}

/** Anti-bot fields of a legitimate human submission. */
export const HUMAN = { website: "", elapsedMs: 5000, turnstileToken: "" };
