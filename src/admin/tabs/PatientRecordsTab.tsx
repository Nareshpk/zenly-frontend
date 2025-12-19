import { FileText, Download } from "lucide-react";

/* ---------------- DATA ---------------- */

const testResults = [
  {
    title: "Blood Work Results",
    subtitle: "Complete Blood Count (CBC)",
    date: "May 5, 2023",
    doctor: "Dr. Johnson",
    isNew: true,
  },
  {
    title: "Lipid Panel",
    subtitle: "Cholesterol and Triglycerides",
    date: "May 5, 2023",
    doctor: "Dr. Johnson",
    isNew: true,
  },
];

const allergies = [
  { name: "Penicillin", level: "Severe – Anaphylaxis", color: "bg-red-100 text-red-600" },
  { name: "Peanuts", level: "Moderate – Hives", color: "bg-orange-100 text-orange-600" },
];

const conditions = [
  { name: "Hypertension", year: "Diagnosed: 2020" },
  { name: "Type 2 Diabetes", year: "Diagnosed: 2021" },
];

const procedures = [
  { name: "Appendectomy", year: "2015" },
];

/* ---------------- COMPONENT ---------------- */

export default function PatientRecordsTab() {
  return (
    <div className="bg-white border rounded-xl p-6 space-y-8">
      {/* ================= HEADER ================= */}
      <div>
        <h2 className="text-lg font-semibold">Medical Records</h2>
        <p className="text-sm text-gray-500">
          Your health history and documents
        </p>
      </div>

      {/* ================= RECENT TEST RESULTS ================= */}
      <section>
        <h3 className="font-medium mb-3">Recent Test Results</h3>

        <div className="space-y-4">
          {testResults.map((r) => (
            <div
              key={r.title}
              className="border rounded-lg p-4 flex justify-between items-start"
            >
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <FileText className="text-purple-600" size={18} />
                </div>

                <div>
                  <div className="font-medium">{r.title}</div>
                  <div className="text-sm text-gray-500">{r.subtitle}</div>

                  <div className="text-xs text-gray-400 mt-2">
                    <div>Date:</div>
                    <div>Ordered by:</div>
                  </div>
                </div>
              </div>

              <div className="text-right text-sm">
                {r.isNew && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-black text-white mb-2 inline-block">
                    New
                  </span>
                )}
                <div>{r.date}</div>
                <div className="text-xs text-gray-500">{r.doctor}</div>

                <div className="flex gap-2 mt-3 justify-end">
                  <button className="px-3 py-1.5 text-sm border rounded-md flex items-center gap-1">
                    <Download size={14} />
                    Download PDF
                  </button>
                  <button className="px-3 py-1.5 text-sm bg-black text-white rounded-md">
                    View Results
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= MEDICAL HISTORY ================= */}
      <section>
        <h3 className="font-medium mb-3">Medical History</h3>

        {/* Allergies */}
        <div className="border rounded-lg p-4 mb-4">
          <h4 className="font-medium mb-2">Allergies</h4>
          <div className="space-y-2">
            {allergies.map((a) => (
              <div key={a.name} className="flex items-center gap-2">
                <span className={`px-2 py-0.5 text-xs rounded-full ${a.color}`}>
                  {a.name}
                </span>
                <span className="text-sm text-gray-600">{a.level}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conditions */}
        <div className="border rounded-lg p-4 mb-4">
          <h4 className="font-medium mb-2">Conditions</h4>
          <div className="space-y-1 text-sm">
            {conditions.map((c) => (
              <div key={c.name} className="flex justify-between">
                <span>{c.name}</span>
                <span className="text-gray-400">{c.year}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Procedures */}
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Procedures</h4>
          <div className="flex justify-between text-sm">
            <span>{procedures[0].name}</span>
            <span className="text-gray-400">{procedures[0].year}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
