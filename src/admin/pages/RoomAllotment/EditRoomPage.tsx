import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";

const tabs = ["Basic Information", "Features & Amenities", "Billing & Notes"];

export default function EditRoomPage() {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <button className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <ArrowLeft size={16} />
                        Back to Room Details
                    </button>
                    <h1 className="text-2xl font-semibold">Edit Room 101</h1>
                    <p className="text-sm text-gray-500">
                        Cardiology Department • 1st Floor • East Wing
                    </p>
                </div>

                <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm">
                    <Save size={16} />
                    Save Changes
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm rounded-lg transition
              ${activeTab === tab
                                ? "bg-white shadow text-black"
                                : "text-gray-500 hover:text-black"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content */}
            {activeTab === "Basic Information" && <BasicInfoTab />}
            {activeTab === "Features & Amenities" && <FeaturesAmenitiesTab />}
            {activeTab === "Billing & Notes" && <BillingNotesTab />}
        </div>
    );
}


function BasicInfoTab() {
    return (
        <div className="bg-white border rounded-xl p-6 space-y-6">
            <div>
                <h2 className="text-lg font-semibold">Basic Room Information</h2>
                <p className="text-sm text-gray-500">
                    Edit the basic details of the room
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Room Number" defaultValue="101" />
                <Select label="Room Type" defaultValue="Private" />
                <Select label="Department" defaultValue="Cardiology" />
                <Input label="Capacity" defaultValue="1" helper="Maximum number of patients" />
                <Input label="Floor" defaultValue="1st Floor" />
                <Input label="Wing" defaultValue="East Wing" />
                <Input label="Room Size" defaultValue="25 sq m" />
            </div>

            <Textarea
                label="Description"
                defaultValue="Spacious private room with modern amenities and a view of the garden."
            />

            <Actions />
        </div>
    );
}


const FEATURES = [
    "Private Bathroom",
    "TV",
    "Nurse Call System",
    "Adjustable Bed",
    "Refrigerator",
    "Window View",
    "WiFi",
    "Oxygen Supply",
    "Wheelchair Accessible",
    "Extra Bed for Attendant",
];

function FeaturesAmenitiesTab() {
    return (
        <div className="bg-white border rounded-xl p-6 space-y-6">
            <div>
                <h2 className="text-lg font-semibold">Features & Amenities</h2>
                <p className="text-sm text-gray-500">
                    Select the features and amenities available in this room
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FEATURES.map((item) => (
                    <label key={item} className="flex items-center gap-3 text-sm">
                        <input type="checkbox" defaultChecked className="rounded" />
                        {item}
                    </label>
                ))}
            </div>

            <Actions />
        </div>
    );
}


function BillingNotesTab() {
    return (
        <div className="bg-white border rounded-xl p-6 space-y-6">
            <div>
                <h2 className="text-lg font-semibold">Billing Information</h2>
                <p className="text-sm text-gray-500">
                    Set the billing rates and additional notes for this room
                </p>
            </div>

            <Input
                label="Daily Rate ($)"
                defaultValue="350"
                helper="Standard daily rate for this room"
            />

            <Textarea
                label="Additional Notes"
                defaultValue="Room was renovated in January 2023. New furniture and medical equipment installed."
            />

            <Actions />
        </div>
    );
}


const Input = ({ label, helper, ...props }: any) => (
    <div className="space-y-1">
        <label className="text-sm font-medium">{label}</label>
        <input
            {...props}
            className="w-full border rounded-lg px-3 py-2 text-sm"
        />
        {helper && <p className="text-xs text-gray-500">{helper}</p>}
    </div>
);

const Select = ({ label, defaultValue }: any) => (
    <div className="space-y-1">
        <label className="text-sm font-medium">{label}</label>
        <select
            defaultValue={defaultValue}
            className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
        >
            <option>{defaultValue}</option>
        </select>
    </div>
);

const Textarea = ({ label, ...props }: any) => (
    <div className="space-y-1">
        <label className="text-sm font-medium">{label}</label>
        <textarea
            {...props}
            rows={4}
            className="w-full border rounded-lg px-3 py-2 text-sm"
        />
    </div>
);

const Actions = () => (
    <div className="flex justify-end gap-3 pt-4">
        <button className="px-4 py-2 border rounded-lg text-sm">
            Cancel
        </button>
        <button className="px-4 py-2 bg-black text-white rounded-lg text-sm">
            Save Changes
        </button>
    </div>
);

