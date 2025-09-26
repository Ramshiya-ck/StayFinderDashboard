import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosinstance } from "../config/axiosinstance";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Bed, 
  Calendar, 
  Users, 
  TrendingUp,
  Edit3,
  Trash2,
  Eye,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  Utensils,
  Shield,
  Clock
} from "lucide-react";

export default function Hotel() {
  const token = localStorage.getItem("token");
  console.log("Access token:", token);
  const [hotel, SetHotel] = useState('')
  const navigate = useNavigate();

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
  }, [token]);

  // Amenity icons mapping
  const getAmenityIcon = (amenity) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes('wifi') || amenityLower.includes('internet')) return <Wifi className="w-4 h-4" />;
    if (amenityLower.includes('parking') || amenityLower.includes('car')) return <Car className="w-4 h-4" />;
    if (amenityLower.includes('coffee') || amenityLower.includes('tea')) return <Coffee className="w-4 h-4" />;
    if (amenityLower.includes('gym') || amenityLower.includes('fitness')) return <Dumbbell className="w-4 h-4" />;
    if (amenityLower.includes('restaurant') || amenityLower.includes('food')) return <Utensils className="w-4 h-4" />;
    if (amenityLower.includes('security') || amenityLower.includes('safe')) return <Shield className="w-4 h-4" />;
    if (amenityLower.includes('24') || amenityLower.includes('service')) return <Clock className="w-4 h-4" />;
    return <Star className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 via-green-600 to-green-600 bg-clip-text text-transparent mb-2">
            Hotel Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Manage your hotel operations efficiently</p>
        </div>

        {/* Main Hotel Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden mb-8">
          {/* Hero Image Section */}
          <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
            <img
              src={hotel?.image || '/api/placeholder/1200/400'}
              alt="Hotel"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                {hotel.hotel_name || hotel.hotal_name}
              </h2>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-5 h-5" />
                <span className="text-lg">{hotel.location || "Location"}</span>
              </div>
            </div>
            <div className="absolute top-6 right-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-white font-semibold">4.5</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-8 lg:p-10">
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-semibold text-gray-800">{hotel.phone || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl border border-green-100">
                  <div className="p-2 bg-green-100 rounded-xl">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-800">{hotel.email || "N/A"}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-2xl border border-purple-100">
                  <div className="p-2 bg-purple-100 rounded-xl">
                    <Bed className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Rooms</p>
                    <p className="font-semibold text-gray-800">15</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                  <div className="p-2 bg-orange-100 rounded-xl">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Active Bookings</p>
                    <p className="font-semibold text-gray-800">30</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">About Our Hotel</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {hotel.description || "Welcome to our premium hotel experience. We provide exceptional service and comfort for all our guests."}
              </p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Amenities & Services</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {hotel.amenities &&
                  hotel.amenities.split(",").map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors">
                      <div className="p-2 bg-white rounded-xl shadow-sm">
                        {getAmenityIcon(item.trim())}
                      </div>
                      <span className="font-medium text-gray-700">{item.trim()}</span>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Occupancy Rate</p>
                    <p className="text-2xl font-bold">85%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-200" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Revenue</p>
                    <p className="text-2xl font-bold">$45K</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-200" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Guests Today</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-200" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Check-ins</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <Calendar className="w-8 h-8 text-orange-200" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <Eye className="w-5 h-5" />
                View Rooms
              </button>
              <button onClick={() => hotel?.id && navigate(`/hoteledit/${hotel.id}`)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-2xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <Edit3 className="w-5 h-5" />
                Edit Hotel
              </button>
              <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-2xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <Trash2 className="w-5 h-5" />
                Delete Hotel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
