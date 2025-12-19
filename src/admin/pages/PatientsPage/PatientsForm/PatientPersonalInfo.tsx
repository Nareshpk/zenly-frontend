import { Upload } from "lucide-react";

export default function PatientPersonalInfo() {
  return (
    <div className="bg-white border rounded-xl p-6 space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-lg font-semibold">Personal Information</h2>
        <p className="text-sm text-gray-500">
          Enter the patient’s personal details.
        </p>
      </div>

      {/* Name */}
      <div className="grid grid-cols-3 gap-4">
        <Input label="First Name" />
        <Input label="Middle Name (Optional)" />
        <Input label="Last Name" />
      </div>

      {/* DOB / Gender / Marital */}
      <div className="grid grid-cols-3 gap-4">
        <Input label="Date of Birth" type="date" />
        <Select label="Gender" options={["Male", "Female", "Other"]} />
        <Select
          label="Marital Status"
          options={["Single", "Married", "Divorced", "Widowed"]}
        />
      </div>

      {/* Address */}
      <Input label="Address" textarea />

      <div className="grid grid-cols-3 gap-4">
        <Input label="City" />
        <Input label="State" />
        <Input label="Zip Code" />
      </div>

      {/* Contact Information */}
      <Section title="Contact Information">
        <div className="grid grid-cols-3 gap-4">
          <Input label="Email" />
          <Input label="Phone Number" />
          <Input label="Alternative Phone (Optional)" />
        </div>

        {/* Preferred Contact */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Preferred Contact Method
          </label>
          <div className="flex gap-6 text-sm">
            <Radio label="Phone" name="contact" />
            <Radio label="Email" name="contact" />
            <Radio label="SMS" name="contact" />
          </div>
        </div>
      </Section>

      {/* Emergency Contact */}
      <Section title="Emergency Contact">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Contact Name" />
          <Input label="Relationship" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Phone Number" />
          <Input label="Email (Optional)" />
        </div>
      </Section>

      {/* Profile Photo */}
      <Section title="Profile Photo">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <Upload className="text-gray-400" />
          </div>

          <div>
            <button className="px-3 py-2 border rounded-md text-sm">
              Upload Photo
            </button>
            <p className="text-xs text-gray-500 mt-1">
              JPG, PNG or GIF. Max 2MB.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ----------------- Reusable UI ----------------- */

function Input({
  label,
  type = "text",
  textarea,
}: {
  label: string;
  type?: string;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      {textarea ? (
        <textarea
          rows={3}
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none"
        />
      ) : (
        <input
          type={type}
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none"
        />
      )}
    </div>
  );
}

function Select({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none">
        <option>Select</option>
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function Radio({ label, name }: { label: string; name: string }) {
  return (
    <label className="flex items-center gap-2">
      <input type="radio" name={name} />
      {label}
    </label>
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
    <div className="space-y-4">
      <h3 className="font-medium">{title}</h3>
      {children}
    </div>
  );
}
