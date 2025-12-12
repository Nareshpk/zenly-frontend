// Navbar.tsx
import { Bell, User } from "lucide-react";

export default function AdminNavbar() {
    return (
        <nav className="h-16 bg-white shadow flex items-center justify-between px-6">
            <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
            <div className="flex items-center gap-4">

                <button className="relative p-2 hover:bg-gray-100 rounded-md">
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <button className="p-2 hover:bg-gray-100 rounded-full">
                    <User size={20} />
                </button>

            </div>
        </nav>
    );
}
