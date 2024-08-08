import { checkValidation } from "./ProductUpload";

describe("checkValidation", () => {
  const apiProducts = [{ product_name: "Existing Product" }, { product_name: "Another Product" }];

  test("should return error message for duplicate product name", () => {
    const result = checkValidation(apiProducts, "Existing Product", 10, 5);
    expect(result).toBe("*Tên sản phẩm đã tồn tại. Vui lòng chọn tên khác!");
  });

  test("should return error message for negative price", () => {
    const result = checkValidation(apiProducts, "New Product", -10, 5);
    expect(result).toBe("*Giá sản phẩm không thể nhỏ hơn 0. Vui lòng kiểm tra lại!");
  });

  test("should return error message for negative quantity", () => {
    const result = checkValidation(apiProducts, "New Product", 10, -5);
    expect(result).toBe("*Số lượng sản phẩm không thể nhỏ hơn 0. Vui lòng kiểm tra lại!");
  });

  test("should return empty string for valid inputs", () => {
    const result = checkValidation(apiProducts, "Valid Product", 10, 5);
    expect(result).toBe("");
  });

  test("should handle edge case for zero price and quantity", () => {
    const result = checkValidation(apiProducts, "Valid Product", 0, 0);
    expect(result).toBe("");
  });
});
