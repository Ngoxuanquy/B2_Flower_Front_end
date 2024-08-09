// handleDelete.test.js
import Cookies from "js-cookie";
import { handleDelete, handleOpenUpdate } from "./ListProduct";

// Mock Cookies.get
jest.mock("js-cookie", () => ({
  get: jest.fn(),
}));

describe("handleDelete", () => {
  it("should return error message if token or id is missing", async () => {
    // Test when both token and id are missing
    Cookies.get.mockReturnValueOnce(undefined).mockReturnValueOnce(undefined);
    const result = await handleDelete();
    expect(result).toBe("Thiếu token hoặc client ID");

    // Test when token is missing
    Cookies.get.mockReturnValueOnce(undefined).mockReturnValueOnce("123");
    const resultTokenMissing = await handleDelete();
    expect(resultTokenMissing).toBe("Thiếu token hoặc client ID");

    // Test when id is missing
    Cookies.get.mockReturnValueOnce("token").mockReturnValueOnce(undefined);
    const resultIdMissing = await handleDelete();
    expect(resultIdMissing).toBe("Thiếu token hoặc client ID");

    // Test when both token and id are present
    Cookies.get.mockReturnValueOnce("token").mockReturnValueOnce("123");
    const resultBothPresent = await handleDelete();
    expect(resultBothPresent).toBeUndefined(); // Since there's no return statement for valid cases
  });
});

describe("handleOpenUpdate", () => {
  it("should return error message if token or id is missing", async () => {
    // Test when both token and id are missing
    Cookies.get.mockReturnValueOnce(undefined).mockReturnValueOnce(undefined);
    const result = await handleOpenUpdate({});
    expect(result).toBe("Thiếu token hoặc client ID");

    // Test when token is missing
    Cookies.get.mockReturnValueOnce(undefined).mockReturnValueOnce("123");
    const resultTokenMissing = await handleOpenUpdate({});
    expect(resultTokenMissing).toBe("Thiếu token hoặc client ID");

    // Test when id is missing
    Cookies.get.mockReturnValueOnce("token").mockReturnValueOnce(undefined);
    const resultIdMissing = await handleOpenUpdate({});
    expect(resultIdMissing).toBe("Thiếu token hoặc client ID");
  });

  it("should return error message if any product data field is missing", async () => {
    Cookies.get.mockReturnValueOnce("token").mockReturnValueOnce("123");

    // Test when some product fields are missing
    const result = await handleOpenUpdate({
      name: "Product",
      price: "100",
      quantity: "10",
      size: "M",
      color: "Red",
      type: "Type",
      description: "", // Empty description
    });
    expect(result).toBe("Vui lòng điền đầy đủ thông tin sản phẩm.");
  });

  it("should not return an error message if all product data fields are present", async () => {
    Cookies.get.mockReturnValueOnce("token").mockReturnValueOnce("123");

    // Test when all product fields are present
    const result = await handleOpenUpdate({
      name: "Product",
      price: "100",
      quantity: "10",
      size: "M",
      color: "Red",
      type: "Type",
      description: "Description",
    });
    expect(result).toBeUndefined(); // No return value when valid
  });
});
