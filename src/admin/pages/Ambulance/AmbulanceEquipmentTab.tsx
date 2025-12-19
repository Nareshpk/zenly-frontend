import { MoreVertical, Plus } from "lucide-react";
import { useState } from "react";

export default function AmbulanceEquipmentTab() {
    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="border rounded-xl p-6">
                <h2 className="text-lg font-semibold">Equipment Inventory</h2>
                <p className="text-sm text-gray-500 mb-4">
                    List of all equipment on board
                </p>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b text-gray-500">
                            <tr>
                                <th className="text-left py-3">ID</th>
                                <th className="text-left">Equipment</th>
                                <th className="text-left">Model</th>
                                <th className="text-left">Serial Number</th>
                                <th className="text-left">Last Inspection</th>
                                <th className="text-left">Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            <EquipmentRow
                                id="E001"
                                name="Defibrillator"
                                model="Philips HeartStart FR3"
                                serial="PHI-12345"
                                last="2023-03-15"
                                next="2023-06-15"
                                status="Operational"
                            />
                            <EquipmentRow
                                id="E002"
                                name="Oxygen Tank"
                                model="OxyFlow 5000"
                                serial="OF-67890"
                                last="2023-04-01"
                                next="2023-07-01"
                                status="Operational"
                            />
                            <EquipmentRow
                                id="E003"
                                name="Stretcher"
                                model="Stryker Power-PRO XT"
                                serial="SPX-54321"
                                last="2023-03-20"
                                next="2023-06-20"
                                status="Operational"
                            />
                            <EquipmentRow
                                id="E004"
                                name="Suction Unit"
                                model="VacuMed 3000"
                                serial="VM-13579"
                                last="2023-02-28"
                                next="2023-05-28"
                                status="Needs Inspection"
                            />
                            <EquipmentRow
                                id="E005"
                                name="Blood Pressure Monitor"
                                model="Omron Pro"
                                serial="OP-24680"
                                last="2023-03-10"
                                next="2023-06-10"
                                status="Operational"
                            />
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Equipment Button */}
            <div className="flex justify-end">
                <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm hover:opacity-90">
                    <Plus size={16} /> Add Equipment
                </button>
            </div>
        </div>
    );
}

/* -------------------- ROW -------------------- */

function EquipmentRow({
    id,
    name,
    model,
    serial,
    last,
    next,
    status,
}: any) {
    return (
        <tr className="border-b last:border-none">
            <td className="py-4 font-medium">{id}</td>
            <td>{name}</td>
            <td>{model}</td>
            <td>{serial}</td>
            <td>
                <div className="font-medium">{last}</div>
                <div className="text-xs text-gray-500">Next: {next}</div>
            </td>
            <td>
                <StatusBadge status={status} />
            </td>
            <td className="text-right">
                <RowActions />
            </td>
        </tr>
    );
}

/* -------------------- STATUS BADGE -------------------- */

function StatusBadge({ status }: { status: string }) {
    const styles =
        status === "Operational"
            ? "bg-black text-white"
            : "border text-gray-700";

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${styles}`}
        >
            {status}
        </span>
    );
}

/* -------------------- ACTION MENU -------------------- */

function RowActions() {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded hover:bg-gray-100"
            >
                <MoreVertical size={16} />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                    <ActionItem label="View Details" />
                    <ActionItem label="Record Inspection" />
                    <ActionItem label="Replace Equipment" />
                    <ActionItem label="Report Issue" />
                </div>
            )}
        </div>
    );
}

function ActionItem({ label }: { label: string }) {
    return (
        <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
            {label}
        </button>
    );
}




