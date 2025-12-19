import { Plus, MoreHorizontal, Download, Printer } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import RoomsByDepartmentTabs from "./RoomsByDepartmentTabs";

export default function RoomsByDepartmentPage() {
    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Rooms by Department</h1>

                <div className="flex items-center gap-3">
                    <button className="btn-primary flex items-center gap-2">
                        <Plus size={16} /> Add New Room
                    </button>
                    <MoreMenu />
                </div>
            </div>

            {/* Department Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DepartmentCard
                    title="Cardiology"
                    total={25}
                    available={7}
                    occupied={18}
                />
                <DepartmentCard
                    title="Orthopedics"
                    total={20}
                    available={5}
                    occupied={15}
                />
                <DepartmentCard
                    title="Neurology"
                    total={15}
                    available={5}
                    occupied={10}
                />
            </div>
            <RoomsByDepartmentTabs />
        </div>
    );
}

/* ---------------- Components ---------------- */

const DepartmentCard = ({ title, total, available, occupied }: any) => (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-6">{title}</h2>

        <div className="text-3xl font-bold mb-4">{total}</div>

        <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span>Available: {available}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                <span>Occupied: {occupied}</span>
            </div>
        </div>

    </div>
);

const MoreMenu = () => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="p-2 border rounded-lg hover:bg-gray-50"
            >
                <MoreHorizontal size={18} />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">
                    <MenuItem icon={<Download size={16} />} label="Export as CSV" />
                    <MenuItem icon={<Printer size={16} />} label="Print List" />
                </div>
            )}
        </div>
    );
};

const MenuItem = ({ icon, label }: any) => (
    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
        <span className="text-gray-400">{icon}</span>
        {label}
    </button>
);
