import { Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Mode = "add" | "edit";

export default function PersonalInformationForm({
  onSave,
  mode = "add",
  initialValues,
}: {
  onSave: (data: any) => void;
  mode?: Mode;
  initialValues?: any;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phone: "",
    emergencyName: "",
    emergencyPhone: "",
    profileImage: null as File | null,      // NEW FILE
    profileImagePreview: "",                // LOCAL PREVIEW
    existingImage: "",                      // SERVER IMAGE (EDIT)
  });

  /* ================= PREFILL (EDIT MODE) ================= */

  useEffect(() => {
    if (mode === "edit" && initialValues) {
      setForm((prev) => ({
        ...prev,
        ...initialValues,
        profileImage: null, // never prefill file
        profileImagePreview: "",
        existingImage: initialValues.profileImage || "",
      }));
    }
  }, [mode, initialValues]);

  /* ================= HANDLERS ================= */

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      alert("Only JPG, PNG or GIF allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size must be under 2MB");
      return;
    }

    setForm((prev) => ({
      ...prev,
      profileImage: file,
      profileImagePreview: URL.createObjectURL(file),
      existingImage: "", // override old image
    }));
  };

  const handleClear = () => {
    if (mode === "edit") return; // ❌ don’t clear in edit mode

    setForm({
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      email: "",
      phone: "",
      emergencyName: "",
      emergencyPhone: "",
      profileImage: null,
      profileImagePreview: "",
      existingImage: "",
    });
  };

  const handleSaveContinue = () => {
    onSave(form);
  };

  const imageSrc =
    form.profileImagePreview ||
    (form.existingImage
      ? `http://localhost:5000/uploads/${form.existingImage}`
      : "");

  return (
    <div className="bg-white border rounded-xl p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="font-semibold">
          Personal Information {mode === "edit" && "(Edit)"}
        </h2>
        <p className="text-sm text-gray-500">
          Enter the doctor&apos;s personal details.
        </p>
      </div>

      {/* NAMES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="First Name" name="firstName" value={form.firstName} onChange={handleChange} />
        <Input label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} />
      </div>

      {/* DOB + GENDER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input type="date" label="Date of Birth" name="dob" value={form.dob} onChange={handleChange} />
        <Select label="Gender" name="gender" value={form.gender} onChange={handleChange} options={["Male", "Female", "Other"]} />
      </div>

      {/* ADDRESS */}
      <Textarea label="Address" name="address" value={form.address} onChange={handleChange} />

      {/* CITY / STATE / ZIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input label="City" name="city" value={form.city} onChange={handleChange} />
        <Input label="State" name="state" value={form.state} onChange={handleChange} />
        <Input label="Zip Code" name="zip" value={form.zip} onChange={handleChange} />
      </div>

      {/* CONTACT */}
      <div>
        <h3 className="font-medium mb-3">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Email" name="email" value={form.email} onChange={handleChange} />
          <Input label="Phone Number" name="phone" value={form.phone} onChange={handleChange} />
          <Input label="Emergency Contact Name" name="emergencyName" value={form.emergencyName} onChange={handleChange} />
          <Input label="Emergency Contact Phone" name="emergencyPhone" value={form.emergencyPhone} onChange={handleChange} />
        </div>
      </div>

      {/* PROFILE IMAGE */}
      <div>
        <h3 className="font-medium mb-2">Profile Photo</h3>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
            {imageSrc ? (
              <img src={imageSrc} className="w-full h-full object-cover" />
            ) : (
              <Upload className="text-gray-400" />
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 border rounded-md text-sm"
            >
              {mode === "edit" ? "Change Photo" : "Upload Photo"}
            </button>

            <p className="text-xs text-gray-400 mt-1">
              JPG, PNG or GIF. Max 2MB.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />
          </div>
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

/* ================= REUSABLE ================= */

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
        <option value="">Select gender</option>
        {options.map((o: string) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
