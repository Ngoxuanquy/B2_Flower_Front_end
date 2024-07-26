// SearchBox.test.js
import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16"; // Adjust the adapter version if needed
import SearchBox from "./SearchBox"; // Adjust the path to your actual SearchBox component

configure({ adapter: new Adapter() });

describe("SearchBox component", () => {
  it("renders without errors", () => {
    const wrapper = shallow(<SearchBox />);
    expect(wrapper.exists()).toBe(true);
  });
});
