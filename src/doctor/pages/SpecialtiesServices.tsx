import React, { useState } from "react";
import { Plus, ChevronDown, ChevronUp, Trash2 } from "lucide-react";

type ServiceRow = {
  id: string;
  service?: string;
  price?: string;
  about?: string;
};

type SpecialityItem = {
  id: string;
  name: string;
  collapsed?: boolean;
  specialityValue?: string;
  services: ServiceRow[];
};

function uid(prefix = "") {
  return prefix + Math.random().toString(36).slice(2, 9);
}

const ALL_SPECIALITIES = ["Cardiology", "Neurology", "Urology", "Dermatology", "Pediatrics"];
const ALL_SERVICES = ["Consultation", "Surgery", "Follow-up", "Diagnostic Test"];

export default function SpecialitiesServices() {
  const [items, setItems] = useState<SpecialityItem[]>([
    { id: uid("s_"), name: "Cardiology", collapsed: true, specialityValue: "Cardiology", services: [] },
    { id: uid("s_"), name: "Neurology", collapsed: false, specialityValue: "Neurology", services: [{ id: uid("r_"), service: "Consultation", price: "454", about: "" }] },
    { id: uid("s_"), name: "Urology", collapsed: true, specialityValue: "Urology", services: [] },
  ]);

  function toggle(idx: number) {
    setItems((s) => s.map((it, i) => (i === idx ? { ...it, collapsed: !it.collapsed } : it)));
  }

  function removeSpeciality(idx: number) {
    setItems((s) => s.filter((_, i) => i !== idx));
  }

  function addNewSpeciality() {
    const newName = "New Speciality"; // you can replace with modal input
    setItems((s) => [...s, { id: uid("s_"), name: newName, collapsed: false, specialityValue: ALL_SPECIALITIES[0], services: [] }]);
  }

  function addService(idx: number) {
    setItems((s) =>
      s.map((it, i) => (i === idx ? { ...it, services: [...it.services, { id: uid("r_"), service: "", price: "", about: "" }] } : it))
    );
  }

  function removeService(specIdx: number, rowId: string) {
    setItems((s) => s.map((it, i) => (i === specIdx ? { ...it, services: it.services.filter((r) => r.id !== rowId) } : it)));
  }

  function updateService(specIdx: number, rowId: string, patch: Partial<ServiceRow>) {
    setItems((s) =>
      s.map((it, i) =>
        i === specIdx ? { ...it, services: it.services.map((r) => (r.id === rowId ? { ...r, ...patch } : r)) } : it
      )
    );
  }

  function updateSpecialityValue(specIdx: number, value: string) {
    setItems((s) => s.map((it, i) => (i === specIdx ? { ...it, specialityValue: value, name: value } : it)));
  }

  function saveAll() {
    // replace with API call
    alert(JSON.stringify(items, null, 2));
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-slate-800">Speciality & Services</h2>
        <button onClick={addNewSpeciality} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 text-white">
          <Plus size={14} /> Add New Speciality
        </button>
      </div>

      <div className="space-y-4">
        {items.map((it, idx) => (
          <div key={it.id} className="bg-white rounded-md border border-gray-100 shadow-sm">
            <div className="px-4 py-3 flex items-center justify-between cursor-pointer" onClick={() => toggle(idx)}>
              <div className="text-sm font-medium text-slate-700">{it.name}</div>
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSpeciality(idx);
                  }}
                  className="text-sm text-red-500"
                >
                  Delete
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(idx);
                  }}
                  className="text-slate-600"
                >
                  {it.collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </button>
              </div>
            </div>

            {!it.collapsed && (
              <div className="px-6 pb-6 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1">Speciality *</label>
                    <select value={it.specialityValue} onChange={(e) => updateSpecialityValue(idx, e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm">
                      {ALL_SPECIALITIES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div />
                  <div />
                </div>

                <div className="mt-6 space-y-3">
                  {it.services.map((row) => (
                    <div key={row.id} className="flex flex-col md:flex-row items-start md:items-center gap-3">
                      <div className="w-full md:w-1/3">
                        <label className="block text-xs font-medium mb-1">Service *</label>
                        <select value={row.service} onChange={(e) => updateService(idx, row.id, { service: e.target.value })} className="w-full px-3 py-2 border rounded-md text-sm">
                          <option value="">Select Service</option>
                          {ALL_SERVICES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      <div className="w-full md:w-1/6">
                        <label className="block text-xs font-medium mb-1">Price ($) *</label>
                        <input value={row.price} onChange={(e) => updateService(idx, row.id, { price: e.target.value })} className="w-full px-3 py-2 border rounded-md text-sm" />
                      </div>

                      <div className="flex-1">
                        <label className="block text-xs font-medium mb-1">About Service</label>
                        <input value={row.about} onChange={(e) => updateService(idx, row.id, { about: e.target.value })} className="w-full px-3 py-2 border rounded-md text-sm" />
                      </div>

                      <div className="pt-6 md:pt-0">
                        <button onClick={() => removeService(idx, row.id)} className="text-sm text-red-500 inline-flex items-center gap-2"><Trash2 size={14} /> Delete</button>
                      </div>
                    </div>
                  ))}

                  <div className="pt-2 border-t" />

                  <div className="flex items-center justify-between">
                    <button onClick={() => addService(idx)} className="text-sm text-sky-600">Add New Service</button>
                    <div />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="flex items-center justify-end gap-4">
          <button onClick={() => window.location.reload()} className="px-4 py-2 rounded-full border text-sm">Cancel</button>
          <button onClick={saveAll} className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 text-white text-sm">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
