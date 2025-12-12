// ManageDoctors.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search as SearchIcon,
  UserCheck,
  UserX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

/**
 * ManageDoctors.tsx
 *
 * - CRUD UI for doctors (mocked data / placeholder API)
 * - Search, sort, pagination
 * - Create / Edit modal, Delete confirmation
 * - TailwindCSS + lucide-react + react-hot-toast
 *
 * Replace mock API functions with real API calls as needed.
 */

/* ----------------------------- Types ------------------------------ */
type Doctor = {
  id: string;
  name: string;
  specialty: string;
  email?: string;
  phone?: string;
  verified?: boolean;
  createdAt: string; // ISO
};

/* --------------------------- Mock API ---------------------------- */
/* These are placeholders — replace with real API integration. */
const MOCK_DOCTORS: Doctor[] = Array.from({ length: 23 }).map((_, i) => ({
  id: `doc_${i + 1}`,
  name: ["Dr. Asha Sharma", "Dr. Rohit Verma", "Dr. Priya Nair", "Dr. Arun R"][i % 4] + ` ${i + 1}`,
  specialty: ["Cardiology", "Dermatology", "General", "Pediatrics"][i % 4],
  email: `doctor${i + 1}@example.com`,
  phone: `+91 90000${(1000 + i).toString().slice(-4)}`,
  verified: i % 3 === 0,
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
}));

function fakeFetchDoctors(): Promise<Doctor[]> {
  return new Promise((res) => setTimeout(() => res(MOCK_DOCTORS), 400));
}

function fakeCreateDoctor(d: Omit<Doctor, "id" | "createdAt">): Promise<Doctor> {
  return new Promise((res) =>
    setTimeout(
      () =>
        res({
          ...d,
          id: `doc_${Date.now()}`,
          createdAt: new Date().toISOString(),
        }),
      300
    )
  );
}

function fakeUpdateDoctor(id: string, patch: Partial<Doctor>): Promise<Doctor> {
  return new Promise((res) =>
    setTimeout(
      () =>
        res({
          id,
          name: patch.name ?? "Unknown",
          specialty: patch.specialty ?? "General",
          email: patch.email,
          phone: patch.phone,
          verified: patch.verified ?? false,
          createdAt: patch.createdAt ?? new Date().toISOString(),
        }),
      300
    )
  );
}

function fakeDeleteDoctor(id: string): Promise<{ success: boolean }> {
  return new Promise((res) => setTimeout(() => res({ success: true }), 300));
}

/* --------------------------- Component --------------------------- */
export default function ManageDoctors() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);

  // UI state
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "specialty" | "createdAt">(
    "createdAt"
  );
  const [page, setPage] = useState(1);
  const perPage = 8;

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Doctor | null>(null);
  const [form, setForm] = useState({
    name: "",
    specialty: "",
    email: "",
    phone: "",
    verified: false,
  });

  // Delete confirm
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadDoctors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadDoctors() {
    setLoading(true);
    try {
      const data = await fakeFetchDoctors();
      setDoctors(data);
    } catch (err) {
      toast.error("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  }

  /* -------------------- Derived & Pagination -------------------- */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return doctors.filter((d) => {
      if (!q) return true;
      return (
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        (d.email ?? "").toLowerCase().includes(q) ||
        (d.phone ?? "").toLowerCase().includes(q)
      );
    });
  }, [doctors, query]);

  const sorted = useMemo(() => {
    const s = [...filtered];
    s.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "specialty") return a.specialty.localeCompare(b.specialty);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return s;
  }, [filtered, sortBy]);

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const pageItems = sorted.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  /* ------------------------- Handlers -------------------------- */
  function openCreate() {
   navigate("/admin/doctor-form");
  }

  function openEdit(doc: Doctor) {
    setEditing(doc);
    setForm({
      name: doc.name,
      specialty: doc.specialty,
      email: doc.email ?? "",
      phone: doc.phone ?? "",
      verified: !!doc.verified,
    });
    setIsModalOpen(true);
  }

  async function handleSave() {
    if (!form.name.trim() || !form.specialty.trim()) {
      toast.error("Name and specialty are required");
      return;
    }

    try {
      if (editing) {
        // update
        const updated = await fakeUpdateDoctor(editing.id, {
          name: form.name,
          specialty: form.specialty,
          email: form.email || undefined,
          phone: form.phone || undefined,
          verified: form.verified,
        });
        setDoctors((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        toast.success("Doctor updated");
      } else {
        // create
        const created = await fakeCreateDoctor({
          name: form.name,
          specialty: form.specialty,
          email: form.email || undefined,
          phone: form.phone || undefined,
          verified: form.verified,
        });
        setDoctors((prev) => [created, ...prev]);
        toast.success("Doctor created");
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Save failed");
    }
  }

  async function confirmDelete(id: string) {
    setDeletingId(id);
  }

  async function handleDelete() {
    if (!deletingId) return;
    try {
      await fakeDeleteDoctor(deletingId);
      setDoctors((prev) => prev.filter((d) => d.id !== deletingId));
      toast.success("Doctor deleted");
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setDeletingId(null);
    }
  }

  async function toggleVerified(doc: Doctor) {
    try {
      const updated = await fakeUpdateDoctor(doc.id, { verified: !doc.verified });
      setDoctors((prev) => prev.map((d) => (d.id === doc.id ? updated : d)));
      toast.success(updated.verified ? "Doctor verified" : "Verification removed");
    } catch {
      toast.error("Failed to update verification");
    }
  }

  /* --------------------------- Render --------------------------- */
  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Manage Doctors</h1>
          <p className="text-sm text-gray-500">View, create and manage registered doctors.</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <input
              placeholder="Search doctors, email or phone..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="pl-10 pr-4 py-2 border rounded-lg text-sm w-72 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon size={16} />
            </div>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="py-2 px-3 border rounded-lg text-sm"
          >
            <option value="createdAt">Newest</option>
            <option value="name">Name (A-Z)</option>
            <option value="specialty">Specialty</option>
          </select>

          {/* Create */}
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus size={16} /> Add Doctor
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm text-gray-600 w-8">#</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Name</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Specialty</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600 hidden sm:table-cell">Email</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600 hidden md:table-cell">Phone</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Verified</th>
              <th className="px-4 py-3 text-right text-sm text-gray-600">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-sm text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : pageItems.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-sm text-gray-500">
                  No doctors found.
                </td>
              </tr>
            ) : (
              pageItems.map((doc, idx) => (
                <tr key={doc.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">{(page - 1) * perPage + idx + 1}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{doc.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{doc.specialty}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 hidden sm:table-cell">{doc.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{doc.phone}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <button
                      onClick={() => toggleVerified(doc)}
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
                        doc.verified ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-600"
                      }`}
                    >
                      {doc.verified ? <UserCheck size={14} /> : <UserX size={14} />}
                      {doc.verified ? "Verified" : "Unverified"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right text-sm">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => openEdit(doc)}
                        title="Edit"
                        className="p-2 rounded-md hover:bg-gray-100"
                      >
                        <Edit size={16} />
                      </button>

                      <button
                        onClick={() => confirmDelete(doc.id)}
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
            Showing <span className="font-medium">{(page - 1) * perPage + 1}</span> to{" "}
            <span className="font-medium">{Math.min(page * perPage, total)}</span> of{" "}
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
              Page{" "}
              <strong>
                {page} / {totalPages}
              </strong>
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

      {/* ------------------ Create / Edit Modal ------------------ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsModalOpen(false)} />

          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-xl p-6 z-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {editing ? "Edit Doctor" : "Add Doctor"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-600">Full name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Specialty</label>
                <input
                  value={form.specialty}
                  onChange={(e) => setForm((f) => ({ ...f, specialty: e.target.value }))}
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Phone</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 flex items-center gap-3 mt-2">
                <input
                  id="verified"
                  type="checkbox"
                  checked={form.verified}
                  onChange={(e) => setForm((f) => ({ ...f, verified: e.target.checked }))}
                />
                <label htmlFor="verified" className="text-sm text-gray-700">
                  Verified
                </label>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
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
            <p className="text-sm text-gray-600 mb-4">Are you sure you want to delete this doctor? This action cannot be undone.</p>

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
