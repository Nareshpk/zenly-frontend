import React, { useState, useEffect } from "react";
import { ArrowLeft, Mail, Phone, Calendar, Clock, Globe, Tag, X } from "lucide-react";

type MedicationRow = {
  id: string;
  name: string;
  type?: string;
  dosage?: string;
  duration?: string;
  frequency?: string;
  instruction?: string;
};

function uid(prefix = "m_") {
  return prefix + Math.random().toString(36).slice(2, 9);
}

export default function AppointmentDetails() {
  // header / patient
  const [sessionRemaining, setSessionRemaining] = useState<number>(8 * 60 + 0); // seconds

  useEffect(() => {
    const t = setInterval(() => setSessionRemaining((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  // vitals
  const [vitals, setVitals] = useState({
    temperature: "",
    pulse: "",
    respRate: "",
    spo2: "",
    height: "",
    weight: "",
    waist: "",
    bsa: "",
    bmi: "",
  });

  // free text
  const [prevHistory, setPrevHistory] = useState("");
  const [clinicalNotes, setClinicalNotes] = useState<string[]>(["Skin Allergy"]);
  const [labTests, setLabTests] = useState<string[]>(["Hemoglobin A1c (HbA1c)", "Liver Function Tests (LFTs)"]);
  const [complaints, setComplaints] = useState<string[]>(["Fever", "Headache", "Stomach Pain"]);

  const [diagnosis, setDiagnosis] = useState<string[]>(["Fever", "Headache", "Stomach Pain"]);

  // medications
  const [meds, setMeds] = useState<MedicationRow[]>([
    { id: uid(), name: "", type: "Tablet", dosage: "", duration: "", frequency: "1-0-0", instruction: "" },
  ]);

  const [advice, setAdvice] = useState("");
  const [followUp, setFollowUp] = useState("");

  function addTag(setter: (fn: any) => void, value: string) {
    if (!value.trim()) return;
    setter((s: string[]) => [...s, value.trim()]);
  }

  function removeTag(setter: (fn: any) => void, idx: number) {
    setter((s: string[]) => s.filter((_, i) => i !== idx));
  }

  function addMed() {
    setMeds((s) => [...s, { id: uid(), name: "", type: "Tablet", dosage: "", duration: "", frequency: "1-0-0", instruction: "" }]);
  }

  function removeMed(id: string) {
    setMeds((s) => s.filter((m) => m.id !== id));
  }

  function updateMed(id: string, patch: Partial<MedicationRow>) {
    setMeds((s) => s.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  }

  function saveAndEnd() {
    const payload = { vitals, prevHistory, clinicalNotes, labTests, complaints, diagnosis, meds, advice, followUp };
    console.log("save appointment details", payload);
    alert("Saved (check console)");
  }

  const mm = Math.floor(sessionRemaining / 60).toString().padStart(2, "0");
  const ss = (sessionRemaining % 60).toString().padStart(2, "0");

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="w-full px-4">
        {/* Header */}
        <div className="mb-4 flex items-center gap-4">
          <a href="#" className="inline-flex items-center gap-2 text-slate-700">
            <ArrowLeft /> Appointment Details
          </a>
        </div>

        {/* Top card */}
        <div className="bg-white rounded-lg shadow p-6 mb-6 border">
          <div className="flex items-start gap-6">
            <img src="https://i.pravatar.cc/120?img=8" alt="patient" className="w-24 h-24 rounded-lg object-cover" />

            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-sky-600">#Apt0001</div>
                <div className="text-lg font-semibold">Kelly Joseph</div>
                <div className="mt-2 text-sm text-slate-600 flex flex-col gap-1">
                  <span className="inline-flex items-center gap-2"><Mail size={14} /> Kelly@Example.Com</span>
                  <span className="inline-flex items-center gap-2"><Phone size={14} /> +1 504 368 6874</span>
                </div>
              </div>

              <div>
                <div className="text-sm text-slate-600">Person with patient</div>
                <div className="font-medium">Andrew (45)</div>

                <div className="mt-3 text-sm text-slate-600">Type of Appointment</div>
                <div className="inline-flex items-center gap-2 mt-1 text-sm font-medium text-slate-800"><Tag size={16} /> Direct Visit</div>
              </div>

              <div className="text-right">
                <div className="inline-block px-3 py-1 rounded-full bg-amber-200 text-amber-900 text-sm font-semibold">Upcoming</div>
                <div className="mt-3 text-sm text-slate-600">Consultation Fees : <span className="font-medium">$200</span></div>

                <div className="mt-4 flex items-center justify-end gap-2">
                  <button className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center"><Clock size={16} /></button>
                  <button className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center"><X size={16} /></button>
                </div>

                <div className="mt-4">
                  <div className="inline-block px-4 py-2 rounded-full bg-purple-600 text-white text-sm">Inprogress</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-slate-600">
            <div>
              <div className="font-medium text-slate-700">Appointment Date & Time</div>
              <div className="mt-1">22 Jul 2023 - 12:00 pm</div>
            </div>
            <div>
              <div className="font-medium text-slate-700">Clinic Location</div>
              <div className="mt-1">Adrian's Dentistry</div>
            </div>
            <div>
              <div className="font-medium text-slate-700">Location</div>
              <div className="mt-1">Newyork, United States</div>
            </div>
            <div>
              <div className="font-medium text-slate-700">Visit Type</div>
              <div className="mt-1">General</div>
            </div>
          </div>
        </div>

        {/* Session timer + form */}
        <div className="mb-4 text-sm font-medium">Session Ends in {mm}:{ss}</div>

        <h3 className="text-lg font-semibold mb-3">Create Appointment Details</h3>

        <div className="bg-white rounded-lg shadow p-6 border">
          {/* Patient Information */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Patient Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-slate-700">
              <div>
                <div className="text-xs text-slate-500">Age / Gender</div>
                <div className="mt-1">28 Years / Female</div>
              </div>

              <div>
                <div className="text-xs text-slate-500">Address</div>
                <div className="mt-1">Newyork, United States</div>
              </div>

              <div>
                <div className="text-xs text-slate-500">Blood Group</div>
                <div className="mt-1">O+ve</div>
              </div>

              <div>
                <div className="text-xs text-slate-500">No of Visit</div>
                <div className="mt-1">0</div>
              </div>
            </div>
          </div>

          {/* Vitals */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Vitals</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { key: "temperature", label: "Temprature", unit: "F", placeholder: "Eg : 97.8" },
                { key: "pulse", label: "Pulse", unit: "mmHg", placeholder: "Eg : 72" },
                { key: "respRate", label: "Respiratory Rate", unit: "rpm", placeholder: "Eg : 18" },
                { key: "spo2", label: "SPO2", unit: "%", placeholder: "Eg : 98" },
                { key: "height", label: "Height", unit: "cm", placeholder: "Eg : 170" },
                { key: "weight", label: "Weight", unit: "Kg", placeholder: "Eg : 70" },
                { key: "waist", label: "Waist", unit: "cm", placeholder: "Eg : 80" },
                { key: "bsa", label: "BSA", unit: "M", placeholder: "Eg : 1.7" },
              ].map((f) => (
                <div key={f.key} className="bg-slate-50 rounded-md p-3 border">
                  <div className="text-xs text-slate-500 mb-2">{f.label}</div>
                  <div className="flex items-center gap-2">
                    <input value={(vitals as any)[f.key] ?? ""} onChange={(e) => setVitals({ ...vitals, [(f.key) as any]: e.target.value })} placeholder={f.placeholder} className="flex-1 px-3 py-2 border rounded-md text-sm bg-white" />
                    <div className="text-sm text-slate-600">{f.unit}</div>
                  </div>
                </div>
              ))}

              <div className="bg-slate-50 rounded-md p-3 border">
                <div className="text-xs text-slate-500 mb-2">BMI</div>
                <div className="flex items-center gap-2">
                  <input value={vitals.bmi} onChange={(e) => setVitals({ ...vitals, bmi: e.target.value })} placeholder="Eg : 22" className="flex-1 px-3 py-2 border rounded-md text-sm bg-white" />
                  <div className="text-sm text-slate-600">kg/cm</div>
                </div>
              </div>
            </div>
          </div>

          {/* Previous Medical History */}
          <div className="mb-6">
            <h4 className="font-medium mb-2">Previous Medical History</h4>
            <textarea value={prevHistory} onChange={(e) => setPrevHistory(e.target.value)} className="w-full px-3 py-3 border rounded-md text-sm" rows={4} />
          </div>

          {/* Clinical Notes / Tags */}
          <div className="mb-6">
            <h4 className="font-medium mb-2">Clinical Notes</h4>
            <div className="flex gap-2 items-center mb-2">
              {clinicalNotes.map((t, i) => (
                <div key={i} className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-sm">
                  {t} <button onClick={() => removeTag(setClinicalNotes, i)} className="text-slate-500"><X size={12} /></button>
                </div>
              ))}

              <input onKeyDown={(e) => { if (e.key === "Enter") { addTag(setClinicalNotes, (e.target as HTMLInputElement).value); (e.target as HTMLInputElement).value = ""; } }} placeholder="Add a tag and press Enter" className="px-3 py-1 border rounded-md text-sm" />
              <button className="ml-auto text-sky-600 text-sm">Save</button>
            </div>

            <h4 className="font-medium mb-2">Laboratory Tests</h4>
            <div className="flex gap-2 items-center mb-2">
              {labTests.map((t, i) => (
                <div key={i} className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-sm">
                  {t} <button onClick={() => removeTag(setLabTests, i)} className="text-slate-500"><X size={12} /></button>
                </div>
              ))}
              <input onKeyDown={(e) => { if (e.key === "Enter") { addTag(setLabTests, (e.target as HTMLInputElement).value); (e.target as HTMLInputElement).value = ""; } }} placeholder="Add a tag and press Enter" className="px-3 py-1 border rounded-md text-sm" />
              <button className="ml-auto text-sky-600 text-sm">Save</button>
            </div>

            <h4 className="font-medium mb-2">Complaints</h4>
            <div className="flex gap-2 items-center mb-2">
              {complaints.map((t, i) => (
                <div key={i} className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-sm">
                  {t} <button onClick={() => removeTag(setComplaints, i)} className="text-slate-500"><X size={12} /></button>
                </div>
              ))}
              <input onKeyDown={(e) => { if (e.key === "Enter") { addTag(setComplaints, (e.target as HTMLInputElement).value); (e.target as HTMLInputElement).value = ""; } }} placeholder="Add a tag and press Enter" className="px-3 py-1 border rounded-md text-sm" />
              <button className="ml-auto text-sky-600 text-sm">Save</button>
            </div>
          </div>

          {/* Diagnosis */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Diagnosis</h4>
            <div className="space-y-3">
              {diagnosis.map((d, i) => (
                <div key={i} className="border rounded-md p-3 text-sm">{d} <span className="text-slate-400 ml-4">Diagnosis</span></div>
              ))}
            </div>
          </div>

          {/* Medications */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Medications</h4>
            <div className="space-y-3">
              {meds.map((m) => (
                <div key={m.id} className="grid grid-cols-1 md:grid-cols-6 gap-3 items-center">
                  <input value={m.name} onChange={(e) => updateMed(m.id, { name: e.target.value })} placeholder="Name" className="px-3 py-2 border rounded-md text-sm" />
                  <select value={m.type} onChange={(e) => updateMed(m.id, { type: e.target.value })} className="px-3 py-2 border rounded-md text-sm">
                    <option>Tablet</option>
                    <option>Capsule</option>
                    <option>Syrup</option>
                  </select>
                  <input value={m.dosage} onChange={(e) => updateMed(m.id, { dosage: e.target.value })} placeholder="Dosage" className="px-3 py-2 border rounded-md text-sm" />
                  <input value={m.frequency} onChange={(e) => updateMed(m.id, { frequency: e.target.value })} placeholder="Frequency e.g. 1-0-0" className="px-3 py-2 border rounded-md text-sm" />
                  <select value={m.duration} onChange={(e) => updateMed(m.id, { duration: e.target.value })} className="px-3 py-2 border rounded-md text-sm">
                    <option>1 Week</option>
                    <option>2 Weeks</option>
                    <option>1 Month</option>
                  </select>
                  <div className="flex items-center gap-2">
                    <input value={m.instruction} onChange={(e) => updateMed(m.id, { instruction: e.target.value })} placeholder="Instruction" className="px-3 py-2 border rounded-md text-sm" />
                    <button onClick={() => removeMed(m.id)} className="text-red-500">Delete</button>
                  </div>
                </div>
              ))}

              <div className="pt-2 text-right">
                <button onClick={addMed} className="text-sky-600">Add New</button>
              </div>
            </div>
          </div>

          {/* Advice / Follow up */}
          <div className="mb-6">
            <h4 className="font-medium mb-2">Advice</h4>
            <textarea value={advice} onChange={(e) => setAdvice(e.target.value)} className="w-full px-3 py-3 border rounded-md text-sm" rows={3} />
          </div>

          <div className="mb-6">
            <h4 className="font-medium mb-2">Follow Up</h4>
            <textarea value={followUp} onChange={(e) => setFollowUp(e.target.value)} className="w-full px-3 py-3 border rounded-md text-sm" rows={3} />
          </div>

          <div className="flex items-center justify-end gap-4">
            <button onClick={() => window.history.back()} className="px-4 py-2 rounded-full border">Cancel</button>
            <button onClick={saveAndEnd} className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 text-white">Save & End Appointment</button>
          </div>
        </div>
      </div>
    </div>
  );
}
