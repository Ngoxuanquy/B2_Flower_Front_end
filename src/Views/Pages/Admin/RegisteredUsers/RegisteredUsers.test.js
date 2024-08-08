import { handelDiscountO } from "./RegisteredUsers";

describe("handelDiscountO", () => {
  // it("should return false with a message if token is empty", () => {
  //   const result = handelDiscountO("", "123", "ABC123", ["user1"], "2024-08-01", "2024-08-10", 100);
  //   expect(result).toEqual({
  //     isValid: false,
  //     message: "Token không được để trống",
  //   });
  // });

  // it("should return false with a message if ID is empty", () => {
  //   const result = handelDiscountO("token", "", "ABC123", ["user1"], "2024-08-01", "2024-08-10", 100);
  //   expect(result).toEqual({
  //     isValid: false,
  //     message: "ID không được để trống",
  //   });
  // });

  it("should return false with a message if discount code is empty", () => {
    const result = handelDiscountO("token", "123", "", ["user1"], "2024-08-01", "2024-08-10", 100);
    expect(result).toEqual({
      isValid: false,
      message: "Mã giảm giá không được để trống",
    });
  });

  it("should return false with a message if users are empty", () => {
    const result = handelDiscountO("token", "123", "ABC123", [], "2024-08-01", "2024-08-10", 100);
    expect(result).toEqual({
      isValid: false,
      message: "Người dùng không được để trống",
    });
  });

  it("should return false with a message if start date is empty", () => {
    const result = handelDiscountO("token", "123", "ABC123", ["user1"], "", "2024-08-10", 100);
    expect(result).toEqual({
      isValid: false,
      message: "Ngày bắt đầu không được để trống",
    });
  });

  it("should return false with a message if end date is empty", () => {
    const result = handelDiscountO("token", "123", "ABC123", ["user1"], "2024-08-01", "", 100);
    expect(result).toEqual({
      isValid: false,
      message: "Ngày kết thúc không được để trống",
    });
  });

  it("should return false with a message if value is empty", () => {
    const result = handelDiscountO("token", "123", "ABC123", ["user1"], "2024-08-01", "2024-08-10", null);
    expect(result).toEqual({
      isValid: false,
      message: "Giá trị không được để trống",
    });
  });

  it("should return true if all inputs are valid", () => {
    const result = handelDiscountO("token", "123", "ABC123", ["user1"], "2024-08-01", "2024-08-10", 100);
    expect(result).toEqual({
      isValid: true,
    });
  });
});
