// DangKy.test.js
import { validateEmail, IsValidVietnamPhoneNumber } from "./DangKy";

describe("DangKy Component Validation Functions", () => {
  test("validateEmail should correctly validate email addresses", () => {
    const validEmails = ["test@example.com", "user@domain.co"];
    const invalidEmails = ["", "invalid-email", "user@.com", "@domain.com"];

    validEmails.forEach((email) => {
      expect(validateEmail(email)).toBe(true);
    });

    invalidEmails.forEach((email) => {
      expect(validateEmail(email)).toBe(false);
    });
  });

  test("IsValidVietnamPhoneNumber should correctly validate phone numbers", () => {
    const validPhoneNumbers = "0123456789";
    const invalidPhoneNumbers = "123456789";

    expect(IsValidVietnamPhoneNumber(validPhoneNumbers)).toBe(true);

    expect(IsValidVietnamPhoneNumber(invalidPhoneNumbers)).toBe(false);
  });
});
