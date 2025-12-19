import React from 'react'

export default function AmbulanceOverviewTab() {
  return (
    <div className="border rounded-xl p-6 space-y-6">
      <h2 className="text-lg font-semibold">Ambulance Overview</h2>

      <div className="grid grid-cols-2 gap-8">
        {/* General Info */}
        <div className="space-y-2 text-sm">
          <h3 className="font-medium">General Information</h3>
          <Info label="ID" value="AMB-002" />
          <Info label="Registration" value="ABC-5678" />
          <Info label="Model" value="Mercedes Sprinter" />
          <Info label="Year" value="2022" />
          <Info label="Type" value="Advanced Life Support" />
          <Info label="Purchase Date" value="2022-01-15" />
          <Info label="Insurance Expiry" value="2024-01-15" />
        </div>

        {/* Technical */}
        <div className="space-y-2 text-sm">
          <h3 className="font-medium">Technical Specifications</h3>
          <Info label="Fuel Type" value="Diesel" />
          <Info label="Mileage" value="12,450 km" />
          <Info label="Capacity" value="2 stretchers, 3 seated" />
          <Info label="Current Location" value="East Wing" />
          <Info label="Current Driver" value="Sarah Wilson" />
          <Info label="Last Maintenance" value="2023-04-02" />
          <Info label="Next Maintenance" value="2023-07-02" />
        </div>
      </div>

      {/* Usage Stats */}
      <div className="grid grid-cols-3 gap-4">
        <UsageCard title="Total Distance" value="12,450 km" note="+450 km this month" />
        <UsageCard title="Avg Response Time" value="8.2 min" note="-0.5 min from last month" />
        <UsageCard title="Fuel Efficiency" value="9.8 L/100km" note="Within normal range" />
      </div>
    </div>
  );
}

function Info({ label, value }: any) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

function UsageCard({ title, value, note }: any) {
  return (
    <div className="border rounded-xl p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
      <p className="text-xs text-gray-400">{note}</p>
    </div>
  );
}