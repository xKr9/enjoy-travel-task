import AppLayout from "@/components/layouts/AppLayout";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <AppLayout>
      <h1>Dashboard</h1>
      <Link to="/dashboard/create-reservation">Create</Link>
    </AppLayout>
  );
}
