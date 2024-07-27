import { updateQuantity } from "./Cart";

jest.mock("js-cookie", () => ({
  get: jest.fn(),
}));

jest.mock("node-fetch", () => jest.fn());

describe("updateQuantity", () => {
  it("should call fetch with the correct parameters", async () => {
    // Mock the necessary data
    const accessToken = "mocked-access-token";
    const id = "mocked-id";
    const checkedList = [
      { _id: "product1", quantity: 2 },
      { _id: "product2", quantity: 3 },
    ];

    // Mock the Cookies.get function
    require("js-cookie")
      .get.mockReturnValueOnce(accessToken)
      .mockReturnValueOnce(id);

    // Mock the fetch function
    const fetch = require("node-fetch");
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ success: true }),
    });

    // Call the function to be tested
    await updateQuantity(checkedList);

    // Verify that fetch was called with the correct parameters
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3056/v1/api/product/updateQuantity",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-User-ID": id,
        },
        body: JSON.stringify([
          { id: "product1", quantity: -2 },
          { id: "product2", quantity: -3 },
        ]),
      }
    );
  });

  it("should log the response data", async () => {
    // Mock the necessary data
    const checkedList = [
      { _id: "product1", quantity: 2 },
      { _id: "product2", quantity: 3 },
    ];

    // Mock the fetch function
    const fetch = require("node-fetch");
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ success: true }),
    });

    // Mock the console.log function
    const originalConsoleLog = console.log;
    console.log = jest.fn();

    // Call the function to be tested
    await updateQuantity(checkedList);

    // Verify that console.log was called with the correct data
    expect(console.log).toHaveBeenCalledWith({ success: true });

    // Restore the original console.log function
    console.log = originalConsoleLog;
  });

  it("should handle fetch errors", async () => {
    // Mock the necessary data
    const checkedList = [
      { _id: "product1", quantity: 2 },
      { _id: "product2", quantity: 3 },
    ];

    // Mock the fetch function to throw an error
    const fetch = require("node-fetch");
    fetch.mockRejectedValueOnce(new Error("Network error"));

    // Mock the console.error function
    const originalConsoleError = console.error;
    console.error = jest.fn();

    // Call the function to be tested
    await updateQuantity(checkedList);

    // Verify that console.error was called with the correct error message
    expect(console.error).toHaveBeenCalledWith(
      "Error updating quantity:",
      expect.any(Error)
    );

    // Restore the original console.error function
    console.error = originalConsoleError;
  });
});
