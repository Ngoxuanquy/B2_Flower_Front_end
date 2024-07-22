import React from "react";
import { render, screen } from "@testing-library/react";
import ShopIntroduce from "./ShopIntroduce";
// import "@testing-library/jest-dom/extend-expect";
describe("ShopIntroduce component", () => {
  test("renders shop name correctly", () => {
    render(<ShopIntroduce />);
    const shopNameElement = screen.getByRole("heading", {
      level: 1,
      name: /2BE Flower/i,
    });
    expect(shopNameElement).toBeInTheDocument();
  });

  test("renders shop description correctly", () => {
    render(<ShopIntroduce />);
    const shopDescriptionElement = screen.getByText(
      /2BE Flower là cửa hàng hoa tươi chuyên cung cấp các loại hoa tươi đẹp nhất cho mọi dịp./i
    );
    expect(shopDescriptionElement).toBeInTheDocument();
  });

  test("renders shop contact information correctly", () => {
    render(<ShopIntroduce />);
    const shopAddressElement = screen.getByText(
      /123 Đường Hoa, Quận 1, TP.HCM/i
    );
    expect(shopAddressElement).toBeInTheDocument();

    const shopPhoneElement = screen.getByText(/0123 456 789/i);
    expect(shopPhoneElement).toBeInTheDocument();

    const shopEmailElement = screen.getByText(/contact@2beflower.com/i);
    expect(shopEmailElement).toBeInTheDocument();

    const shopOperatingHoursElement = screen.getByText(/08:00 - 20:00/i);
    expect(shopOperatingHoursElement).toBeInTheDocument();
  });

  test("renders shop services correctly", () => {
    render(<ShopIntroduce />);
    const serviceElements = screen.getAllByRole("listitem");
    expect(serviceElements.length).toBe(4); // Assuming there are 4 services as defined in shopData
    expect(serviceElements[0]).toHaveTextContent(
      /Hoa tươi cho ngày lễ, sinh nhật, cưới hỏi/i
    );
    expect(serviceElements[1]).toHaveTextContent(/Dịch vụ giao hoa tận nơi/i);
    expect(serviceElements[2]).toHaveTextContent(/Thiết kế hoa theo yêu cầu/i);
    expect(serviceElements[3]).toHaveTextContent(/Tư vấn chăm sóc hoa/i);
  });

  test("renders shop reviews correctly", () => {
    render(<ShopIntroduce />);
    const reviewElements = screen.getAllByText(/đánh giá khách hàng/i);
    expect(reviewElements.length).toBe(3); // Assuming there are 3 reviews as defined in shopData
    expect(reviewElements[0]).toHaveTextContent(/Nguyễn Văn A/i);
    expect(reviewElements[1]).toHaveTextContent(/Trần Thị B/i);
    expect(reviewElements[2]).toHaveTextContent(/Lê Văn C/i);
  });

  // Additional tests can be added for form rendering and interactions
});
