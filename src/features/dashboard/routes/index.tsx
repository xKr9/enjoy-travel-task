import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};
