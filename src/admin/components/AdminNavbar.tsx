import { Menu, Bell, Moon } from "lucide-react";

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function AdminNavbar({ sidebarOpen, setSidebarOpen }: Props) {
  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>

        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <Moon size={18} />
        </button>

        <button className="p-2 rounded-lg hover:bg-gray-100 relative">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
          SJ
        </div>
      </div>
    </header>
  );
}
