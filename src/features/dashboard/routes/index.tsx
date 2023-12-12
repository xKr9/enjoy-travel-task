import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import CreateReservation from "./CreateReservation";

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/create-reservation" element={<CreateReservation />} />
    </Routes>
  );
};
