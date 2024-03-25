import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import AccountData from "./AccountData";
jest.mock("axios");

describe("AccountData component", () => {
  it("displays the correct total balance", async () => {
    axios.get.mockResolvedValue({
      data: [
        { id: "1", type: "Checking", balance: 100 },
        { id: "2", type: "Savings", balance: 200 },
      ],
    });

    render(<AccountData />);

    await waitFor(() => {
      expect(screen.getByText("Total: 300")).toBeInTheDocument();
    });
  });
});
