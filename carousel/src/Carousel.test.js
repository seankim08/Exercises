import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("renders without crashing", function() {
  render(<Carousel />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it("moves to the previous image when the left arrow is clicked", function() {
  const { getByTestId } = render(<Carousel />);
  const rightArrow = getByTestId("right-arrow");
  const leftArrow = getByTestId("left-arrow");

  // Move to the second image
  fireEvent.click(rightArrow);

  // Move back to the first image
  fireEvent.click(leftArrow);

  expect(getByTestId("card-small")).toHaveTextContent("Image 1 of 3");
});

it("hides left arrow on first image", function() {
  const { queryByTestId } = render(<Carousel />);
  expect(queryByTestId("left-arrow")).toBeNull();
});

it("hides right arrow on last image", function() {
  const { queryByTestId } = render(<Carousel />);
  const rightArrow = queryByTestId("right-arrow");

  // Move to the last image
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  expect(queryByTestId("right-arrow")).toBeNull();
});