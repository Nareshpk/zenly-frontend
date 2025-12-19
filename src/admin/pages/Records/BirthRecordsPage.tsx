import {
    Calendar,
    Download,
    Edit3,
    FileText,
    Filter,
    MoreHorizontal,
    Plus,
    Search,
    X
} from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface BirthRecord {
    id: string;
    childName: string;
    dob: string;
    parents: string;
    doctor: string;
    status: 'Verified' | 'Pending';
}

const BirthRecordsPage: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'All' | 'Verified' | 'Pending'>('All');
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const records: BirthRecord[] = [
        { id: 'BR-2023-001', childName: 'Emma Johnson', dob: '5/15/2023', parents: 'Sarah and Michael Johnson', doctor: 'Dr. Lisa Chen', status: 'Verified' },
        { id: 'BR-2023-002', childName: 'Noah Williams', dob: '5/18/2023', parents: 'Jessica and David Williams', doctor: 'Dr. Robert Kim', status: 'Pending' },
        { id: 'BR-2023-003', childName: 'Olivia Davis', dob: '5/20/2023', parents: 'Emily and James Davis', doctor: 'Dr. Lisa Chen', status: 'Verified' },
        { id: 'BR-2023-004', childName: 'Liam Miller', dob: '5/22/2023', parents: 'Sophia and William Miller', doctor: 'Dr. John Smith', status: 'Verified' },
        { id: 'BR-2023-005', childName: 'Ava Wilson', dob: '5/25/2023', parents: 'Olivia and Daniel Wilson', doctor: 'Dr. Robert Kim', status: 'Pending' },
    ];

    // 1. Logic for Filtering Tabs
    const filteredRecords = records.filter(record =>
        activeTab === 'All' ? true : record.status === activeTab
    );

    // 2. Logic to close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleMenu = (id: string) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    return (
        <div className="p-6 space-y-6 bg-slate-50/30 min-h-screen font-sans">
            {/* Page Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Birth Records</h1>
                    <p className="text-sm text-gray-500">Manage and track all birth records in the system</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                        <Download size={18} /> Export
                    </button>
                    <button onClick={() => navigate("/admin/records/birth-records-add")} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-black transition-shadow shadow-md">
                        <Plus size={18} /> Add Record
                    </button>
                </div>
            </div>

            {/* Tabs Filter Bar */}
            <div className="bg-gray-100/80 p-1 rounded-xl flex w-full border border-gray-200">
                {(['All Records', 'Verified', 'Pending'] as const).map((tab) => {
                    const value = tab === 'All Records' ? 'All' : tab;
                    return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(value)}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === value
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {tab}
                        </button>
                    );
                })}
            </div>

            {/* Search & Date Filter Row */}
            <div className="flex gap-3 items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search records..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all"
                    />
                </div>
                <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50">
                    <Filter size={20} />
                </button>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-slate-600 font-medium cursor-pointer hover:bg-gray-50">
                    <Calendar size={18} className="text-gray-400" />
                    Dec 18, 2025 - Dec 18, 2025
                </div>
            </div>

            {/* Records Table */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-visible shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr className="text-gray-400 text-[11px] uppercase tracking-wider font-bold">
                            <th className="px-6 py-4">Record ID</th>
                            <th className="px-6 py-4">Child Name</th>
                            <th className="px-6 py-4">Date of Birth</th>
                            <th className="px-6 py-4">Parents</th>
                            <th className="px-6 py-4">Attending Doctor</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredRecords.map((record) => (
                            <tr key={record.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 text-sm font-semibold text-slate-700">{record.id}</td>
                                <td className="px-6 py-4 text-sm text-slate-600 font-medium">{record.childName}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{record.dob}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{record.parents}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{record.doctor}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${record.status === 'Verified'
                                        ? 'bg-emerald-50 text-emerald-600'
                                        : 'bg-orange-50 text-orange-600'
                                        }`}>
                                        {record.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right relative">
                                    <button
                                        onClick={() => toggleMenu(record.id)}
                                        className={`p-1 rounded-lg transition-colors ${openMenuId === record.id ? 'bg-gray-100 text-slate-900' : 'text-gray-400 hover:text-slate-900'}`}
                                    >
                                        <MoreHorizontal size={20} />
                                    </button>

                                    {/* Floating Action Menu */}
                                    {openMenuId === record.id && (
                                        <div
                                            ref={menuRef}
                                            className="absolute right-6 top-12 z-[50] bg-white border border-gray-200 rounded-xl shadow-xl py-2 min-w-[200px] animate-in fade-in zoom-in duration-100 origin-top-right"
                                        >
                                            <div className="px-4 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-1">
                                                Record Options
                                            </div>
                                            <button onClick={() => navigate("/admin/records/birth-records-details")} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                                                <FileText size={16} className="text-gray-400" /> View Details
                                            </button>
                                            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                                                <Edit3 size={16} className="text-gray-400" /> Edit Record
                                            </button>
                                            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                                                <Download size={16} className="text-gray-400" /> Download Certificate
                                            </button>
                                            <div className="border-t border-gray-50 mt-1 pt-1">
                                                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors font-medium">
                                                    <X size={16} /> Delete Record
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredRecords.length === 0 && (
                    <div className="p-20 text-center text-gray-500 italic">
                        No records found for the "{activeTab}" filter.
                    </div>
                )}
            </div>
        </div>
    );
};

export default BirthRecordsPage;

