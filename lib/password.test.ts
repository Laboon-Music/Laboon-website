import { describe, expect, it } from "vitest";
import {
  MIN_PASSWORD_LENGTH,
  parseRecoveryHash,
  RESET_GENERIC_ERROR,
  supabaseErrorMessage,
  validateNewPassword,
} from "./password";

describe("parseRecoveryHash", () => {
  it("extracts the tokens of a recovery link", () => {
    expect(parseRecoveryHash("#access_token=a&refresh_token=r&type=recovery")).toEqual({
      accessToken: "a",
      refreshToken: "r",
    });
  });

  it.each([
    "",
    "#access_token=a&refresh_token=r&type=signup",
    "#refresh_token=r&type=recovery",
    "#access_token=a&type=recovery",
  ])("rejects %j", (hash) => {
    expect(parseRecoveryHash(hash)).toBeNull();
  });
});

describe("validateNewPassword", () => {
  const ok = "x".repeat(MIN_PASSWORD_LENGTH);

  it("accepts a long enough, confirmed password", () => {
    expect(validateNewPassword(ok, ok)).toBeNull();
  });

  it("rejects a short password", () => {
    expect(validateNewPassword("short", "short")).toMatch(/au moins 12/);
  });

  it("rejects a mismatching confirmation", () => {
    expect(validateNewPassword(ok, `${ok}!`)).toMatch(/ne correspondent pas/);
  });
});

describe("supabaseErrorMessage", () => {
  it("translates known Supabase codes", () => {
    expect(supabaseErrorMessage({ code: "weak_password" })).toMatch(/trop faible/);
    expect(supabaseErrorMessage({ code: "session_expired" })).toMatch(/expiré/);
  });

  it("never leaks an unknown English message", () => {
    expect(supabaseErrorMessage({ code: "x", message: "Boom" })).toBe(
      RESET_GENERIC_ERROR,
    );
    expect(supabaseErrorMessage(new Error("Failed to fetch"))).toBe(RESET_GENERIC_ERROR);
    expect(supabaseErrorMessage(null)).toBe(RESET_GENERIC_ERROR);
  });
});
