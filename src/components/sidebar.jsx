import { Home, Building, Bed, ClipboardList, CreditCard, User } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { axiosinstance } from "../config/axiosinstance";

export default function Sidebar() {
  const token = localStorage.getItem("token");
  const [hotel, SetHotel] = useState('')
  const menuItems = [
    { name: "Dashboard", icon: <Home />, path: "/" },
    { name: "Hotels", icon: <Building />, path: "/hotels" },
    { name: "Rooms", icon: <Bed />, path: `/rooms/${hotel.id}/` },
    { name: "Bookings", icon: <ClipboardList />, path: "/bookings" },
    // { name: "Payments", icon: <CreditCard />, path: "/payments" },
    { name: "Profile", icon: <User />, path: "/profile" },
  ];


  useEffect(() => {
    const getHotel = async () => {
      try {
        if (!token) {
          console.error("No token found! Make sure you are logged in.");
          return;
        }

        const response = await axiosinstance.get("hotel/hotel/manager/", {
          headers: {
            Authorization: `Bearer ${token}`, // send token here
          },
        });
        SetHotel(response.data.data.hotel)
        console.log(response, "==========")
      } catch (error) {
        console.error(
          "Error fetching hotel:",
          error.response ? error.response.data : error
        );
      }
    };

    getHotel();
  }, [token]);

  return (
    <div className="w-64 h-screen bg-white shadow-lg flex flex-col">
      <div className="text-2xl font-bold text-center py-6 border-b">HotelManager</div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-100 ${
                isActive ? "bg-emerald-200 font-semibold" : "text-gray-700"
              }`
            }
          >
            {item.icon} {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
