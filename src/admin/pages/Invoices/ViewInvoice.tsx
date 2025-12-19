import {
    AlertCircle,
    CheckCircle2,
    ChevronLeft,
    CreditCard,
    Download,
    ExternalLink,
    History,
    Mail,
    Printer,
    ShieldCheck
} from 'lucide-react';
import React, { useState } from 'react';

// --- Types ---

interface InvoiceItem {
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
}

interface InvoiceData {
    id: string;
    status: 'Paid' | 'Unpaid' | 'Partially Paid';
    invoiceDate: string;
    dueDate: string;
    amountDue: number;
    doctor: string;
    department: string;
    notes: string;
    patient: {
        name: string;
        id: string;
        email: string;
        phone: string;
        address: string;
        avatar?: string;
    };
    items: InvoiceItem[];
    subtotal: number;
    tax: number;
    total: number;
    amountPaid: number;
    balanceDue: number;
    insurance: {
        provider: string;
        policyNumber: string;
        claimStatus: string;
        claimAmount: number;
        claimDate: string;
        patientResponsibility: number;
    };
}

// --- Mock Data ---

const MOCK_INVOICE: InvoiceData = {
    id: 'INV-001',
    status: 'Partially Paid',
    invoiceDate: '2024-04-15',
    dueDate: '2024-05-15',
    amountDue: 50.00,
    doctor: 'Dr. Sarah Johnson',
    department: 'General Medicine',
    notes: 'Patient requested itemized receipt for insurance reimbursement.',
    patient: {
        name: 'John Smith',
        id: 'P12345',
        email: 'john.smith@example.com',
        phone: '(555) 123-4567',
        address: '123 Main St, Anytown, CA 12345',
    },
    items: [
        { description: 'General Consultation', quantity: 1, unitPrice: 150.00, amount: 150.00 },
        { description: 'Blood Test', quantity: 1, unitPrice: 100.00, amount: 100.00 },
    ],
    subtotal: 250.00,
    tax: 20.00,
    total: 270.00,
    amountPaid: 220.00,
    balanceDue: 50.00,
    insurance: {
        provider: 'Blue Cross Blue Shield',
        policyNumber: 'BCBS-123456789',
        claimStatus: 'Approved',
        claimAmount: 200.00,
        claimDate: '2024-04-18',
        patientResponsibility: 70.00,
    }
};

// --- Component ---

export const ViewInvoice: React.FC = () => {
    const data = MOCK_INVOICE;

    return (
        <div className="bg-gray-50 min-h-screen p-6 font-sans text-slate-900">
            {/* Top Navigation Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-4">
                    <button className="p-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold">Invoice {data.id}</h1>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">
                            {data.status}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <ActionButton icon={<Printer size={16} />} label="Print" />
                    <ActionButton icon={<Mail size={16} />} label="Email" />
                    <ActionButton icon={<Download size={16} />} label="Download PDF" />
                    <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                        <CreditCard size={16} />
                        Record Payment
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Invoice Details Card */}
                <div className="lg:col-span-2 bg-white rounded-xl border p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b pb-2">Invoice Details</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                        <DetailItem label="Invoice Number" value={data.id} />
                        <DetailItem label="Date" value={data.invoiceDate} />
                        <DetailItem label="Due Date" value={data.dueDate} />
                        <DetailItem label="Amount Due" value={`$${data.amountDue.toFixed(2)}`} isBold />
                        <DetailItem label="Doctor" value={data.doctor} />
                        <DetailItem label="Department" value={data.department} />
                        <div className="col-span-full">
                            <label className="block text-xs font-medium text-slate-400 mb-1">Notes</label>
                            <p className="text-sm text-slate-600 italic">{data.notes}</p>
                        </div>
                    </div>
                </div>

                {/* Patient Information Card */}
                <div className="bg-white rounded-xl border p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b pb-2">Patient Information</h3>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${data.patient.name}`} alt="avatar" />
                        </div>
                        <div>
                            <div className="font-bold text-lg">{data.patient.name}</div>
                            <div className="text-xs text-slate-400">ID: {data.patient.id}</div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <DetailItem label="Email" value={data.patient.email} />
                        <DetailItem label="Phone" value={data.patient.phone} />
                        <DetailItem label="Address" value={data.patient.address} />
                    </div>
                </div>
            </div>

            {/* Invoice Items Table */}
            <div className="bg-white rounded-xl border shadow-sm mb-6 overflow-hidden">
                <div className="p-4 border-b bg-gray-50/50">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Invoice Items</h3>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-xs font-medium text-slate-400 border-b">
                            <th className="px-6 py-3">Description</th>
                            <th className="px-6 py-3 text-center">Quantity</th>
                            <th className="px-6 py-3 text-right">Unit Price</th>
                            <th className="px-6 py-3 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y text-sm">
                        {data.items.map((item, idx) => (
                            <tr key={idx}>
                                <td className="px-6 py-4 font-medium">{item.description}</td>
                                <td className="px-6 py-4 text-center">{item.quantity}</td>
                                <td className="px-6 py-4 text-right">${item.unitPrice.toFixed(2)}</td>
                                <td className="px-6 py-4 text-right font-medium">${item.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Totals Section */}
                <div className="bg-gray-50/30 p-6 flex justify-end">
                    <div className="w-full max-w-xs space-y-2">
                        <TotalRow label="Subtotal" value={data.subtotal} />
                        <TotalRow label="Tax (8%)" value={data.tax} />
                        <div className="pt-2 border-t mt-2">
                            <TotalRow label="Total" value={data.total} isGrandTotal />
                            <TotalRow label="Amount Paid" value={data.amountPaid} isNegative />
                            <div className="flex justify-between items-center text-slate-900 font-bold mt-2 pt-2 border-t border-slate-200">
                                <span>Balance Due:</span>
                                <span>${data.balanceDue.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Section (Insurance/Payments) */}
            <div className="bg-white rounded-xl border shadow-sm">
                <ViewInvoiceTabs />
            </div>
        </div>
    );
};

// --- Helper Sub-components ---

const ActionButton = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
    <button className="flex items-center gap-2 bg-white border px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-gray-50 transition-colors shadow-sm">
        {icon}
        {label}
    </button>
);

const DetailItem = ({ label, value, isBold = false }: { label: string, value: string, isBold?: boolean }) => (
    <div>
        <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-tighter">{label}</label>
        <div className={`text-sm ${isBold ? 'font-bold' : 'text-slate-700 font-medium'}`}>{value}</div>
    </div>
);

const TotalRow = ({ label, value, isGrandTotal = false, isNegative = false }: { label: string, value: number, isGrandTotal?: boolean, isNegative?: boolean }) => (
    <div className={`flex justify-between items-center ${isGrandTotal ? 'text-lg font-bold text-slate-900' : 'text-sm text-slate-500 font-medium'}`}>
        <span>{label}:</span>
        <span>{isNegative ? '-' : ''}${value.toFixed(2)}</span>
    </div>
);




/* -------------------- UPDATED COMPONENT -------------------- */
const ViewInvoiceTabs = () => {
    const [activeTab, setActiveTab] = useState<'insurance' | 'payments'>('insurance');

    return (
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            {/* Tab Headers */}
            <div className="flex border-b px-4 bg-gray-50/30">
                <button
                    onClick={() => setActiveTab('insurance')}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative ${activeTab === 'insurance' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                        }`}
                >
                    <ShieldCheck size={18} />
                    Insurance Information
                    {activeTab === 'insurance' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />}
                </button>
                <button
                    onClick={() => setActiveTab('payments')}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative ${activeTab === 'payments' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                        }`}
                >
                    <History size={18} />
                    Payment History
                    {activeTab === 'payments' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />}
                </button>
            </div>

            <div className="p-8">
                {activeTab === 'insurance' ? <InsuranceView /> : <PaymentsView />}
            </div>
        </div>
    );
};

/* -------------------- INSURANCE TAB CONTENT -------------------- */
const InsuranceView = () => (
    <div className="space-y-8 animate-in fade-in duration-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Primary Provider</p>
                <p className="text-sm font-bold text-gray-900">Blue Cross Blue Shield</p>
                <p className="text-xs text-gray-500 font-medium">Policy ID: BCBS-99200123</p>
            </div>
            <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Claim Number</p>
                <p className="text-sm font-bold text-gray-900">CLM-2025-0882</p>
                <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 size={12} /> Approved
                </p>
            </div>
            <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Coverage Type</p>
                <p className="text-sm font-bold text-gray-900">PPO - Platinum Plan</p>
                <p className="text-xs text-gray-500 font-medium">80/20 Co-insurance</p>
            </div>
        </div>

        {/* Claim Progress Tracker */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h4 className="text-xs font-bold text-gray-900 mb-6 uppercase tracking-wider">Claim Life Cycle</h4>
            <div className="flex items-center w-full">
                <Step label="Submitted" date="Dec 12" completed />
                <Line completed />
                <Step label="Processing" date="Dec 14" completed />
                <Line completed />
                <Step label="Approved" date="Dec 16" completed />
                <Line completed={false} />
                <Step label="Paid to Clinic" date="Pending" completed={false} />
            </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="flex gap-4">
                <div className="text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Covered Amount</p>
                    <p className="text-lg font-bold text-gray-900">$220.00</p>
                </div>
                <div className="w-px h-10 bg-gray-100 mx-2" />
                <div className="text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Patient Owed</p>
                    <p className="text-lg font-bold text-red-500">$50.00</p>
                </div>
            </div>
            <button className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-black border border-gray-200 px-4 py-2 rounded-xl transition-all">
                <ExternalLink size={14} /> View Claim Explanation (EOB)
            </button>
        </div>
    </div>
);

/* -------------------- PAYMENTS TAB CONTENT -------------------- */
const PaymentsView = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
        <table className="w-full">
            <thead className="bg-gray-50/50">
                <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Method</th>
                    <th className="px-4 py-3 text-left">Transaction ID</th>
                    <th className="px-4 py-3 text-right">Amount</th>
                    <th className="px-4 py-3 text-right">Receipt</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                {[
                    { date: 'Dec 17, 2025', method: 'Visa ending in 4242', id: 'TXN-99201', amount: 150.00, status: 'Success' },
                    { date: 'Dec 17, 2025', method: 'Cash Payment', id: 'TXN-99188', amount: 70.00, status: 'Success' },
                ].map((pay, i) => (
                    <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">{pay.date}</td>
                        <td className="px-4 py-4 text-sm text-gray-600 flex items-center gap-2">
                            <CreditCard size={14} className="text-gray-400" /> {pay.method}
                        </td>
                        <td className="px-4 py-4 text-xs font-mono text-gray-400">{pay.id}</td>
                        <td className="px-4 py-4 text-sm font-bold text-right text-gray-900">${pay.amount.toFixed(2)}</td>
                        <td className="px-4 py-4 text-right">
                            <button className="p-1.5 text-gray-400 hover:text-black transition-colors">
                                <Download size={16} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex gap-3 items-start">
            <AlertCircle size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
                <p className="text-xs font-bold text-blue-900">Partial Payment Received</p>
                <p className="text-xs text-blue-700 font-medium">A balance of $50.00 remains. The patient has an active payment plan for this invoice.</p>
            </div>
        </div>
    </div>
);

/* -------------------- HELPERS -------------------- */
const Step = ({ label, date, completed }: { label: string, date: string, completed: boolean }) => (
    <div className="flex flex-col items-center gap-2 relative">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 ${completed ? 'bg-black border-gray-100 text-white' : 'bg-white border-gray-100 text-gray-300'
            }`}>
            {completed ? <CheckCircle2 size={16} /> : <div className="w-2 h-2 rounded-full bg-current" />}
        </div>
        <div className="text-center">
            <p className={`text-[11px] font-bold ${completed ? 'text-black' : 'text-gray-400'}`}>{label}</p>
            <p className="text-[10px] font-medium text-gray-400">{date}</p>
        </div>
    </div>
);

const Line = ({ completed }: { completed: boolean }) => (
    <div className="flex-1 h-0.5 bg-gray-200 mb-8 mx-2 relative">
        {completed && <div className="absolute top-0 left-0 h-full bg-black w-full" />}
    </div>
);