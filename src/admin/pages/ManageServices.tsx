// ManageServices.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search as SearchIcon,
  Tag,
  Clock,
  DollarSign,
  CheckCircle,
  ToggleLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";

/**
 * ManageServices.tsx
 *
 * - CRUD UI for services (mocked data)
 * - Search, sort, pagination
 * - Create / Edit modal, Delete confirmation
 * - TailwindCSS + lucide-react + react-hot-toast
 *
 * Replace mock API functions with real API calls as needed.
 */

/* ----------------------------- Types ------------------------------ */
type Service = {
  id: string;
  title: string;
  category: string;
  price?: number;
  durationMinutes?: number;
  active?: boolean;
  description?: string;
  createdAt: string; // ISO
};

/* --------------------------- Mock API ---------------------------- */
const MOCK_SERVICES: Service[] = Array.from({ length: 21 }).map((_, i) => ({
  id: `svc_${i + 1}`,
  title: ["Full Body Checkup", "Blood Test Panel", "Skin Consultation", "Pediatric Visit"][i % 4] + ` ${i + 1}`,
  category: ["General", "Lab", "Dermatology", "Pediatrics"][i % 4],
  price: [999, 499, 799, 599][i % 4],
  durationMinutes: [60, 30, 45, 30][i % 4],
  active: i % 3 !== 0,
  description: "Short description for the service",
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
}));

function fakeFetchServices(): Promise<Service[]> {
  return new Promise((res) => setTimeout(() => res(MOCK_SERVICES), 350));
}

function fakeCreateService(payload: Omit<Service, "id" | "createdAt">): Promise<Service> {
  return new Promise((res) =>
    setTimeout(
      () =>
        res({
          ...payload,
          id: `svc_${Date.now()}`,
          createdAt: new Date().toISOString(),
        }),
      300
    )
  );
}

function fakeUpdateService(id: string, patch: Partial<Service>): Promise<Service> {
  return new Promise((res) =>
    setTimeout(
      () =>
        res({
          id,
          title: patch.title ?? "Untitled Service",
          category: patch.category ?? "General",
          price: patch.price ?? 0,
          durationMinutes: patch.durationMinutes ?? 30,
          active: patch.active ?? true,
          description: patch.description ?? "",
          createdAt: patch.createdAt ?? new Date().toISOString(),
        }),
      300
    )
  );
}

function fakeDeleteService(id: string): Promise<{ success: boolean }> {
  return new Promise((res) => setTimeout(() => res({ success: true }), 300));
}

/* --------------------------- Component --------------------------- */
export default function ManageServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);

  // UI state
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"createdAt" | "title" | "price">("createdAt");
  const [page, setPage] = useState(1);
  const perPage = 8;

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    durationMinutes: "",
    description: "",
    active: true,
  });

  // Delete confirm
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadServices() {
    setLoading(true);
    try {
      const data = await fakeFetchServices();
      setServices(data);
    } catch (err) {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  }

  /* -------------------- Derived & Pagination -------------------- */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s) => {
      if (!q) return true;
      return (
        s.title.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        (s.description ?? "").toLowerCase().includes(q)
      );
    });
  }, [services, query]);

  const sorted = useMemo(() => {
    const s = [...filtered];
    s.sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "price") return (a.price ?? 0) - (b.price ?? 0);
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
    setEditing(null);
    setForm({ title: "", category: "", price: "", durationMinutes: "", description: "", active: true });
    setIsModalOpen(true);
  }

  function openEdit(svc: Service) {
    setEditing(svc);
    setForm({
      title: svc.title,
      category: svc.category,
      price: String(svc.price ?? ""),
      durationMinutes: String(svc.durationMinutes ?? ""),
      description: svc.description ?? "",
      active: !!svc.active,
    });
    setIsModalOpen(true);
  }

  async function handleSave() {
    if (!form.title.trim() || !form.category.trim()) {
      toast.error("Title and category are required");
      return;
    }

    const priceNum = form.price ? Number(form.price) : 0;
    const durationNum = form.durationMinutes ? Number(form.durationMinutes) : 30;

    try {
      if (editing) {
        const updated = await fakeUpdateService(editing.id, {
          title: form.title,
          category: form.category,
          price: priceNum,
          durationMinutes: durationNum,
          description: form.description,
          active: form.active,
        });
        setServices((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        toast.success("Service updated");
      } else {
        const created = await fakeCreateService({
          title: form.title,
          category: form.category,
          price: priceNum,
          durationMinutes: durationNum,
          description: form.description,
          active: form.active,
        });
        setServices((prev) => [created, ...prev]);
        toast.success("Service created");
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
      await fakeDeleteService(deletingId);
      setServices((prev) => prev.filter((s) => s.id !== deletingId));
      toast.success("Service deleted");
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setDeletingId(null);
    }
  }

  async function toggleActive(svc: Service) {
    try {
      const updated = await fakeUpdateService(svc.id, { active: !svc.active });
      setServices((prev) => prev.map((s) => (s.id === svc.id ? updated : s)));
      toast.success(updated.active ? "Service activated" : "Service deactivated");
    } catch {
      toast.error("Failed to update service");
    }
  }

  /* --------------------------- Render --------------------------- */
  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Manage Services</h1>
          <p className="text-sm text-gray-500">Create and manage medical services/packages.</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <input
              placeholder="Search services or categories..."
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
            <option value="title">Title (A-Z)</option>
            <option value="price">Price (Low → High)</option>
          </select>

          {/* Create */}
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus size={16} /> Add Service
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm text-gray-600 w-8">#</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Service</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Category</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600 hidden sm:table-cell">Duration</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Price</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Status</th>
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
                  No services found.
                </td>
              </tr>
            ) : (
              pageItems.map((svc, idx) => (
                <tr key={svc.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">{(page - 1) * perPage + idx + 1}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{svc.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{svc.category}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 hidden sm:table-cell">
                    <div className="inline-flex items-center gap-2">
                      <Clock size={14} /> <span>{svc.durationMinutes ?? 30} mins</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    <div className="inline-flex items-center gap-2">
                      <DollarSign size={14} /> <span>{svc.price ? `₹${svc.price}` : "Free"}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <button
                      onClick={() => toggleActive(svc)}
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
                        svc.active ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-600"
                      }`}
                    >
                      {svc.active ? <CheckCircle size={14} /> : <ToggleLeft size={14} />}
                      {svc.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right text-sm">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => openEdit(svc)}
                        title="Edit"
                        className="p-2 rounded-md hover:bg-gray-100"
                      >
                        <Edit size={16} />
                      </button>

                      <button
                        onClick={() => confirmDelete(svc.id)}
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

          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 z-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{editing ? "Edit Service" : "Add Service"}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-600">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Category</label>
                <input
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Price (₹)</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Duration (minutes)</label>
                <input
                  type="number"
                  value={form.durationMinutes}
                  onChange={(e) => setForm((f) => ({ ...f, durationMinutes: e.target.value }))}
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm text-gray-600">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={3}
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 flex items-center gap-3 mt-2">
                <input
                  id="active"
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
                />
                <label htmlFor="active" className="text-sm text-gray-700">
                  Active
                </label>
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
            <p className="text-sm text-gray-600 mb-4">Are you sure you want to delete this service? This action cannot be undone.</p>

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
