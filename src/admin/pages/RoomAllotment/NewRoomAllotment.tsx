import { ArrowLeft, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NewRoomAllotment() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg border hover:bg-gray-50"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-xl font-semibold">New Room Allotment</h1>
      </div>

      {/* Card */}
      <div className="bg-white border rounded-xl p-6 space-y-8">
        <div>
          <h2 className="font-semibold">Room Allotment Details</h2>
          <p className="text-sm text-gray-500">
            Assign a room to a patient. Fill in all the required information below.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left */}
          <div className="space-y-6">
            <Section title="Patient Information" />

            <Input label="Patient ID" placeholder="Enter patient ID" helper="Enter the unique ID of the patient" />
            <Input label="Patient Name" placeholder="Enter patient name" />
            <Select label="Attending Doctor" placeholder="Select doctor" />
            <Input label="Emergency Contact" placeholder="Enter emergency contact" />

            <Section title="Allotment Details" />

            <DateInput label="Allotment Date" />
            <DateInput label="Expected Discharge Date" />
            <Textarea label="Purpose of Admission" placeholder="Enter purpose of admission" />
          </div>

          {/* Right */}
          <div className="space-y-6">
            <Section title="Room Information" />

            <Select label="Room Number" placeholder="Select room number" />
            <Select label="Room Type" placeholder="Select room type" />
            <Select label="Department" placeholder="Select department" />
            <Textarea label="Special Requirements" placeholder="Enter any special requirements" />

            <Section title="Billing Information" />

            <Select label="Payment Method" placeholder="Select payment method" />
            <Textarea label="Insurance Details (if applicable)" placeholder="Enter insurance details" />
            <Textarea label="Additional Notes" placeholder="Enter any additional notes" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button className="px-4 py-2 border rounded-lg">Cancel</button>
          <button className="px-4 py-2 bg-black text-white rounded-lg">
            Create Allotment
          </button>
        </div>
      </div>
    </div>
  );
}

/* Reusable */
const Section = ({ title }: { title: string }) => (
  <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">{title}</h3>
);

const Input = ({ label, placeholder, helper }: any) => (
  <div className="space-y-1">
    <label className="text-sm font-medium">{label}</label>
    <input
      placeholder={placeholder}
      className="w-full border rounded-lg px-3 py-2 text-sm"
    />
    {helper && <p className="text-xs text-gray-400">{helper}</p>}
  </div>
);

const Select = ({ label, placeholder }: any) => (
  <div className="space-y-1">
    <label className="text-sm font-medium">{label}</label>
    <select className="w-full border rounded-lg px-3 py-2 text-sm">
      <option>{placeholder}</option>
    </select>
  </div>
);

const DateInput = ({ label }: any) => (
  <div className="space-y-1">
    <label className="text-sm font-medium">{label}</label>
    <div className="relative">
      <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="date"
        className="w-full border rounded-lg pl-10 pr-3 py-2 text-sm"
      />
    </div>
  </div>
);

const Textarea = ({ label, placeholder }: any) => (
  <div className="space-y-1">
    <label className="text-sm font-medium">{label}</label>
    <textarea
      rows={3}
      placeholder={placeholder}
      className="w-full border rounded-lg px-3 py-2 text-sm"
    />
  </div>
);