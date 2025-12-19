import { MoreVertical } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

function BillingHistoryTab() {
    return (
        <div className="space-y-6">
            <div className="bg-white border rounded-xl p-6">
                <div className="flex justify-between mb-4">
                    <div>
                        <h2 className="font-semibold">Billing History</h2>
                        <p className="text-sm text-gray-500">
                            View all billing and payment information.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button className="border px-3 py-1 rounded-md text-sm">
                            Export History
                        </button>
                        <button className="bg-black text-white px-3 py-1 rounded-md text-sm">
                            + New Invoice
                        </button>
                    </div>
                </div>

                <table className="w-full text-sm">
                    <thead className="text-gray-500 border-b">
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Insurance</th>
                            <th>Patient</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        <tr>
                            <td>2023-07-15</td>
                            <td>Office Visit</td>
                            <td>$150</td>
                            <td>$120</td>
                            <td>$30</td>
                            <td>
                                <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs">
                                    Paid
                                </span>
                            </td>
                            <td><BillingActionMenu /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Payment Summary */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    ["Total Billed", "$1,130.00"],
                    ["Insurance Covered", "$904.00"],
                    ["Patient Paid", "$152.00"],
                ].map(([label, value]) => (
                    <div key={label} className="bg-white border rounded-xl p-4">
                        <p className="text-sm text-gray-500">{label}</p>
                        <p className="font-semibold text-lg">{value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default BillingHistoryTab


function BillingActionMenu() {
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
                        View Invoice
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                        Print Invoice
                    </button>
                </div>
            )}
        </div>
    );
}
