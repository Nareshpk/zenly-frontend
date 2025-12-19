import React, { useState } from 'react';
import {
    ArrowLeft, Mail, Phone, MapPin,
    Calendar, Briefcase, Building2,
    Clock, Edit3,
    Award,
    CalendarDays,
    FileText,
    GraduationCap,
    UserPlus,
    Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StaffProfilePage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Overview');

    return (
        <div className="min-h-screen bg-gray-50/30 p-8 font-sans">
            {/* Back Navigation */}
            <button className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition group">
                <div className="p-1 border border-gray-200 rounded group-hover:bg-white shadow-sm">
                    <ArrowLeft className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-gray-900">Staff Profile</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Column: Identity Card */}
                <div className="lg:col-span-4 bg-white border border-gray-200 rounded-xl p-8 shadow-sm flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full border-4 border-gray-50 overflow-hidden mb-6 shadow-inner">
                        <img
                            src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200"
                            alt="Dr. Sarah Johnson"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-1">Dr. Sarah Johnson</h2>
                    <p className="text-sm text-gray-400 mb-3">Cardiologist</p>
                    <span className="bg-black text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase mb-8">
                        Active
                    </span>

                    <div className="w-full space-y-4 pt-8 border-t border-gray-50">
                        <ContactItem icon={<Mail className="w-4 h-4" />} label="sarah.j@clinic.com" />
                        <ContactItem icon={<Phone className="w-4 h-4" />} label="555-0101" />
                        <ContactItem icon={<MapPin className="w-4 h-4" />} label="123 Medical Center Drive, Suite 456, San Francisco, CA 94143" />
                        <ContactItem icon={<Calendar className="w-4 h-4" />} label="Joined 5/15/2012" />
                        <ContactItem icon={<Briefcase className="w-4 h-4" />} label="12 years experience" />
                        <ContactItem icon={<Building2 className="w-4 h-4" />} label="Medical Department" />
                    </div>
                </div>

                {/* Right Column: Detailed Information */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Staff Information</h3>
                            <div className="flex gap-2">
                                <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold hover:bg-gray-50 transition">
                                    <Clock className="w-3.5 h-3.5 text-gray-400" /> Schedule
                                </button>
                                <button onClick={() => navigate("/admin/staff/edit-profile")} className="flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-zinc-800 transition">
                                    <Edit3 className="w-3.5 h-3.5" /> Edit Profile
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-6 border-b border-gray-100 mb-8 overflow-x-auto pb-px">
                            {['Overview', 'Qualifications', 'Schedule', 'Patients'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-3 text-xs font-bold transition-all relative whitespace-nowrap ${activeTab === tab ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    {tab}
                                    {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />}
                                </button>
                            ))}
                        </div>

                        {/* Content Section */}
                        {activeTab === 'Overview' && (<div className="space-y-8 animate-in fade-in duration-300">
                            <section>
                                <h4 className="text-sm font-bold text-gray-900 mb-3">Biography</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in diagnosing and treating cardiovascular conditions. She specializes in interventional cardiology and echocardiography, with a focus on preventive care. Dr. Johnson is dedicated to providing compassionate, patient-centered care and staying at the forefront of cardiac medicine.
                                </p>
                            </section>

                            <section>
                                <h4 className="text-sm font-bold text-gray-900 mb-3">Specializations</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Interventional Cardiology', 'Echocardiography', 'Preventive Cardiology'].map((spec) => (
                                        <div key={spec} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-[11px] font-bold text-gray-700">
                                            <div className="w-1 h-1 bg-gray-400 rounded-full" /> {spec}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h4 className="text-sm font-bold text-gray-900 mb-3">Contact Information</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-gray-300" />
                                        <span className="text-sm text-gray-600 font-medium">sarah.j@clinic.com</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-gray-300" />
                                        <span className="text-sm text-gray-600 font-medium">555-0101</span>
                                    </div>
                                </div>
                            </section>
                        </div>)}
                        {activeTab === 'Qualifications' && (
                            <QualificationsTab />
                        )}
                        {activeTab === 'Schedule' && (
                            <ScheduleTab />
                        )}
                        {activeTab === 'Patients' && (
                            <PatientsTab />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper component for the sidebar contact items
const ContactItem = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
    <div className="flex items-start gap-3 w-full">
        <span className="text-gray-300 mt-0.5">{icon}</span>
        <span className="text-[13px] text-gray-600 font-medium leading-snug">{label}</span>
    </div>
);


const QualificationsTab = () => (
    <div className="space-y-8 animate-in fade-in duration-300">
        <section>
            <h4 className="text-sm font-bold text-gray-900 mb-5">Education</h4>
            <div className="space-y-6">
                <QualificationItem
                    icon={<GraduationCap className="w-4 h-4" />}
                    title="Doctor of Medicine"
                    subtitle="Stanford University School of Medicine, 2008"
                />
                <QualificationItem
                    icon={<GraduationCap className="w-4 h-4" />}
                    title="Residency in Internal Medicine"
                    subtitle="UCSF Medical Center, 2011"
                />
                <QualificationItem
                    icon={<GraduationCap className="w-4 h-4" />}
                    title="Fellowship in Cardiology"
                    subtitle="Mayo Clinic, 2014"
                />
            </div>
        </section>

        <section>
            <h4 className="text-sm font-bold text-gray-900 mb-5">Certifications</h4>
            <div className="space-y-6">
                <QualificationItem
                    icon={<Award className="w-4 h-4" />}
                    title="Board Certified in Cardiology"
                    subtitle="American Board of Internal Medicine, 2015 (Expires: 2025)"
                />
                <QualificationItem
                    icon={<Award className="w-4 h-4" />}
                    title="Advanced Cardiac Life Support (ACLS)"
                    subtitle="American Heart Association, 2020 (Expires: 2022)"
                />
            </div>
        </section>
    </div>
);

const QualificationItem = ({ icon, title, subtitle }: { icon: any, title: string, subtitle: string }) => (
    <div className="flex gap-4 items-start">
        <div className="mt-1 text-gray-400">{icon}</div>
        <div>
            <div className="text-sm font-bold text-gray-900">{title}</div>
            <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
        </div>
    </div>
);



const ScheduleTab = () => {
    const navigate = useNavigate();
    const schedule = [
        { day: 'Monday', time: '9:00 AM - 5:00 PM' },
        { day: 'Tuesday', time: '9:00 AM - 5:00 PM' },
        { day: 'Wednesday', time: '9:00 AM - 1:00 PM' },
        { day: 'Thursday', time: '9:00 AM - 5:00 PM' },
        { day: 'Friday', time: '9:00 AM - 5:00 PM' },
        { day: 'Saturday', time: 'Off' },
        { day: 'Sunday', time: 'Off' },
    ];

    return (
        <div className="animate-in fade-in duration-300">
            <h4 className="text-sm font-bold text-gray-900 mb-6">Weekly Schedule</h4>
            <div className="divide-y divide-gray-50 border-t border-gray-50 mb-8">
                {schedule.map((item) => (
                    <div key={item.day} className="flex justify-between items-center py-4">
                        <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-gray-300" />
                            <span className="text-sm font-medium text-gray-700">{item.day}</span>
                        </div>
                        <span className={`text-sm font-bold ${item.time === 'Off' ? 'text-gray-400' : 'text-gray-900'}`}>
                            {item.time}
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex justify-end">
                <button onClick={()=>navigate("/admin/staff/schedule")} className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-zinc-800 transition">
                    <CalendarDays className="w-4 h-4" /> View Full Schedule
                </button>
            </div>
        </div>
    );
};




const PatientsTab = () => (
    <div className="animate-in fade-in duration-300">
        <div className="flex justify-between items-center mb-6">
            <h4 className="text-sm font-bold text-gray-900">Assigned Patients</h4>
            <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100 uppercase">
                24 Total
            </span>
        </div>

        <div className="space-y-1 mb-10">
            <PatientStatRow
                icon={<FileText className="w-4 h-4" />}
                label="Active Patients"
                count={18}
                isBlack
            />
            <PatientStatRow
                icon={<UserPlus className="w-4 h-4" />}
                label="New Patients (This Month)"
                count={3}
            />
        </div>

        <div className="flex justify-end">
            <button className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-zinc-800 transition shadow-sm">
                <Users className="w-4 h-4" /> View Patient List
            </button>
        </div>
    </div>
);

const PatientStatRow = ({ icon, label, count, isBlack }: { icon: any, label: string, count: number, isBlack?: boolean }) => (
    <div className="flex justify-between items-center py-4 border-b border-gray-50 group hover:bg-gray-50/50 px-2 transition-colors">
        <div className="flex items-center gap-3">
            <span className="text-gray-300 group-hover:text-gray-500 transition-colors">{icon}</span>
            <span className="text-sm font-medium text-gray-600">{label}</span>
        </div>
        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${isBlack ? 'bg-black text-white' : 'bg-gray-100 text-gray-500 border border-gray-200'
            }`}>
            {count}
        </span>
    </div>
);

export default StaffProfilePage;