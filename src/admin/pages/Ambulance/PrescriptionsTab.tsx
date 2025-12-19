import { MoreVertical } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

function PrescriptionsTab() {
    return (
        <div className="bg-white border rounded-xl p-6">
            <div className="flex justify-between mb-4">
                <div>
                    <h2 className="font-semibold">Prescriptions</h2>
                    <p className="text-sm text-gray-500">
                        View all medications and prescriptions.
                    </p>
                </div>
                <button className="bg-black text-white px-4 py-2 rounded-md text-sm">
                    + Add Prescription
                </button>
            </div>

            <table className="w-full text-sm">
                <thead className="text-left text-gray-500 border-b">
                    <tr>
                        <th>Medication</th>
                        <th>Dosage & Frequency</th>
                        <th>Date Range</th>
                        <th>Doctor</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    <tr>
                        <td>Lisinopril</td>
                        <td>10mg, Once daily</td>
                        <td>2023-07-15 → 2023-10-15</td>
                        <td>Dr. Sarah Johnson</td>
                        <td>
                            <span className="bg-gray-700 text-white px-2 py-0.5 rounded-full text-xs">
                                Completed
                            </span>
                        </td>
                        <td><PrescriptionsActionMenu /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}


export default PrescriptionsTab

function PrescriptionsActionMenu() {
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
                        Print Prescription
                    </button>
                </div>
            )}
        </div>
    );
}

