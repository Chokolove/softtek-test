import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { parseBirthday, getAge } from "./dateUtils";

const MOCK_CURRENT_DATE = new Date("2025-08-03T00:00:00Z");

describe("parseBirthday", () => {
  it("parses a valid birthday string", () => {
    const result = parseBirthday("15-04-2000");
    expect(result).toBeInstanceOf(Date);
    expect(result?.getFullYear()).toBe(2000);
    expect(result?.getMonth()).toBe(3);
    expect(result?.getDate()).toBe(15);
  });

  it("returns null for an invalid format", () => {
    const result = parseBirthday("2000/04/15");
    expect(result).toBeNull();
  });

  it("returns null for empty string", () => {
    const result = parseBirthday("");
    expect(result).toBeNull();
  });
});

describe("getAge", () => {
  beforeEach(() => {
    vi.setSystemTime(MOCK_CURRENT_DATE);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("calculates age correctly", () => {
    const birthDate = new Date("2000-04-15T00:00:00Z");
    const age = getAge(birthDate);
    expect(age).toBe(25); // as of 2025-08-03
  });

  it("returns null for null input", () => {
    const age = getAge(null);
    expect(age).toBeNull();
  });

  it("returns 0 for a birthdate today", () => {
    const birthDate = new Date("2025-08-03T00:00:00Z");
    const age = getAge(birthDate);
    expect(age).toBe(0);
  });
});
