import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

// Define TEST_IMAGES here or import it from another file
const TEST_IMAGES = [
  { src: "image1.jpg", caption: "Photo by Richard Pasquarella on Unsplash" },
  { src: "image2.jpg", caption: "Photo by Pratik Patel on Unsplash" },
  { src: "image3.jpg", caption: "Photo by Josh Post on Unsplash" }
];

it("renders without crashing", function() {
  render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { getByTestId } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  const rightArrow = getByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to be displayed
  expect(getByTestId("Card-title")).toHaveTextContent(TEST_IMAGES[1].caption);
});

it("moves to the previous image when the left arrow is clicked", function() {
  const { getByTestId } = render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
  const rightArrow = getByTestId("right-arrow");

  // Move to the second image
  fireEvent.click(rightArrow);
  
  const leftArrow = getByTestId("left-arrow");
  // Move back to the first image
  fireEvent.click(leftArrow);

  expect(getByTestId("Card-title")).toHaveTextContent(TEST_IMAGES[0].caption);
});

it("hides left arrow on first image", function() {
  const { queryByTestId } = render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
  expect(queryByTestId("left-arrow")).toBeNull();
});

it("hides right arrow on last image", function() {
  const { queryByTestId } = render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
  const rightArrow = queryByTestId("right-arrow");

  // Move to the last image
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  expect(queryByTestId("right-arrow")).toBeNull();
});