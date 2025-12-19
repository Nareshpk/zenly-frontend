import {
    Award,
    Calendar, CheckCircle2,
    Clock,
    MapPin,
    MoreVertical,
    Plus,
    RefreshCw,
    Search,
    Users,
    X
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis
} from 'recharts';

// --- Types & Mock Data ---
interface Donor {
    id: string;
    name: string;
    bloodType: string;
    email: string;
    phone: string;
    lastDonation: string;
    status: 'Active' | 'Ineligible' | 'New Donor';
    totalDonations: number;
    nextEligible: string;
}

const DONOR_DATA: Donor[] = [
    { id: 'D-1004', name: 'Emily Rodriguez', bloodType: 'AB+', email: 'emily.r@example.com', phone: '+1 (234) 5678', lastDonation: 'Never', status: 'New Donor', totalDonations: 0, nextEligible: 'N/A' },
    { id: 'D-1005', name: 'John Smith', bloodType: 'O+', email: 'john.s@example.com', phone: '+1 (123) 4567', lastDonation: '2023-11-15', status: 'Active', totalDonations: 12, nextEligible: '2024-02-15' },
    { id: 'D-1006', name: 'Sarah Chen', bloodType: 'A-', email: 's.chen@example.com', phone: '+1 (987) 6543', lastDonation: '2023-12-01', status: 'Ineligible', totalDonations: 5, nextEligible: '2024-06-01' },
];

const typeData = [
    { name: 'O+', value: 38, color: '#ef4444' },
    { name: 'A+', value: 18, color: '#3b82f6' },
    { name: 'B+', value: 12, color: '#10b981' },
    { name: 'AB+', value: 6, color: '#a855f7' },
    { name: 'O-', value: 9, color: '#991b1b' },
    { name: 'A-', value: 7, color: '#1e40af' },
];

const freqData = [
    { name: 'First Time', count: 98 },
    { name: '2-4 Times', count: 107 },
    { name: '5-9 Times', count: 24 },
    { name: '10-24 Times', count: 12 },
    { name: '25+', count: 6 },
];

const BloodDonorsPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('All Donors');
    const [searchTerm, setSearchTerm] = useState('');
    const [bloodTypeFilter, setBloodTypeFilter] = useState('All Blood Types');

    // --- Filtering Logic ---
    const filteredDonors = useMemo(() => {
        return DONOR_DATA.filter(donor => {
            const matchesTab =
                activeTab === 'All Donors' ||
                (activeTab === 'Eligible' && donor.status === 'Active') ||
                (activeTab === 'Ineligible' && donor.status === 'Ineligible') ||
                (activeTab === 'New' && donor.status === 'New Donor');

            const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                donor.id.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesType = bloodTypeFilter === 'All Blood Types' || donor.bloodType === bloodTypeFilter;

            return matchesTab && matchesSearch && matchesType;
        });
    }, [activeTab, searchTerm, bloodTypeFilter]);

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Blood Donors</h1>
                    <p className="text-sm text-gray-500">Manage and track blood donors</p>
                </div>
                <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-bold">
                    <Plus size={18} /> Register New Donor
                </button>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <SummaryCard title="Total Donors" value="247" icon={<Users size={20} />} />
                <SummaryCard title="Donations/Month" value="38" icon={<Calendar size={20} />} />
                <SummaryCard title="Eligible" value="183" badge="Active" icon={<CheckCircle2 size={20} />} />
                <SummaryCard title="VIP Donors" value="42" badge="VIP" icon={<Award size={20} />} />
            </div>

            {/* Recharts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-gray-200 h-80">
                    <h3 className="text-sm font-bold mb-4">Donors by Blood Type</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={typeData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                            <Tooltip cursor={{ fill: '#f9fafb' }} />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                {typeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 h-80">
                    <h3 className="text-sm font-bold mb-4">Donation Frequency</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={freqData}>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                            <YAxis axisLine={false} tickLine={false} hide />
                            <Tooltip />
                            <Bar dataKey="count" fill="#64748b" radius={[4, 4, 0, 0]} label={{ position: 'top', fontSize: 10 }} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search name or ID..."
                                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64 outline-none focus:ring-1 focus:ring-black"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            className="border border-gray-200 rounded-lg text-sm px-3 py-2 bg-white"
                            onChange={(e) => setBloodTypeFilter(e.target.value)}
                        >
                            <option>All Blood Types</option>
                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(t => <option key={t}>{t}</option>)}
                        </select>
                        <button className="p-2 border border-gray-200 rounded-lg" onClick={() => { setSearchTerm(''); setBloodTypeFilter('All Blood Types'); }}>
                            <RefreshCw size={18} className="text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Active Tabs */}
                <div className="flex gap-4 px-4 py-2 bg-gray-50/50 border-b border-gray-100">
                    {['All Donors', 'Eligible', 'Ineligible', 'New'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${activeTab === tab ? 'bg-white shadow-sm border border-gray-200 text-black' : 'text-gray-500'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="text-gray-500 border-b border-gray-100 bg-gray-50/20">
                            <tr>
                                <th className="px-6 py-4">Donor</th>
                                <th className="px-6 py-4">Blood Type</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Donations</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredDonors.map((donor) => (
                                <tr key={donor.id} className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4">
                                        <div className="font-bold">{donor.name}</div>
                                        <div className="text-[10px] text-gray-400">{donor.id}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-0.5 border border-gray-200 rounded-full text-[10px] font-bold">{donor.bloodType}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${donor.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                                            donor.status === 'Ineligible' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {donor.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium">{donor.totalDonations}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-gray-600"><ActionMenu onClose={setIsOpen} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ScheduleDonationModal isOpen={isOpen} onClose={setIsOpen} donorName={"John Smith"} bloodType={"O+"} />
        </div>
    );
};

// --- Sub-components ---
const SummaryCard = ({ title, value, icon, badge }: any) => (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-bold text-gray-900">{title}</h3>
            <div className="flex items-center gap-2">
                {badge && <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-purple-100 text-purple-600 uppercase">{badge}</span>}
                <div className="text-gray-400">{icon}</div>
            </div>
        </div>
        <div className="text-3xl font-bold">{value}</div>
    </div>
);


function ActionMenu({ onClose }: { onClose: any }) {
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

                <button onClick={() => navigate("/admin/donor-details")} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                    View Donor Details
                </button>
                <button onClick={() => onClose(true)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                    Schedule Donation
                </button>

                <button onClick={() => navigate("/admin/blood-bank/edit")} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Edit Donor Info</button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600">View Donation History</button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600">Print Donor Card</button>
            </div>)}

        </div>
    );
}




const ScheduleDonationModal = ({ isOpen, onClose, donorName = "John Smith", bloodType = "O+" }: any) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                {/* Header */}
                <div className="p-6 pb-2 flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Schedule Donation</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Schedule a blood donation appointment for <span className="font-semibold text-gray-700">{donorName} ({bloodType})</span>
                        </p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Form Content */}
                <div className="p-6 space-y-5">
                    {/* Donation Type */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Donation Type</label>
                        <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-black outline-none transition-all">
                            <option value="">Select donation type</option>
                            <option value="whole">Whole Blood</option>
                            <option value="plasma">Plasma</option>
                            <option value="platelets">Platelets</option>
                        </select>
                    </div>

                    {/* Date & Time Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Date</label>
                            <div className="relative">
                                <input type="date" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-black outline-none" />
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Time</label>
                            <div className="relative">
                                <select className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-black outline-none">
                                    <option>Select time</option>
                                    <option>09:00 AM</option>
                                    <option>10:30 AM</option>
                                </select>
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Location</label>
                        <div className="relative">
                            <select className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-black outline-none">
                                <option>Select location</option>
                                <option>Main Clinic - Room 4</option>
                                <option>East Side Center</option>
                            </select>
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Notes</label>
                        <textarea
                            rows={3}
                            placeholder="Any special instructions or notes"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-black outline-none resize-none"
                        />
                        <p className="text-[10px] text-gray-400 mt-1.5 italic">Optional notes for the donation appointment</p>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 pt-2 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button className="flex-1 px-4 py-2.5 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 shadow-lg shadow-black/10 transition-all">
                        Schedule Donation
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BloodDonorsPage;

