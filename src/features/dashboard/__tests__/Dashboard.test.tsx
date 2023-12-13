import { it, describe, expect } from "vitest";
import Dashboard from "../routes/Dashboard";
import { screen } from "@testing-library/react";
import nock from "nock";
import CarReservationMock from "@/tests/mocks/CarReservationsMock";
import renderWithProviders from "@/utils/helpers";

nock(`${window.location.origin}`)
  .get("/api/hire")
  .reply(200, {
    ...CarReservationMock({ options: {} }),
  });

describe("Dashboard routes", () => {
  it("should render the dashboard page", () => {
    renderWithProviders(<Dashboard />);
  });
  it("should render correct amount of reservation cards", () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByText("My Current Reservations")).toBeTruthy();
  });
});
