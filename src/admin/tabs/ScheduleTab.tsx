import React from 'react'

export default function ScheduleTab() {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Today's Schedule */}
            <div className="bg-white border rounded-xl p-6">
                <h3 className="font-semibold">Today's Schedule</h3>
                <p className="text-sm text-gray-500 mb-4">
                    You have 12 appointments scheduled for today
                </p>

                <div className="space-y-3">
                    <ScheduleItem
                        name="Emma Thompson"
                        time="09:00 AM • 30 min"
                        tag="Check-up"
                    />
                    <ScheduleItem
                        name="Michael Chen"
                        time="10:15 AM • 45 min"
                        tag="Follow-up"
                    />
                    <ScheduleItem
                        name="Sophia Rodriguez"
                        time="11:30 AM • 60 min"
                        tag="Consultation"
                    />
                    <ScheduleItem
                        name="James Wilson"
                        time="01:45 PM • 30 min"
                        tag="Urgent"
                        urgent
                    />
                    <ScheduleItem
                        name="Olivia Parker"
                        time="03:00 PM • 45 min"
                        tag="Check-up"
                    />
                </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white border rounded-xl p-6">
                <h3 className="font-semibold">Upcoming Appointments</h3>
                <p className="text-sm text-gray-500 mb-4">
                    Your upcoming appointments for the week
                </p>

                <div className="space-y-3">
                    <UpcomingItem
                        name="John Doe"
                        date="Saturday, April 26 at 09:00 AM"
                        status="confirmed"
                        type="Follow-up"
                    />
                    <UpcomingItem
                        name="Jane Smith"
                        date="Saturday, April 26 at 10:30 AM"
                        status="pending"
                        type="New Patient"
                    />
                    <UpcomingItem
                        name="Robert Johnson"
                        date="Sunday, April 27 at 02:00 PM"
                        status="confirmed"
                        type="Consultation"
                    />
                    <UpcomingItem
                        name="Emily Davis"
                        date="Monday, April 28 at 11:00 AM"
                        status="confirmed"
                        type="Follow-up"
                    />
                    <UpcomingItem
                        name="John Doe"
                        date="Monday, April 28 at 01:00 PM"
                        status="pending"
                        type="New Patient"
                    />
                </div>
            </div>
        </div>
    )
}



function ScheduleItem({
    name,
    time,
    tag,
    urgent,
}: any) {
    return (
        <div className="flex items-center justify-between border rounded-lg p-4">
            <div>
                <div className="font-medium">{name}</div>
                <div className="text-xs text-gray-500">{time}</div>
            </div>
            <div className="flex items-center gap-2">
                <span
                    className={`px-3 py-1 text-xs rounded-full ${urgent
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                >
                    {tag}
                </span>
                <button className="px-3 py-1 border rounded-md text-sm">
                    View
                </button>
            </div>
        </div>
    );
}

function UpcomingItem({
    name,
    date,
    status,
    type,
}: any) {
    const statusColor =
        status === "confirmed"
            ? "bg-green-100 text-green-600"
            : "bg-yellow-100 text-yellow-600";

    return (
        <div className="border rounded-lg p-4 flex items-center justify-between">
            <div>
                <div className="font-medium">{name}</div>
                <div className="text-xs text-gray-500">{date}</div>
            </div>
            <div className="flex gap-2">
                <span className={`px-3 py-1 text-xs rounded-full ${statusColor}`}>
                    {status}
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-gray-100">
                    {type}
                </span>
            </div>
        </div>
    );
}
