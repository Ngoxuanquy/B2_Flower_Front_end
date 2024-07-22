// import React from "react";
// import { render, screen, waitFor } from "@testing-library/react";
// import ShopPage from "./ShopPage";
// import { Call_Post_Api } from "../../../Components/CallApi/CallApis";
// import ThemeConText from "../../../config/themeConText";

// // Mock Call_Post_Api
// jest.mock("../../../Components/CallApi/CallApis", () => ({
//   Call_Post_Api: jest.fn(),
// }));

// // Mock ThemeConText
// const mockThemeContextValue = [{ background: "white", color: "black" }, 0];

// describe("ShopPage", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test("renders loading state initially", () => {
//     Call_Post_Api.mockResolvedValue({ metadata: [] });
//     render(
//       <ThemeConText.Provider value={mockThemeContextValue}>
//         <ShopPage />
//       </ThemeConText.Provider>
//     );
//     expect(screen.getByText("Loading...")).toBeInTheDocument();
//   });

//   test("renders product list after fetching data", async () => {
//     Call_Post_Api.mockResolvedValue({
//       metadata: [
//         {
//           id: 1,
//           name: "Product 1",
//           product_attributes: { color: "red", size: "40cm" },
//           product_type: "Hoa",
//           product_price: 100,
//         },
//       ],
//     });

//     render(
//       <ThemeConText.Provider value={mockThemeContextValue}>
//         <ShopPage />
//       </ThemeConText.Provider>
//     );

//     await waitFor(() => screen.getByText("Product 1"));
//     expect(screen.getByText("Product 1")).toBeInTheDocument();
//   });

//   test("renders error message on fetch failure", async () => {
//     Call_Post_Api.mockRejectedValue(new Error("Fetch failed"));

//     render(
//       <ThemeConText.Provider value={mockThemeContextValue}>
//         <ShopPage />
//       </ThemeConText.Provider>
//     );

//     await waitFor(() => screen.getByText("Error: Fetch failed"));
//     expect(screen.getByText("Error: Fetch failed")).toBeInTheDocument();
//   });
// });
