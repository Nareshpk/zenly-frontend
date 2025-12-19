export default function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Patient Summary */}
      <div className="border rounded-xl p-6 space-y-4">
        <h3 className="font-semibold">Patient Summary</h3>
        <p className="text-sm text-gray-500">
          Overview of patient's health status and recent activities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SummaryCard
            title="Next Appointment"
            value="April 20, 2024"
            subtitle="1:30 PM • Check-up"
            footer="Dr. Sarah Johnson"
          />
          <SummaryCard
            title="Active Medications"
            value="3 Active Prescriptions"
            footer="Last updated: Feb 3, 2024"
            link="View all medications"
          />
          <SummaryCard
            title="Recent Lab Results"
            value="Comprehensive Metabolic Panel"
            footer="January 20, 2024"
            link="View results"
          />
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="border rounded-xl p-6 space-y-3">
        <h4 className="font-medium">Recent Appointments</h4>

        {[
          ["Check-up", "2023-07-15 • 10:00 AM", "Dr. Sarah Johnson"],
          ["Follow-up", "2023-08-22 • 2:30 PM", "Dr. Michael Chen"],
          ["Check-up", "2023-10-05 • 11:15 AM", "Dr. Sarah Johnson"],
        ].map(([title, date, doctor]) => (
          <div
            key={date}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{title}</p>
              <p className="text-sm text-gray-500">{date}</p>
              <p className="text-sm text-gray-500">{doctor}</p>
            </div>
            <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
              Completed
            </span>
          </div>
        ))}

        <button className="w-full border rounded-md py-2 text-sm">
          View All Appointments
        </button>
      </div>

      {/* Vital Signs Trend */}
      <div className="border rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Vital Signs Trend</h4>
          <button className="text-sm border px-3 py-1 rounded-md">
            View History
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <VitalCard
            title="Blood Pressure"
            value="135/85"
            note="Slightly elevated"
            color="bg-orange-500"
          />
          <VitalCard
            title="Blood Glucose"
            value="125 mg/dL"
            note="Above normal"
            color="bg-orange-500"
          />
          <VitalCard
            title="Weight"
            value="82 kg"
            note="Stable"
            color="bg-green-500"
          />
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  subtitle,
  footer,
  link,
}: any) {
  return (
    <div className="border rounded-lg p-4 space-y-1">
      <h5 className="font-medium">{title}</h5>
      <p className="font-semibold">{value}</p>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      {footer && <p className="text-xs text-gray-400">{footer}</p>}
      {link && <p className="text-sm text-blue-600">{link}</p>}
    </div>
  );
}

function VitalCard({ title, value, note, color }: any) {
  return (
    <div className="border rounded-lg p-4 space-y-2">
      <h5 className="font-medium">{title}</h5>
      <p className="text-lg font-semibold">{value}</p>
      <div className="h-1 rounded bg-gray-200">
        <div className={`h-1 rounded ${color}`} style={{ width: "70%" }} />
      </div>
      <p className="text-xs text-gray-500">{note}</p>
    </div>
  );
}
