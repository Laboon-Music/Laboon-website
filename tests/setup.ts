import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Never send analytics from tests.
vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

afterEach(() => cleanup());
