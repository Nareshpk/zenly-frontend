import React, { useState, useMemo, useEffect } from "react";
import { Search, Link as LinkIcon, Printer } from "lucide-react";

type Invoice = {
  id: string;
  invoiceNo: string;
  patient: { name: string; avatar?: string };
  appointmentDate: string;
  bookedOn: string;
  amount: string;
};

const SAMPLE: Invoice[] = [
  { id: "1", invoiceNo: "#Inv-2021", patient: { name: "Edalin Hendry", avatar: "https://i.pravatar.cc/40?img=7" }, appointmentDate: "24 Mar 2025", bookedOn: "21 Mar 2025", amount: "$300" },
  { id: "2", invoiceNo: "#Inv-2021", patient: { name: "John Homes", avatar: "https://i.pravatar.cc/40?img=6" }, appointmentDate: "17 Mar 2025", bookedOn: "14 Mar 2025", amount: "$450" },
  { id: "3", invoiceNo: "#Inv-2021", patient: { name: "Shanta Neill", avatar: "https://i.pravatar.cc/40?img=5" }, appointmentDate: "11 Mar 2025", bookedOn: "07 Mar 2025", amount: "$250" },
  { id: "4", invoiceNo: "#Inv-2023", patient: { name: "Anthony Tran", avatar: "https://i.pravatar.cc/40?img=10" }, appointmentDate: "26 Feb 2025", bookedOn: "23 Feb 2025", amount: "$320" },
  { id: "5", invoiceNo: "#Inv-2021", patient: { name: "Susan Lingo", avatar: "https://i.pravatar.cc/40?img=11" }, appointmentDate: "18 Feb 2025", bookedOn: "15 Feb 2025", amount: "$480" },
  { id: "6", invoiceNo: "#Inv-2023", patient: { name: "Joseph Boyd", avatar: "https://i.pravatar.cc/40?img=4" }, appointmentDate: "10 Feb 2025", bookedOn: "07 Feb 2025", amount: "$260" },
  { id: "7", invoiceNo: "#Inv-2021", patient: { name: "Juliet Gabriel", avatar: "https://i.pravatar.cc/40?img=9" }, appointmentDate: "28 Jan 2025", bookedOn: "25 Jan 2025", amount: "$350" },
];

export default function Invoices() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(7);
  const [items] = useState<Invoice[]>(SAMPLE);

  // filter
  const filtered = useMemo(() => {
    if (!q.trim()) return items;
    const s = q.toLowerCase();
    return items.filter((it) =>
      it.invoiceNo.toLowerCase().includes(s) ||
      it.patient.name.toLowerCase().includes(s) ||
      it.appointmentDate.toLowerCase().includes(s) ||
      it.bookedOn.toLowerCase().includes(s) ||
      it.amount.toLowerCase().includes(s)
    );
  }, [q, items]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);

  const start = (page - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  function handlePrint(inv: Invoice) {
    // placeholder print action
    alert(`Print ${inv.invoiceNo} (${inv.patient.name})`);
  }

  function handleLink(inv: Invoice) {
    // placeholder link action
    alert(`Open link for ${inv.invoiceNo}`);
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">Invoices</h2>

      <div className="mb-4">
        <div className="relative max-w-sm">
          <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search" className="w-full border rounded-md px-3 py-2 pr-10 text-sm" />
          <Search className="absolute right-3 top-3 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-sm text-slate-600 bg-slate-100">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Patient</th>
              <th className="py-3 px-4 text-left">Appointment Date</th>
              <th className="py-3 px-4 text-left">Booked on</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((row) => (
              <tr key={row.id} className="border-b last:border-b-0">
                <td className="py-4 px-4 text-sm text-slate-700">{row.invoiceNo}</td>
                <td className="py-4 px-4 text-sm text-slate-700 flex items-center gap-3">
                  <img src={row.patient.avatar} alt={row.patient.name} className="w-10 h-10 rounded-full object-cover" />
                  <span>{row.patient.name}</span>
                </td>
                <td className="py-4 px-4 text-sm text-slate-700">{row.appointmentDate}</td>
                <td className="py-4 px-4 text-sm text-slate-700">{row.bookedOn}</td>
                <td className="py-4 px-4 text-sm text-slate-700">{row.amount}</td>
                <td className="py-4 px-4 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleLink(row)} className="p-2 rounded-full border hover:bg-gray-50"><LinkIcon size={16} /></button>
                    <button onClick={() => handlePrint(row)} className="p-2 rounded-full border hover:bg-gray-50"><Printer size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}

            {pageItems.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 text-center text-sm text-slate-500">No invoices found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="text-sm text-slate-600">Showing {start + 1} - {Math.min(start + pageSize, total)} of {total}</div>

          <div className="flex items-center gap-2">
            <button onClick={() => setPage(1)} disabled={page === 1} className="px-3 py-1 border rounded-full disabled:opacity-50">◀◀</button>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 border rounded-full disabled:opacity-50">◀</button>

            {/* simple page numbers */}
            <div className="hidden sm:flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-1 rounded-full ${page === i + 1 ? 'bg-blue-500 text-white' : 'border'}`}>{i + 1}</button>
              ))}
            </div>

            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 border rounded-full disabled:opacity-50">▶</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="px-3 py-1 border rounded-full disabled:opacity-50">▶▶</button>
          </div>
        </div>
      </div>
    </div>
  );
}
