import React, { useState, useMemo, useEffect } from "react";
import { Search, Link as LinkIcon } from "lucide-react";

type AccountRow = {
  id: string;
  requestedDate: string;
  accountNo: string;
  creditedOn?: string;
  amount: string;
  status: "Completed" | "Pending" | "Failed";
};

const SAMPLE_ROWS: AccountRow[] = [
  { id: "AC-1234", requestedDate: "24 Mar 2025", accountNo: "5396 5250 1908 XXXX", creditedOn: "26 Mar 2025", amount: "$300", status: "Completed" },
  { id: "AC-1235", requestedDate: "28 Mar 2025", accountNo: "8833 8942 9013 XXXX", creditedOn: "30 Mar 2025", amount: "$400", status: "Completed" },
  { id: "AC-1236", requestedDate: "01 Apr 2025", accountNo: "1234 5678 9012 XXXX", creditedOn: "03 Apr 2025", amount: "$250", status: "Pending" },
];

export default function Accounts() {
  const [tab, setTab] = useState<"accounts" | "refunds">("accounts");
  const [search, setSearch] = useState("");
  const [rows] = useState<AccountRow[]>(SAMPLE_ROWS);

  // pagination
  const [page, setPage] = useState(1);
  const pageSize = 7;

  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const s = search.toLowerCase();
    return rows.filter(
      (r) => r.id.toLowerCase().includes(s) || r.accountNo.toLowerCase().includes(s) || r.amount.toLowerCase().includes(s)
    );
  }, [search, rows]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);
  const start = (page - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  // Summary / bank data (static for mock)
  const bank = {
    bankName: "Citi Bank Inc",
    accountNumber: "5396 5250 1908 XXXX",
    branch: "London",
    accountName: "Darren",
    totalBalance: "$900",
    earned: "$906",
    requested: "$50",
    lastRequest: "24 Mar 2023",
  };

  function requestPayment() {
    alert("Request payment - wire to API here");
  }

  function copyLink(id: string) {
    navigator.clipboard?.writeText(window.location.href + `#${id}`);
    alert("Copied link for " + id);
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">Accounts</h2>

      {/* Dark settings panel */}
      <div className="bg-slate-900 text-white rounded-xl p-6 mb-6 shadow-lg">
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div>
            <h3 className="text-lg font-semibold">Statistics</h3>
            <div className="mt-4 flex gap-4 flex-wrap">
              <div className="w-36 h-20 bg-slate-800 border border-slate-700 rounded-lg p-3 flex flex-col justify-center">
                <div className="text-xs text-slate-300">Total Balance</div>
                <div className="text-2xl font-bold">{bank.totalBalance}</div>
              </div>

              <div className="w-36 h-20 bg-slate-800 border border-slate-700 rounded-lg p-3 flex flex-col justify-center">
                <div className="text-xs text-slate-300">Earned</div>
                <div className="text-2xl font-bold">{bank.earned}</div>
              </div>

              <div className="w-36 h-20 bg-slate-800 border border-slate-700 rounded-lg p-3 flex flex-col justify-center">
                <div className="text-xs text-slate-300">Requested</div>
                <div className="text-2xl font-bold">{bank.requested}</div>
              </div>
            </div>

            <div className="mt-4 text-sm text-slate-300">Last Payment request : {bank.lastRequest}</div>
            <div className="mt-4">
              <button onClick={requestPayment} className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 font-medium">Request Payment</button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Bank Details</h3>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-200">
              <div className="font-medium">Bank Name</div>
              <div>{bank.bankName}</div>

              <div className="font-medium">Account Number</div>
              <div>{bank.accountNumber}</div>

              <div className="font-medium">Branch Name</div>
              <div>{bank.branch}</div>

              <div className="font-medium">Account Name</div>
              <div>{bank.accountName}</div>
            </div>

            <div className="mt-4">
              <a className="text-sm text-sky-300 hover:underline mr-4" href="#">Edit Details</a>
              <a className="text-sm text-sky-300 hover:underline" href="#">Other Accounts</a>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-3 bg-white rounded-full p-1 shadow">
          <button onClick={() => setTab("accounts")} className={`px-4 py-2 rounded-full text-sm ${tab === "accounts" ? "bg-blue-500 text-white" : "text-slate-700"}`}>Accounts</button>
          <button onClick={() => setTab("refunds")} className={`px-4 py-2 rounded-full text-sm ${tab === "refunds" ? "bg-blue-500 text-white" : "text-slate-700"}`}>Refund Request</button>
        </div>
      </div>

      {/* Search + table */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="relative w-64">
            <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search" className="w-full border rounded-md px-3 py-2 pr-10 text-sm" />
            <Search className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-sm text-slate-600 bg-slate-100">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Requested Date</th>
                <th className="py-3 px-4 text-left">Account No</th>
                <th className="py-3 px-4 text-left">Credited On</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((r) => (
                <tr key={r.id} className="border-b last:border-b-0">
                  <td className="py-4 px-4 text-sm text-slate-700 text-sky-600">#{r.id}</td>
                  <td className="py-4 px-4 text-sm text-slate-700">{r.requestedDate}</td>
                  <td className="py-4 px-4 text-sm text-slate-700">{r.accountNo}</td>
                  <td className="py-4 px-4 text-sm text-slate-700">{r.creditedOn ?? "-"}</td>
                  <td className="py-4 px-4 text-sm text-slate-700">{r.amount}</td>
                  <td className="py-4 px-4 text-sm">
                    <span className={`inline-block px-3 py-1 rounded-full text-white text-xs ${r.status === "Completed" ? "bg-emerald-500" : r.status === "Pending" ? "bg-yellow-400" : "bg-red-400"}`}>{r.status}</span>
                  </td>
                  <td className="py-4 px-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button onClick={() => copyLink(r.id)} className="p-2 rounded-full border hover:bg-gray-50"><LinkIcon size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}

              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-sm text-slate-500">No records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-slate-600">Showing {start + 1} - {Math.min(start + pageSize, total)} of {total}</div>

          <div className="flex items-center gap-2">
            <button onClick={() => setPage(1)} disabled={page === 1} className="px-3 py-1 border rounded-full text-sm disabled:opacity-50">« First</button>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 border rounded-full text-sm disabled:opacity-50">‹ Prev</button>

            <div className="hidden sm:flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-1 rounded-full text-sm ${page === i + 1 ? 'bg-blue-500 text-white' : 'border'}`}>{i + 1}</button>
              ))}
            </div>

            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 border rounded-full text-sm disabled:opacity-50">Next ›</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="px-3 py-1 border rounded-full text-sm disabled:opacity-50">Last »</button>
          </div>
        </div>
      </div>
    </div>
  );
}
