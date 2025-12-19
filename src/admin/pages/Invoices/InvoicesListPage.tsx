/* eslint-disable react-hooks/exhaustive-deps */
import {
  AlertCircle,
  ArrowUpRight, Calendar,
  CheckCircle2, Clock,
  Download,
  Eye, FileText,
  MoreVertical,
  Plus,
  Search
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InvoicesListPage = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const invoices = [
    { id: 'INV-2025-001', recipient: 'City General Hospital', type: 'External', date: 'Dec 15, 2025', amount: 2450.00, status: 'Paid', method: 'Bank Transfer' },
    { id: 'INV-2025-002', recipient: 'James Wilson', type: 'Patient', date: 'Dec 16, 2025', amount: 450.00, status: 'Pending', method: 'Insurance' },
    { id: 'INV-2025-003', recipient: 'Mercy Medical Center', type: 'External', date: 'Dec 12, 2025', amount: 1200.00, status: 'Overdue', method: 'Credit' },
    { id: 'INV-2025-004', recipient: 'Sarah Adams', type: 'Patient', date: 'Dec 10, 2025', amount: 300.00, status: 'Paid', method: 'Cash' },
  ];

  // --- FILTERING LOGIC ---
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      // 1. Check Status Tab
      const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;

      // 2. Check Search Input (ID or Recipient)
      const matchesSearch =
        inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.recipient.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [statusFilter, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Invoices</h1>
          <p className="text-sm text-gray-500">Manage billing, payments, and financial records.</p>
        </div>
        <button className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:bg-gray-800 transition-all active:scale-95">
          <Plus size={18} />
          Create Invoice
        </button>
      </div>

      {/* SECTION 1: FINANCIAL SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Revenue" value="$42,850" trend="+8% from last month" icon={<FileText size={20} />} />
        <StatCard title="Paid Invoices" value="124" trend="92% completion" icon={<CheckCircle2 size={20} className="text-emerald-500" />} />
        <StatCard title="Pending" value="$3,200" trend="12 invoices" icon={<Clock size={20} className="text-amber-500" />} />
        <StatCard title="Overdue" value="$850" trend="Immediate action" icon={<AlertCircle size={20} className="text-red-500" />} />
      </div>

      {/* SECTION 2: FILTERS & SEARCH */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by Invoice ID or Recipient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black/5"
            />
          </div>

          {/* Functional Tabs */}
          <div className="flex p-1 bg-gray-100 rounded-xl">
            {['All', 'Paid', 'Pending', 'Overdue'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${statusFilter === s ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50">
            <Calendar size={16} />
            Date Range
          </button>
          <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* SECTION 3: INVOICE TABLE */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50/50 text-gray-400 text-[10px] font-bold uppercase tracking-widest border-b border-gray-100">
            <tr>
              <th className="px-6 py-4">Invoice ID</th>
              <th className="px-6 py-4">Recipient</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-900">{inv.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{inv.recipient}</div>
                    <div className="text-[10px] text-gray-400 uppercase font-bold">{inv.type}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{inv.date}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">${inv.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={inv.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white border border-gray-200 rounded-lg text-gray-500"><Eye size={16} /></button>
                      <button className="p-2 hover:bg-white border border-gray-200 rounded-lg text-gray-500"><Download size={16} /></button>
                      <button className="p-2 hover:bg-white border border-gray-200 rounded-lg text-gray-500"><ActionMenu /></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-400 italic">
                  No invoices found matching "{statusFilter}" criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINATION FOOTER */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
          <p className="text-xs text-gray-400 font-medium">
            Showing {filteredInvoices.length} of {invoices.length} invoices
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded-lg text-xs font-bold">Previous</button>
            <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold shadow-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---
const StatCard = ({ title, value, trend, icon }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-gray-50 rounded-lg text-gray-500">{icon}</div>
      <div className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
        <ArrowUpRight size={12} /> {trend}
      </div>
    </div>
    <h3 className="text-2xl font-bold mb-1">{value}</h3>
    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{title}</p>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles: any = {
    Paid: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    Pending: 'bg-amber-50 text-amber-600 border-amber-100',
    Overdue: 'bg-red-50 text-red-600 border-red-100',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${styles[status]}`}>
      {status}
    </span>
  );
};


function ActionMenu() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative group">
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-2 rounded hover:bg-gray-100"
      >
        <MoreVertical size={16} />
      </button>

      {open && (<div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-20">

        <button onClick={() => navigate("/admin/view-invoice")} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
          View Invoice
        </button>
        <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
          Record Payment
        </button>
        <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
          Download PDF
        </button>

        <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Send Reminder</button>
        <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Void Invoice</button>
      </div>)}

    </div>
  );
}

export default InvoicesListPage;