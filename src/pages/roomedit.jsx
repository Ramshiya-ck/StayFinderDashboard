import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosinstance } from "../config/axiosinstance";

export default function RoomEdit() {
    const [formData, setFormData] = useState({
        room_type: "",
        price: "",
        availability: false,
        image: null,
    });
    const [roomHotelId, setRoomHotelId] = useState(null)
    const { id } = useParams()
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        const getroom = async () => {
            try {
                const response = await axiosinstance.get(`room/room/single/detail/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const room = response.data?.data?.room || response.data
                setFormData({
                    room_type: room.room_type || "",
                    price: room.price ?? "",
                    availability: Boolean(room.availability),
                    image: null
                })
                setRoomHotelId(room.hotel || room.hotel_id || null)
            } catch (error) {
                console.log(error)
            }

        }
        getroom()


    }, [id, token])

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null) data.append(key, value)
        })
        try {
            await axiosinstance.put(`room/room/edit/${id}/`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            alert('Room updated successfully!')
            if (roomHotelId) {
                navigate(`/rooms/${roomHotelId}`)
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Edit Room
                </h2>

                <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                    {/* Room Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Room Type</label>
                        <input
                            type="text"
                            name="room_type"
                            value={formData.room_type}
                            onChange={handleChange}
                            placeholder="Enter room type"
                            className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                            className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Availability */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="availability"
                            checked={formData.availability}
                            onChange={(e) =>
                                setFormData({ ...formData, availability: e.target.checked }) // ✅ boolean true/false
                            }
                        />

                        <label className="text-sm text-gray-700">Available</label>
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Room Image</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        Update Room
                    </button>
                </form>
            </div>
        </div>
    );
}
