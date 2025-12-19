import { useState } from "react";

export default function AddDoctorAccountSettings() {
  const [access, setAccess] = useState({
    patientRecords: true,
    prescriptions: true,
    billing: false,
    reports: false,
  });

  const [notifications, setNotifications] = useState({
    appointments: true,
    patientUpdates: true,
    system: true,
  });

  return (
    <div className="bg-white border rounded-xl p-6 space-y-8">
      {/* ================= HEADER ================= */}
      <div>
        <h2 className="font-semibold">Account Settings</h2>
        <p className="text-sm text-gray-500">
          Configure the doctor&apos;s account and system access.
        </p>
      </div>

      {/* ================= ACCOUNT INFO ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Username" placeholder="Enter username" />
        <Input
          label="Temporary Password"
          placeholder="Enter temporary password"
          type="password"
        />
      </div>

      <div>
        <Input label="Email Address" placeholder="Enter email address" />
        <p className="text-xs text-gray-500 mt-1">
          This will be used for login and notifications.
        </p>
      </div>

      {/* ================= SYSTEM ACCESS ================= */}
      <Section title="System Access">
        <ToggleRow
          label="Patient Records"
          description="Allow access to patient records"
          value={access.patientRecords}
          onChange={() =>
            setAccess({ ...access, patientRecords: !access.patientRecords })
          }
        />

        <ToggleRow
          label="Prescriptions"
          description="Allow creating and managing prescriptions"
          value={access.prescriptions}
          onChange={() =>
            setAccess({ ...access, prescriptions: !access.prescriptions })
          }
        />

        <ToggleRow
          label="Billing"
          description="Allow access to billing information"
          value={access.billing}
          onChange={() =>
            setAccess({ ...access, billing: !access.billing })
          }
        />

        <ToggleRow
          label="Reports"
          description="Allow access to reports and analytics"
          value={access.reports}
          onChange={() =>
            setAccess({ ...access, reports: !access.reports })
          }
        />
      </Section>

      {/* ================= NOTIFICATIONS ================= */}
      <Section title="Notifications">
        <ToggleRow
          label="Appointment Notifications"
          description="Receive notifications for new appointments"
          value={notifications.appointments}
          onChange={() =>
            setNotifications({
              ...notifications,
              appointments: !notifications.appointments,
            })
          }
        />

        <ToggleRow
          label="Patient Updates"
          description="Receive notifications for patient updates"
          value={notifications.patientUpdates}
          onChange={() =>
            setNotifications({
              ...notifications,
              patientUpdates: !notifications.patientUpdates,
            })
          }
        />

        <ToggleRow
          label="System Notifications"
          description="Receive system and administrative notifications"
          value={notifications.system}
          onChange={() =>
            setNotifications({
              ...notifications,
              system: !notifications.system,
            })
          }
        />
      </Section>

      {/* ================= FOOTER ================= */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button className="px-4 py-2 text-sm border rounded-md">
          Cancel
        </button>
        <button className="px-4 py-2 text-sm bg-black text-white rounded-md">
          Save Doctor
        </button>
      </div>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Input({
  label,
  ...props
}: {
  label: string;
  [key: string]: any;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full border rounded-md px-3 py-2 text-sm"
      />
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t pt-6 space-y-4">
      <h3 className="font-medium">{title}</h3>
      {children}
    </div>
  );
}

function ToggleRow({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>

      <button
        onClick={onChange}
        className={`w-10 h-6 rounded-full relative transition ${
          value ? "bg-black" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
            value ? "translate-x-4" : ""
          }`}
        />
      </button>
    </div>
  );
}
