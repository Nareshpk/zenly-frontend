import { useState } from "react";
import { useNavigate } from "react-router-dom";

const tabs = ["Personal Info", "Death Details", "Medical Info", "Additional Info"] as const;
type Tab = typeof tabs[number];

export default function AddDeathRecordPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("Personal Info");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Add Death Record</h1>
          <p className="text-sm text-gray-500">Create a new death record in the system</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-outline" onClick={() => navigate(-1)}>Cancel</button>
          <button className="btn-primary">Save Record</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-100 p-1 rounded-xl flex border">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg ${activeTab === tab ? "bg-white shadow" : "text-gray-500"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Personal Info" && <PersonalInfo onNext={() => setActiveTab("Death Details")} />}
      {activeTab === "Death Details" && (
        <DeathDetails
          onNext={() => setActiveTab("Medical Info")}
          onPrev={() => setActiveTab("Personal Info")}
        />
      )}
      {activeTab === "Medical Info" && (
        <MedicalInfo
          onNext={() => setActiveTab("Additional Info")}
          onPrev={() => setActiveTab("Death Details")}
        />
      )}
      {activeTab === "Additional Info" && (
        <AdditionalInfo onPrev={() => setActiveTab("Medical Info")} />
      )}
    </div>
  );
}

/* ---------------- Sections ---------------- */

const Card = ({ title, subtitle, children }: any) => (
  <div className="bg-white border rounded-xl p-6 space-y-6">
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
    {children}
  </div>
);

const Grid2 = ({ children }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
);

const Input = ({ label, ...props }: any) => (
  <div>
    <label className="label">{label}</label>
    <input {...props} className="input" />
  </div>
);

const Select = ({ label, children, ...props }: any) => (
  <div>
    <label className="label">{label}</label>
    <select {...props} className="input">{children}</select>
  </div>
);

/* -------- Personal Info -------- */

const PersonalInfo = ({ onNext }: any) => (
  <Card title="Personal Information" subtitle="Enter the deceased person's personal details">
    <Grid2>
      <Input label="Full Name" placeholder="John Doe" />
      <Select label="Gender"><option>Male</option><option>Female</option></Select>
      <Input label="Date of Birth" type="date" />
      <Input label="Age at Death" />
      <Input label="Place of Birth" placeholder="City, Country" />
      <Input label="Nationality" placeholder="e.g. American" />
    </Grid2>
    <div>
      <label className="label">Last Known Address</label>
      <textarea className="input min-h-[100px]" placeholder="Enter full address" />
    </div>
    <Grid2>
      <Select label="Marital Status"><option>Single</option><option>Married</option></Select>
      <Input label="Occupation" placeholder="e.g. Engineer" />
    </Grid2>
    <div className="flex justify-end">
      <button className="btn-primary" onClick={onNext}>Next: Death Details</button>
    </div>
  </Card>
);

/* -------- Death Details -------- */

const DeathDetails = ({ onNext, onPrev }: any) => (
  <Card title="Death Information" subtitle="Enter details about the death">
    <Grid2>
      <Input label="Date of Death" type="date" />
      <Input label="Time of Death" placeholder="HH:MM" />
      <Input label="Place of Death" placeholder="e.g. City General Hospital" />
    </Grid2>
    <div>
      <label className="label">Immediate Cause of Death</label>
      <textarea className="input min-h-[100px]" placeholder="Describe the immediate cause of death" />
    </div>
    <div>
      <label className="label">Manner of Death</label>
      <div className="space-y-2 mt-2">
        {["Natural", "Accident", "Suicide", "Homicide", "Undetermined", "Pending Investigation"].map(v => (
          <label key={v} className="flex items-center gap-2 text-sm">
            <input type="radio" name="manner" /> {v}
          </label>
        ))}
      </div>
    </div>
    <div className="flex justify-between">
      <button className="btn-outline" onClick={onPrev}>Previous: Personal Info</button>
      <button className="btn-primary" onClick={onNext}>Next: Medical Info</button>
    </div>
  </Card>
);

/* -------- Medical Info -------- */

const MedicalInfo = ({ onNext, onPrev }: any) => (
  <Card title="Medical Information" subtitle="Enter medical details related to the death">
    <Grid2>
      <Input label="Attending Physician" placeholder="Dr. Jane Smith" />
      <Input label="Medical Examiner / Coroner" placeholder="Dr. John Doe" />
    </Grid2>
    <Select label="Autopsy Performed">
      <option>No</option>
      <option>Yes</option>
    </Select>
    <div>
      <label className="label">Autopsy Findings</label>
      <textarea className="input min-h-[100px]" placeholder="Enter autopsy findings if applicable" />
    </div>
    <div className="flex justify-between">
      <button className="btn-outline" onClick={onPrev}>Previous: Death Details</button>
      <button className="btn-primary" onClick={onNext}>Next: Additional Info</button>
    </div>
  </Card>
);

/* -------- Additional Info -------- */

const AdditionalInfo = ({ onPrev }: any) => (
  <Card title="Additional Information" subtitle="Enter informant details and additional notes">
    <Grid2>
      <Input label="Informant Name" placeholder="Full name of informant" />
      <Input label="Relationship to Deceased" placeholder="e.g. Spouse, Child" />
    </Grid2>
    <Input label="Informant Contact" placeholder="Phone or email" />
    <div>
      <label className="label">Additional Notes</label>
      <textarea className="input min-h-[120px]" placeholder="Any additional information" />
    </div>
    <div className="flex justify-between">
      <button className="btn-outline" onClick={onPrev}>Previous: Medical Info</button>
      <button className="btn-primary">Submit Death Record</button>
    </div>
  </Card>
);

/* Tailwind helpers (global)
.label { @apply text-sm font-medium text-gray-700; }
.input { @apply w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-black/10 outline-none; }
.btn-primary { @apply bg-black text-white px-4 py-2.5 rounded-xl text-sm hover:bg-gray-900; }
.btn-outline { @apply border border-gray-200 px-4 py-2.5 rounded-xl text-sm bg-white hover:bg-gray-50; }
*/
