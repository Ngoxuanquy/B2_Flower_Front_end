// checkValiDangNhap.test.js

import { checkValiDangNhap } from "./Login";

describe("checkValiDangNhap", () => {
  test("returns true when email and matkhau are non-empty strings", () => {
    expect(checkValiDangNhap("test@example.com", "password123")).toBe(true);
  });

  test("returns false when email is an empty string", () => {
    expect(checkValiDangNhap("", "password123")).toBe(false);
  });

  test("returns false when matkhau is an empty string", () => {
    expect(checkValiDangNhap("test@example.com", "")).toBe(false);
  });

  // test("returns false when email is undefined", () => {
  //   expect(checkValiDangNhap(undefined, "password123")).toBe(false);
  // });

  // test("returns false when matkhau is undefined", () => {
  //   expect(checkValiDangNhap("test@example.com", undefined)).toBe(false);
  // });

  test("returns false when both email and matkhau are empty strings", () => {
    expect(checkValiDangNhap("", "")).toBe(false);
  });

  // test("returns false when both email and matkhau are undefined", () => {
  //   expect(checkValiDangNhap(undefined, undefined)).toBe(false);
  // });
});
