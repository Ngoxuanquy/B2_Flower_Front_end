// checkValiQuyenMK.test.js

import { checkValiQuyenMK } from "./ForgotPassword";

describe("checkValiQuyenMK", () => {
  test("returns valid when email is properly formatted", () => {
    const result = checkValiQuyenMK("test@example.com");
    expect(result).toEqual({
      isValid: true,
    });
  });

  test("returns invalid when email is an empty string", () => {
    const result = checkValiQuyenMK("");
    expect(result).toEqual({
      isValid: false,
      message: "Vui lòng nhập email",
    });
  });

  test("returns invalid when email is null", () => {
    const result = checkValiQuyenMK(null);
    expect(result).toEqual({
      isValid: false,
      message: "Vui lòng nhập email",
    });
  });

  test("returns invalid when email is only whitespace", () => {
    const result = checkValiQuyenMK("   ");
    expect(result).toEqual({
      isValid: false,
      message: "Vui lòng nhập email",
    });
  });

  test("returns invalid when email format is incorrect", () => {
    const result = checkValiQuyenMK("invalid-email");
    expect(result).toEqual({
      isValid: false,
      message: "Email không đúng định dạng",
    });
  });

  test("returns invalid when email is missing domain", () => {
    const result = checkValiQuyenMK("test@");
    expect(result).toEqual({
      isValid: false,
      message: "Email không đúng định dạng",
    });
  });

  test('returns invalid when email is missing "@" symbol', () => {
    const result = checkValiQuyenMK("testexample.com");
    expect(result).toEqual({
      isValid: false,
      message: "Email không đúng định dạng",
    });
  });
});
