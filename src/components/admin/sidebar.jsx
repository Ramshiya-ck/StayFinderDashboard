import { Home, Building, Bed, ClipboardList,  User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const manager_token = localStorage.getItem("manager_token");
  console.log("Access token:", manager_token);
  const [hotel, SetHotel] = useState('')
  const menuItems = [
    { name: "Dashboard", icon: <Home />, path: "/admin" },
    { name: "Hotels", icon: <Building />, path: "/admin/hotellist" },
    { name: "Bookings", icon: <ClipboardList />, path: "/admin/booking" },
    { name: "Customer", icon: <ClipboardList />, path: "/admin/customer" },
    { name: "Logout", icon: <LogOut />, path: "" },
  ];
 

  useEffect(() => {
    const getHotel = async () => {
      try {
        if (!manager_token) {
          console.error("No token found! Make sure you are logged in.");
          return;
        }

        const response = await axiosinstance.get("hotel/hotel/manager/", {
          headers: {
            Authorization: `Bearer ${manager_token}`, // send token here
          },
        });

        console.log(response.data.data.hotel);
        SetHotel(response.data.data.hotel)
      } catch (error) {
        console.error(
          "Error fetching hotel:",
          error.response ? error.response.data : error
        );
      }
    };

    getHotel();
  }, [manager_token]);

  return (
    <div className="w-64 h-screen bg-white shadow-lg flex flex-col">
      <div className="text-2xl font-bold text-center py-6 border-b">Admin</div>
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
