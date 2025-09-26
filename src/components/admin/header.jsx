import { Bell } from "lucide-react";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4 border-b bg-white">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="flex items-center gap-4">
        <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          M
        </div>
      </div>
    </div>
  );
}
