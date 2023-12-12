import { it, describe } from "vitest";
import { render } from "@testing-library/react";
import Dashboard from "../routes/Dashboard";
import { BrowserRouter } from "react-router-dom";

describe("Dashboard routes", () => {
  it("should render the dashboard page", () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
  });
});
