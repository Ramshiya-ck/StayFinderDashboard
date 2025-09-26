import React from "react";
import { Users, DollarSign, Bed, Clock, Bell, Settings } from "lucide-react";
import StatsCard  from "../../components/statscard"; // previous StatsCard component
import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-white shadow p-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Bell className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
            <Settings className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-gray-700">
              HM
            </div>
          </div>
        </header>

        {/* Stats cards */}
        <section className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Bookings"
              value="128"
              icon={<Users size={28} />}
              bgColor="bg-emerald-500"
            />
            <StatsCard
              title="Total Revenue"
              value="$12,450"
              icon={<DollarSign size={28} />}
              bgColor="bg-blue-500"
            />
            <StatsCard
              title="Rooms Occupied"
              value="58 / 80"
              icon={<Bed size={28} />}
              bgColor="bg-purple-500"
            />
            <StatsCard
              title="Pending Payments"
              value="6"
              icon={<Clock size={28} />}
              bgColor="bg-orange-500"
            />
          </div>
        </section>

        {/* Rooms Overview Table */}
        <section className="p-6">
          <div className="bg-white shadow rounded-2xl overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">101</td>
                  <td className="px-6 py-4 whitespace-nowrap">Deluxe</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Occupied
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">$120</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="px-3 py-1 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition">
                      Edit
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">102</td>
                  <td className="px-6 py-4 whitespace-nowrap">Standard</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Vacant
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">$80</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="px-3 py-1 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition">
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
