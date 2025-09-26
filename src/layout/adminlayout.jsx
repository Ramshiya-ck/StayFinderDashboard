import React from "react";
// import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/sidebar";

export const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <Sidebar />
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};
