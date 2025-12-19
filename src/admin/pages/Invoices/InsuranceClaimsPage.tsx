import {
    AlertCircle,
    ArrowUpRight,
    CheckCircle2,
    ChevronDown,
    Clock,
    Download,
    FileText,
    Filter,
    MoreHorizontal,
    MoreVertical,
    Search,
    ShieldCheck
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';


// --- Types ---

interface ClaimService {
    description: string;
    date: string;
    billed: number;
    allowed: number;
    patientResp: number;
}

interface ClaimDetailsData {
    claimId: string;
    provider: string;
    submissionDate: string;
    status: 'Approved' | 'Pending' | 'Rejected' | 'Submitted';
    patient: {
        name: string;
        id: string;
        policyNumber: string;
        groupNumber: string;
        relationship: string;
        avatar?: string;
    };
    claimInfo: {
        type: string;
        amount: number;
        approvedAmount: number;
        patientResponsibility: number;
        paymentDate: string;
    };
    services: ClaimService[];
    notes: string;
}

// --- Mock Data ---

const MOCK_CLAIM_DETAIL: ClaimDetailsData = {
    claimId: 'CLM-001',
    provider: 'Blue Cross Blue Shield',
    submissionDate: '2024-04-15',
    status: 'Approved',
    patient: {
        name: 'John Smith',
        id: 'P12345',
        policyNumber: 'BCBS123456789',
        groupNumber: 'GRP987654321',
        relationship: 'Self',
    },
    claimInfo: {
        type: 'Medical',
        amount: 200.00,
        approvedAmount: 180.00,
        patientResponsibility: 20.00,
        paymentDate: '2024-04-22'
    },
    services: [
        { description: 'General Consultation', date: '2024-04-15', billed: 150.00, allowed: 135.00, patientResp: 15.00 },
        { description: 'Blood Test - Basic Panel', date: '2024-04-15', billed: 50.00, allowed: 45.00, patientResp: 5.00 }
    ],
    notes: 'Claim approved with standard copay deduction'
};
// --- Types ---
type ClaimStatus = 'Approved' | 'Pending' | 'Rejected' | 'In Progress';

interface Claim {
    id: string;
    patient: string;
    provider: string;
    policyNumber: string;
    amount: number;
    date: string;
    status: ClaimStatus;
}

// --- Mock Data ---
const MOCK_CLAIMS: Claim[] = [
    { id: 'CLM-8821', patient: 'Michael Johnson', provider: 'Blue Cross Blue Shield', policyNumber: 'BCBS-99200', amount: 450.00, date: '2025-12-12', status: 'Approved' },
    { id: 'CLM-8822', patient: 'Emily Davis', provider: 'Aetna', policyNumber: 'AET-44102', amount: 1200.00, date: '2025-12-14', status: 'Pending' },
    { id: 'CLM-8823', patient: 'John Smith', provider: 'UnitedHealthcare', policyNumber: 'UHC-11223', amount: 310.00, date: '2025-12-15', status: 'In Progress' },
    { id: 'CLM-8824', patient: 'Sarah Wilson', provider: 'Cigna', policyNumber: 'CIG-88721', amount: 95.00, date: '2025-12-16', status: 'Rejected' },
];

export const InsuranceClaimsPage = () => {
    const [activeTab, setActiveTab] = useState<'All' | ClaimStatus>('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredClaims = useMemo(() => {
        return MOCK_CLAIMS.filter(claim => {
            const matchesTab = activeTab === 'All' || claim.status === activeTab;
            const matchesSearch = claim.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                claim.id.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTab && matchesSearch;
        });
    }, [activeTab, searchQuery]);

    return (
        <>
            {/* PAGE HEADER */}
            {/* UPDATED PAGE HEADER WITH INTEGRATED FILTERS */}
            <div className="flex flex-col space-y-6 mb-8">
                {/* Top Row: Title & Primary Action */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-100">
                            <ShieldCheck size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight text-slate-900">Insurance Claims</h1>
                            <p className="text-sm text-slate-500 font-medium leading-none mt-1">
                                Showing 128 total claims processed this month
                            </p>
                        </div>
                    </div>

                    <button className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-slate-900 rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                        <ArrowUpRight size={18} />
                        Submit New Claim
                    </button>
                </div>

                {/* Bottom Row: Search, Filter, and Utility Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-2 rounded-2xl border shadow-sm">
                    {/* Integrated Search Input */}
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search claims by Patient Name, ID, or Provider..."
                            className="w-full pl-12 pr-4 py-3 bg-transparent text-sm font-medium focus:outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="h-8 w-px bg-slate-100 hidden sm:block" />

                    {/* Filter Icon & Dropdown */}
                    <div className="flex items-center gap-2 w-full sm:w-auto px-2">
                        <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
                            <Filter size={18} />
                            <span className="hidden lg:inline">Filters</span>
                            <ChevronDown size={14} className="text-slate-400" />
                        </button>

                        {/* Download Icon Button */}
                        <button
                            title="Download Report"
                            className="p-2.5 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all border border-transparent hover:border-blue-100"
                        >
                            <Download size={20} />
                        </button>

                        {/* More Options */}
                        <button className="p-2.5 text-slate-400 hover:text-slate-900 transition-colors">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="p-6 bg-gray-50 min-h-screen text-slate-900 font-sans">

                {/* SECTION 1: TOP SUMMARY CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <StatCard title="Total Claims" value="128" subtext="+12% from last month" icon={<FileText className="text-blue-600" size={20} />} />
                    <StatCard title="Approved" value="94" subtext="73% success rate" icon={<CheckCircle2 className="text-emerald-600" size={20} />} />
                    <StatCard title="Pending" value="22" subtext="Average 3 days" icon={<Clock className="text-orange-600" size={20} />} />
                    <StatCard title="Rejected" value="12" subtext="Requires attention" icon={<AlertCircle className="text-red-600" size={20} />} />
                </div>

                {/* FILTER TABS & SEARCH BAR */}
                <div className="bg-white rounded-t-2xl border-x border-t p-5 shadow-sm">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
                            {['All', 'Approved', 'Pending', 'In Progress', 'Rejected'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === tab ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search patient or ID..."
                                    className="pl-10 pr-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 w-64"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button className="p-2 border rounded-xl hover:bg-gray-50"><Filter size={18} className="text-gray-600" /></button>
                            <button className="p-2 border rounded-xl hover:bg-gray-50"><Download size={18} className="text-gray-600" /></button>
                        </div>
                    </div>
                </div>

                {/* SECTION 2: CLAIMS TABLE */}
                <div className="bg-white border rounded-b-2xl shadow-sm overflow-hidden mb-8">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 text-[10px] uppercase tracking-widest text-gray-400 font-bold border-b">
                                <th className="px-6 py-4">Claim ID</th>
                                <th className="px-6 py-4">Patient</th>
                                <th className="px-6 py-4">Insurance Provider</th>
                                <th className="px-6 py-4">Date Submitted</th>
                                <th className="px-6 py-4 text-right">Amount</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y text-sm">
                            {filteredClaims.map((claim) => (
                                <tr key={claim.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer">
                                    <td className="px-6 py-4 font-bold text-gray-900">{claim.id}</td>
                                    <td className="px-6 py-4 font-medium">{claim.patient}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-gray-900 font-medium">{claim.provider}</span>
                                            <span className="text-[10px] text-gray-400 font-mono">{claim.policyNumber}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{claim.date}</td>
                                    <td className="px-6 py-4 text-right font-bold text-gray-900">${claim.amount.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={claim.status} />
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <ActionMenu />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <ClaimDetails />

            </div>
        </>
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

                <button onClick={() => navigate("/admin/claim-details")} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                    View Details
                </button>

                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Download Claim</button>
            </div>)}

        </div>
    );
}


// --- Main Component ---

const ClaimDetails = () => {
    const data = MOCK_CLAIM_DETAIL;

    return (
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden font-sans text-slate-900">
            {/* Header Section */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">Claim Details</h2>
                        <p className="text-xs text-slate-400 font-medium">View detailed information about a selected claim.</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${data.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                        }`}>
                        {data.status}
                    </span>
                </div>

                <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold">Claim {data.claimId}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <span>{data.provider}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span>Submitted on {data.submissionDate}</span>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {/* Info Grid: Patient & Claim Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
                    {/* Patient Information */}
                    <section>
                        <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                            Patient Information
                        </h4>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border overflow-hidden">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${data.patient.name}`} alt="avatar" />
                            </div>
                            <div>
                                <div className="font-bold text-slate-900">{data.patient.name}</div>
                                <div className="text-xs text-slate-400 font-medium tracking-tight">ID: {data.patient.id}</div>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <DetailRow label="Policy Number" value={data.patient.policyNumber} />
                            <DetailRow label="Group Number" value={data.patient.groupNumber} />
                            <DetailRow label="Relationship to Subscriber" value={data.patient.relationship} />
                        </div>
                    </section>

                    {/* Claim Information */}
                    <section>
                        <h4 className="text-sm font-bold text-slate-800 mb-4">Claim Information</h4>
                        <div className="space-y-1.5 pt-2">
                            <DetailRow label="Claim Type" value={data.claimInfo.type} />
                            <DetailRow label="Claim Amount" value={`$${data.claimInfo.amount.toFixed(2)}`} />
                            <DetailRow label="Approved Amount" value={`$${data.claimInfo.approvedAmount.toFixed(2)}`} />
                            <DetailRow label="Patient Responsibility" value={`$${data.claimInfo.patientResponsibility.toFixed(2)}`} />
                            <DetailRow label="Payment Date" value={data.claimInfo.paymentDate} />
                        </div>
                    </section>
                </div>

                {/* Services & Procedures Table */}
                <section className="mb-8">
                    <h4 className="text-sm font-bold text-slate-800 mb-4">Services & Procedures</h4>
                    <div className="border rounded-xl overflow-hidden">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 text-[10px] uppercase tracking-widest text-slate-400 font-bold border-b">
                                    <th className="px-4 py-3">Service</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3 text-right">Billed</th>
                                    <th className="px-4 py-3 text-right">Allowed</th>
                                    <th className="px-4 py-3 text-right">Patient Resp.</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {data.services.map((service, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                                        <td className="px-4 py-4 font-medium text-slate-700">{service.description}</td>
                                        <td className="px-4 py-4 text-slate-500">{service.date}</td>
                                        <td className="px-4 py-4 text-right text-slate-700 font-medium">${service.billed.toFixed(2)}</td>
                                        <td className="px-4 py-4 text-right text-slate-700 font-medium">${service.allowed.toFixed(2)}</td>
                                        <td className="px-4 py-4 text-right text-slate-700 font-bold">${service.patientResp.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Notes Section */}
                <section className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Notes</h4>
                    <p className="text-sm text-slate-600 font-medium italic">{data.notes}</p>
                </section>
            </div>

            {/* Footer Actions */}
            <div className="bg-gray-50/50 px-6 py-4 border-t flex flex-col sm:flex-row justify-end gap-3">
                <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 bg-white border rounded-xl hover:bg-gray-50 transition-all">
                    <Download size={16} /> Download EOB
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 bg-white border rounded-xl hover:bg-gray-50 transition-all">
                    <FileText size={16} /> View Invoice
                </button>
                <button className="flex items-center justify-center gap-2 px-5 py-2 text-sm font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-all shadow-md">
                    <CheckCircle2 size={16} /> Mark as Reconciled
                </button>
            </div>
        </div>
    );
};

const DetailRow = ({ label, value }: { label: string, value: string }) => (
    <div className="flex justify-between items-center text-sm">
        <span className="text-slate-500 font-medium">{label}:</span>
        <span className="text-slate-900 font-bold">{value}</span>
    </div>
);
// --- Helper Components ---

const StatCard = ({ title, value, subtext, icon }: any) => (
    <div className="bg-white p-5 rounded-2xl border shadow-sm">
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-gray-50 rounded-xl">{icon}</div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Active</span>
        </div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-black text-gray-900 my-1">{value}</p>
        <p className="text-[10px] font-medium text-gray-500">{subtext}</p>
    </div>
);

const StatusBadge = ({ status }: { status: ClaimStatus }) => {
    const styles: any = {
        Approved: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        Pending: 'bg-orange-50 text-orange-600 border-orange-100',
        'In Progress': 'bg-blue-50 text-blue-600 border-blue-100',
        Rejected: 'bg-red-50 text-red-600 border-red-100',
    };
    return (
        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase border ${styles[status]}`}>
            {status}
        </span>
    );
};
