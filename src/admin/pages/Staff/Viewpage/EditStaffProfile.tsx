/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArrowLeft, Info, Plus, Save, Trash2, X } from 'lucide-react';
import { useState } from 'react';

interface Qualification {
    id: string;
    title: string;
    institution: string;
    year: string;
}

const EditStaffProfile = () => {
    const [activeTab, setActiveTab] = useState('Personal Info');

    return (
        <div className="min-h-screen bg-gray-50/30 p-8 font-sans">
            {/* Top Navigation */}
            <button className="flex items-center gap-2 text-gray-500 hover:text-black mb-6 transition group">
                <div className="p-1 border border-gray-200 rounded group-hover:bg-white shadow-sm">
                    <ArrowLeft className="w-4 h-4" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Edit Staff Profile</h1>
            </button>

            {/* Navigation Tabs */}
            <div className="flex gap-2 mb-8 bg-gray-100/50 p-1 rounded-xl w-fit">
                {['Personal Info', 'Professional', 'Qualifications', 'Schedule'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === tab
                            ? 'bg-white text-black shadow-sm'
                            : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Form Container */}
            {activeTab === "Personal Info" && (<div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50">
                    <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
                    <p className="text-sm text-gray-400 mt-1">Update the staff member's personal details and contact information</p>
                </div>

                <div className="p-8 space-y-8">
                    {/* Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">Full Name</label>
                            <input
                                type="text"
                                defaultValue="Dr. Sarah Johnson"
                                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-black/5 outline-none transition"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">Email Address</label>
                            <input
                                type="email"
                                defaultValue="sarah.j@clinic.com"
                                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-black/5 outline-none transition"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">Phone Number</label>
                            <input
                                type="text"
                                defaultValue="555-0101"
                                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-black/5 outline-none transition"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">Status</label>
                            <select className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-black/5 outline-none transition appearance-none">
                                <option>Active</option>
                                <option>Inactive</option>
                                <option>On Leave</option>
                            </select>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">Address</label>
                            <input
                                type="text"
                                defaultValue="123 Medical Center Drive, Suite 456"
                                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-black/5 outline-none transition"
                            />
                        </div>

                        <div className="grid grid-cols-3 md:col-span-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">City</label>
                                <input type="text" defaultValue="San Francisco" className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">State</label>
                                <input type="text" defaultValue="CA" className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">ZIP Code</label>
                                <input type="text" defaultValue="94143" className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm outline-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Footer */}
                <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex justify-end gap-3">
                    <button className="flex items-center gap-2 px-6 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-white transition shadow-sm">
                        Cancel
                    </button>
                    <button className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-zinc-800 transition shadow-sm">
                        <Save className="w-4 h-4" /> Save Changes
                    </button>
                </div>
            </div>)}
            {activeTab === "Professional" && (<ProfessionalTab />)}
            {activeTab ==="Qualifications" && (<QualificationsTab />)}
            {activeTab === "Schedule" && (<ScheduleEditTab />)}
        </div>
    );
};



const ProfessionalTab = () => {
    // Local state to manage specializations
    const [specializations, setSpecializations] = useState([
        'Interventional Cardiology',
        'Echocardiography'
    ]);
    const [newSpec, setNewSpec] = useState('');

    const removeSpecialization = (index: number) => {
        setSpecializations(specializations.filter((_, i) => i !== index));
    };

    const addSpecialization = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && newSpec.trim() !== '') {
            e.preventDefault();
            setSpecializations([...specializations, newSpec.trim()]);
            setNewSpec('');
        }
    };

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-300">
            {/* Header Info */}
            <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                <div>
                    <h3 className="text-sm font-bold text-gray-900">Clinic Roles & Background</h3>
                    <p className="text-[11px] text-gray-400 mt-0.5">Define the staff member's professional focus and history</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Department Selection */}
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                        Department
                    </label>
                    <select className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-black/5 outline-none transition appearance-none">
                        <option>Cardiology</option>
                        <option>Neurology</option>
                        <option>Pediatrics</option>
                        <option>General Medicine</option>
                    </select>
                </div>

                {/* Experience Input */}
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                        Years of Experience
                    </label>
                    <input
                        type="number"
                        defaultValue="12"
                        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-black/5 outline-none transition"
                    />
                </div>

                {/* Specializations Tag System */}
                <div className="md:col-span-2 space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                            Specializations
                        </label>
                        <span className="text-[10px] text-gray-400 font-medium">Press Enter to add</span>
                    </div>
                    <div className="flex flex-wrap gap-2 p-3 bg-white border border-gray-200 rounded-xl min-h-[56px] focus-within:border-black transition-colors">
                        {specializations.map((spec, index) => (
                            <span
                                key={index}
                                className="px-3 py-1.5 bg-black text-white text-[10px] font-bold rounded-full flex items-center gap-2 group transition"
                            >
                                {spec}
                                <button
                                    onClick={() => removeSpecialization(index)}
                                    className="hover:text-red-400 transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        ))}
                        <input
                            type="text"
                            value={newSpec}
                            onChange={(e) => setNewSpec(e.target.value)}
                            onKeyDown={addSpecialization}
                            placeholder="Add specialization..."
                            className="bg-transparent text-sm outline-none ml-2 flex-1 min-w-[150px]"
                        />
                    </div>
                </div>

                {/* Biography Section */}
                <div className="md:col-span-2 space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                            Professional Biography
                        </label>
                        <Info className="w-3.5 h-3.5 text-gray-300" />
                    </div>
                    <textarea
                        rows={6}
                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm leading-relaxed focus:ring-2 focus:ring-black/5 outline-none transition resize-none"
                        defaultValue="Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience..."
                    />
                    <p className="text-[10px] text-gray-400 text-right">Maximum 500 words</p>
                </div>
            </div>
        </div>
    );
};



const QualificationsTab = () => {
    const [education, setEducation] = useState<Qualification[]>([
        { id: '1', title: 'Doctor of Medicine', institution: 'Stanford University', year: '2008' },
        { id: '2', title: 'Residency in Internal Medicine', institution: 'UCSF Medical Center', year: '2011' }
    ]);

    const [certifications, setCertifications] = useState<Qualification[]>([
        { id: 'c1', title: 'Board Certified in Cardiology', institution: 'ABIM', year: '2015' }
    ]);


    return (
        <div className="p-8 space-y-10 animate-in fade-in duration-300">

            {/* Education Section */}
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Education</h3>
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-[11px] font-bold hover:bg-gray-50 transition shadow-sm">
                        <Plus className="w-3.5 h-3.5" /> Add Education
                    </button>
                </div>

                <div className="space-y-4">
                    {education.map((edu) => (
                        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Degree/Field of Study */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Degree / Field of Study</label>
                                    <input
                                        type="text"
                                        defaultValue="Doctor of Medicine"
                                        placeholder="e.g. Bachelor of Science"
                                        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:border-black outline-none transition"
                                    />
                                </div>

                                {/* University/Institution */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">University / Institution</label>
                                    <input
                                        type="text"
                                        defaultValue="Stanford University"
                                        placeholder="e.g. Harvard University"
                                        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:border-black outline-none transition"
                                    />
                                </div>

                                {/* Start Year */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Start Year</label>
                                    <input
                                        type="text"
                                        defaultValue="2004"
                                        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:border-black outline-none transition"
                                    />
                                </div>

                                {/* End Year / Graduation Year */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">End Year (or Expected)</label>
                                    <input
                                        type="text"
                                        defaultValue="2008"
                                        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:border-black outline-none transition"
                                    />
                                </div>
                            </div>

                            {/* Remove Action */}
                            <div className="pt-2 border-t border-gray-50">
                                <button className="flex items-center gap-2 text-[11px] font-bold text-red-500 hover:text-red-700 transition">
                                    <Trash2 className="w-3.5 h-3.5" /> Remove Education
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Certifications Section */}
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Certifications</h3>
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-[11px] font-bold hover:bg-gray-50 transition shadow-sm">
                        <Plus className="w-3.5 h-3.5" /> Add Certification
                    </button>
                </div>
                <div className="space-y-4">
                    {certifications.map((cert) => (
                        <div className="space-y-6">


                            {/* Certification Entry Card */}
                            <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Certification Name */}
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Certification Name</label>
                                        <input
                                            type="text"
                                            defaultValue="Board Certified in Cardiology"
                                            className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:border-black outline-none transition"
                                        />
                                    </div>

                                    {/* Issuing Organization */}
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Issuing Organization</label>
                                        <input
                                            type="text"
                                            defaultValue="American Board of Internal Medicine"
                                            className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:border-black outline-none transition"
                                        />
                                    </div>

                                    {/* Year Obtained */}
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Year Obtained</label>
                                        <input
                                            type="text"
                                            defaultValue="2015"
                                            className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:border-black outline-none transition"
                                        />
                                    </div>

                                    {/* Expiration Year */}
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Expiration Year</label>
                                        <input
                                            type="text"
                                            defaultValue="2025"
                                            className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:border-black outline-none transition"
                                        />
                                    </div>
                                </div>

                                {/* Remove Action */}
                                <div className="pt-2 border-t border-gray-50">
                                    <button className="flex items-center gap-2 text-[11px] font-bold text-red-500 hover:text-red-700 transition">
                                        <Trash2 className="w-3.5 h-3.5" /> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};



const ScheduleEditTab = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <div className="p-8 space-y-6 animate-in fade-in duration-300">
            <div className="bg-gray-50/50 rounded-xl border border-gray-100 overflow-hidden">
                {days.map((day) => (
                    <div key={day} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0 hover:bg-white transition-colors">
                        <span className="text-sm font-bold text-gray-700 w-24">{day}</span>
                        <div className="flex items-center gap-4">
                            <input type="time" defaultValue="09:00" className="bg-white border border-gray-200 rounded-lg px-3 py-1 text-sm outline-none" />
                            <span className="text-gray-400 text-xs font-bold">TO</span>
                            <input type="time" defaultValue="17:00" className="bg-white border border-gray-200 rounded-lg px-3 py-1 text-sm outline-none" />
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" defaultChecked={day !== 'Saturday' && day !== 'Sunday'} className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Available</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EditStaffProfile;