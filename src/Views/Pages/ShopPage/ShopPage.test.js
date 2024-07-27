import { fetchProduct } from "./ShopPage";

var mockData = {};

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

    const productData = await fetchProduct();

    expect(productData).toBeNull();
  });

  it("should fetch product metadata", async () => {
    // Call the function

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await fetchProduct();
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
