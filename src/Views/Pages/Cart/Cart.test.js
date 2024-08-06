import { toggleCheckbox, updateQuantity } from "./Cart";
import Cookies from "js-cookie";
import fetchMock from "jest-fetch-mock";
jest.mock("js-cookie", () => ({
  get: jest.fn(),
}));

jest.mock("node-fetch", () => jest.fn());

describe("toggleCheckbox function", () => {
  it("should add value to an empty list", () => {
    const checkedList = [];
    const value = "item1";
    const result = toggleCheckbox(checkedList, value);
    expect(result).toEqual([value]);
  });

  it("should add value to a non-empty list", () => {
    const checkedList = ["item1", "item2"];
    const value = "item3";
    const result = toggleCheckbox(checkedList, value);
    expect(result).toEqual(["item1", "item2", value]);
  });

  it("should remove value from the list if already present", () => {
    const checkedList = ["item1", "item2", "item3"];
    const value = "item2";
    const result = toggleCheckbox(checkedList, value);
    expect(result).toEqual(["item1", "item3"]);
  });

  it("should return the original list if value is not present", () => {
    const checkedList = ["item1", "item2", "item3"];
    const value = "item4";
    const result = toggleCheckbox(checkedList, value);
    expect(result).toEqual(["item1", "item2", "item3", "item4"]);
  });
});

describe("updateQuantity", () => {
  beforeEach(() => {
    fetch.resetMocks();
    jest.clearAllMocks();
  });

  it("should call fetch with correct options and log data", async () => {
    const checkedList = [{ _id: "1", quantity: 5 }];
    const mockData = { success: true };

    Cookies.get.mockImplementation((key) => {
      if (key === "accessToken") return '"mockToken"';
      if (key === "id") return '"mockId"';
      return null;
    });

    fetch.mockResponseOnce(JSON.stringify(mockData), { status: 200 });

    console.log = jest.fn();

    await updateQuantity(checkedList);

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3056/v1/api/product/updateQuantity",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer mockToken",
          "X-User-ID": "mockId",
        },
        body: JSON.stringify([{ id: "1", quantity: -5 }]),
      }
    );

    expect(console.log).toHaveBeenCalledWith(mockData);
  });

  it("should log error if fetch fails", async () => {
    const checkedList = [{ _id: "1", quantity: 5 }];

    Cookies.get.mockImplementation((key) => {
      if (key === "accessToken") return '"mockToken"';
      if (key === "id") return '"mockId"';
      return null;
    });

    fetch.mockResponseOnce(JSON.stringify({ error: "error" }), { status: 500 });

    console.error = jest.fn();

    await updateQuantity(checkedList);

    expect(console.error).toHaveBeenCalledWith(
      "Error updating quantity:",
      new Error("HTTP error! Status: 500")
    );
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
