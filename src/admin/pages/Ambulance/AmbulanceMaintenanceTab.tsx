import { MoreVertical } from "lucide-react";
import { useState } from "react";

export default function AmbulanceMaintenanceTab() {
  return (
    <div className="space-y-6">

      {/* Maintenance History */}
      <div className="border rounded-xl p-6">
        <h2 className="text-lg font-semibold">Maintenance History</h2>
        <p className="text-sm text-gray-500 mb-4">
          Record of all maintenance activities
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b text-gray-500">
              <tr>
                <th className="text-left py-3">ID</th>
                <th className="text-left">Date</th>
                <th className="text-left">Type</th>
                <th className="text-left">Description</th>
                <th className="text-left">Technician</th>
                <th className="text-left">Cost</th>
                <th className="text-left">Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              <MaintenanceRow
                id="M001"
                date="2023-04-02"
                type="Regular Service"
                description="Oil change, filter replacement, brake inspection"
                technician="John Mechanic"
                cost="$350"
              />
              <MaintenanceRow
                id="M002"
                date="2023-01-10"
                type="Tire Replacement"
                description="Replaced all four tires with winter tires"
                technician="Mike Tire"
                cost="$800"
              />
              <MaintenanceRow
                id="M003"
                date="2022-10-15"
                type="Regular Service"
                description="Oil change, filter replacement, general inspection"
                technician="John Mechanic"
                cost="$320"
              />
              <MaintenanceRow
                id="M004"
                date="2022-07-22"
                type="Brake Repair"
                description="Front brake pads replacement and rotor resurfacing"
                technician="Robert Brake"
                cost="$450"
              />
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Maintenance */}
      <div className="border rounded-xl p-6">
        <h2 className="text-lg font-semibold">Upcoming Maintenance</h2>

        <div className="mt-4 border rounded-lg p-5">
          <h3 className="font-medium text-base">Regular Service</h3>
          <p className="text-sm text-gray-500 mb-4">
            Scheduled for <span className="font-medium">2023-07-02</span>
          </p>

          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>Oil and filter change</li>
            <li>Brake inspection</li>
            <li>Tire rotation and pressure check</li>
            <li>Fluid levels check and top-up</li>
            <li>General safety inspection</li>
          </ul>

          <div className="flex justify-end mt-4">
            <button className="border px-4 py-2 rounded-md text-sm hover:bg-gray-50">
              Reschedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- ROW COMPONENT -------------------- */

function MaintenanceRow({
  id,
  date,
  type,
  description,
  technician,
  cost,
}: any) {
  return (
    <tr className="border-b last:border-none">
      <td className="py-4 font-medium">{id}</td>
      <td>{date}</td>
      <td>{type}</td>
      <td className="max-w-md">{description}</td>
      <td>{technician}</td>
      <td>{cost}</td>
      <td>
        <span className="px-3 py-1 rounded-full text-xs font-medium border">
          Completed
        </span>
      </td>
      <td className="text-right">
        <RowActions />
      </td>
    </tr>
  );
}

/* -------------------- ACTION MENU -------------------- */

function RowActions() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded hover:bg-gray-100"
      >
        <MoreVertical size={16} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-10">
          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
            View Details
          </button>
          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
            Edit Record
          </button>
          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
            Print Report
          </button>
        </div>
      )}
    </div>
  );
}


