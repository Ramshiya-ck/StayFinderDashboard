import React, { useEffect, useState } from "react";
import { axiosinstance } from "../../config/axiosinstance";

export default function AdminBooking() {
  const [bookinglist, setBookinglist] = useState([]);
  const token = localStorage.getItem("token");
  console.log(token)

  useEffect(() => {
    const fetchbooking = async () => {
      try {
        const response = await axiosinstance.get("booking/admin/booking/list/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setBookinglist(response.data.data)
      } catch (error) {
        console.log("Error fetching bookings:", error);
      }
    };
    fetchbooking();
  }, [token]);

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
            {bookinglist.map((booking) => (
              <tr key={booking.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6">#{booking.id}</td>
                <td className="py-3 px-6">{booking.customer}</td>
                <td className="py-3 px-6">{booking.room}</td>
                <td className="py-3 px-6">{booking.check_in}</td>
                <td className="py-3 px-6">{booking.check_out}</td>
                <td className="py-3 px-6">{booking.guests}</td>
                <td className="py-3 px-6">₹{booking.total_amount}</td>
                <td
                  className={`py-3 px-6 font-semibold ${
                    booking.booking_status === "confirmed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {booking.booking_status}
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

            {bookinglist.length === 0 && (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
