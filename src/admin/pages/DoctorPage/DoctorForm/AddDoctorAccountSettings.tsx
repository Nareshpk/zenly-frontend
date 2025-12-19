import { useEffect, useState } from "react";

type Mode = "add" | "edit";

export default function AddDoctorAccountSettings({
  onFinalSave,
  mode = "add",
  initialValues,
}: {
  onFinalSave: (data: any) => void;
  mode?: Mode;
  initialValues?: any;
}) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
  });

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

  /* ================= PREFILL (EDIT MODE) ================= */

  useEffect(() => {
    if (mode === "edit" && initialValues) {
      setForm({
        username: initialValues.username || "",
        email: initialValues.email || "",
        password: "", // ❌ never prefill password
      });

      setAccess(
        initialValues.access || {
          patientRecords: true,
          prescriptions: true,
          billing: false,
          reports: false,
        }
      );

      setNotifications(
        initialValues.notifications || {
          appointments: true,
          patientUpdates: true,
          system: true,
        }
      );
    }
  }, [mode, initialValues]);

  /* ================= HANDLERS ================= */

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFinalSave = () => {
    onFinalSave({
      account: form,
      access,
      notifications,
    });
  };

  const handleClear = () => {
    if (mode === "edit") return; // ❌ disable clear in edit

    setForm({
      username: "",
      password: "",
      email: "",
    });

    setAccess({
      patientRecords: true,
      prescriptions: true,
      billing: false,
      reports: false,
    });

    setNotifications({
      appointments: true,
      patientUpdates: true,
      system: true,
    });
  };

  /* ================= RENDER ================= */

  return (
    <div className="bg-white border rounded-xl p-6 space-y-8">
      {/* HEADER */}
      <div>
        <h2 className="font-semibold">
          Account Settings {mode === "edit" && "(Edit)"}
        </h2>
        <p className="text-sm text-gray-500">
          Configure the doctor&apos;s account and system access.
        </p>
      </div>

      {/* ACCOUNT INFO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          disabled={mode === "edit"} // 🔒 lock username
          placeholder="Enter username"
        />

        <Input
          label={mode === "edit" ? "New Password (Optional)" : "Temporary Password"}
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder={mode === "edit" ? "Leave blank to keep existing" : "Enter temporary password"}
        />
      </div>

      <div>
        <Input
          label="Email Address"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email address"
        />
        <p className="text-xs text-gray-500 mt-1">
          Used for login and notifications.
        </p>
      </div>

      {/* SYSTEM ACCESS */}
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
          description="Allow managing prescriptions"
          value={access.prescriptions}
          onChange={() =>
            setAccess({ ...access, prescriptions: !access.prescriptions })
          }
        />
        <ToggleRow
          label="Billing"
          description="Allow access to billing"
          value={access.billing}
          onChange={() =>
            setAccess({ ...access, billing: !access.billing })
          }
        />
        <ToggleRow
          label="Reports"
          description="Allow access to reports"
          value={access.reports}
          onChange={() =>
            setAccess({ ...access, reports: !access.reports })
          }
        />
      </Section>

      {/* NOTIFICATIONS */}
      <Section title="Notifications">
        <ToggleRow
          label="Appointment Notifications"
          description="New appointment alerts"
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
          description="Patient update alerts"
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
          description="System notifications"
          value={notifications.system}
          onChange={() =>
            setNotifications({
              ...notifications,
              system: !notifications.system,
            })
          }
        />
      </Section>

      {/* FINAL ACTIONS */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          onClick={handleClear}
          disabled={mode === "edit"}
          className="px-4 py-2 text-sm border rounded-md disabled:opacity-50"
        >
          Clear
        </button>

        <button
          onClick={handleFinalSave}
          className="px-4 py-2 text-sm bg-black text-white rounded-md"
        >
          {mode === "edit" ? "Update Doctor" : "Save Doctor"}
        </button>
      </div>
    </div>
  );
}

/* ================= REUSABLE ================= */

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        {...props}
        className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
      />
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div className="border-t pt-6 space-y-4">
      <h3 className="font-medium">{title}</h3>
      {children}
    </div>
  );
}

function ToggleRow({ label, description, value, onChange }: any) {
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
