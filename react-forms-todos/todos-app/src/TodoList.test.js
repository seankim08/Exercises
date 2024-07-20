import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";

function addTodo(todoList, task = "write tests") {
  const taskInput = todoList.getByLabelText("New Todo:");
  fireEvent.change(taskInput, { target: { value: task }});
  const submitButton = todoList.getByText("Add Todo");
  fireEvent.click(submitButton);
}

it("renders without crashing", function() {
  render(<TodoList />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<TodoList />);
  expect(asFragment()).toMatchSnapshot();
});

it("can add a todo", function() {
  const list = render(<TodoList />);
  addTodo(list);

  expect(list.getByLabelText("New Todo:")).toHaveValue("");
  expect(list.getByText("write tests")).toBeInTheDocument();
  expect(list.getByText("X")).toBeInTheDocument();
});

it("can delete a todo", function() {
  const list = render(<TodoList />);
  addTodo(list);

  fireEvent.click(list.getByText("X"));

  expect(list.queryByText("write tests")).not.toBeInTheDocument();
});