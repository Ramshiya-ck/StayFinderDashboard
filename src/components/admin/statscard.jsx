import React from "react";
import {  Clock1, BedIcon, DollarSignIcon, UsersIcon } from "lucide-react";

export default function StatsCard({ title, value, icon, bgColor }) {
  return (
    <div
      className={`flex items-center p-6 rounded-2xl shadow-xl transition-transform hover:scale-105 bg-red`}
    >
      <div
        className={`flex-shrink-0 p-4 rounded-full text-black ${bgColor} mr-4`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
}

// Usage example in Dashboard
export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Bookings"
        value="128"
        icon={<UsersIcon size={28} />}
        bgColor="bg-emerald-500"
      />
      <StatsCard
        title="Total Revenue"
        value="$12,450"
        icon={<DollarSignIcon size={28} />}
        bgColor="bg-blue-500"
      />
      <StatsCard
        title="Rooms Occupied"
        value="58 / 80"
        icon={<BedIcon size={28} />}
        bgColor="bg-purple-500"
      />
      <StatsCard
        title="Pending Payments"
        value="6"
        icon={<Clock1 size={28} />}
        bgColor="bg-orange-500"
      />
    </div>
  );
}
