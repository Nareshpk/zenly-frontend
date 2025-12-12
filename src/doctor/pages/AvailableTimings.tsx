import React, { useState } from "react";
import { Calendar, Clock, Plus, X } from "lucide-react";

type DayKey = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export default function AvailableTimings() {
  const DAYS: DayKey[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const [activeDay, setActiveDay] = useState<DayKey>("Monday");
  const [slots, setSlots] = useState<Record<DayKey, string[]>>(() => {
    return {
      Monday: ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM"],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    } as Record<DayKey, string[]>;
  });

  const [fee, setFee] = useState<string>("254");
  const [showModal, setShowModal] = useState(false);

  // Modal fields
  const [modalStart, setModalStart] = useState<string>("");
  const [modalEnd, setModalEnd] = useState<string>("");
  const [modalInterval, setModalInterval] = useState<string>("10");
  const [modalDuration, setModalDuration] = useState<string>("30");
  const [modalSpace, setModalSpace] = useState<string>("Space 1");

  function addSlotManually() {
    const t = prompt("Enter time (e.g. 02:00 PM)");
    if (!t) return;
    setSlots((s) => ({ ...s, [activeDay]: [...s[activeDay as DayKey], t] }));
  }

  function deleteAllForDay(day: DayKey) {
    // if (!confirm(`Delete all slots for ${day}?`)) return;
    setSlots((s) => ({ ...s, [day]: [] }));
  }

  function addSlotsFromModal() {
    if (!modalStart || !modalEnd) {
      alert("Please pick start and end time");
      return;
    }

    // parse times as HH:MM 24h internal
    const toMinutes = (timeStr: string) => {
      const t = timeStr.split(":");
      const hh = Number(t[0]);
      const mm = Number(t[1]);
      return hh * 60 + mm;
    };

    // modalStart/modalEnd expected as HH:MM (from input type=time)
    const startMin = toMinutes(modalStart);
    const endMin = toMinutes(modalEnd);
    const interval = Number(modalInterval);
    if (endMin <= startMin) {
      alert("End time must be after start time");
      return;
    }

    const newSlots: string[] = [];
    for (let t = startMin; t + Number(modalDuration) <= endMin; t += interval) {
      const hh = Math.floor(t / 60);
      const mm = t % 60;
      const ampm = hh >= 12 ? "PM" : "AM";
      const displayH = ((hh + 11) % 12) + 1; // convert 0->12
      const display = `${String(displayH).padStart(2, "0")}:${String(mm).padStart(2, "0")} ${ampm}`;
      newSlots.push(display);
    }

    setSlots((s) => ({ ...s, [activeDay]: [...s[activeDay as DayKey], ...newSlots] }));
    // close modal
    setShowModal(false);
  }

  function removeSlot(day: DayKey, idx: number) {
    setSlots((s) => ({ ...s, [day]: s[day].filter((_, i) => i !== idx) }));
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">Available Timings</h2>

      <div className="mb-4">
        <div className="inline-flex gap-2 bg-white rounded-full p-1 shadow">
          <button className="px-4 py-2 rounded-full bg-blue-500 text-white text-sm">General Availability</button>
          <button className="px-4 py-2 rounded-full text-sm">Clinic Availability</button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Select Available Slots</h3>
        <hr className="mb-4" />

        <div className="mb-4">
          <div className="flex flex-wrap gap-3">
            {DAYS.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDay(d)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${activeDay === d ? 'bg-blue-500 text-white' : 'bg-white border'}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="border rounded-md p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="font-medium">{activeDay}</div>
            <div className="flex items-center gap-4 text-sm">
              <button onClick={() => setShowModal(true)} className="text-sky-600">Add Slots</button>
              <button onClick={() => deleteAllForDay(activeDay)} className="text-red-500">Delete All</button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {slots[activeDay].length === 0 && <div className="text-sm text-slate-500">No slots yet. Add some.</div>}

            {slots[activeDay].map((t, i) => (
              <div key={i} className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-md shadow-sm text-sm">
                <Clock size={16} /> {t}
                <button onClick={() => removeSlot(activeDay, i)} className="ml-2 text-red-500">×</button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Appointment Fees ($)</label>
          <input value={fee} onChange={(e) => setFee(e.target.value)} className="w-full px-4 py-2 border rounded-md text-sm" />
        </div>

        <div className="flex items-center justify-end gap-4">
          <button onClick={() => window.location.reload()} className="px-4 py-2 rounded-full border">Cancel</button>
          <button onClick={() => alert(JSON.stringify({ slots, fee }, null, 2))} className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 text-white">Save Changes</button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg w-[720px] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Appointment Details</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-full bg-slate-100"><X /></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium mb-1 block">Start Time</label>
                <input type="time" value={modalStart} onChange={(e) => setModalStart(e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm" />
              </div>

              <div>
                <label className="text-xs font-medium mb-1 block">End Time</label>
                <input type="time" value={modalEnd} onChange={(e) => setModalEnd(e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm" />
              </div>

              <div>
                <label className="text-xs font-medium mb-1 block">Appointment Intervals</label>
                <select value={modalInterval} onChange={(e) => setModalInterval(e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm">
                  <option value="5">5 Minutes</option>
                  <option value="10">10 Minutes</option>
                  <option value="15">15 Minutes</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium mb-1 block">Appointment Durations</label>
                <select value={modalDuration} onChange={(e) => setModalDuration(e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm">
                  <option value="15">15 Minutes</option>
                  <option value="30">30 Minutes</option>
                  <option value="45">45 Minutes</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-medium mb-1 block">Assign Appointment Spaces</label>
                <div className="flex items-center gap-4 mt-2">
                  <label className="inline-flex items-center gap-2"><input type="radio" name="space" checked={modalSpace === "Space 1"} onChange={() => setModalSpace("Space 1")} /> Space 1</label>
                  <label className="inline-flex items-center gap-2"><input type="radio" name="space" checked={modalSpace === "Space 2"} onChange={() => setModalSpace("Space 2")} /> Space 2</label>
                  <label className="inline-flex items-center gap-2"><input type="radio" name="space" checked={modalSpace === "Space 3"} onChange={() => setModalSpace("Space 3")} /> Space 3</label>
                  <label className="inline-flex items-center gap-2"><input type="radio" name="space" checked={modalSpace === "Space 4"} onChange={() => setModalSpace("Space 4")} /> Space 4</label>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-4">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-full border">Cancel</button>
              <button onClick={addSlotsFromModal} className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 text-white">Add Slots</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
