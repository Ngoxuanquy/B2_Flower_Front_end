import { checkValiDangNhap } from "./Login";

describe("checkValiDangNhap", () => {
  it("should return true when the field is an empty string", () => {
    expect(checkValiDangNhap("")).toBe(true);
  });

  it("should return true when the field is undefined", () => {
    expect(checkValiDangNhap(undefined)).toBe(true);
  });

  it("should return false when the field is a non-empty string", () => {
    expect(checkValiDangNhap("email@example.com")).toBe(false);
  });

  it("should return false when the field is a number", () => {
    expect(checkValiDangNhap(123)).toBe(false);
  });

  it("should return false when the field is an object", () => {
    expect(checkValiDangNhap({})).toBe(false);
  });

  it("should return false when the field is null", () => {
    expect(checkValiDangNhap(null)).toBe(false);
  });
});
