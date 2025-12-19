type AppointmentStatus = "Cancelled" | "In Progress" | "Confirmed";

interface Appointment {
    time: string;
    patient: string;
    doctor: string;
    type: string;
    status: AppointmentStatus;
}

const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
];

const appointments: Record<string, Appointment | null> = {
    "2:00 PM": {
        time: "14:00 - 15:00",
        patient: "Jessica Brown",
        doctor: "Dr. Sarah Johnson",
        type: "Check-up",
        status: "Cancelled",
    },
    "4:00 PM": {
        time: "16:00 - 17:00",
        patient: "Michael Johnson",
        doctor: "Dr. Michael Chen",
        type: "Follow-up",
        status: "In Progress",
    },
};

export default function DaySchedule() {
    return (
        <div className="border rounded-xl bg-white">
            {/* HEADER */}
            <div className="px-6 py-4 border-b">
                <h3 className="font-semibold text-lg">Daily Schedule</h3>
                <p className="text-sm text-gray-500">
                    Schedule for December 16, 2025 • All Doctors
                </p>
            </div>

            {/* TIME GRID */}
            <div className="divide-y">
                {timeSlots.map((slot) => {
                    const appointment = appointments[slot];

                    return (
                        <div
                            key={slot}
                            className="grid grid-cols-[100px_1fr] min-h-[72px]"
                        >
                            {/* TIME */}
                            <div className="px-6 py-4 text-sm text-gray-500 border-r">
                                {slot}
                            </div>

                            {/* CONTENT */}
                            <div className="px-6 py-4">
                                {!appointment && (
                                    <span className="text-sm text-gray-400">
                                        No appointments
                                    </span>
                                )}

                                {appointment && (
                                    <div
                                        className={`p-4 rounded-lg border-l-4 ${appointment.status === "Cancelled"
                                            ? "bg-red-50 border-red-500"
                                            : appointment.status === "In Progress"
                                                ? "bg-orange-50 border-orange-500"
                                                : "bg-green-50 border-green-500"
                                            }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-medium">
                                                    {appointment.patient}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {appointment.time} • {appointment.type}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {appointment.doctor}
                                                </p>
                                            </div>

                                            <span
                                                className={`text-xs px-2 py-1 rounded-full font-medium ${appointment.status === "Cancelled"
                                                    ? "bg-red-100 text-red-600"
                                                    : appointment.status === "In Progress"
                                                        ? "bg-orange-100 text-orange-600"
                                                        : "bg-green-100 text-green-600"
                                                    }`}
                                            >
                                                {appointment.status}
                                            </span>
                                        </div>

                                    </div>
                                )}
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
}
