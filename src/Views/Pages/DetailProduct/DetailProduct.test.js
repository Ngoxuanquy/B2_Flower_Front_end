import {
  fetchProduct,
  handerCongUnitTest,
  handerTruUnitTest,
} from "./DetailProduct";

var mockData = {
  message: "publicProductByShop success",
  status: 200,
  metadata: {
    _id: "654206e2f5dd24808ce26cf6",
    product_name: "Hoa sáp bó 15 bông",
    product_thumb:
      "https://res.cloudinary.com/dvqmndx5j/image/upload/v1721630663/banhang/b8yzss7fvm6anxhqqgve.jpg",
    product_description: "Hoa hồng ",
    product_price: 150000,
    product_quantity: 13,
    product_type: "Hoa",
    product_shop: "653d44f82c8e9a8f5bc2c1fa",
    product_attributes: {
      color: "Đỏ",
      size: "60cm",
    },
    product_ratingsAverage: 4.5,
    product_variations: [],
    isPublished: true,
    createdAt: "2023-11-01T08:05:54.443Z",
    updatedAt: "2024-07-26T02:28:49.144Z",
    product_slug: "hoa-sap-bo-15-bong",
    __v: 0,
    product_discount: 1,
  },
};

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

// Tests for handerCongUnitTest
describe("handerCongUnitTest", () => {
  test("should add 1 to the given value", () => {
    expect(handerCongUnitTest(0)).toBe(1);
    expect(handerCongUnitTest(1)).toBe(2);
    expect(handerCongUnitTest(100)).toBe(101);
  });
});

// Tests for handerTruUnitTest
describe("handerTruUnitTest", () => {
  test("should subtract 1 from the given value", () => {
    expect(handerTruUnitTest(2)).toBe(1);
    expect(handerTruUnitTest(100)).toBe(99);
  });

  test("should not subtract below 1", () => {
    expect(handerTruUnitTest(1)).toBe(1);
    expect(handerTruUnitTest(0)).toBe(1);
    expect(handerTruUnitTest(-10)).toBe(1);
  });

  describe("fetchProduct", () => {
    it("should return product data when API call is successful", async () => {
      // Mock the fetch function to return a successful response
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ productId: 123, name: "Sample Product" }),
      });

      const productId = 123;
      const productData = await fetchProduct(productId);

      expect(productData).toEqual({ productId: 123, name: "Sample Product" });
    });

    it("should handle API errors and return null", async () => {
      // Mock the fetch function to return an error response
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      });

      const productId = 456;
      const productData = await fetchProduct(productId);

      expect(productData).toBeNull();
    });

    it("should fetch product metadata", async () => {
      // Call the function

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      const productId = "654206e2f5dd24808ce26cf6";
      const result = await fetchProduct(productId);
      console.log({ result });

      // Assertions
      expect(result).toBe(mockData);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should handle HTTP error", async () => {
      // Mock an error response
      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          statusText: "Not Found",
        })
      );

      // Call the function
      try {
        await fetchProduct();
      } catch (error) {
        // Assertions
        expect(error.message).toBe("HTTP error! status: 404");
      }
    });

    it("should handle other errors", async () => {
      // Mock a network error
      global.fetch.mockImplementationOnce(() =>
        Promise.reject(new Error("Network error"))
      );

      // Call the function
      try {
        await fetchProduct();
      } catch (error) {
        // Assertions
        expect(error.message).toBe("Network error");
      }
    });
  });
});
