import { useEffect, useState } from "react";

type Mode = "add" | "edit";

export default function AddDoctorProfessionalDetails({
  onSave,
  mode = "add",
  initialValues,
}: {
  onSave: (data: any) => void;
  mode?: Mode;
  initialValues?: any;
}) {
  const [form, setForm] = useState({
    primarySpecialization: "",
    secondarySpecialization: "",
    licenseNumber: "",
    licenseExpiry: "",
    qualifications: "",
    experience: "",
    education: "",
    certifications: "",
    department: "",
    position: "",
    patientsCount: 0,
  });

  /* ================= PREFILL (EDIT MODE) ================= */

  useEffect(() => {
    if (mode === "edit" && initialValues) {
      setForm((prev) => ({
        ...prev,
        ...initialValues,
      }));
    }
  }, [mode, initialValues]);

  /* ================= HANDLERS ================= */

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveContinue = () => {
    onSave(form);
  };

  const handleClear = () => {
    if (mode === "edit") return; // ❌ disable clear in edit mode

    setForm({
      primarySpecialization: "",
      secondarySpecialization: "",
      licenseNumber: "",
      licenseExpiry: "",
      qualifications: "",
      experience: "",
      education: "",
      certifications: "",
      department: "",
      position: "",
      patientsCount: 0,
    });
  };

  /* ================= RENDER ================= */

  return (
    <div className="bg-white border rounded-xl p-6 space-y-8">
      {/* HEADER */}
      <div>
        <h2 className="font-semibold">
          Professional Details {mode === "edit" && "(Edit)"}
        </h2>
        <p className="text-sm text-gray-500">
          Enter the doctor&apos;s professional information.
        </p>
      </div>

      {/* SPECIALIZATION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Primary Specialization"
          placeholder="Select specialization"
          name="primarySpecialization"
          value={form.primarySpecialization}
          onChange={handleChange}
          options={[
            "Cardiology",
            "Neurology",
            "Pediatrics",
            "Orthopedics",
            "Dermatology",
            "Psychiatry",
          ]}
        />

        <Select
          label="Secondary Specialization (Optional)"
          placeholder="Select specialization"
          name="secondarySpecialization"
          value={form.secondarySpecialization}
          onChange={handleChange}
          options={[
            "Cardiology",
            "Neurology",
            "Pediatrics",
            "Orthopedics",
            "Dermatology",
            "Psychiatry",
          ]}
        />
      </div>

      {/* LICENSE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Medical License Number"
          name="licenseNumber"
          value={form.licenseNumber}
          onChange={handleChange}
          placeholder="Enter license number"
        />

        <Input
          label="License Expiry Date"
          type="date"
          name="licenseExpiry"
          value={form.licenseExpiry}
          onChange={handleChange}
        />
      </div>

      {/* QUALIFICATIONS */}
      <Textarea
        label="Qualifications"
        name="qualifications"
        value={form.qualifications}
        onChange={handleChange}
        placeholder="Enter qualifications (MD, PhD, etc.)"
      />

      {/* EXPERIENCE */}
      <Input
        label="Years of Experience"
        name="experience"
        value={form.experience}
        onChange={handleChange}
        placeholder="Enter years of experience"
      />

      {/* EDUCATION */}
      <div className="border-t pt-6">
        <h3 className="font-medium mb-4">Education & Training</h3>

        <Textarea
          label="Education"
          name="education"
          value={form.education}
          onChange={handleChange}
          placeholder="Enter education details"
        />

        <Textarea
          label="Certifications"
          name="certifications"
          value={form.certifications}
          onChange={handleChange}
          placeholder="Enter certifications"
        />
      </div>

      {/* DEPARTMENT */}
      <div className="border-t pt-6">
        <h3 className="font-medium mb-4">Department & Position</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Department"
            placeholder="Select department"
            name="department"
            value={form.department}
            onChange={handleChange}
            options={[
              "Cardiology",
              "Neurology",
              "Pediatrics",
              "Orthopedics",
              "Dermatology",
              "Psychiatry",
            ]}
          />

          <Select
            label="Position"
            placeholder="Select position"
            name="position"
            value={form.position}
            onChange={handleChange}
            options={[
              "Consultant",
              "Senior Doctor",
              "Junior Doctor",
              "Resident",
              "Head of Department",
            ]}
          />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          onClick={handleClear}
          disabled={mode === "edit"}
          className="px-4 py-2 border rounded-md text-sm disabled:opacity-50"
        >
          Clear
        </button>

        <button
          onClick={handleSaveContinue}
          className="px-4 py-2 bg-black text-white rounded-md text-sm"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input {...props} className="w-full border rounded-md px-3 py-2 text-sm" />
    </div>
  );
}

function Textarea({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea {...props} rows={3} className="w-full border rounded-md px-3 py-2 text-sm" />
    </div>
  );
}

function Select({ label, options, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select {...props} className="w-full border rounded-md px-3 py-2 text-sm">
        <option value="">{props.placeholder}</option>
        {options.map((o: string) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
