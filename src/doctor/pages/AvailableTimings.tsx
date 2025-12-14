import React, { useState } from "react";
import { Clock, Plus, X, Calendar, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { saveBusinessHours } from "../../redux/actions/businessRoutes";

type DayKey = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

const DAYS: DayKey[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// small helpers
const toDisplay = (hh: number, mm: number) => {
  const ampm = hh >= 12 ? "PM" : "AM";
  const displayH = ((hh + 11) % 12) + 1;
  return `${String(displayH).padStart(2, "0")}:${String(mm).padStart(2, "0")} ${ampm}`;
};

type Props = {
  onSave?: (data: { slots: Record<DayKey, string[]>; fee: string }) => void;
  initial?: { slots?: Record<DayKey, string[]>; fee?: string };
};

export default function AvailableTimingsPremium({ onSave, initial }: Props) {
  const dispatch = useDispatch();
  const [activeDay, setActiveDay] = useState<DayKey>("Monday");
  const [slots, setSlots] = useState<Record<DayKey, string[]>>(() => ({
    Monday: ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM"],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
    ...(initial?.slots || {}),
  }));

  const [fee, setFee] = useState<string>(initial?.fee ?? "254");
  const [showModal, setShowModal] = useState(false);
  const [savedToast, setSavedToast] = useState<string | null>(null);

  // Modal fields
  const [modalStart, setModalStart] = useState<string>("");
  const [modalEnd, setModalEnd] = useState<string>("");
  const [modalInterval, setModalInterval] = useState<number>(10);
  const [modalDuration, setModalDuration] = useState<number>(30);
  const [modalSpace, setModalSpace] = useState<string>("Space 1");
  const [manualInput, setManualInput] = useState<string>("");

  function addSlotManually() {
    if (!manualInput) return;
    setSlots((s) => ({ ...s, [activeDay]: [...s[activeDay], manualInput] }));
    setManualInput("");
  }

  function deleteAllForDay(day: DayKey) {
    setSlots((s) => ({ ...s, [day]: [] }));
  }

  function addSlotsFromModal() {
    if (!modalStart || !modalEnd) return;

    const toMinutes = (timeStr: string) => {
      const [h, m] = timeStr.split(":").map(Number);
      return h * 60 + m;
    };

    const startMin = toMinutes(modalStart);
    const endMin = toMinutes(modalEnd);
    if (endMin <= startMin) return;

    const newSlots: string[] = [];
    for (let t = startMin; t + modalDuration <= endMin; t += modalInterval) {
      const hh = Math.floor(t / 60);
      const mm = t % 60;
      newSlots.push(toDisplay(hh, mm));
    }

    setSlots((s) => ({ ...s, [activeDay]: Array.from(new Set([...s[activeDay], ...newSlots])) }));
    setShowModal(false);
  }

  function removeSlot(day: DayKey, idx: number) {
    setSlots((s) => ({ ...s, [day]: s[day].filter((_, i) => i !== idx) }));
  }

  async function handleSave() {
    const doctorId = "693c3f419eeff6d09ce1cfa4"
    const payload = { slots, fee };
    console.log("slots==============>>", slots, fee);
    try {
      dispatch(saveBusinessHours(doctorId, payload) as any).then((res: any) => {

      }).catch((error: any) => {
        console.log("error==============>>" + error)
      });
      // show UI success (toast handled by action reducer or local toast)
    } catch (err) {
      // show error
      console.error("Failed to save business hours", err);
    }
  }

  return (
    <div className="w-full p-6 min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">Available Timings</h1>
            <p className="text-sm text-slate-500">Create a clean schedule, assign spaces and fees. Modern UI with instant previews.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-slate-500">Appointment Fee</div>
              <div className="mt-1 inline-flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow-sm">
                <span className="font-medium">$</span>
                <input value={fee} onChange={(e) => setFee(e.target.value)} className="w-20 text-sm outline-none bg-transparent" />
              </div>
            </div>

            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow-lg"
            >
              Save
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border overflow-hidden w-full">
          <div className="flex flex-col md:flex-row w-full">
            {/* Left: Days */}
            <div className="md:w-56 w-full border-r md:border-r md:min-h-[420px]">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <div className="text-sm font-medium">Week Planner</div>
                  </div>
                  <div className="text-xs text-slate-400">Premium</div>
                </div>

                <div className="flex flex-col gap-2">
                  {DAYS.map((d) => (
                    <button
                      key={d}
                      onClick={() => setActiveDay(d)}
                      className={`text-left px-3 py-2 rounded-lg transition-all hover:scale-[1.01] ${activeDay === d ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow" : "bg-slate-50"}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{d}</div>
                        <div className="text-xs text-slate-400">{slots[d].length} slots</div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-6">
                  <button onClick={() => setShowModal(true)} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white border shadow-sm">
                    <Plus size={16} /> Add range
                  </button>

                  <button onClick={() => deleteAllForDay(activeDay)} className="w-full mt-3 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 border border-red-100">
                    <Trash2 size={14} /> Clear {activeDay}
                  </button>
                </div>

                <div className="mt-6 text-xs text-slate-400">
                  Tip: Use ranges to bulk-create slots. Manual input supports formats like <span className="italic">09:15 AM</span>.
                </div>
              </div>
            </div>

            {/* Right: Slots preview */}
            <div className="flex-1 p-6 w-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <button onClick={() => { const idx = DAYS.indexOf(activeDay); setActiveDay(DAYS[(idx - 1 + DAYS.length) % DAYS.length]); }} className="p-2 rounded-md bg-slate-100"><ChevronLeft size={16} /></button>
                  <div>
                    <div className="text-sm text-slate-500">Selected</div>
                    <div className="text-lg font-semibold">{activeDay}</div>
                  </div>
                  <button onClick={() => { const idx = DAYS.indexOf(activeDay); setActiveDay(DAYS[(idx + 1) % DAYS.length]); }} className="p-2 rounded-md bg-slate-100"><ChevronRight size={16} /></button>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    placeholder="Add single slot (e.g. 02:00 PM)"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    className="px-3 py-2 border rounded-md text-sm"
                  />
                  <button onClick={addSlotManually} className="px-4 py-2 rounded-full bg-white border shadow-sm inline-flex items-center gap-2"><Plus size={14} /> Add</button>
                </div>
              </div>

              <div className="rounded-lg border p-4 min-h-[220px]">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-slate-500 mb-2">Slots Preview</div>
                    <div className="flex flex-wrap gap-3">
                      <AnimatePresence>
                        {slots[activeDay].length === 0 && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-slate-400">No slots yet. Add a range or a single slot.</motion.div>
                        )}

                        {slots[activeDay].map((t, i) => (
                          <motion.div key={t + i} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full shadow-sm text-sm">
                            <Clock size={14} />
                            <span className="font-medium">{t}</span>
                            <button onClick={() => removeSlot(activeDay, i)} className="ml-2 text-red-500 hover:scale-105">×</button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-500 mb-2">Spaces</div>
                    <div className="flex flex-col gap-2">
                      {["Space 1", "Space 2", "Space 3", "Space 4"].map((sp) => (
                        <div key={sp} className={`flex items-center justify-between p-3 rounded-lg ${modalSpace === sp ? "bg-amber-50 border border-amber-100" : "bg-slate-50"}`}>
                          <div>
                            <div className="font-medium">{sp}</div>
                            <div className="text-xs text-slate-400">Assigned: {slots[activeDay].length} slots</div>
                          </div>
                          <div className="text-sm text-slate-500">Select</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-xs text-slate-400">You can edit any slot by clicking the × icon. Bulk actions live on the left.</div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button onClick={() => window.location.reload()} className="px-4 py-2 rounded-full border">Cancel</button>
                <button onClick={handleSave} className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white">Apply</button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <motion.div initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 20 }} className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-semibold">Create slot range</div>
                    <div className="text-xs text-slate-400">for {activeDay}</div>
                  </div>
                  <button onClick={() => setShowModal(false)} className="p-2 rounded-full bg-slate-100"><X /></button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-500">Start</label>
                    <input type="time" value={modalStart} onChange={(e) => setModalStart(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">End</label>
                    <input type="time" value={modalEnd} onChange={(e) => setModalEnd(e.target.value)} className="w-full px-3 py-2 border rounded-md" />
                  </div>

                  <div>
                    <label className="text-xs text-slate-500">Interval (min)</label>
                    <input type="number" value={modalInterval} onChange={(e) => setModalInterval(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
                  </div>

                  <div>
                    <label className="text-xs text-slate-500">Duration (min)</label>
                    <input type="number" value={modalDuration} onChange={(e) => setModalDuration(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs text-slate-500">Assign Space</label>
                    <div className="flex items-center gap-3 mt-2">
                      {["Space 1", "Space 2", "Space 3", "Space 4"].map((s) => (
                        <label key={s} className={`px-3 py-2 rounded-lg border ${modalSpace === s ? "bg-sky-50 border-sky-200" : "bg-white"}`}>
                          <input type="radio" name="space" checked={modalSpace === s} onChange={() => setModalSpace(s)} className="mr-2" /> {s}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3">
                  <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-full border">Close</button>
                  <button onClick={addSlotsFromModal} className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white">Generate</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toast */}
        {savedToast && (
          <div className="fixed right-6 bottom-6 bg-white shadow-lg rounded-full px-4 py-2 text-sm">{savedToast}</div>
        )}
      </div>
    </div>
  );
}
