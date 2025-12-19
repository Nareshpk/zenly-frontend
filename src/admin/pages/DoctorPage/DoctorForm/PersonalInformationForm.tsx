import { Upload } from "lucide-react";

export default function PersonalInformationForm() {
  return (
    <div className="bg-white border rounded-xl p-6 space-y-6">
      <div>
        <h2 className="font-semibold">Personal Information</h2>
        <p className="text-sm text-gray-500">
          Enter the doctor&apos;s personal details.
        </p>
      </div>

      {/* NAMES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="First Name" placeholder="Enter first name" />
        <Input label="Last Name" placeholder="Enter last name" />
      </div>

      {/* DOB + GENDER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Date of Birth"
          type="date"
          defaultValue="2025-12-16"
        />
        <Select
          label="Gender"
          options={["Male", "Female", "Other"]}
        />
      </div>

      {/* ADDRESS */}
      <Textarea label="Address" placeholder="Enter address" />

      {/* CITY / STATE / ZIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input label="City" placeholder="Enter city" />
        <Input label="State" placeholder="Enter state" />
        <Input label="Zip Code" placeholder="Enter zip code" />
      </div>

      {/* CONTACT INFO */}
      <div>
        <h3 className="font-medium mb-3">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email"
            placeholder="Enter email address"
          />
          <Input
            label="Phone Number"
            placeholder="Enter phone number"
          />
          <Input
            label="Emergency Contact Name"
            placeholder="Enter emergency contact name"
          />
          <Input
            label="Emergency Contact Phone"
            placeholder="Enter emergency contact phone"
          />
        </div>
      </div>

      {/* PROFILE PHOTO */}
      <div>
        <h3 className="font-medium mb-2">Profile Photo</h3>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <Upload className="text-gray-400" />
          </div>
          <div>
            <button className="px-3 py-1.5 border rounded-md text-sm">
              Upload Photo
            </button>
            <p className="text-xs text-gray-400 mt-1">
              Upload a profile photo. JPG, PNG or GIF. Max 2MB.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


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
}: {
  label: string;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>
      <select className="w-full border rounded-md px-3 py-2 text-sm">
        <option>Select gender</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
