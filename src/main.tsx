import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Request, createServer } from "miragejs";
import carsJson from "@/utils/cars.json";
import { CarReservations } from "./api/CarsApiClient/types.ts";

const reservations: CarReservations[] = [];

const server = createServer({});
server.get("/api/cars", () => {
  return carsJson;
});
server.post("/api/cars/hire", (_, request: Request) => {
  reservations.push(JSON.parse(request.requestBody));
  return JSON.stringify(reservations);
});
server.get("/api/hire", () => {
  return reservations;
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
