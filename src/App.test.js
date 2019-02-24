import React from "react";
import ReactDOM from "react-dom";
import Home from "./Home";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Home />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("checks all checkboxes", () => {
  const checkBox = document.createElement("input");
  ReactDOM.render(<Home />, checkBox);
  expect(checkBox.checked).toEqual(false);
});
