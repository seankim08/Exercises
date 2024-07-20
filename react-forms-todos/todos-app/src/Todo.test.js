import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Todo from "./Todo";

it("renders without crashing", function() {
  render(<Todo id={1} task="Test task" removeTodo={() => {}} />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<Todo id={1} task="Test task" removeTodo={() => {}} />);
  expect(asFragment()).toMatchSnapshot();
});

it("runs the delete function on button click", function() {
  const removeMock = jest.fn();
  const { getByText } = render(<Todo id={1} task="Test task" removeTodo={removeMock} />);
  const deleteButton = getByText("X");
  fireEvent.click(deleteButton);
  expect(removeMock).toHaveBeenCalled();
});