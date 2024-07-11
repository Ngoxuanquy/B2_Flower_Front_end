import { render, screen } from "@testing-library/react";
import ThemeConText from "../config/themeConText";
import { Router } from "react-router-dom";
import { Card } from "../Components";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

const mockTheme = {
  color: "blue",
};

const mockList = {
  _id: "1",
  product_thumb: "http://example.com/image.jpg",
  product_name: "Test Product",
  product_price: 100,
};

test("renders Card component with product details", () => {
  render(<Card list={mockList} />);
  // Kiểm tra hình ảnh sản phẩm
  const imgElement = screen.getByTestId("product-image");
  expect(imgElement).toHaveAttribute("src", mockList.product_thumb);

  // Kiểm tra tên sản phẩm
  const nameElement = screen.getByText(mockList.product_name);
  expect(nameElement).toBeInTheDocument();

  // Kiểm tra giá sản phẩm
  const priceElement = screen.getByText(`$${mockList.product_price}`);
  expect(priceElement).toBeInTheDocument();

  // Kiểm tra màu sắc từ context
  const containerElement = screen.getByTestId("container");
  expect(containerElement).toHaveStyle(`color: ${mockTheme.color}`);
});

test("renders link to product detail page", () => {
  render(<Card list={mockList} />);

  const linkElement = screen.getByRole("link");
  expect(linkElement).toHaveAttribute("href", `/detailproduct/${mockList._id}`);
});
