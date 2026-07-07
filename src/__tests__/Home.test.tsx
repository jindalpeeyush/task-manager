import { render, screen } from "@testing-library/react";
import HomePage from "../pages/index";
import "@testing-library/jest-dom";

jest.mock("../utils/api", () => {
  return {
    api: {
      useUtils: () => ({}),
      sprint: {
        list: {
          useQuery: () => ({
            data: [],
            isLoading: false,
          }),
        },
      },
      workItem: {
        list: {
          useQuery: () => ({
            data: [
              {
                id: "1",
                title: "Test Work Item",
                type: "Task",
                priority: "Medium",
                status: "To Do",
                createdAt: new Date(),
              },
            ],
            isLoading: false,
          }),
        },
      },
    },
  };
});

test("renders dashboard view", () => {
  render(<HomePage />);
  expect(screen.getByText("Dashboard")).toBeInTheDocument();
  expect(screen.getByText("Total Work Items")).toBeInTheDocument();
  // We mock 1 work item, so it should render 1
  expect(screen.getByText("1")).toBeInTheDocument();
});