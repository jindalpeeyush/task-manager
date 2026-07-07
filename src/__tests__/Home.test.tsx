import { render, screen } from "@testing-library/react";
import HomePage from "../pages/index";
import "@testing-library/jest-dom";

jest.mock("../utils/api", () => {
  return {
    api: {
      useUtils: () => ({
        task: {
          list: {
            invalidate: jest.fn(),
          },
        },
      }),
      task: {
        list: {
          useQuery: () => ({
            data: [
              {
                id: "1",
                title: "Test Task",
                priority: "high",
                status: "pending",
                createdAt: new Date(),
              },
            ],
            isLoading: false,
          }),
        },
        create: {
          useMutation: () => ({
            mutate: jest.fn(),
            isPending: false,
          }),
        },
        update: {
          useMutation: () => ({
            mutate: jest.fn(),
          }),
        },
        delete: {
          useMutation: () => ({
            mutate: jest.fn(),
          }),
        },
      },
    },
  };
});

test("renders task list", () => {
  render(<HomePage />);
  expect(screen.getByText("My Tasks")).toBeInTheDocument();
  expect(screen.getByText("Test Task")).toBeInTheDocument();
});