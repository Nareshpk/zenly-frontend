import { useState } from "react";
import RecentlyUsedTemplates from "./RecentlyUsedTemplates";
import MyTemplatesTab from "./MyTemplatesTab";
import AllTemplates from "./AllTemplates";
import CreateTemplateModal from "../../Modal/CreateTemplateModal";



const recentlyUsedTemplates: any[] = [
    {
        id: "tpl-1",
        name: "Hypertension Standard",
        category: "Cardiovascular",
        createdBy: "Dr. Sarah Johnson",
        lastUsed: "2024-03-15",
        createdOn: "2023-05-10",
        usage: 42,
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
    },

    {
        id: "tpl-2",
        name: "Diabetes Type 2",
        category: "Endocrine",
        createdBy: "Dr. Michael Chen",
        lastUsed: "2024-04-02",
        createdOn: "2023-08-18",
        usage: 38,
        medications: [
            {
                name: "Metformin 500mg",
                route: "Oral",
                frequency: "Twice daily",
                duration: "60 days",
                instructions: "Take with meals to reduce stomach upset",
            },
        ],
    },

    {
        id: "tpl-3",
        name: "Antibiotic - Respiratory",
        category: "Infectious Disease",
        createdBy: "Dr. Lisa Patel",
        lastUsed: "2024-03-28",
        createdOn: "2023-11-02",
        usage: 27,
        medications: [
            {
                name: "Amoxicillin 500mg",
                route: "Oral",
                frequency: "Three times daily",
                duration: "7 days",
                instructions: "Complete full course even if symptoms improve",
            },
        ],
    },
];

type TemplateTab = "all" | "recent" | "mine";
export default function MedicineTemplates() {
    const [open, setOpen] = useState(false);

    const [activeTab, setActiveTab] = useState<TemplateTab>("all");
    const [selectedTemplate, setSelectedTemplate] =
        useState<any | null>(recentlyUsedTemplates[0]);

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

            {/* TOP BAR */}
            <div className="flex items-center justify-between">
                {/* Tabs */}
                <div className="flex gap-2 text-sm">
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`px-3 py-1 rounded-md ${activeTab === "all"
                            ? "bg-black text-white"
                            : "border hover:bg-gray-50"
                            }`}
                    >
                        All Templates
                    </button>

                    <button
                        onClick={() => setActiveTab("recent")}
                        className={`px-3 py-1 rounded-md ${activeTab === "recent"
                            ? "bg-black text-white"
                            : "border hover:bg-gray-50"
                            }`}
                    >
                        Recently Used
                    </button>

                    <button
                        onClick={() => setActiveTab("mine")}
                        className={`px-3 py-1 rounded-md ${activeTab === "mine"
                            ? "bg-black text-white"
                            : "border hover:bg-gray-50"
                            }`}
                    >
                        My Templates
                    </button>
                </div>

                {/* Search + Action */}
                <div className="flex items-center gap-3">
                    <input
                        placeholder="Search templates..."
                        className="border rounded-md px-3 py-1.5 text-sm w-56"
                    />
                    <button onClick={() => setOpen(true)} className="bg-black text-white px-4 py-2 rounded-md text-sm">
                        + New Template
                    </button>
                </div>
            </div>

            <div className="mt-6 space-y-6">
                {activeTab === "all" && (
                    <AllTemplates

                    />
                )}

                {activeTab === "recent" && (
                    <RecentlyUsedTemplates
                        templates={recentlyUsedTemplates}
                        selectedTemplate={selectedTemplate}
                        onSelect={setSelectedTemplate}

                    />
                )}

                {activeTab === "mine" && (
                    <MyTemplatesTab

                    />
                )}
            </div>
            {open && <CreateTemplateModal onClose={() => setOpen(false)} />}
        </div>
    );
}
