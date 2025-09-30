import { Home, Building, ClipboardList, LogOut, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { axiosinstance } from "../../config/axiosinstance";

export default function Sidebar() {
  const navigate = useNavigate();
  const admin_token = localStorage.getItem("admin_token");
  const [hotel, setHotel] = useState("");

  const handleLogout = async () => {
    try {
      const refresh = localStorage.getItem("refresh_token");
      if (refresh) {
        await axiosinstance.post("customer/logout/", { refresh });
      }
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("admin_token");
      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  useEffect(() => {
    const getHotel = async () => {
      try {
        if (!admin_token) {
          console.error("No admin token found!");
          return;
        }

        // 🔹 FIX: use the correct admin endpoint, not manager
        const response = await axiosinstance.get("admin/hotels/", {
          headers: {
            Authorization: `Bearer ${admin_token}`,
          },
        });

        console.log("Admin hotel list:", response.data);
        setHotel(response.data);
      } catch (error) {
        console.error("Error fetching admin hotels:", error.response?.data || error);
      }
    };

    getHotel();
  }, [admin_token]);

  const menuItems = [
    { name: "Dashboard", icon: <Home />, path: "/admin" },
    { name: "Hotels", icon: <Building />, path: "/admin/hotellist" },
    { name: "Bookings", icon: <ClipboardList />, path: "/admin/booking" },
    { name: "Customers", icon: <Users />, path: "/admin/customer" },
  ];

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

        {/* 🔹 Logout should be a button, not NavLink */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 w-full text-left rounded-lg hover:bg-red-100 text-red-600"
        >
          <LogOut /> Logout
        </button>
      </nav>
    </div>
  );
}
