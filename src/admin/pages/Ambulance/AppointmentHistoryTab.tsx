import { MoreVertical } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

function AppointmentHistoryTab() {
    return (
        <div className="bg-white border rounded-xl p-6">
            <div className="flex justify-between mb-4">
                <div>
                    <h2 className="font-semibold">Appointment History</h2>
                    <p className="text-sm text-gray-500">
                        View all appointments and medical visits.
                    </p>
                </div>
                <button className="bg-black text-white px-4 py-2 rounded-md text-sm">
                    + Schedule Appointment
                </button>
            </div>

            <table className="w-full text-sm">
                <thead className="text-left text-gray-500 border-b">
                    <tr>
                        <th>Date & Time</th>
                        <th>Type</th>
                        <th>Doctor</th>
                        <th>Status</th>
                        <th>Notes</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    <tr>
                        <td>2023-07-15<br />10:00 AM</td>
                        <td>Check-up</td>
                        <td>Dr. Sarah Johnson</td>
                        <td>
                            <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs">
                                Completed
                            </span>
                        </td>
                        <td>Patient reported feeling well…</td>
                        <td><AppointmentActionMenu /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}


export default AppointmentHistoryTab


function AppointmentActionMenu() {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close on outside click
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
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                className="p-2 rounded hover:bg-gray-100"
            >
                <MoreVertical size={16} />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-20">
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                        View details
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                        View medical notes
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                        Download summary
                    </button>
                </div>
            )}
        </div>
    );
}

