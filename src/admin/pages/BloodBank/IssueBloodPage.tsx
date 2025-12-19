import {
    ArrowLeft, Calendar,
    User
} from 'lucide-react';
import { useState } from 'react';

const IssueBloodPage = () => {
    const [recipientType, setRecipientType] = useState('Hospital Patient');

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-900">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <button className="p-2 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition-colors">
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Issue Blood</h1>
                        <p className="text-sm text-gray-500">Complete the form below to issue blood to a patient or external recipient.</p>
                    </div>
                </div>
            </div>

            {/* Main Form Container */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold">Blood Issue Form</h2>
                    <p className="text-sm text-gray-400">Fill out all required information to issue blood units.</p>
                </div>

                <div className="p-8 space-y-10">

                    {/* SECTION 1: Recipient Information */}
                    <section className="space-y-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Recipient Information</h3>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Recipient Type</label>
                            <div className="flex gap-3">
                                {['Hospital Patient', 'External Recipient'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setRecipientType(type)}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${recipientType === type
                                            ? 'bg-black text-white border-black shadow-md'
                                            : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="w-full">

                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest pb-4">{recipientType === 'Hospital Patient' ? 'Patient' : 'Organization Name'}</h3>
                            {recipientType === 'Hospital Patient' && (<select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black">
                                <option>Select {recipientType.toLowerCase()}</option>
                                <option>Jane Doe (P-5022)</option>
                                <option>City General Hospital</option>
                            </select>)}
                            {recipientType !== 'Hospital Patient' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <InputGroup label="Patient Name" placeholder="Search patient name or ID..." icon={<User size={16} />} />
                                    <InputGroup label="Contact No" placeholder="+91 90421 00000" />
                                </div>
                            )}
                        </div>
                    </section>

                    {/* SECTION 2: Blood Information */}
                    <section className="space-y-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Blood Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Blood Type</label>
                                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black">
                                    <option>Select blood type</option>
                                    <option>A+</option>
                                    <option>O-</option>
                                    <option>B+</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Number of Units</label>
                                <input
                                    type="number"
                                    defaultValue="1"
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
                                />
                                <p className="text-[11px] text-gray-400 mt-1.5 italic">Each unit is approximately 450ml.</p>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 3: Issue Details */}
                    <section className="space-y-6">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Issue Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Department</label>
                                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black">
                                    <option>Select department</option>
                                    <option>ICU</option>
                                    <option>Emergency</option>
                                    <option>Surgery</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Requesting Doctor</label>
                                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black">
                                    <option>Select doctor</option>
                                    <option>Dr. Sarah Johnson</option>
                                    <option>Dr. Michael Chen</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Issue Date</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        defaultValue="December 17th, 2025"
                                        readOnly
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none"
                                    />
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                </div>
                            </div>
                            <div className="pt-8">
                                <label className="flex items-center gap-3 p-4 bg-red-50/50 border border-red-100 rounded-xl cursor-pointer group">
                                    <input type="checkbox" className="w-5 h-5 rounded border-red-300 text-red-600 focus:ring-red-500" />
                                    <div>
                                        <span className="text-sm font-bold text-red-700">Emergency Request</span>
                                        <p className="text-[11px] text-red-600/70">Mark this if the blood is needed for an emergency situation.</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Purpose</label>
                            <textarea
                                placeholder="Describe the purpose of this blood issue"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black min-h-[100px] resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Additional Notes</label>
                            <textarea
                                placeholder="Any additional information or special instructions"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black min-h-[80px] resize-none"
                            />
                        </div>
                    </section>
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                    <button className="px-6 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-100 transition-colors">
                        Cancel
                    </button>
                    <button className="px-10 py-2.5 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 shadow-lg shadow-black/10 active:scale-95 transition-all">
                        Issue Blood
                    </button>
                </div>
            </div>
        </div>
    );
};

const InputGroup = ({ label, placeholder, icon, type = "text", defaultValue }: any) => (
    <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">{label}</label>
        <div className="relative">
            <input
                type={type}
                defaultValue={defaultValue}
                placeholder={placeholder}
                className={`w-full ${icon ? 'pl-10' : 'px-4'} py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black transition-all`}
            />
            {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
        </div>
    </div>
);

export default IssueBloodPage;