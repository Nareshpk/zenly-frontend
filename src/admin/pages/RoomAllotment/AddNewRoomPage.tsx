import { ArrowLeft } from "lucide-react";

export default function AddNewRoomPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <button className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <ArrowLeft size={16} />
                    Add New Room
                </button>
            </div>

            {/* Card */}
            <div className="bg-white border rounded-xl p-6 space-y-8">
                {/* Title */}
                <div>
                    <h2 className="text-lg font-semibold">Room Details</h2>
                    <p className="text-sm text-gray-500">
                        Add a new room to the hospital inventory. Fill in all the required information below.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* LEFT */}
                    <div className="space-y-6">
                        <Section title="Basic Information" />

                        <Input
                            label="Room Number"
                            placeholder="Enter room number"
                            helper="Enter a unique room number"
                        />

                        <Select label="Room Type" placeholder="Select room type" />
                        <Select label="Department" placeholder="Select department" />
                        <Select label="Floor" placeholder="Select floor" />
                    </div>

                    {/* RIGHT */}
                    <div className="space-y-6">
                        <Section title="Additional Details" />

                        <Select label="Capacity (Beds)" placeholder="Select capacity" />
                        <Input label="Price Per Day" placeholder="Enter price" />
                        <Select label="Status" defaultValue="Available" />

                        <Textarea label="Description" placeholder="Enter room description" />
                    </div>
                </div>

                {/* Facilities */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium">Facilities</h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        {[
                            "Television",
                            "Attached Bathroom",
                            "Air Conditioning",
                            "Wheelchair Accessible",
                            "WiFi",
                            "Oxygen Supply",
                            "Telephone",
                            "Nurse Call Button",
                        ].map((item) => (
                            <label key={item} className="flex items-center gap-2">
                                <input type="checkbox" className="rounded" />
                                {item}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Notes */}
                <Textarea
                    label="Additional Notes"
                    placeholder="Enter any additional notes"
                />

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <button className="px-4 py-2 border rounded-lg text-sm">
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-black text-white rounded-lg text-sm">
                        Add Room
                    </button>
                </div>
            </div>
        </div>
    );
}


const Section = ({ title }: { title: string }) => (
    <h3 className="text-sm font-medium border-b pb-2">{title}</h3>
);

const Input = ({ label, helper, ...props }: any) => (
    <div className="space-y-1">
        <label className="text-sm font-medium">{label}</label>
        <input
            {...props}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
        />
        {helper && <p className="text-xs text-gray-500">{helper}</p>}
    </div>
);

const Select = ({ label, placeholder, defaultValue }: any) => (
    <div className="space-y-1">
        <label className="text-sm font-medium">{label}</label>
        <select
            defaultValue={defaultValue}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
        >
            <option>{placeholder}</option>
            {defaultValue && <option>{defaultValue}</option>}
        </select>
    </div>
);

const Textarea = ({ label, ...props }: any) => (
    <div className="space-y-1">
        <label className="text-sm font-medium">{label}</label>
        <textarea
            {...props}
            rows={4}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
        />
    </div>
);
