import { DashboardRoutes } from "@/features/dashboard/routes";
import { Navigate } from "react-router-dom";

export const commonRoutes = [
  {
    path: "/dashboard/*",
    element: <DashboardRoutes />,
  },
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
];
