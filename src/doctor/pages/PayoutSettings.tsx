import React, { useEffect, useState } from "react";
import { Search, Settings as SettingsIcon, CheckCircle } from "lucide-react";

type Payout = {
  id: string;
  date: string;
  method: string;
  amount: string;
  status: "Completed" | "Pending" | "Failed";
};

const SAMPLE_PAYOUTS: Payout[] = [
  { id: "p1", date: "24 Mar 2025", method: "Paypal", amount: "$300", status: "Completed" },
  { id: "p2", date: "24 Mar 2025", method: "Paypal", amount: "$200", status: "Completed" },
  { id: "p3", date: "25 Mar 2025", method: "Stripe", amount: "$300", status: "Completed" },
  { id: "p4", date: "24 Mar 2025", method: "Paypal", amount: "$300", status: "Completed" },
];

export default function PayoutSettings() {
  const [selectedMethod, setSelectedMethod] = useState<string>("Paypal");
  const [search, setSearch] = useState("");
  const [payouts] = useState<Payout[]>(SAMPLE_PAYOUTS);

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const filtered = payouts.filter(
    (p) =>
      p.date.toLowerCase().includes(search.toLowerCase()) ||
      p.method.toLowerCase().includes(search.toLowerCase()) ||
      p.amount.toLowerCase().includes(search.toLowerCase())
  );

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  // keep page in range
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [page, totalPages]);

  const start = (page - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  function configure(method: string) {
    alert(`Configure ${method}`);
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">Payout Settings</h2>

      {/* Settings box */}
      <div className="bg-slate-900 text-white rounded-xl p-6 mb-8 shadow-lg">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Settings</h3>
              <p className="text-sm text-slate-300">All the earning will be sent to below selected payout method</p>
            </div>
            <div className="text-sm text-slate-300" />
          </div>

          <div className="border-t border-slate-700 pt-6">
            <div className="flex gap-6">
              {/* Stripe card */}
              <div
                role="button"
                onClick={() => setSelectedMethod("Stripe")}
                className={`flex flex-col items-start gap-3 p-4 rounded-lg bg-white text-slate-800 shadow-sm cursor-pointer w-44 ${selectedMethod === "Stripe" ? "ring-2 ring-green-400" : ""}`}
              >
                <div className="text-xl font-bold">stripe</div>
                <button
                  onClick={(e) => { e.stopPropagation(); configure("Stripe"); }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-slate-700 text-sm shadow-sm"
                >
                  <SettingsIcon size={14} /> Configure
                </button>
              </div>

              {/* Paypal card */}
              <div
                role="button"
                onClick={() => setSelectedMethod("Paypal")}
                className={`flex flex-col items-start gap-3 p-4 rounded-lg bg-white text-slate-800 shadow-sm cursor-pointer w-44 ${selectedMethod === "Paypal" ? "ring-2 ring-green-400" : ""}`}
              >
                <div className="text-xl font-semibold">PayPal</div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); configure("Paypal"); }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-slate-700 text-sm shadow-sm"
                  >
                    <SettingsIcon size={14} /> Configure
                  </button>

                  {selectedMethod === "Paypal" && (
                    <span className="inline-flex items-center gap-1 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                      <CheckCircle size={12} /> Selected
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payouts table */}
      <div className="w-full bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Payouts</h3>

        <div className="mb-4 flex items-center gap-4">
          <div className="relative flex-1">
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search"
              className="w-full border rounded-md px-3 py-2 pr-10 text-sm"
            />
            <Search className="absolute right-3 top-3 text-gray-400" />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600">Rows:</label>
            <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="px-3 py-2 border rounded-md text-sm">
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="text-left text-sm text-slate-600 bg-slate-100">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((p) => (
                <tr key={p.id} className="border-b last:border-b-0">
                  <td className="py-4 px-4 text-sm text-slate-700">{p.date}</td>
                  <td className="py-4 px-4 text-sm text-slate-700">{p.method}</td>
                  <td className="py-4 px-4 text-sm text-slate-700">{p.amount}</td>
                  <td className="py-4 px-4 text-sm">
                    <span className={`inline-block px-3 py-1 rounded-full text-white text-xs ${p.status === "Completed" ? "bg-emerald-500" : p.status === "Pending" ? "bg-yellow-400" : "bg-red-400"}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}

              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-sm text-slate-500">No payouts found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-slate-600">Showing {(start + 1)} - {Math.min(start + pageSize, total)} of {total}</div>

          <div className="flex items-center gap-2">
            <button onClick={() => setPage(1)} disabled={page === 1} className="px-3 py-1 border rounded-md text-sm disabled:opacity-50">« First</button>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 border rounded-md text-sm disabled:opacity-50">‹ Prev</button>

            {/* page numbers (simple) */}
            <div className="hidden sm:flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button key={pageNum} onClick={() => setPage(pageNum)} className={`px-3 py-1 rounded-md text-sm ${page === pageNum ? 'bg-blue-500 text-white' : 'border'}`}>
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 border rounded-md text-sm disabled:opacity-50">Next ›</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="px-3 py-1 border rounded-md text-sm disabled:opacity-50">Last »</button>
          </div>
        </div>
      </div>
    </div>
  );
}
