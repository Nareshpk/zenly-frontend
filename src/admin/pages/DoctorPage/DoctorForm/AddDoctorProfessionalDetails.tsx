export default function AddDoctorProfessionalDetails() {
  return (
    <div className="bg-white border rounded-xl p-6 space-y-8">
      {/* ================= HEADER ================= */}
      <div>
        <h2 className="font-semibold">Professional Details</h2>
        <p className="text-sm text-gray-500">
          Enter the doctor&apos;s professional information.
        </p>
      </div>

      {/* ================= SPECIALIZATION ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Primary Specialization"
          placeholder="Select specialization"
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

      {/* ================= LICENSE ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Medical License Number"
          placeholder="Enter license number"
        />

        <Input
          label="License Expiry Date"
          type="date"
          defaultValue="2025-12-16"
        />
      </div>

      {/* ================= QUALIFICATIONS ================= */}
      <Textarea
        label="Qualifications"
        placeholder="Enter qualifications (MD, PhD, etc.)"
      />

      {/* ================= EXPERIENCE ================= */}
      <Input
        label="Years of Experience"
        placeholder="Enter years of experience"
      />

      {/* ================= EDUCATION & TRAINING ================= */}
      <div className="border-t pt-6">
        <h3 className="font-medium mb-4">Education & Training</h3>

        <Textarea
          label="Education"
          placeholder="Enter education details"
        />

        <Textarea
          label="Certifications"
          placeholder="Enter certifications"
        />
      </div>

      {/* ================= DEPARTMENT & POSITION ================= */}
      <div className="border-t pt-6">
        <h3 className="font-medium mb-4">Department & Position</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Department"
            placeholder="Select department"
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

function Textarea({
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
      <textarea
        {...props}
        rows={3}
        className="w-full border rounded-md px-3 py-2 text-sm"
      />
    </div>
  );
}

function Select({
  label,
  options,
  placeholder,
}: {
  label: string;
  options: string[];
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>
      <select className="w-full border rounded-md px-3 py-2 text-sm">
        <option>{placeholder}</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
