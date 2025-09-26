import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosinstance } from "../config/axiosinstance";

export default function RoomsPage() {
  // Example room data (for UI purposes)
    const {hotel_id} = useParams()
  const token = localStorage.getItem('token')
  const [rooms ,setRooms]  = useState([])
  const navigate = useNavigate()
  

  

useEffect(() =>{
    const getRooms = async () => {
        try {
            const response = await axiosinstance.get(`room/rooms/${hotel_id}/`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            })
            console.log(response)
            setRooms(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    getRooms()

},[hotel_id,token])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Hotel Rooms</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Edit
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                DELETE
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {rooms.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="h-12 w-20 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {room.room_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    ₹{room.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs ${
                        room.availability
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {room.availability}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap  gap-2">
                    <button onClick={() => navigate(`/roomedit/${room.id}`)} className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition">
                      Edit
                    </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap gap-2">
                    
                    <button className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
