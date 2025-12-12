// ManageAppointments.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Search as SearchIcon,
  Calendar,
  Clock,
  User,
  Edit,
  Trash2,
  Check,
  XCircle,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";
import toast from "react-hot-toast";

/**
 * ManageAppointments.tsx
 *
 * - List + filter + search appointments (mocked data)
 * - Change status (Complete / Cancel)
 * - Edit appointment modal
 * - Delete confirmation
 * - Pagination
 *
 * Replace fake* functions with real API calls as needed.
 */

/* ----------------------------- Types ------------------------------ */
type AppointmentStatus = "scheduled" | "completed" | "cancelled";
type Appointment = {
  id: string;
  patientName: string;
  patientPhone?: string;
  doctorName: string;
  serviceTitle: string;
  date: string; // ISO
  time: string; // 24h like "14:30"
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
};

/* --------------------------- Mock API ---------------------------- */
const MOCK_APPOINTMENTS: Appointment[] = Array.from({ length: 36 }).map(
  (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + (i % 10));
    const iso = d.toISOString().split("T")[0];
    const hour = 9 + (i % 8); // 9..16
    const minute = i % 2 === 0 ? "00" : "30";
    const statuses: AppointmentStatus[] = [
      "scheduled",
      "completed",
      "cancelled",
    ];
    return {
      id: `apt_${i + 1}`,
      patientName: ["Asha Rao", "Rohit Kumar", "Priya Singh", "Anil Patel"][
        i % 4
      ] + ` ${i + 1}`,
      patientPhone: `+91 9000${(1000 + i).toString().slice(-4)}`,
      doctorName: ["Dr. Mehta", "Dr. Nair", "Dr. Singh", "Dr. Rao"][i % 4],
      serviceTitle: [
        "Full Body Checkup",
        "Blood Test",
        "Skin Consultation",
        "Pediatric Visit",
      ][i % 4],
      date: iso,
      time: `${hour.toString().padStart(2, "0")}:${minute}`,
      status: statuses[i % statuses.length],
      notes: i % 3 === 0 ? "Follow-up required" : "",
      createdAt: new Date(Date.now() - i * 3600 * 1000).toISOString(),
    };
  }
);

function fakeFetchAppointments(): Promise<Appointment[]> {
  return new Promise((res) => setTimeout(() => res(MOCK_APPOINTMENTS), 350));
}

function fakeUpdateAppointment(
  id: string,
  patch: Partial<Appointment>
): Promise<Appointment> {
  return new Promise((res) =>
    setTimeout(
      () =>
        res({
          id,
          patientName: patch.patientName ?? "Unknown",
          patientPhone: patch.patientPhone,
          doctorName: patch.doctorName ?? "Dr. Unknown",
          serviceTitle: patch.serviceTitle ?? "Service",
          date: patch.date ?? new Date().toISOString().split("T")[0],
          time: patch.time ?? "10:00",
          status: patch.status ?? "scheduled",
          notes: patch.notes ?? "",
          createdAt: patch.createdAt ?? new Date().toISOString(),
        }),
      300
    )
  );
}

function fakeDeleteAppointment(id: string): Promise<{ success: boolean }> {
  return new Promise((res) => setTimeout(() => res({ success: true }), 300));
}

/* --------------------------- Component --------------------------- */
export default function ManageAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  // UI state
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    AppointmentStatus | "all"
  >("all");
  const [filterDate, setFilterDate] = useState<string>(""); // yyyy-mm-dd
  const [page, setPage] = useState(1);
  const perPage = 10;

  // Edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Appointment | null>(null);
  const [form, setForm] = useState({
    patientName: "",
    patientPhone: "",
    doctorName: "",
    serviceTitle: "",
    date: "",
    time: "",
    notes: "",
    status: "scheduled" as AppointmentStatus,
  });

  // Delete
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadAppointments() {
    setLoading(true);
    try {
      const data = await fakeFetchAppointments();
      setAppointments(data);
    } catch (err) {
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  }

  /* -------------------- Derived & Pagination -------------------- */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return appointments.filter((a) => {
      if (filterStatus !== "all" && a.status !== filterStatus) return false;
      if (filterDate && a.date !== filterDate) return false;
      if (!q) return true;
      return (
        a.patientName.toLowerCase().includes(q) ||
        a.doctorName.toLowerCase().includes(q) ||
        a.serviceTitle.toLowerCase().includes(q) ||
        (a.patientPhone ?? "").toLowerCase().includes(q)
      );
    });
  }, [appointments, query, filterStatus, filterDate]);

  const sorted = useMemo(() => {
    const s = [...filtered];
    s.sort(
      (a, b) =>
        new Date(a.date + "T" + a.time).getTime() -
        new Date(b.date + "T" + b.time).getTime()
    );
    return s;
  }, [filtered]);

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const pageItems = sorted.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  /* ------------------------- Handlers -------------------------- */
  function openEdit(a: Appointment) {
    setEditing(a);
    setForm({
      patientName: a.patientName,
      patientPhone: a.patientPhone ?? "",
      doctorName: a.doctorName,
      serviceTitle: a.serviceTitle,
      date: a.date,
      time: a.time,
      notes: a.notes ?? "",
      status: a.status,
    });
    setIsModalOpen(true);
  }

  function openCreate() {
    setEditing(null);
    setForm({
      patientName: "",
      patientPhone: "",
      doctorName: "",
      serviceTitle: "",
      date: "",
      time: "",
      notes: "",
      status: "scheduled",
    });
    setIsModalOpen(true);
  }

  async function handleSave() {
    if (!form.patientName.trim() || !form.doctorName.trim() || !form.date) {
      toast.error("Patient name, doctor and date are required");
      return;
    }

    try {
      if (editing) {
        const updated = await fakeUpdateAppointment(editing.id, {
          ...form,
        } as Partial<Appointment>);
        setAppointments((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );
        toast.success("Appointment updated");
      } else {
        // create (mock)
        const created: Appointment = {
          id: `apt_${Date.now()}`,
          patientName: form.patientName,
          patientPhone: form.patientPhone || undefined,
          doctorName: form.doctorName,
          serviceTitle: form.serviceTitle || "General",
          date: form.date,
          time: form.time || "10:00",
          status: form.status,
          notes: form.notes || "",
          createdAt: new Date().toISOString(),
        };
        setAppointments((prev) => [created, ...prev]);
        toast.success("Appointment created");
      }
      setIsModalOpen(false);
    } catch {
      toast.error("Save failed");
    }
  }

  async function confirmDelete(id: string) {
    setDeletingId(id);
  }

  async function handleDelete() {
    if (!deletingId) return;
    try {
      await fakeDeleteAppointment(deletingId);
      setAppointments((prev) => prev.filter((a) => a.id !== deletingId));
      toast.success("Appointment deleted");
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeletingId(null);
    }
  }

  async function changeStatus(a: Appointment, status: AppointmentStatus) {
    try {
      const updated = await fakeUpdateAppointment(a.id, { status });
      setAppointments((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      toast.success(`Appointment ${status}`);
    } catch {
      toast.error("Status change failed");
    }
  }

  function exportCSV() {
    // quick CSV export of current filtered list
    const rows = [
      ["ID", "Patient", "Phone", "Doctor", "Service", "Date", "Time", "Status"],
      ...sorted.map((s) => [
        s.id,
        s.patientName,
        s.patientPhone ?? "",
        s.doctorName,
        s.serviceTitle,
        s.date,
        s.time,
        s.status,
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `appointments_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported");
  }

  /* --------------------------- Render --------------------------- */
  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Manage Appointments</h1>
          <p className="text-sm text-gray-500">View and manage patient appointments.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <PlusPlaceholderIcon /> New Appointment
          </button>

          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200"
            title="Export CSV"
          >
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4 items-center">
        <div className="relative">
          <input
            placeholder="Search patient, doctor, service, phone..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            className="pl-10 pr-4 py-2 border rounded-lg text-sm w-80 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon size={16} />
          </div>
        </div>

        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value as any);
            setPage(1);
          }}
          className="py-2 px-3 border rounded-lg text-sm"
        >
          <option value="all">All statuses</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <div className="flex items-center gap-2">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => {
              setFilterDate(e.target.value);
              setPage(1);
            }}
            className="py-2 px-3 border rounded-lg text-sm"
          />
          <button
            onClick={() => {
              setFilterDate("");
              setFilterStatus("all");
              setQuery("");
            }}
            className="py-2 px-3 bg-gray-50 rounded-md hover:bg-gray-100 text-sm"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm text-gray-600 w-8">#</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Patient</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600 hidden sm:table-cell">Doctor</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Service</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600 hidden md:table-cell">Date</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Time</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Status</th>
              <th className="px-4 py-3 text-right text-sm text-gray-600">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="p-6 text-center text-sm text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : pageItems.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-6 text-center text-sm text-gray-500">
                  No appointments found.
                </td>
              </tr>
            ) : (
              pageItems.map((apt, idx) => (
                <tr key={apt.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">{(page - 1) * perPage + idx + 1}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    <div className="font-medium">{apt.patientName}</div>
                    <div className="text-xs text-gray-500">{apt.patientPhone}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 hidden sm:table-cell">{apt.doctorName}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{apt.serviceTitle}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{apt.date}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{apt.time}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      apt.status === "scheduled" ? "bg-blue-50 text-blue-600" :
                      apt.status === "completed" ? "bg-green-50 text-green-600" :
                      "bg-red-50 text-red-600"
                    }`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => openEdit(apt)}
                        title="Edit"
                        className="p-2 rounded-md hover:bg-gray-100"
                      >
                        <Edit size={16} />
                      </button>

                      <button
                        onClick={() => changeStatus(apt, "completed")}
                        title="Mark complete"
                        disabled={apt.status === "completed"}
                        className="p-2 rounded-md hover:bg-gray-100"
                      >
                        <Check size={16} />
                      </button>

                      <button
                        onClick={() => changeStatus(apt, "cancelled")}
                        title="Cancel"
                        disabled={apt.status === "cancelled"}
                        className="p-2 rounded-md hover:bg-gray-100 text-red-600"
                      >
                        <XCircle size={16} />
                      </button>

                      <button
                        onClick={() => confirmDelete(apt.id)}
                        title="Delete"
                        className="p-2 rounded-md hover:bg-gray-100 text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-4 py-3 flex items-center justify-between border-t bg-gray-50">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{(page - 1) * perPage + (pageItems.length ? 1 : 0)}</span> to{" "}
            <span className="font-medium">{(page - 1) * perPage + pageItems.length}</span> of{" "}
            <span className="font-medium">{total}</span> results
          </div>

          <div className="inline-flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="text-sm">
              Page <strong>{page} / {totalPages}</strong>
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ------------------ Edit / Create Modal ------------------ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsModalOpen(false)} />

          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-xl p-6 z-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {editing ? "Edit Appointment" : "New Appointment"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-600">Patient Name</label>
                <input
                  value={form.patientName}
                  onChange={(e) => setForm((f) => ({ ...f, patientName: e.target.value }))}
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Patient Phone</label>
                <input
                  value={form.patientPhone}
                  onChange={(e) => setForm((f) => ({ ...f, patientPhone: e.target.value }))}
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Doctor</label>
                <input
                  value={form.doctorName}
                  onChange={(e) => setForm((f) => ({ ...f, doctorName: e.target.value }))}
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Service</label>
                <input
                  value={form.serviceTitle}
                  onChange={(e) => setForm((f) => ({ ...f, serviceTitle: e.target.value }))}
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Time</label>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm text-gray-600">Notes</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  rows={3}
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm text-gray-600">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as AppointmentStatus }))}
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg hover:bg-gray-100">
                Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------ Delete Confirmation ------------------ */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDeletingId(null)} />
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Confirm Delete</h3>
            <p className="text-sm text-gray-600 mb-4">Are you sure you want to delete this appointment? This action cannot be undone.</p>

            <div className="flex items-center justify-end gap-3">
              <button onClick={() => setDeletingId(null)} className="px-4 py-2 rounded-lg hover:bg-gray-100">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------ Helper placeholder ------------------ */
/* The earlier code uses <PlusPlaceholderIcon /> for the "New Appointment" button
   but we didn't import a Plus icon (to avoid clutter). Replace or update as needed.
*/

function PlusPlaceholderIcon() {
  // simple plus svg to avoid extra import
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline-block">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  );
}
