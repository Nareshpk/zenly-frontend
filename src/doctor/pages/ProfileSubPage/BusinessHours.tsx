import React, { useState } from "react";
import { Clock, ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch } from "react-redux";
import { saveBusinessHours } from "../../../redux/actions/doctorProfileAction";
import toast from "react-hot-toast";

type DayKey = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

type DayHours = {
  day: DayKey;
  enabled: boolean; // whether business on this day
  open?: string; // HH:MM
  close?: string; // HH:MM
  collapsed?: boolean;
};

const DAYS: DayKey[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function BusinessHours() {
  const dispatch = useDispatch();
  const [days, setDays] = useState<DayHours[]>(() =>
    DAYS.map((d, i) => ({ day: d, enabled: i < 5, open: "", close: "", collapsed: true }))
  );

  function toggleDayEnabled(day: DayKey) {
    setDays((s) => s.map((it) => (it.day === day ? { ...it, enabled: !it.enabled } : it)));
  }

  function toggleCollapse(day: DayKey) {
    setDays((s) => s.map((it) => (it.day === day ? { ...it, collapsed: !it.collapsed } : it)));
  }

  function updateTime(day: DayKey, field: "open" | "close", value: string) {
    setDays((s) => s.map((it) => (it.day === day ? { ...it, [field]: value } : it)));
  }

  function selectBusinessDays(daysToEnable: DayKey[]) {
    setDays((s) => s.map((it) => ({ ...it, enabled: daysToEnable.includes(it.day) })));
  }

  function resetDay(day: DayKey) {
    setDays((s) => s.map((it) => (it.day === day ? { ...it, open: "", close: "", enabled: false } : it)));
  }

  function saveAll() {
    const doctorId = "693c3f419eeff6d09ce1cfa4"; // replace with real id from auth/context
    const payload = days.map((d) => ({
      day: d.day,
      enabled: d.enabled,
      open: d.open || null,
      close: d.close || null,
      collapsed: !!d.collapsed,
    }));
    // dispatch action (shows success/fail via alerts here — adapt to UI toasts)
    dispatch(saveBusinessHours(doctorId, payload) as any).then((res: any) => {
      if (res.type === "BUSINESS_HOURS_SAVE_SUCCESS") {
        toast.success("created successfully!")
      }
    }).catch((error: any) => {
      console.log(error);

    })
    // dispatch(saveBusinessHours(doctorId, payload)) as any)
    //   .then((res: any) => {
    //     alert("Business hours saved");
    //   })
    //   .catch((err: any) => {
    //     alert("Failed to save business hours: " + (err?.message || "Unknown error"));
    //   });
  }
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">Business Hours</h2>

      <div className="bg-white rounded-md border border-gray-100 p-4 mb-6">
        <div className="text-sm font-medium mb-3">Select Business days</div>
        <div className="flex flex-wrap gap-3">
          {DAYS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => toggleDayEnabled(d)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${days.find(x => x.day === d)?.enabled ? "bg-blue-500 text-white" : "bg-white border border-gray-200 text-slate-700"}`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {days.map((d) => (
          <div key={d.day} className="bg-white rounded-md border border-gray-100 shadow-sm">
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-sm font-medium text-slate-700">{d.day}</div>
                <div className="text-xs text-gray-500">{d.enabled ? "Open" : "Closed"}</div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleCollapse(d.day)}
                  className="text-sm text-slate-600 flex items-center gap-2"
                  aria-expanded={!d.collapsed}
                >
                  <span className="text-xs mr-2">Edit</span>
                  {d.collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </button>
              </div>
            </div>

            {!d.collapsed && (
              <div className="px-6 pb-6 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div>
                    <label className="block text-xs font-medium mb-1">From *</label>
                    <div className="relative">
                      <input
                        type="time"
                        value={d.open}
                        onChange={(e) => updateTime(d.day, "open", e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
                        disabled={!d.enabled}
                      />
                      <Clock className="absolute right-3 top-3 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1">To *</label>
                    <div className="relative">
                      <input
                        type="time"
                        value={d.close}
                        onChange={(e) => updateTime(d.day, "close", e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
                        disabled={!d.enabled}
                      />
                      <Clock className="absolute right-3 top-3 text-gray-400" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input id={`enable_${d.day}`} type="checkbox" checked={d.enabled} onChange={() => toggleDayEnabled(d.day)} className="h-4 w-4" />
                    <label htmlFor={`enable_${d.day}`} className="text-sm">Open this day</label>
                  </div>
                </div>

                <div className="mt-4 border-t pt-3 flex items-center justify-between">
                  <button onClick={() => resetDay(d.day)} className="text-sm text-red-500">Reset</button>
                  <div />
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="flex items-center justify-end gap-4 mt-4">
          <button onClick={() => window.location.reload()} className="px-4 py-2 rounded-full border text-sm">Cancel</button>
          <button onClick={saveAll} className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 text-white text-sm">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
