import {
    ChevronLeft,
    Clock,
    Download,
    FileText,
    Info,
    Mail,
    Printer,
    Search
} from 'lucide-react';
import React, { useState } from 'react';

// --- Types ---

interface ReceiptData {
    paymentId: string;
    receiptNumber: string;
    date: string;
    amount: number;
    method: string;
    referenceNumber: string;
    processedBy: string;
    status: 'Pending' | 'Completed' | 'Failed';
    patient: {
        name: string;
        id: string;
        email: string;
        phone: string;
        address: string;
    };
    invoice: {
        number: string;
        date: string;
        dueDate: string;
        description: string;
        totalAmount: number;
        amountPaid: number;
        remainingBalance: number;
        notes: string;
    };
}

// --- Mock Data ---

const MOCK_RECEIPT: ReceiptData = {
    paymentId: 'PMT-007',
    receiptNumber: 'RCP-007-2024',
    date: '2024-04-28',
    amount: 450.00,
    method: 'Check',
    referenceNumber: 'CHK-56789',
    processedBy: 'Amanda Wilson',
    status: 'Pending',
    patient: {
        name: 'Michael Johnson',
        id: 'P56789',
        email: 'michael.johnson@example.com',
        phone: '+1 (555) 678-9012',
        address: '567 Cedar Ln, Elsewhere, IL 60001',
    },
    invoice: {
        number: 'INV-005',
        date: '2024-04-25',
        dueDate: '2024-05-10',
        description: 'Orthopedic consultation and X-ray',
        totalAmount: 450.00,
        amountPaid: 450.00,
        remainingBalance: 0.00,
        notes: 'Check payment pending clearance',
    }
};

export const invoiceData = {
    id: "INV-2025-008",
    receiptNumber: "RCP-882-2025",
    status: "Partially Paid", // Options: Paid, Unpaid, Partially Paid, Overdue
    invoiceDate: "Dec 12, 2025",
    dueDate: "Jan 12, 2026",
    amountDue: 50.00,
    doctor: "Dr. Sarah Johnson",
    department: "Orthopedic Surgery",
    notes: "Patient requested a split payment plan. First installment cleared. Second installment due by end of month.",

    // Patient Profile
    patient: {
        name: "Michael Johnson",
        id: "P56789",
        email: "michael.johnson@example.com",
        phone: "+1 (555) 678-9012",
        address: "567 Cedar Ln, Elsewhere, IL 60001",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
    },

    // Itemized List
    items: [
        { description: "Orthopedic Consultation", quantity: 1, unitPrice: 250.00, amount: 250.00 },
        { description: "X-ray - Lower Extremity", quantity: 1, unitPrice: 200.00, amount: 200.00 },
        { description: "Medical Supplies (Brace)", quantity: 1, unitPrice: 75.00, amount: 75.00 }
    ],

    // Financial Summary
    subtotal: 525.00,
    tax: 42.00, // 8%
    totalAmount: 567.00,
    amountPaid: 517.00,
    remainingBalance: 50.00,

    // Insurance Data (For the Insurance Tab)
    insurance: {
        provider: "Blue Cross Blue Shield",
        policyNumber: "BCBS-99200123",
        groupNumber: "GRP-7721",
        claimNumber: "CLM-2025-0882",
        claimStatus: "Approved",
        claimDate: "Dec 14, 2025",
        coveredAmount: 420.00,
        patientResponsibility: 147.00, // Total - Insurance Coverage
        steps: [
            { label: "Submitted", date: "Dec 12", completed: true },
            { label: "Processing", date: "Dec 14", completed: true },
            { label: "Approved", date: "Dec 16", completed: true },
            { label: "Paid to Clinic", date: "Pending", completed: false }
        ]
    },

    // Payment History (For the Payments Tab)
    payments: [
        {
            id: "TXN-99201",
            date: "Dec 17, 2025",
            method: "Visa ending in 4242",
            amount: 450.00,
            status: "Completed",
            reference: "AUTH-88210"
        },
        {
            id: "TXN-99205",
            date: "Dec 17, 2025",
            method: "Cash",
            amount: 67.00,
            status: "Completed",
            reference: "CASH-001"
        }
    ]
};
// --- Component ---

export const PaymentReceipt: React.FC = () => {
    const data = MOCK_RECEIPT;

    return (
        <div className="bg-gray-50 min-h-screen p-6 font-sans text-slate-900">

            {/* Top Header & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-4">
                    <button className="p-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                        <ChevronLeft size={20} className="text-slate-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Payment Receipt</h1>
                        <p className="text-xs text-slate-500 font-medium">{data.paymentId} • {data.receiptNumber}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 bg-white border px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-gray-50 transition-all shadow-sm">
                        <Download size={16} /> Download
                    </button>
                    <button className="flex items-center gap-2 bg-white border px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-gray-50 transition-all shadow-sm">
                        <Printer size={16} /> Print
                    </button>
                    <div className="h-6 w-px bg-slate-200 mx-1" />
                    <button className="flex items-center gap-2 bg-white border px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-gray-50 transition-all shadow-sm">
                        <Mail size={16} /> Email Receipt
                    </button>
                    <button className="flex items-center gap-2 bg-white border px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-gray-50 transition-all shadow-sm">
                        <FileText size={16} /> View Invoice
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

                {/* Left: Payment Details Card */}
                <div className="lg:col-span-2 bg-white rounded-xl border p-6 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Payment Details</h3>
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-50 text-orange-600 border border-orange-100 uppercase">
                            <Clock size={12} /> {data.status}
                        </span>
                    </div>

                    <div className="space-y-4">
                        <DataRow label="Payment ID" value={data.paymentId} />
                        <DataRow label="Receipt Number" value={data.receiptNumber} />
                        <DataRow label="Date" value={data.date} />
                        <DataRow label="Amount" value={`$${data.amount.toFixed(2)}`} isBold />
                        <DataRow label="Payment Method" value={data.method} />
                        <DataRow label="Check Number" value={data.referenceNumber} />
                        <DataRow label="Processed By" value={data.processedBy} />
                    </div>
                </div>

                {/* Right: Patient Information Card */}
                <div className="bg-white rounded-xl border p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6">Patient Information</h3>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold border">
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${data.patient.name}`}
                                alt="avatar"
                                className="rounded-full"
                            />
                        </div>
                        <div>
                            <div className="font-bold text-slate-900">{data.patient.name}</div>
                            <div className="text-xs text-slate-400 font-medium">ID: {data.patient.id}</div>
                        </div>
                    </div>

                    <div className="space-y-4 border-t pt-4">
                        <InfoItem label="Email" value={data.patient.email} />
                        <InfoItem label="Phone" value={data.patient.phone} />
                        <InfoItem label="Address" value={data.patient.address} />
                    </div>
                </div>
            </div>

            {/* Linked Invoice Details */}
            <InvoiceDetailsTabs invoiceData={invoiceData} />

            {/* Conditional Status Alert (Pending) */}
            {data.status === 'Pending' && (
                <div className="bg-orange-50/50 rounded-xl border border-orange-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex gap-3">
                        <Clock className="text-orange-500 shrink-0" size={20} />
                        <div>
                            <h4 className="text-sm font-bold text-orange-900">Payment Pending</h4>
                            <p className="text-sm text-orange-700 font-medium">This payment is currently pending. It may take some time to complete.</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 bg-white border border-orange-200 px-4 py-2 rounded-lg text-sm font-bold text-orange-700 hover:bg-orange-100/50 transition-all shadow-sm">
                        <Search size={16} /> Check Status
                    </button>
                </div>
            )}
        </div>
    );
};


/* -------------------- UPDATED INVOICE DETAILS COMPONENT -------------------- */
export const InvoiceDetailsTabs = ({ invoiceData }: { invoiceData: any }) => {
    const [activeSubTab, setActiveSubTab] = useState<'details' | 'items'>('details');

    return (
        <div className="bg-white rounded-xl border shadow-sm mb-6 overflow-hidden">
            {/* Tab Navigation */}
            <div className="p-4 border-b bg-gray-50/30 flex gap-2">
                <button
                    onClick={() => setActiveSubTab('details')}
                    className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${activeSubTab === 'details'
                        ? 'bg-white shadow-sm border text-black'
                        : 'text-gray-400 hover:text-gray-600'
                        }`}
                >
                    Invoice Details
                </button>
                <button
                    onClick={() => setActiveSubTab('items')}
                    className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${activeSubTab === 'items'
                        ? 'bg-white shadow-sm border text-black'
                        : 'text-gray-400 hover:text-gray-600'
                        }`}
                >
                    Line Items
                </button>
            </div>

            <div className="p-6">
                {activeSubTab === 'details' ? (
                    <DetailsView data={invoiceData} />
                ) : (
                    <LineItemsView />
                )}
            </div>

            {/* Persistent Notes Footer */}
            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
                <div className="flex items-start gap-2">
                    <Info size={14} className="text-gray-400 mt-0.5" />
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Internal Notes</p>
                        <p className="text-sm text-gray-600 italic font-medium">
                            {invoiceData.notes || "No additional notes provided for this invoice."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* -------------------- INVOICE SUMMARY VIEW -------------------- */
const DetailsView = ({ data }: { data: any }) => (
    <div className="grid grid-cols-1 gap-1 animate-in fade-in duration-200">
        <ReceiptDataRow label="Invoice Number" value={data.number} />
        <ReceiptDataRow label="Invoice Date" value={data.date} />
        <ReceiptDataRow label="Due Date" value={data.dueDate} />
        <ReceiptDataRow label="Description" value={data.description} />
        <div className="h-4" /> {/* Spacer */}
        <ReceiptDataRow label="Total Amount" value={`$${data.totalAmount.toFixed(2)}`} />
        <ReceiptDataRow label="Amount Paid" value={`$${data.amountPaid.toFixed(2)}`} />
        <ReceiptDataRow
            label="Remaining Balance"
            value={`$${data.remainingBalance.toFixed(2)}`}
            isHighlighted
        />
    </div>
);

/* -------------------- LINE ITEMS TABLE VIEW -------------------- */
const LineItemsView = () => (
    <div className="animate-in slide-in-from-right-2 fade-in duration-200">
        <table className="w-full">
            <thead>
                <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <th className="text-left py-3">Item Description</th>
                    <th className="text-center py-3">Quantity</th>
                    <th className="text-right py-3">Price</th>
                    <th className="text-right py-3">Total</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                {[
                    { desc: 'Orthopedic Consultation', qty: 1, price: 250.00 },
                    { desc: 'X-ray (Lower Limb)', qty: 1, price: 200.00 }
                ].map((item, idx) => (
                    <tr key={idx} className="text-sm">
                        <td className="py-4 font-bold text-gray-900">{item.desc}</td>
                        <td className="py-4 text-center text-gray-600">{item.qty}</td>
                        <td className="py-4 text-right text-gray-600">${item.price.toFixed(2)}</td>
                        <td className="py-4 text-right font-bold text-gray-900">${(item.qty * item.price).toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr className="border-t-2 border-gray-900">
                    <td colSpan={3} className="py-4 text-right text-sm font-bold uppercase text-gray-400">Total Billable</td>
                    <td className="py-4 text-right text-lg font-black text-gray-900">$450.00</td>
                </tr>
            </tfoot>
        </table>
    </div>
);

/* -------------------- UI COMPONENTS -------------------- */
const ReceiptDataRow = ({ label, value, isHighlighted = false }: { label: string, value: string, isHighlighted?: boolean }) => (
    <div className={`flex justify-between items-center py-2 px-2 rounded-lg transition-colors ${isHighlighted ? 'bg-slate-900 text-white' : 'hover:bg-gray-50'}`}>
        <span className={`text-sm ${isHighlighted ? 'text-slate-300' : 'text-gray-500'} font-medium`}>{label}</span>
        <span className={`text-sm font-bold ${isHighlighted ? 'text-white' : 'text-gray-900'}`}>{value}</span>
    </div>
);

// --- Helper Components ---

const DataRow = ({ label, value, isBold = false }: { label: string, value: string, isBold?: boolean }) => (
    <div className="flex justify-between items-center text-sm py-0.5">
        <span className="text-slate-500 font-medium">{label}</span>
        <span className={`${isBold ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>{value}</span>
    </div>
);

const InfoItem = ({ label, value }: { label: string, value: string }) => (
    <div>
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">{label}</label>
        <div className="text-sm text-slate-700 font-semibold">{value}</div>
    </div>
);