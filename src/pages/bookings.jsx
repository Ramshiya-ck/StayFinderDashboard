import React from "react";

const bookings = [
  {
    id: 1,
    customer: "John Doe",
    room: "Deluxe Suite",
    checkIn: "2025-10-01",
    checkOut: "2025-10-05",
    guests: 2,
    amount: 500,
    status: "Confirmed",
  },
  {
    id: 2,
    customer: "Jane Smith",
    room: "Standard Room",
    checkIn: "2025-10-03",
    checkOut: "2025-10-06",
    guests: 1,
    amount: 300,
    status: "Pending",
  },
];


export default function Booking() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Bookings</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-emerald-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Booking ID</th>
              <th className="py-3 px-6 text-left">Customer</th>
              <th className="py-3 px-6 text-left">Room</th>
              <th className="py-3 px-6 text-left">Check-In</th>
              <th className="py-3 px-6 text-left">Check-Out</th>
              <th className="py-3 px-6 text-left">Guests</th>
              <th className="py-3 px-6 text-left">Amount</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6">{booking.id}</td>
                <td className="py-3 px-6">{booking.customer}</td>
                <td className="py-3 px-6">{booking.room}</td>
                <td className="py-3 px-6">{booking.checkIn}</td>
                <td className="py-3 px-6">{booking.checkOut}</td>
                <td className="py-3 px-6">{booking.guests}</td>
                <td className="py-3 px-6">${booking.amount}</td>
                <td className={`py-3 px-6 font-semibold ${booking.status === "Confirmed" ? "text-green-600" : "text-yellow-600"}`}>
                  {booking.status}
                </td>
                <td className="py-3 px-6 text-center">
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 mr-2">
                    View
                  </button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
