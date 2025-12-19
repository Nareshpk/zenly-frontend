import {
    ArrowLeft,
    Calendar, Clock,
    Download,
    Printer,
    RefreshCw,
    Trash2
} from 'lucide-react';
import React, { useState } from 'react';

type TabType = 'Details' | 'Donor Information' | 'Screening & Processing' | 'History';

const BloodUnitDetails: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('Details');

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
            {/* Top Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-2xl font-bold">Blood Unit Details</h1>
                    <div className="flex gap-2">
                        <span className="px-2 py-0.5 border border-gray-300 rounded-md text-xs font-bold bg-white">A+</span>
                        <span className="px-3 py-0.5 bg-emerald-500 text-white rounded-full text-xs font-semibold">Available</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <ActionButton icon={<Printer size={18} />} label="Print Label" />
                    <ActionButton icon={<Download size={18} />} label="Export" />
                    <ActionButton icon={<RefreshCw size={18} />} label="Update Status" />
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors">
                        <Trash2 size={18} /> Discard Unit
                    </button>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex gap-2 mb-6">
                {(['Details', 'Donor Information', 'Screening & Processing', 'History'] as TabType[]).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab
                                ? 'bg-white shadow-sm border border-gray-200 text-black'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="space-y-6">
                {activeTab === 'Details' && <DetailsTab />}
                {activeTab === 'Donor Information' && <DonorTab />}
                {activeTab === 'Screening & Processing' && <ScreeningTab />}
                {activeTab === 'History' && <HistoryTab />}
            </div>
        </div>
    );
};

// --- Sub-components for Tabs ---

const DetailsTab = () => (
    <>
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold mb-1">Blood Unit Information</h2>
            <p className="text-sm text-gray-400 mb-8">Details about this blood unit</p>

            <div className="grid grid-cols-2 gap-y-8">
                <DataField label="Blood Unit ID" value="BS-001" />
                <DataField label="Collection Date" value="2023-04-15" icon={<Calendar size={16} />} />
                <DataField label="Blood Type" value="A+" />
                <DataField label="Expiry Date" value="2023-05-15" icon={<Calendar size={16} />} />
                <DataField label="Units" value="12 units" />
                <DataField label="Storage Location" value="Refrigerator 1" />
                <div className="col-span-1">
                    <span className="px-2 py-0.5 bg-emerald-500 text-white rounded-md text-[10px] font-bold">Available</span>
                </div>
                <DataField label="Shelf Life Remaining" value="30 days" icon={<Clock size={16} />} />
            </div>
            <p className="mt-8 text-xs text-gray-400">Last updated: 2023-04-16 03:45 PM</p>
        </div>

        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold mb-1">Notes</h2>
            <p className="text-sm text-gray-400 mb-6">Additional information about this blood unit</p>
            <p className="text-sm text-gray-700">Donor was in excellent health. Blood collected without complications.</p>
        </div>
    </>
);



const DonorTab = () => {
    return (
        <div className="space-y-6">
            {/* General Donor Information Card */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold mb-1">Donor Information</h2>
                <p className="text-sm text-gray-400 mb-8">Details about the blood donor</p>

                <div className="grid grid-cols-2 gap-y-8">
                    <DataField label="Donor ID" value="D-1045" isLink />
                    <DataField label="Contact" value="+1 (555) 123-4567" />
                    <DataField label="Donor Name" value="John Smith" />
                    <DataField label="Email" value="john.smith@example.com" />
                    <DataField label="Age" value="32 years" />
                    <DataField label="Address" value="123 Main St, Anytown, USA" />
                    <DataField label="Gender" value="Male" />
                </div>
            </div>

            {/* Donor Health Information Card (Previously Missing) */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold mb-1">Donor Health Information</h2>
                <p className="text-sm text-gray-400 mb-8">Health details recorded during donation</p>

                <div className="grid grid-cols-2 gap-y-8">
                    <DataField label="Blood Pressure" value="120/80" />
                    <DataField label="Hemoglobin" value="14.5 g/dL" />
                </div>
            </div>
        </div>
    );
};

// Reusable DataField Component (Ensure this is available in your file)
const DataField = ({ label, value, icon, isLink }: { label: string, value: string, icon?: React.ReactNode, isLink?: boolean }) => (
    <div>
        <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">{label}</p>
        <div className={`flex items-center gap-2 text-sm font-bold ${isLink ? 'text-blue-600 cursor-pointer hover:underline' : 'text-gray-900'}`}>
            {icon && <span className="text-gray-400">{icon}</span>}
            {value}
        </div>
    </div>
);


const ScreeningTab = () => (
    <div className="space-y-6">
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Screening Results</h2>
            <div className="grid grid-cols-3 gap-8">
                {['Hiv', 'HepatitisB', 'HepatitisC', 'Syphilis', 'Malaria'].map(test => (
                    <div key={test}>
                        <p className="text-sm font-bold text-gray-800 mb-2">{test}</p>
                        <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-[10px] font-bold">Negative</span>
                    </div>
                ))}
            </div>
        </div>
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold mb-1">Processing Details</h2>
            <p className="text-sm text-gray-400 mb-8">Information about blood processing</p>
            <div className="grid grid-cols-2 gap-y-8">
                <DataField label="Processed By" value="Dr. Jane Wilson" />
                <DataField label="Separation Method" value="Centrifugation" />
                <DataField label="Processed Date" value="2023-04-15" icon={<Calendar size={16} />} />
                <div>
                    <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Quality Check</p>
                    <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-[10px] font-bold">Passed</span>
                </div>
            </div>
            <div className="mt-8">
                <p className="text-sm font-bold text-gray-800 mb-4">Components Separated</p>
                <div className="flex gap-2">
                    {['Red Blood Cells', 'Plasma', 'Platelets'].map(tag => (
                        <span key={tag} className="px-3 py-1 border border-gray-200 rounded-full text-xs font-medium bg-gray-50">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const HistoryTab = () => {
    const logs = [
        { event: 'Blood Collected', user: 'Nurse Thompson', msg: 'Collection completed successfully', date: '2023-04-15 09:30 AM' },
        { event: 'Screening Completed', user: 'Lab Tech Johnson', msg: 'All screening tests negative', date: '2023-04-15 10:15 AM' },
        { event: 'Processing Completed', user: 'Dr. Jane Wilson', msg: 'Blood processed and components separated', date: '2023-04-15 02:30 PM' },
        { event: 'Quality Check', user: 'Quality Officer Davis', msg: 'All quality parameters within acceptable range', date: '2023-04-16 11:00 AM' },
        { event: 'Storage', user: 'Blood Bank Technician Lee', msg: 'Stored in Refrigerator 1, Shelf B', date: '2023-04-16 03:45 PM' },
    ];
    return (
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold mb-1">Blood Unit History</h2>
            <p className="text-sm text-gray-400 mb-10">Chronological record of actions performed on this blood unit</p>
            <div className="relative space-y-10 before:absolute before:left-[5px] before:top-2 before:h-[90%] before:w-0.5 before:bg-gray-100">
                {logs.map((log, i) => (
                    <div key={i} className="flex justify-between items-start pl-8 relative">
                        <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-gray-800" />
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">{log.event}</h4>
                            <p className="text-xs text-gray-400 font-medium">By: {log.user}</p>
                            <p className="text-sm text-gray-600 mt-1">{log.msg}</p>
                        </div>
                        <span className="text-xs font-medium text-gray-400 flex items-center gap-2">
                            <Clock size={14} /> {log.date}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Helper Components ---

const ActionButton = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
        {icon} {label}
    </button>
);



export default BloodUnitDetails;
