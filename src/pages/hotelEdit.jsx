import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosinstance } from "../config/axiosinstance";

export default function HotelEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Form state
  const [formData, setFormData] = useState({
    id: null,
    hotal_name: "",
    email: "",
    phone: "",
    rating: "",
    location: "",
    description: "",
    amentities: "",
    is_active: false,
    image: null,
  });

  // Fetch hotel details for logged-in manager
  useEffect(() => {
    const getEditHotel = async () => {
      try {
        const response = await axiosinstance.get("hotel/hotel/manager/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const hotel = response.data?.data?.hotel || response.data;

        setFormData({
          id: hotel.id || null,
          hotal_name: hotel.hotal_name || "",
          email: hotel.email || "",
          phone: hotel.phone || "",
          rating: hotel.rating || "",
          location: hotel.location || "",
          description: hotel.description || "",
          amentities: hotel.amentities || "",
          is_active: Boolean(hotel.is_active),
          image: null,
        });
      } catch (error) {
        console.error(error.response?.data || error);
      }
    };
    getEditHotel();
  }, [token]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      // Only append non-null fields
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    try {
      const targetId = id || formData.id;
      const response = await axiosinstance.patch(
        `hotel/hotel/edit/${targetId}/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${manager_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      alert("Hotel updated successfully!");
      navigate("/hotels");
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Hotel
        </h2>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          {/* Hotel Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hotel Name
            </label>
            <input
              type="text"
              name="hotal_name"
              value={formData.hotal_name}
              onChange={handleChange}
              placeholder="Enter hotel name"
              className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="1"
              max="5"
              placeholder="Enter rating"
              className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Location */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter hotel location"
              className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Enter hotel description"
              className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>

          {/* Amenities */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Amenities
            </label>
            <textarea
              name="amentities"
              value={formData.amentities}
              onChange={handleChange}
              rows="2"
              placeholder="Enter amenities (comma separated)"
              className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>

          {/* Image */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Hotel Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Active Status */}
          <div className="flex items-center gap-2 md:col-span-2">
            <input
              type="checkbox"
              id="is_active"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="is_active" className="text-sm text-gray-700">
              Active Hotel
            </label>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="w-full md:w-1/2 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Update Hotel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
