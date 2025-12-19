import { useState } from "react";
import { Activity, Calendar, ClipboardList, Pill } from "lucide-react";

export default function RoomDetailsTabs() {
  const [tab, setTab] = useState<
    "medical" | "vitals" | "visits" | "medications"
  >("medical");

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">
        <TabButton active={tab === "medical"} onClick={() => setTab("medical")}>
          Medical Information
        </TabButton>
        <TabButton active={tab === "vitals"} onClick={() => setTab("vitals")}>
          Vitals History
        </TabButton>
        <TabButton active={tab === "visits"} onClick={() => setTab("visits")}>
          Visit History
        </TabButton>
        <TabButton active={tab === "medications"} onClick={() => setTab("medications")}>
          Medications
        </TabButton>
      </div>

      {tab === "medical" && <MedicalHistory />}
      {tab === "vitals" && <VitalsHistory />}
      {tab === "visits" && <VisitHistory />}
      {tab === "medications" && <Medications />}
    </div>
  );
}

/* ---------------- TAB CONTENTS ---------------- */

function MedicalHistory() {
  return (
    <Section icon={<Calendar size={18} />} title="Medical History" subtitle="Patient's previous medical conditions and procedures">
      <Table
        headers={["Date", "Description"]}
        rows={[
          ["2022-10-05", "Hypertension diagnosis"],
          ["2021-06-12", "Appendectomy"],
          ["2020-03-20", "Influenza"],
        ]}
      />
    </Section>
  );
}

function VitalsHistory() {
  return (
    <Section icon={<Activity size={18} />} title="Vitals History" subtitle="Record of patient's vital signs during stay">
      <Table
        headers={["Date & Time", "Blood Pressure", "Pulse", "Temperature", "Resp. Rate", "O₂ Saturation"]}
        rows={[
          ["2023-04-15 11:00 AM", "140/90 mmHg", "88 bpm", "98.6°F", "18/min", "96%"],
          ["2023-04-15 03:00 PM", "135/85 mmHg", "82 bpm", "98.4°F", "16/min", "97%"],
          ["2023-04-16 07:00 AM", "130/80 mmHg", "76 bpm", "98.2°F", "16/min", "98%"],
        ]}
      />
    </Section>
  );
}

function VisitHistory() {
  return (
    <Section icon={<ClipboardList size={18} />} title="Visit History" subtitle="Record of healthcare staff visits during stay">
      <Table
        headers={["Date & Time", "Staff", "Purpose", "Notes"]}
        rows={[
          ["2023-04-15 12:30 PM", "Dr. Emily Chen", "Initial assessment", "Prescribed medication and ordered tests"],
          ["2023-04-15 04:15 PM", "Nurse Robert Johnson", "Medication administration", "Administered prescribed medications"],
          ["2023-04-16 09:00 AM", "Dr. Emily Chen", "Follow-up", "Reviewed test results, patient improving"],
        ]}
      />
    </Section>
  );
}

function Medications() {
  return (
    <Section icon={<Pill size={18} />} title="Current Medications" subtitle="Medications prescribed during current stay">
      <Table
        headers={["Medication", "Dosage", "Frequency"]}
        rows={[
          ["Aspirin", "81mg", "Once daily"],
          ["Atorvastatin", "40mg", "Once daily at bedtime"],
          ["Metoprolol", "25mg", "Twice daily"],
        ]}
      />
    </Section>
  );
}

/* ---------------- REUSABLE UI ---------------- */

function TabButton({ active, children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm rounded-lg font-medium transition ${
        active ? "bg-white shadow text-black" : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}

function Section({ icon, title, subtitle, children }: any) {
  return (
    <div className="bg-white border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <p className="text-sm text-gray-500 mb-6">{subtitle}</p>
      {children}
    </div>
  );
}

function Table({ headers, rows }: any) {
  return (
    <table className="w-full text-sm">
      <thead className="border-b">
        <tr>
          {headers.map((h: string) => (
            <th key={h} className="text-left font-medium text-gray-500 py-3">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y">
        {rows.map((row: any[], i: number) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j} className="py-4">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

