// checkValiDoiMK.test.js

import { checkValiDoiMK } from "./ResertPassword";

describe("checkValiDoiMK", () => {
  test("returns valid when all fields are correctly filled", () => {
    const result = checkValiDoiMK("user@example.com", "oldPassword", "newPassword123", "newPassword123");
    expect(result).toEqual({
      isValid: true,
    });
  });

  test("returns invalid when cleanedName is missing", () => {
    const result = checkValiDoiMK(null, "oldPassword", "newPassword123", "newPassword123");
    expect(result).toEqual({
      isValid: false,
      message: "All fields are required.",
    });
  });

  test("returns invalid when currentPassword is missing", () => {
    const result = checkValiDoiMK("user@example.com", "", "newPassword123", "newPassword123");
    expect(result).toEqual({
      isValid: false,
      message: "All fields are required.",
    });
  });

  test("returns invalid when newPassword is missing", () => {
    const result = checkValiDoiMK("user@example.com", "oldPassword", "", "newPassword123");
    expect(result).toEqual({
      isValid: false,
      message: "All fields are required.",
    });
  });

  test("returns invalid when confirmPassword is missing", () => {
    const result = checkValiDoiMK("user@example.com", "oldPassword", "newPassword123", "");
    expect(result).toEqual({
      isValid: false,
      message: "All fields are required.",
    });
  });

  test("returns invalid when newPassword is less than 6 characters", () => {
    const result = checkValiDoiMK("user@example.com", "oldPassword", "new", "new");
    expect(result).toEqual({
      isValid: false,
      message: "New password must be at least 6 characters long.",
    });
  });

  test("returns invalid when newPassword matches currentPassword", () => {
    const result = checkValiDoiMK("user@example.com", "samePassword", "samePassword", "samePassword");
    expect(result).toEqual({
      isValid: false,
      message: "New password must be different from the current password.",
    });
  });

  test("returns invalid when newPassword and confirmPassword do not match", () => {
    const result = checkValiDoiMK("user@example.com", "oldPassword", "newPassword123", "differentPassword");
    expect(result).toEqual({
      isValid: false,
      message: "New password and confirm password do not match.",
    });
  });
});
