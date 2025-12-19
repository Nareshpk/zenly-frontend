import { ArrowLeft, Pencil, Download } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DeathRecordDetailsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"details" | "audit">("details");

  const record = {
    id: "DR-2023-001",
    verifiedBy: "Dr. Emily Carter",
    verifiedAt: "5/11/2023, 10:30 AM",
    status: "Verified",

    personal: {
      name: "Robert Anderson",
      gender: "Male",
      dob: "2/15/1945",
      age: "78 years",
      placeOfBirth: "Chicago, Illinois",
      nationality: "American",
      address: "123 Oak Street, Springfield, IL 62701",
      maritalStatus: "Married",
      occupation: "Retired Engineer",
    },

    death: {
      date: "5/10/2023",
      time: "08:45",
      place: "City General Hospital",
      cause: "Natural causes",
      manner: "Natural",
    },

    medical: {
      physician: "Dr. James Wilson",
      examiner: "Dr. Emily Carter",
      autopsy: "No",
    },

    additional: {
      informant: "Sarah Anderson",
      relationship: "Spouse",
      contact: "(555) 123-4567",
      notes:
        "Patient had a history of heart disease and was under hospice care for the last month.",
    },
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <button onClick={() => navigate(-1)} className="p-2 border rounded-lg">
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-2xl font-bold">Death Record: {record.id}</h1>
          </div>
          <p className="text-sm text-gray-500">View and manage death record details</p>

          <div className="flex items-center gap-3 mt-3">
            <span className="px-3 py-1 rounded-full text-xs bg-emerald-50 text-emerald-600 font-semibold">
              {record.status}
            </span>
            <span className="text-xs text-gray-500">
              Verified by {record.verifiedBy} on {record.verifiedAt}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="btn-outline flex items-center gap-2">
            <Pencil size={16} /> Edit Record
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Download size={16} /> Download Certificate
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-100 p-1 rounded-xl flex border">
        <button
          onClick={() => setActiveTab("details")}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg ${
            activeTab === "details" ? "bg-white shadow" : "text-gray-500"
          }`}
        >
          Record Details
        </button>
        <button
          onClick={() => setActiveTab("audit")}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg ${
            activeTab === "audit" ? "bg-white shadow" : "text-gray-500"
          }`}
        >
          Audit History
        </button>
      </div>

      {activeTab === "details" && (
        <>
          <Section title="Personal Information">
            <Grid2>
              <Info label="Full Name" value={record.personal.name} />
              <Info label="Gender" value={record.personal.gender} />
              <Info label="Date of Birth" value={record.personal.dob} />
              <Info label="Age at Death" value={record.personal.age} />
              <Info label="Place of Birth" value={record.personal.placeOfBirth} />
              <Info label="Nationality" value={record.personal.nationality} />
              <Info label="Marital Status" value={record.personal.maritalStatus} />
              <Info label="Occupation" value={record.personal.occupation} />
            </Grid2>
            <Info label="Last Known Address" value={record.personal.address} full />
          </Section>

          <Section title="Death Information">
            <Grid2>
              <Info label="Date of Death" value={record.death.date} />
              <Info label="Time of Death" value={record.death.time} />
              <Info label="Place of Death" value={record.death.place} />
              <Info label="Manner of Death" value={record.death.manner} />
            </Grid2>
            <Info label="Immediate Cause of Death" value={record.death.cause} full />
          </Section>

          <Section title="Medical Information">
            <Grid2>
              <Info label="Attending Physician" value={record.medical.physician} />
              <Info label="Medical Examiner / Coroner" value={record.medical.examiner} />
              <Info label="Autopsy Performed" value={record.medical.autopsy} />
            </Grid2>
          </Section>

          <Section title="Additional Information">
            <Grid2>
              <Info label="Informant Name" value={record.additional.informant} />
              <Info label="Relationship to Deceased" value={record.additional.relationship} />
              <Info label="Informant Contact" value={record.additional.contact} />
            </Grid2>
            <Info label="Additional Notes" value={record.additional.notes} full />
          </Section>
        </>
      )}

      {activeTab === "audit" && (
        <Section title="Audit History">
          <p className="text-sm text-gray-500 mb-6">
            Track all changes made to this death record
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-t">
              <thead className="bg-gray-50">
                <tr className="text-xs uppercase tracking-wide text-gray-400">
                  <th className="px-4 py-3 font-semibold">Action</th>
                  <th className="px-4 py-3 font-semibold">User</th>
                  <th className="px-4 py-3 font-semibold">Timestamp</th>
                  <th className="px-4 py-3 font-semibold">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-3 font-medium">Record Created</td>
                  <td className="px-4 py-3">Dr. James Wilson</td>
                  <td className="px-4 py-3 text-sm text-gray-500">5/10/2023, 4:45 PM</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Initial death record created</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Record Updated</td>
                  <td className="px-4 py-3">Dr. James Wilson</td>
                  <td className="px-4 py-3 text-sm text-gray-500">5/10/2023, 5:20 PM</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Updated cause of death details</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Record Verified</td>
                  <td className="px-4 py-3">Dr. Emily Carter</td>
                  <td className="px-4 py-3 text-sm text-gray-500">5/11/2023, 10:30 AM</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Death record verified and finalized</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>
      )}
    </div>
  );
}

/* ---------------- Components ---------------- */

const Section = ({ title, children }: any) => (
  <div className="bg-white border rounded-xl p-6 space-y-4">
    <h2 className="text-lg font-semibold">{title}</h2>
    {children}
  </div>
);

const Grid2 = ({ children }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
);

const Info = ({ label, value, full = false }: any) => (
  <div className={full ? "md:col-span-2" : ""}>
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <p className="text-sm font-medium">{value}</p>
  </div>
);

const AuditItem = ({ title, by, date }: any) => (
  <div className="flex justify-between py-3 border-b last:border-none">
    <div>
      <p className="font-medium text-sm">{title}</p>
      <p className="text-xs text-gray-500">By {by}</p>
    </div>
    <p className="text-xs text-gray-500">{date}</p>
  </div>
);

/* Tailwind helpers (global)
.btn-primary { @apply bg-black text-white px-4 py-2.5 rounded-xl text-sm hover:bg-gray-900; }
.btn-outline { @apply border border-gray-200 px-4 py-2.5 rounded-xl text-sm bg-white hover:bg-gray-50; }
*/
