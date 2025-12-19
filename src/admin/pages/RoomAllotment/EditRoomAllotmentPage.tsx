import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";

export default function EditRoomAllotmentPage() {
  const [tab, setTab] = useState<
    "patient" | "room" | "allotment" | "billing"
  >("patient");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="p-2 border rounded-lg hover:bg-gray-50">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-xl font-semibold">Edit Room Allotment</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm">
          <Save size={16} /> Save Changes
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">
        <Tab label="Patient Information" value="patient" tab={tab} setTab={setTab} />
        <Tab label="Room Details" value="room" tab={tab} setTab={setTab} />
        <Tab label="Allotment Details" value="allotment" tab={tab} setTab={setTab} />
        <Tab label="Billing" value="billing" tab={tab} setTab={setTab} />
      </div>

      {/* Content */}
      {tab === "patient" && <PatientInfo />}
      {tab === "room" && <RoomDetails />}
      {tab === "allotment" && <AllotmentDetails />}
      {tab === "billing" && <BillingDetails />}
    </div>
  );
}

/* ---------------- Tabs ---------------- */

const Tab = ({ label, value, tab, setTab }: any) => (
  <button
    onClick={() => setTab(value)}
    className={`px-4 py-2 text-sm rounded-lg transition ${tab === value
      ? "bg-white shadow font-medium"
      : "text-gray-500 hover:text-gray-700"}`}
  >
    {label}
  </button>
);

/* ---------------- Sections ---------------- */

const Section = ({ title, subtitle, children }: any) => (
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
  <div className="space-y-1">
    <label className="text-sm font-medium">{label}</label>
    <input {...props} className="w-full px-3 py-2.5 border rounded-xl text-sm" />
  </div>
);

const Select = ({ label, children }: any) => (
  <div className="space-y-1">
    <label className="text-sm font-medium">{label}</label>
    <select className="w-full px-3 py-2.5 border rounded-xl text-sm bg-white">{children}</select>
  </div>
);

const Textarea = ({ label, ...props }: any) => (
  <div className="space-y-1">
    <label className="text-sm font-medium">{label}</label>
    <textarea {...props} className="w-full px-3 py-2.5 border rounded-xl text-sm" />
  </div>
);

/* ---------------- Tab Pages ---------------- */

const PatientInfo = () => (
  <Section title="Patient Information" subtitle="Edit the patient's personal information">
    <Grid2>
      <Input label="Patient Name" defaultValue="John Smith" />
      <Input label="Patient ID" defaultValue="P-1001" />
      <Input label="Age" defaultValue="45" />
      <Select label="Gender">
        <option>Male</option>
        <option>Female</option>
      </Select>
      <Input label="Contact Number" defaultValue="+1 (555) 123-4567" />
      <Input label="Email" defaultValue="john.smith@example.com" />
    </Grid2>
    <Textarea label="Address" defaultValue="123 Main St, Anytown, CA 12345" rows={3} />
  </Section>
);

const RoomDetails = () => (
  <Section title="Room Details" subtitle="Edit the room assignment details">
    <Grid2>
      <Input label="Room Number" defaultValue="301" />
      <Select label="Room Type"><option>Private</option></Select>
      <Select label="Department"><option>Cardiology</option></Select>
      <Input label="Room Rate ($/day)" defaultValue="350" />
    </Grid2>
  </Section>
);

const AllotmentDetails = () => (
  <Section title="Allotment Details" subtitle="Edit the allotment timing and medical details">
    <Grid2>
      <Input label="Allotment Date" defaultValue="April 15th, 2023" />
      <Input label="Allotment Time" defaultValue="10:30" />
      <Input label="Expected Discharge Date" defaultValue="April 20th, 2023" />
      <Input label="Attending Doctor" defaultValue="Dr. Emily Chen" />
    </Grid2>
    <Input label="Doctor ID" defaultValue="D-2001" />
    <Textarea label="Admission Reason" defaultValue="Chest pain and shortness of breath" rows={2} />
    <Textarea label="Diagnosis" defaultValue="Acute Myocardial Infarction" rows={2} />
    <Textarea label="Notes" defaultValue="Patient requires regular monitoring of vital signs every 4 hours." rows={3} />
  </Section>
);

const BillingDetails = () => (
  <Section title="Billing Information" subtitle="Edit the billing and insurance details">
    <Grid2>
      <Select label="Billing Status"><option>Insurance Verified</option></Select>
      <Input label="Insurance Provider" defaultValue="Blue Cross Blue Shield" />
    </Grid2>
    <Input label="Policy Number" defaultValue="BCBS-12345678" />
    <div className="flex justify-between pt-4">
      <button className="px-4 py-2 border rounded-lg text-sm">Reset</button>
      <button className="px-4 py-2 bg-black text-white rounded-lg text-sm">Save Changes</button>
    </div>
  </Section>
);
