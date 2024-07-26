import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16"; // Adjust the adapter version if needed
import DangKy from "./DangKy";
configure({ adapter: new Adapter() });

describe("App component", () => {
  it("renders without errors", () => {
    const wrapper = shallow(<DangKy />);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders without errors", () => {
    const wrapper = shallow(<Sum />);
    const result = wrapper.Sum(2, 4);
    expect(result).toBe(6);
  });
});
