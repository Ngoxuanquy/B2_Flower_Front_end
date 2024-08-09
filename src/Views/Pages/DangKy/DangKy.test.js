// DangKy.test.js
import { validateEmail, IsValidVietnamPhoneNumber, checkValiDangKy } from "./DangKy";

describe("checkValiDangKy", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return error message if any field is empty", () => {
    expect(checkValiDangKy("", "password123", "password123", "0123456789")).toBe("Vui lòng không để trống các trường!!!");
    expect(checkValiDangKy("test@example.com", "", "password123", "0123456789")).toBe("Vui lòng không để trống các trường!!!");
    expect(checkValiDangKy("test@example.com", "password123", "", "0123456789")).toBe("Vui lòng không để trống các trường!!!");
    expect(checkValiDangKy("test@example.com", "password123", "password123", "")).toBe("Vui lòng không để trống các trường!!!");
  });

  it("should return error message if passwords do not match", () => {
    expect(checkValiDangKy("test@example.com", "password123", "differentpassword", "0123456789")).toBe("Mật khẩu không khớp!!!");
  });

  it("should return error message if password length is less than or equal to 6", () => {
    expect(checkValiDangKy("test@example.com", "short", "short", "0123456789")).toBe("Mật khẩu phải dài hơn 6 kí tự");
  });
});

describe("DangKy Component Validation Functions", () => {
  test("validateEmail should correctly validate email addresses", () => {
    const validEmails = ["test@example.com", "user@domain.co"];
    const invalidEmails = ["invalid-email", "user@.com", "@domain.com"];

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
