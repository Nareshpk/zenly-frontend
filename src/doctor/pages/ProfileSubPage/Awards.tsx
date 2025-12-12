import React, { useState } from "react";
import { Plus, ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { saveAward } from "../../../redux/actions/doctorProfileAction";

type AwardItem = {
  id: string;
  name?: string;
  year?: string; // ISO date
  description?: string;
  collapsed?: boolean;
};

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export default function Awards() {
  const dispatch = useDispatch();
  const [items, setItems] = useState<AwardItem[]>([
    { id: uid(), name: "", year: "", description: "", collapsed: false },
  ]);

  function addNew() {
    setItems((s) => [...s, { id: uid(), name: "", year: "", description: "", collapsed: false }]);
  }

  function updateItem(id: string, patch: Partial<AwardItem>) {
    setItems((s) => s.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }

  function removeItem(id: string) {
    setItems((s) => s.filter((it) => it.id !== id));
  }

  function resetItem(id: string) {
    updateItem(id, { name: "", year: "", description: "" });
  }

  function toggleCollapse(id: string) {
    updateItem(id, { collapsed: !items.find((i) => i.id === id)?.collapsed });
  }

  function saveAll() {
    const doctorId = "693c3f419eeff6d09ce1cfa4"
    dispatch(saveAward(doctorId, items) as any).then((res: any) => {
      if (res.type === "AWARD_ADD_SUCCESS") {
        toast.success("Awards saved successfully!");
      }
    }).catch((err: any) => {
      console.error("Error saving awards:", err);
    });

  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-slate-800">Awards</h2>
        <button onClick={addNew} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 text-white shadow">
          <Plus size={16} /> Add New Award
        </button>
      </div>

      <div className="space-y-4">
        {items.map((it) => (
          <div key={it.id} className="bg-white rounded-md border border-gray-100 shadow-sm">
            <div className="px-4 py-3 flex items-center justify-between cursor-pointer" onClick={() => toggleCollapse(it.id)}>
              <div className="text-sm font-medium text-slate-700">{it.name || "Awards"}</div>

              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(it.id);
                  }}
                  className="text-sm text-red-500"
                >
                  Delete
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCollapse(it.id);
                  }}
                  className="flex items-center gap-1 text-sm text-slate-600"
                >
                  {it.collapsed ? (
                    <>
                      <span>Open</span>
                      <ChevronDown size={16} />
                    </>
                  ) : (
                    <>
                      <span>Close</span>
                      <ChevronUp size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>

            {!it.collapsed && (
              <div className="px-6 pb-6 pt-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1">Award Name</label>
                    <input value={it.name} onChange={(e) => updateItem(it.id, { name: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1">Year *</label>
                    <div className="relative">
                      <input type="date" value={it.year} onChange={(e) => updateItem(it.id, { year: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm" />
                      <Calendar className="absolute right-3 top-3 text-gray-400" />
                    </div>
                  </div>

                  <div />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1">Description *</label>
                  <textarea value={it.description} onChange={(e) => updateItem(it.id, { description: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm h-28" />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <button onClick={(e) => { e.stopPropagation(); resetItem(it.id); }} className="text-sm text-red-500">Reset</button>
                  <div />
                </div>
              </div>
            )}
          </div>
        ))}

        {/* example saved summary */}
        <div className="bg-white rounded-md border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm">Best Surgeon</div>
            <div className="text-sm text-red-500">Delete</div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 mt-4">
          <button onClick={() => window.location.reload()} className="px-4 py-2 rounded-full border text-sm">Cancel</button>
          <button onClick={saveAll} className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 text-white text-sm">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
