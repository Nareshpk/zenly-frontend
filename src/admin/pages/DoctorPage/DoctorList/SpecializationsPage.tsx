import { MoreVertical, Plus, Search } from "lucide-react";
import { useState } from "react";
import AddSpecializationModal from "../../../Modal/AddSpecializationModal";

type Status = "Active" | "Inactive";

interface Specialization {
    id: number;
    name: string;
    description: string;
    doctors: number;
    department: string;
    status: Status;
}

const specializations: Specialization[] = [
    {
        id: 1,
        name: "Cardiology",
        description: "Diagnosis and treatment of heart disorders",
        doctors: 5,
        department: "Internal Medicine",
        status: "Active",
    },
    {
        id: 2,
        name: "Neurology",
        description: "Diagnosis and treatment of disorders of the nervous system",
        doctors: 3,
        department: "Neuroscience",
        status: "Active",
    },
    {
        id: 3,
        name: "Pediatrics",
        description: "Medical care of infants, children, and adolescents",
        doctors: 7,
        department: "Child Health",
        status: "Active",
    },
    {
        id: 4,
        name: "Orthopedics",
        description: "Treatment of the musculoskeletal system",
        doctors: 4,
        department: "Surgery",
        status: "Active",
    },
    {
        id: 5,
        name: "Dermatology",
        description: "Diagnosis and treatment of skin disorders",
        doctors: 2,
        department: "Skin Health",
        status: "Active",
    },
    {
        id: 6,
        name: "Psychiatry",
        description: "Diagnosis, prevention, and treatment of mental disorders",
        doctors: 3,
        department: "Mental Health",
        status: "Inactive",
    },
    {
        id: 7,
        name: "Ophthalmology",
        description: "Diagnosis and treatment of eye disorders",
        doctors: 2,
        department: "Eye Care",
        status: "Active",
    },
    {
        id: 8,
        name: "Gynecology",
        description: "Health of the female reproductive system",
        doctors: 4,
        department: "Women's Health",
        status: "Active",
    },
];

export default function SpecializationsPage() {
    const [openModal, setOpenModal] = useState(false);
    const [search, setSearch] = useState("");

    const filtered = specializations.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* ================= HEADER ================= */}
            <div>
                <h1 className="text-xl font-semibold">Specializations</h1>
                <p className="text-sm text-gray-500">
                    Manage medical specializations in your clinic.
                </p>
            </div>

            {/* ================= LIST CARD ================= */}
            <div className="bg-white border rounded-xl">
                <div className="flex items-center justify-between p-4 border-b">
                    <div>
                        <h2 className="font-semibold">Specializations List</h2>
                        <p className="text-sm text-gray-500">
                            View and manage all medical specializations.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search
                                size={16}
                                className="absolute left-3 top-2.5 text-gray-400"
                            />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search specializations..."
                                className="pl-9 pr-3 py-2 text-sm border rounded-md"
                            />
                        </div>

                        <button onClick={() => setOpenModal(true)} className="flex items-center gap-2 bg-black text-white px-3 py-2 text-sm rounded-md">
                            <Plus size={16} /> Add Specialization
                        </button>
                    </div>
                </div>

                {/* ================= TABLE ================= */}
                <table className="w-full text-sm">
                    <thead className="text-gray-500 border-b">
                        <tr>
                            <th className="text-left p-4">Name</th>
                            <th className="text-left p-4">Description</th>
                            <th className="text-center p-4">Doctors</th>
                            <th className="text-left p-4">Department</th>
                            <th className="text-center p-4">Status</th>
                            <th className="text-right p-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {filtered.map((s) => (
                            <tr key={s.id}>
                                <td className="p-4 font-medium">{s.name}</td>
                                <td className="p-4 text-gray-600">{s.description}</td>
                                <td className="p-4 text-center">{s.doctors}</td>
                                <td className="p-4">{s.department}</td>
                                <td className="p-4 text-center">
                                    <StatusBadge status={s.status} />
                                </td>
                                <td className="p-4 text-right">
                                    <ActionsMenu />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= STATISTICS ================= */}
            <div className="bg-white border rounded-xl p-4">
                <h3 className="font-semibold mb-1">Specialization Statistics</h3>
                <p className="text-sm text-gray-500 mb-4">
                    Overview of specializations and associated doctors.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {specializations.slice(0, 4).map((s) => (
                        <div
                            key={s.id}
                            className="border rounded-lg p-4 space-y-2"
                        >
                            <p className="font-medium">{s.name}</p>
                            <p className="text-xl font-semibold">{s.doctors}</p>
                            <p className="text-xs text-gray-500">Doctors</p>
                            <div className="h-1 bg-gray-100 rounded">
                                <div
                                    className="h-1 bg-black rounded"
                                    style={{ width: `${s.doctors * 10}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <AddSpecializationModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSave={(data) => {
                    console.log("Saved specialization:", data);
                    // 🔗 API call here
                }}
            />
        </div>
    );
}

/* ================= COMPONENTS ================= */

function StatusBadge({ status }: { status: Status }) {
    return (
        <span
            className={`px-2 py-0.5 text-xs rounded-full font-medium ${status === "Active"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-700"
                }`}
        >
            {status}
        </span>
    );
}

function ActionsMenu() {
    return (
        <div className="relative inline-block">
            <button className="p-2 hover:bg-gray-100 rounded">
                <MoreVertical size={16} />
            </button>
        </div>
    );
}
