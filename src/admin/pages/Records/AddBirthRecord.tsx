import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function AddBirthRecordPage() {
  const [form, setForm] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 ">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button className="p-2 rounded-lg border hover:bg-gray-50">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-xl font-semibold">Add Birth Record</h1>
      </div>

      {/* Child Information */}
      <Section title="Child Information" subtitle="Enter the details of the newborn child">
        <Grid3>
          <Input label="First Name" name="childFirstName" onChange={handleChange} />
          <Input label="Middle Name (Optional)" name="childMiddleName" onChange={handleChange} />
          <Input label="Last Name" name="childLastName" onChange={handleChange} />
        </Grid3>

        <Grid3>
          <div>
            <label className="label">Gender</label>
            <div className="flex gap-6 mt-2">
              {['Male', 'Female', 'Other'].map((g) => (
                <label key={g} className="flex items-center gap-2 text-sm">
                  <input type="radio" name="gender" value={g} onChange={handleChange} /> {g}
                </label>
              ))}
            </div>
          </div>
          <Input type="date" label="Date of Birth" name="childDob" onChange={handleChange} />
          <Input type="time" label="Time of Birth" name="childTime" onChange={handleChange} />
        </Grid3>

        <Grid3>
          <Input label="Place of Birth" name="placeOfBirth" placeholder="Hospital or location" onChange={handleChange} />
          <Input label="Weight (kg)" name="weight" placeholder="e.g., 3.5" onChange={handleChange} />
          <Input label="Length (cm)" name="length" placeholder="e.g., 50" onChange={handleChange} />
        </Grid3>
      </Section>

      {/* Mother Information */}
      <Section title="Mother's Information" subtitle="Enter the details of the child's mother">
        <Grid3>
          <Input label="First Name" name="motherFirstName" onChange={handleChange} />
          <Input label="Middle Name (Optional)" name="motherMiddleName" onChange={handleChange} />
          <Input label="Last Name" name="motherLastName" onChange={handleChange} />
        </Grid3>
        <Grid3>
          <Input type="date" label="Date of Birth" name="motherDob" onChange={handleChange} />
          <Input label="Nationality" name="motherNationality" onChange={handleChange} />
          <Input label="Occupation (Optional)" name="motherOccupation" onChange={handleChange} />
        </Grid3>
      </Section>

      {/* Father Information */}
      <Section title="Father's Information" subtitle="Enter the details of the child's father">
        <Grid3>
          <Input label="First Name" name="fatherFirstName" onChange={handleChange} />
          <Input label="Middle Name (Optional)" name="fatherMiddleName" onChange={handleChange} />
          <Input label="Last Name" name="fatherLastName" onChange={handleChange} />
        </Grid3>
        <Grid3>
          <Input type="date" label="Date of Birth" name="fatherDob" onChange={handleChange} />
          <Input label="Nationality" name="fatherNationality" onChange={handleChange} />
          <Input label="Occupation (Optional)" name="fatherOccupation" onChange={handleChange} />
        </Grid3>
      </Section>

      {/* Medical Information */}
      <Section title="Medical Information" subtitle="Enter medical details related to the birth">
        <Grid2>
          <Select label="Attending Doctor" name="doctor" onChange={handleChange}
            options={["Dr. John Smith", "Dr. Anita Rao"]} />
          <Select label="Hospital / Facility" name="hospital" onChange={handleChange}
            options={["City Hospital", "Apollo Clinic"]} />
        </Grid2>

        <div>
          <label className="label">Additional Remarks (Optional)</label>
          <textarea
            name="remarks"
            rows={4}
            onChange={handleChange}
            placeholder="Enter any additional information or notes"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-black/10"
          />
        </div>

        <div className="flex justify-between items-center pt-6 mt-6 border-t">
          <button className="px-6 py-2 border rounded-md text-sm hover:bg-gray-50">Cancel</button>
          <button className="px-6 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800">
            Save Record
          </button>
        </div>
      </Section>
    </div>
  );
}

/* ---------------- Components ---------------- */

const Section = ({ title, subtitle, children }: any) => (
  <div className="bg-white border rounded-xl p-6 mb-6">
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-sm text-gray-500 mb-6">{subtitle}</p>
    <div className="space-y-6">{children}</div>
  </div>
);

const Grid3 = ({ children }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{children}</div>
);

const Grid2 = ({ children }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
);

const Input = ({ label, name, type = "text", placeholder, onChange }: any) => (
  <div>
    <label className="label">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-black/10"
    />
  </div>
);

const Select = ({ label, name, options, onChange }: any) => (
  <div>
    <label className="label">{label}</label>
    <select
      name={name}
      onChange={onChange}
      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-black/10"
    >
      <option value="">Select</option>
      {options.map((op: string) => (
        <option key={op}>{op}</option>
      ))}
    </select>
  </div>
);

/* Tailwind helper */
// add in global css if needed
// .label { @apply text-sm font-medium text-gray-700; }
