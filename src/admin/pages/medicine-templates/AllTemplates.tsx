import { Copy, FileText, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const templates = [
    {
        id: "1",
        name: "Hypertension Standard",
        category: "Cardiovascular",
        meds: 2,
        createdBy: "Dr. Sarah Johnson",
        lastUsed: "2024-03-15",
        usage: "42 times",
        medications: [
            {
                name: "Lisinopril 10mg",
                route: "Oral",
                frequency: "Once daily",
                duration: "30 days",
                instructions: "Take in the morning with or without food",
            },
            {
                name: "Hydrochlorothiazide 12.5mg",
                route: "Oral",
                frequency: "Once daily",
                duration: "30 days",
                instructions: "Take in the morning with food",
            },
        ],
        createdOn: "2023-05-10",
    },
];

function AllTemplates() {
    const navigate = useNavigate();
    const [selected] = useState(templates[0]);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    return (
        <div>
            {/* ALL TEMPLATES */}
            <div className="bg-white border rounded-xl p-4">
                <h2 className="text-lg font-semibold">All Templates</h2>
                <p className="text-sm text-gray-500 mb-4">
                    Browse and manage all medication templates.
                </p>

                <table className="w-full text-sm">
                    <thead className="text-gray-500 border-b">
                        <tr>
                            <th className="text-left py-3">Template Name</th>
                            <th>Category</th>
                            <th>Medications</th>
                            <th>Created By</th>
                            <th>Last Used</th>
                            <th>Usage</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {templates.map((t) => (
                            <tr key={t.id} className="border-b last:border-b-0">
                                <td className="py-4 font-medium">{t.name}</td>
                                <td>
                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                                        {t.category}
                                    </span>
                                </td>
                                <td className="text-center">{t.meds}</td>
                                <td>{t.createdBy}</td>
                                <td>{t.lastUsed}</td>
                                <td>{t.usage}</td>
                                <td className="text-right">
                                    <td className="relative text-right">
                                        <button
                                            onClick={() =>
                                                setOpenMenuId(openMenuId === t.id ? null : t.id)
                                            }
                                            className="p-1 rounded hover:bg-gray-100"
                                        >
                                            <MoreVertical size={18} />
                                        </button>

                                        {openMenuId === t.id && (
                                            <div className="absolute right-0 top-8 z-20 w-48 bg-white border rounded-lg shadow-lg text-sm">
                                                <div className="px-3 py-2 font-medium text-gray-500 border-b">
                                                    Actions
                                                </div>

                                                <button onClick={() => navigate("/admin/view-details")} className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50">
                                                    <FileText size={16} />
                                                    View Details
                                                </button>

                                                <button onClick={() => navigate("/admin/edit-template")} className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50">
                                                    <Pencil size={16} />
                                                    Edit Template
                                                </button>

                                                <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50">
                                                    <Copy size={16} />
                                                    Duplicate
                                                </button>

                                                <button className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50">
                                                    <Trash2 size={16} />
                                                    Delete Template
                                                </button>
                                            </div>
                                        )}
                                    </td>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* TEMPLATE DETAILS */}
            <div className="bg-white border rounded-xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold">Template Details</h2>
                        <p className="text-sm text-gray-500">
                            View detailed information about a selected template.
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <button className="border px-3 py-1.5 rounded-md text-sm">
                            ✎ Edit
                        </button>
                        <button className="bg-black text-white px-4 py-1.5 rounded-md text-sm">
                            Use Template
                        </button>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold">{selected.name}</h3>
                    <p className="text-sm text-gray-500">
                        {selected.category} • Created by {selected.createdBy}
                    </p>
                </div>

                {/* MEDICATIONS */}
                <div className="space-y-4">
                    {selected.medications.map((m, i) => (
                        <div key={i} className="border rounded-lg p-4">
                            <h4 className="font-semibold mb-3">{m.name}</h4>

                            <div className="grid grid-cols-3 gap-6 text-sm">
                                <div>
                                    <p className="text-gray-500">Route</p>
                                    <p>{m.route}</p>
                                    <p className="mt-2 text-gray-500">Instructions</p>
                                    <p>{m.instructions}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Frequency</p>
                                    <p>{m.frequency}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Duration</p>
                                    <p>{m.duration}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* USAGE STATS */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                        <p className="text-xl font-semibold">42</p>
                        <p className="text-sm text-gray-500">Total Uses</p>
                    </div>
                    <div className="border rounded-lg p-4">
                        <p className="text-xl font-semibold">{selected.lastUsed}</p>
                        <p className="text-sm text-gray-500">Last Used</p>
                    </div>
                    <div className="border rounded-lg p-4">
                        <p className="text-xl font-semibold">{selected.createdOn}</p>
                        <p className="text-sm text-gray-500">Created On</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllTemplates
