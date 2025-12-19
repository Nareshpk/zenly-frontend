import { Plus } from "lucide-react";
import { useState } from "react";
import AddAppointmentSlotModal from "../DoctorForm/AddAppointmentSlotModal";

function AppointmentsHeader() {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex justify-between items-center">
            <div>
                <h2 className="font-semibold text-lg">Appointments</h2>
                <p className="text-sm text-gray-500">
                    Manage doctor's appointments and schedule
                </p>
            </div>

            <div className="flex gap-3">
                <button className="border rounded-md px-3 py-2 text-sm">
                    May 15, 2023 (Mon)
                </button>
                <button
                    onClick={() => setOpen(true)}
                    className="bg-black text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
                >
                    <Plus size={16} /> Add Slot
                </button>
            </div>
            <AddAppointmentSlotModal open={open} onClose={() => setOpen(false)} />
        </div>
    );
}


export default AppointmentsHeader
