import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createServer } from "miragejs";
import carsJson from "@/utils/cars.json";

const server = createServer({});
server.get("/api/cars", carsJson);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
