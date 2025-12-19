import React from 'react'

type Status = "Completed" | "Scheduled" | "Pending";

function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    Completed: "bg-green-500 text-white",
    Scheduled: "bg-blue-100 text-blue-700",
    Pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}


function LabResultsTab() {
    return (
        <div className="bg-white border rounded-xl p-6 space-y-4">
            <div className="flex justify-between">
                <div>
                    <h2 className="font-semibold">Lab Results</h2>
                    <p className="text-sm text-gray-500">
                        View all laboratory test results.
                    </p>
                </div>
                <button className="border px-4 py-2 rounded-md text-sm">
                    + Order New Test
                </button>
            </div>

            <div className="border rounded-lg p-4">
                <div className="flex justify-between mb-4">
                    <div>
                        <h3 className="font-medium">Blood Panel</h3>
                        <p className="text-sm text-gray-500">
                            Date: 2023-07-14 · Dr. Sarah Johnson
                        </p>
                    </div>
                    <StatusBadge status="Completed" />

                </div>

                <table className="w-full text-sm">
                    <thead className="text-gray-500 border-b">
                        <tr>
                            <th>Test</th>
                            <th>Result</th>
                            <th>Range</th>
                            <th>Flag</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        <tr>
                            <td>Glucose</td>
                            <td>130 mg/dL</td>
                            <td>70-99 mg/dL</td>
                            <td>
                                <span className="bg-orange-500 text-white px-2 py-0.5 rounded-full text-xs">
                                    High
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="flex justify-end gap-2 mt-4">
                    <button className="border px-3 py-1 rounded-md text-sm">
                        Print
                    </button>
                    <button className="border px-3 py-1 rounded-md text-sm">
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
}


export default LabResultsTab
