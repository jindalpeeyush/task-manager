import { render, screen } from "@testing-library/react";
import HomePage from "../pages/index";
import "@testing-library/jest-dom";

test("renders task list", () => {
  render(<HomePage />);
  expect(screen.getByText("My Tasks")).toBeInTheDocument();
});