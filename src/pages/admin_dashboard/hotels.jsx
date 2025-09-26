import React, { useEffect, useState, useRef } from "react";
import { axiosinstance } from "../../config/axiosinstance";
import { Link } from "react-router-dom";

export default function AdminHotelTable() {
  const [hotels, setHotels] = useState([]);
  const [query, setQuery] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const fileRef = useRef(null);
  const [newHotel, setNewHotel] = useState({
    hotal_name: "",
    location: "",
    rating: "",
    imageFile: null,
    imagePreview: null,
  });

  // Fetch hotels from backend
  useEffect(() => {
    const getHotels = async () => {
      try {
        const response = await axiosinstance.get("hotel/hotel/");
        setHotels(response.data.data);
        console.log(response)
      } catch (error) {
        console.log(error);
      }
    };
    getHotels();
  }, []);

  // Search/filter
  const filteredHotels = hotels.filter(
    (h) =>
      !query ||
      (h.hotal_name && h.hotal_name.toLowerCase().includes(query.toLowerCase())) ||
      (h.location && h.location.toLowerCase().includes(query.toLowerCase()))
  );

  // Handle delete (UI only)
  const handleDelete = (id) => {
    if (!confirm("Delete this hotel?")) return;
    setHotels((s) => s.filter((h) => h.id !== id));
  };

  // Add hotel (UI only)
  const handleAdd = (e) => {
    e.preventDefault();
    const id = Math.max(...hotels.map((h) => h.id)) + 1;
    const toAdd = {
      id,
      hotal_name: newHotel.hotal_name || "Untitled Hotel",
      location: newHotel.location || "Unknown",
      rating: Number(newHotel.rating) || 0,
      image: newHotel.imagePreview || placeholderImage(newHotel.hotal_name),
    };
    setHotels([toAdd, ...hotels]);
    setShowAdd(false);
    setNewHotel({
      hotal_name: "",
      location: "",
      rating: "",
      imageFile: null,
      imagePreview: null,
    });
    if (fileRef.current) fileRef.current.value = null;
  };

  // File preview
  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const preview = URL.createObjectURL(f);
    setNewHotel((s) => ({ ...s, imageFile: f, imagePreview: preview }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Hotels</h2>
          <div className="flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or location..."
              className="border rounded-md px-3 py-2 w-72 bg-white"
            />
            <button
              onClick={() => setShowAdd((s) => !s)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
            >
              {showAdd ? "Close" : "Add Hotel"}
            </button>
          </div>
        </div>

        {/* Add Hotel Form */}
        {showAdd && (
          <form onSubmit={handleAdd} className="mb-6 bg-white p-4 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  required
                  value={newHotel.hotal_name}
                  onChange={(e) => setNewHotel((s) => ({ ...s, hotal_name: e.target.value }))}
                  placeholder="Hotel Name"
                  className="border rounded-md px-3 py-2 w-full"
                />
                <input
                  required
                  value={newHotel.location}
                  onChange={(e) => setNewHotel((s) => ({ ...s, location: e.target.value }))}
                  placeholder="Location"
                  className="border rounded-md px-3 py-2 w-full"
                />
                <input
                  value={newHotel.rating}
                  onChange={(e) => setNewHotel((s) => ({ ...s, rating: e.target.value }))}
                  placeholder="Rating (0 - 5)"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  className="border rounded-md px-3 py-2 w-full"
                />
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} />
              </div>
              <div className="flex items-center justify-center">
                <div className="w-48 h-36 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                  {newHotel.imagePreview ? (
                    <img src={newHotel.imagePreview} alt="preview" className="object-cover w-full h-full" />
                  ) : (
                    <div className="text-sm text-gray-500 p-3 text-center">Image Preview</div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 border rounded-md">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md">
                Add Hotel
              </button>
            </div>
          </form>
        )}

        {/* Hotel Table */}
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Image</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Location</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Rating</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredHotels.map((h) => (
                <tr key={h.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="w-20 h-12 rounded overflow-hidden">
                      <img src={h.image || "/images/hotel1.png"} alt={h.hotal_name} className="object-cover w-full h-full" />
                    </div>
                  </td>
                  <td className="px-4 py-3">{h.hotal_name}</td>
                  <td className="px-4 py-3">{h.location}</td>
                  <td className="px-4 py-3">{h.rating} / 5</td>
                  <td className="px-4 py-3 text-right flex justify-end gap-2">
                    <Link to={`/admin/room/${h.id}`} >
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm">View Rooms</button>
                    </Link>
                    <button className="px-3 py-1 bg-red-100 text-red-600 rounded-md text-sm" onClick={() => handleDelete(h.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {filteredHotels.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                    No hotels found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Placeholder image function
function placeholderImage(name) {
  return `https://via.placeholder.com/400x240.png?text=${encodeURIComponent(name || 'Hotel')}`;
}
