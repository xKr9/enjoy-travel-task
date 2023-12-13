import { it, describe, expect } from "vitest";
import { screen } from "@testing-library/react";
import nock from "nock";
import CarReservationMock from "@/tests/mocks/CarReservationsMock";
import CreateReservation from "../routes/CreateReservation";
import renderWithProviders from "@/utils/helpers";

nock(`${window.location.origin}`)
  .get("/api/cars")
  .reply(200, {
    ...CarReservationMock({ options: {} }),
  });

describe("Create Reservation test", async () => {
  it("should render the reservations page", async () => {
    renderWithProviders(<CreateReservation />);
    expect(screen.getByRole("form")).toBeTruthy();
  });
});
