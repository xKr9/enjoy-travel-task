import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createServer } from "miragejs";
import carsJson from "@/utils/cars.json";
import { CarReservations } from "./api/CarsApiClient/types.ts";

const reservations: CarReservations[] = [];

const server = createServer({});
server.get("/api/cars", carsJson as any);
server.post("/api/cars/hire", (schema, request) => {
  reservations.push(JSON.parse(request.requestBody));
});
server.get("/api/hire", reservations);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
