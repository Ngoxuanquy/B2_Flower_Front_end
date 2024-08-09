// checkValiDangNhap.test.js

import { checkValiDangNhap } from "./Login";

describe("checkValiDangNhap", () => {
  test("should return true for valid email and password", () => {
    expect(checkValiDangNhap("test@example.com", "password123")).toBe(true);
  });

  test("should return false for invalid email format", () => {
    expect(checkValiDangNhap("invalid-email", "password123")).toBe(false);
    expect(checkValiDangNhap("test@example", "password123")).toBe(false);
    expect(checkValiDangNhap("test@.com", "password123")).toBe(false);
  });

  test("should return false for empty email or password", () => {
    expect(checkValiDangNhap("", "password123")).toBe(false);
    expect(checkValiDangNhap("test@example.com", "")).toBe(false);
    expect(checkValiDangNhap("", "")).toBe(false);
  });

  test("should return false for undefined email or password", () => {
    expect(checkValiDangNhap(undefined, "password123")).toBe(false);
    expect(checkValiDangNhap("test@example.com", undefined)).toBe(false);
    expect(checkValiDangNhap(undefined, undefined)).toBe(false);
  });
});
