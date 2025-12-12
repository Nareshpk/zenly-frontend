import React, { useState } from "react";
import { Search, Clock, Users, CheckCircle, XCircle, Calendar } from "lucide-react";

type Request = {
  id: string;
  aptNo: string;
  name: string;
  avatar?: string;
  datetime: string;
  purpose: string;
  type: "Video Call" | "Audio Call" | "Direct Visit";
  tag?: "New" | null;
};

const SAMPLE: Request[] = [
  { id: "1", aptNo: "Apt0001", name: "Adrian", avatar: "https://i.pravatar.cc/64?img=5", datetime: "11 Nov 2025 10.45 AM", purpose: "Consultation for Dental", type: "Video Call", tag: "New" },
  { id: "2", aptNo: "Apt0002", name: "Kelly", avatar: "https://i.pravatar.cc/64?img=8", datetime: "10 Nov 2025 02.00 PM", purpose: "Consultation for Dental", type: "Direct Visit" },
  { id: "3", aptNo: "3", name: "Samuel", avatar: "https://i.pravatar.cc/64?img=10", datetime: "08 Nov 2025 08.30 AM", purpose: "Consultation for Dental", type: "Audio Call" },
  { id: "4", aptNo: "4", name: "Anderea", avatar: "https://i.pravatar.cc/64?img=7", datetime: "05 Nov 2025 11.00 AM", purpose: "Consultation for Dental", type: "Audio Call" },
];

export default function Requests() {
  const [items, setItems] = useState<Request[]>(SAMPLE);
  const [visible, setVisible] = useState(4);
  const [range, setRange] = useState("Last 7 Days");

  function accept(id: string) {
    // placeholder: mark accepted (could call API)
    alert("Accepted " + id);
    setItems((s) => s.filter((i) => i.id !== id));
  }

  function reject(id: string) {
    if (!window.confirm("Reject this request?")) return;
    setItems((s) => s.filter((i) => i.id !== id));
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="w-full px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-slate-800">Requests</h2>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input placeholder="Search" className="w-56 border rounded-md px-3 py-2 pr-10 text-sm" />
              <Search className="absolute right-3 top-3 text-gray-400" />
            </div>

            <div className="relative">
              <select value={range} onChange={(e) => setRange(e.target.value)} className="px-3 py-2 border rounded-md text-sm">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Custom Range</option>
              </select>
              <Calendar className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {items.slice(0, visible).map((r) => (
            <div key={r.id} className="bg-white rounded-lg border p-4 flex items-center gap-4">
              <img src={r.avatar} alt={r.name} className="w-14 h-14 rounded-lg object-cover" />

              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                <div>
                  <div className="text-xs text-sky-600">#{r.aptNo}</div>
                  <div className="font-medium text-slate-800">{r.name} {r.tag && <span className="ml-2 inline-block bg-purple-500 text-white text-xs px-2 py-0.5 rounded">{r.tag}</span>}</div>
                </div>

                <div className="text-sm text-slate-600">
                  <div className="inline-flex items-center gap-2"><Clock size={14} /> {r.datetime}</div>
                  <div className="mt-1">{r.purpose}</div>
                </div>

                <div className="text-sm text-slate-600 flex items-center justify-end gap-4">
                  <div className="text-sm">
                    <div className="mb-2 font-medium">Type of Appointment</div>
                    <div className="inline-flex items-center gap-2 text-sm">
                      {r.type === "Video Call" && <span className="inline-flex items-center gap-1 text-sm"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M23 7l-7 5 7 5V7zM1 5v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H3a2 2 0 00-2 2z" fill="#3B82F6"/></svg> Video Call</span>}
                      {r.type === "Audio Call" && <span className="inline-flex items-center gap-1 text-sm"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3v10l3-2V3h-3zM3 6v12h6v-6H6V6H3z" fill="#6D28D9"/></svg> Audio Call</span>}
                      {r.type === "Direct Visit" && <span className="inline-flex items-center gap-1 text-sm"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5" fill="#059669"/></svg> Direct Visit</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button onClick={() => accept(r.id)} className="inline-flex items-center gap-2 text-green-600 text-sm"><CheckCircle /> Accept</button>
                    <div className="text-slate-300">|</div>
                    <button onClick={() => reject(r.id)} className="inline-flex items-center gap-2 text-red-600 text-sm"><XCircle /> Reject</button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="text-center text-sm text-slate-500 py-8">No requests found</div>
          )}

          <div className="text-center mt-4">
            {visible < items.length ? (
              <button onClick={() => setVisible((v) => v + 4)} className="px-4 py-2 rounded-full border">Load More</button>
            ) : (
              <div className="text-sm text-slate-500">No more requests</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
