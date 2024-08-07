import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16"; // Adjust the adapter version if needed
import App from "./App";
configure({ adapter: new Adapter() });

describe("App component", () => {
  it("renders without errors", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });
});
