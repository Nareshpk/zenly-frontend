/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArrowLeft, Building2, ChevronLeft, Clock, DollarSign, GraduationCap, Key, Mail, MapPin, Phone, RotateCcw, Save, ShieldCheck, Stethoscope, Upload, User } from 'lucide-react';
import React, { useState } from 'react';

interface PersonalInfoFormData {
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    emergencyName: string;
    emergencyPhone: string;
    emergencyRelationship: string;
}


interface Qualification {
    degree: string;
    institution: string;
    year: string;
}

interface License {
    type: string;
    number: string;
    issueDate: string;
    expiryDate: string;
    authority: string;
}




const AddNewStaff: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Personal Info');

    return (
        <div className="bg-slate-100  font-sans text-slate-900">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-zinc-900">Add New Staff</h1>
                <p className="text-gray-500 mt-1">Create a new staff member profile</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-3 mb-8">
                <button className="p-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <div className="flex gap-2 bg-zinc-200/50 p-1.5 rounded-xl border border-zinc-200 shadow-inner">
                    {['Personal Info', 'Professional', 'Employment', 'Access & Roles'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === tab
                                ? 'bg-white text-zinc-900 shadow-sm'
                                : 'text-zinc-500 hover:text-zinc-700'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Form Grid */}
            {activeTab === "Personal Info" && (

                <PersonalInfoForm />
            )}

            {activeTab === "Professional" && (
                <ProfessionalInfoForm />
            )}

            {activeTab === "Employment" && (
                <EmploymentDetailsForm />
            )}

            {activeTab === "Access & Roles" && (
                <AccessRolesForm />
            )}
            {/* Sticky Footer Actions */}
            <div className="sticky bottom-0 z-20 bg-white">
                <div className="flex justify-between items-center pt-4 mt-6 border-t border-gray-200 px-6 pb-4">
                    <button
                        type="button"
                        className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                        <Save className="w-4 h-4" />
                        Save & Continue
                    </button>
                </div>
            </div>

        </div>
    );
};




const PersonalInfoForm: React.FC = () => {
    const [formData, setFormData] = useState<PersonalInfoFormData>({
        firstName: '', lastName: '', dob: '2025-12-18', gender: '',
        email: '', phone: '', address: '', city: '', state: '',
        postalCode: '', country: '', emergencyName: '', emergencyPhone: '',
        emergencyRelationship: ''
    });

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };

    return (
        <div className=" p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Personal Information</h1>
                <p className="text-gray-500 text-sm">Enter the staff member's basic personal information</p>
            </div>

            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* Photo Upload Section */}
                    <div className="md:col-span-2">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                            <Upload className="w-6 h-6 text-gray-400 mb-2" />
                            <span className="text-xs text-gray-500 font-medium">Upload photo</span>
                            <input type="file" className="hidden" />
                        </label>
                    </div>

                    {/* Name & Basic Info */}
                    <div className="md:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">First Name</label>
                            <input type="text" name="firstName" placeholder="Enter first name" className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none transition-all" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Last Name</label>
                            <input type="text" name="lastName" placeholder="Enter last name" className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none transition-all" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Date of Birth</label>
                            <input type="date" name="dob" defaultValue="2025-12-18" className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none transition-all" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Gender</label>
                            <select name="gender" className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none transition-all bg-white">
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <input type="email" placeholder="Enter email address" className="w-full pl-10 p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <input type="tel" placeholder="Enter phone number" className="w-full pl-10 p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none" />
                        </div>
                    </div>
                </div>

                {/* Address Section */}
                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Address</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <input type="text" placeholder="Enter address" className="w-full pl-10 p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">City</label>
                            <input type="text" placeholder="Enter city" className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">State/Province</label>
                            <input type="text" placeholder="Enter state or province" className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Postal Code</label>
                            <input type="text" placeholder="Enter postal code" className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Country</label>
                            <select className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none bg-white">
                                <option value="">Select country</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Emergency Contact */}
                <div className="space-y-4">
                    <label className="text-sm font-semibold text-gray-700 block">Emergency Contact</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Contact name" className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none" />
                        <input type="text" placeholder="Contact phone" className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none" />
                    </div>
                    <input type="text" placeholder="Relationship" className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none" />
                </div>

                {/* Form Actions */}

            </form>
        </div>
    );
};



const ProfessionalInfoForm: React.FC = () => {
    const [qualifications, setQualifications] = useState<Qualification[]>([{ degree: '', institution: '', year: '' }]);
    const [licenses, setLicenses] = useState<License[]>([{ type: '', number: '', issueDate: '2025-12-18', expiryDate: '2025-12-18', authority: '' }]);

    const addQualification = () => {
        setQualifications([...qualifications, { degree: '', institution: '', year: '' }]);
    };

    const addLicense = () => {
        setLicenses([...licenses, { type: '', number: '', issueDate: '2025-12-18', expiryDate: '2025-12-18', authority: '' }]);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Professional Information</h1>
                <p className="text-gray-500 text-sm">Enter the staff member's professional qualifications and credentials</p>
            </div>

            <form className="space-y-8">
                {/* Profession & Specialization */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Profession</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <input type="text" placeholder="e.g. Doctor, Nurse, etc." className="w-full pl-10 p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none transition-all" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Specialization</label>
                        <div className="relative">
                            <Stethoscope className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <input type="text" placeholder="e.g. Cardiology, Pediatrics, etc." className="w-full pl-10 p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none transition-all" />
                        </div>
                    </div>
                </div>

                {/* Qualifications & Degrees */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-800">Qualifications & Degrees</h3>
                    {qualifications.map((_, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4 bg-gray-50/30">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Degree/Certification</label>
                                    <div className="relative">
                                        <GraduationCap className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                        <input type="text" placeholder="e.g. MD, RN, etc." className="w-full pl-10 p-2.5 border border-gray-300 rounded-md bg-white outline-none" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Institution</label>
                                    <input type="text" placeholder="University/College name" className="w-full p-2.5 border border-gray-300 rounded-md bg-white outline-none" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Year Completed</label>
                                    <input type="text" placeholder="YYYY" className="w-full p-2.5 border border-gray-300 rounded-md bg-white outline-none" />
                                </div>
                                <button type="button" onClick={addQualification} className="w-full p-2.5 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-100 flex justify-center items-center gap-2 bg-white transition-colors">
                                    Add More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Licenses & Certifications */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-800">Licenses & Certifications</h3>
                    {licenses.map((_, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4 bg-gray-50/30">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">License Type</label>
                                    <input type="text" placeholder="e.g. Medical License" className="w-full p-2.5 border border-gray-300 rounded-md bg-white outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">License Number</label>
                                    <input type="text" placeholder="Enter license number" className="w-full p-2.5 border border-gray-300 rounded-md bg-white outline-none" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Issue Date</label>
                                    <input type="date" defaultValue="2025-12-18" className="w-full p-2.5 border border-gray-300 rounded-md bg-white outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Expiry Date</label>
                                    <input type="date" defaultValue="2025-12-18" className="w-full p-2.5 border border-gray-300 rounded-md bg-white outline-none" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Issuing Authority</label>
                                <input type="text" placeholder="Enter issuing authority" className="w-full p-2.5 border border-gray-300 rounded-md bg-white outline-none" />
                            </div>
                            <button type="button" onClick={addLicense} className="w-full p-2.5 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-100 flex justify-center items-center gap-2 bg-white transition-colors">
                                Add More
                            </button>
                        </div>
                    ))}
                </div>

                {/* Professional Bio */}
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">Professional Bio</label>
                    <textarea
                        rows={4}
                        placeholder="Enter professional biography and experience"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none transition-all resize-none"
                    />
                </div>
            </form>
        </div>
    );
};





const EmploymentDetailsForm: React.FC = () => {
    return (
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Employment Details</h1>
                <p className="text-gray-500 text-sm">Enter the staff member's employment information</p>
            </div>

            <form className="space-y-8">
                {/* Basic Employment Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Employee ID</label>
                        <input
                            type="text"
                            placeholder="Enter employee ID"
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Department</label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <select className="w-full pl-10 p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none bg-white appearance-none">
                                <option>Select department</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Position/Role</label>
                        <input
                            type="text"
                            placeholder="Enter position or role"
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Reporting To</label>
                        <select className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none bg-white">
                            <option>Select supervisor</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Join Date</label>
                        <div className="relative">
                            <input
                                type="date"
                                defaultValue="2025-12-18"
                                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Employment Type</label>
                        <select className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none bg-white">
                            <option>Select type</option>
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Contract</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Work Schedule</label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <select className="w-full pl-10 p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none bg-white">
                                <option>Select schedule</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Work Hours (Weekly)</label>
                        <input
                            type="text"
                            placeholder="e.g. 40"
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none"
                        />
                    </div>
                </div>

                {/* Contract Details Section */}
                <div className="space-y-4 p-4 border border-gray-100 rounded-lg bg-gray-50/30">
                    <h3 className="text-sm font-bold text-gray-800">Contract Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Contract Start</label>
                            <input type="date" defaultValue="2025-12-18" className="w-full p-2.5 border border-gray-300 rounded-md bg-white outline-none" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Contract End (if applicable)</label>
                            <input type="date" defaultValue="2025-12-18" className="w-full p-2.5 border border-gray-300 rounded-md bg-white outline-none" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Contract Notes</label>
                        <textarea
                            rows={3}
                            placeholder="Enter any additional contract details"
                            className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-black outline-none resize-none"
                        />
                    </div>
                </div>

                {/* Compensation & Benefits */}
                <div className="space-y-6">
                    <h3 className="text-sm font-bold text-gray-800 border-b pb-2">Compensation & Benefits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Salary/Wage</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <input type="text" placeholder="Enter amount" className="w-full pl-10 p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Payment Frequency</label>
                            <select className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none bg-white">
                                <option>Select frequency</option>
                                <option>Monthly</option>
                                <option>Bi-weekly</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700">Benefits</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
                            {[
                                "Health Insurance", "Dental Insurance",
                                "Vision Insurance", "Retirement Plan",
                                "Paid Time Off", "Professional Development"
                            ].map((benefit) => (
                                <label key={benefit} className="flex items-center space-x-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                                    />
                                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{benefit}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};






const AccessRolesForm: React.FC = () => {
    const [selectedRole, setSelectedRole] = useState('Staff');

    const roles = [
        { name: 'Administrator', desc: 'Full access to all system features and settings' },
        { name: 'Manager', desc: 'Access to manage staff, schedules, and reports' },
        { name: 'Doctor', desc: 'Access to patient records, appointments, and prescriptions' },
        { name: 'Nurse', desc: 'Access to patient care, vitals, and treatment plans' },
        { name: 'Receptionist', desc: 'Access to appointments, patient registration, and billing' },
        { name: 'Staff', desc: 'Basic access to assigned modules only' },
    ];

    const modules = ['Patients', 'Appointments', 'Prescriptions', 'Billing'];

    return (
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Access & Roles</h1>
                <p className="text-gray-500 text-sm">Set up system access and role permissions</p>
            </div>

            <form className="space-y-8">
                {/* Credentials Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Username</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <input type="text" placeholder="Enter username" className="w-full pl-10 p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none transition-all" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Email for Access</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <input type="email" placeholder="Enter email address" className="w-full pl-10 p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none transition-all" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Temporary Password</label>
                        <div className="relative">
                            <Key className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <input type="password" placeholder="Enter temporary password" className="w-full pl-10 p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none transition-all" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
                        <div className="relative">
                            <Key className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <input type="password" placeholder="Confirm password" className="w-full pl-10 p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none transition-all" />
                        </div>
                    </div>
                </div>

                {/* System Role Selection */}
                <div className="space-y-4">
                    <label className="text-sm font-semibold text-gray-700">System Role</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {roles.map((role) => (
                            <label
                                key={role.name}
                                className={`relative flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-all ${selectedRole === role.name ? 'border-black ring-1 ring-black' : 'border-gray-200'}`}
                            >
                                <div className="flex items-center h-5">
                                    <input
                                        type="radio"
                                        name="role"
                                        checked={selectedRole === role.name}
                                        onChange={() => setSelectedRole(role.name)}
                                        className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                                    />
                                </div>
                                <div className="ml-3">
                                    <span className="block text-sm font-bold text-gray-900">{role.name}</span>
                                    <span className="block text-xs text-gray-500">{role.desc}</span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Module Permissions */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-sm font-bold text-gray-800">Module Permissions</h3>
                        <button type="button" className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-black">
                            <RotateCcw className="w-3 h-3" />
                            Use Role Default
                        </button>
                    </div>

                    <div className="space-y-6 pt-2">
                        {modules.map((module) => (
                            <div key={module} className="space-y-3">
                                <span className="text-sm font-bold text-gray-700">{module}</span>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {['View', 'Add', 'Edit', 'Delete'].map((action) => (
                                        <label key={action} className="flex items-center space-x-3 cursor-pointer group">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
                                            <span className="text-sm text-gray-600 group-hover:text-gray-900">{action}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Account Settings */}
                <div className="space-y-4 p-4 border border-gray-100 rounded-lg bg-gray-50/30">
                    <h3 className="text-sm font-bold text-gray-800">Account Settings</h3>
                    <div className="space-y-3">
                        {[
                            { label: "Force password change on first login", defaultChecked: true },
                            { label: "Enable two-factor authentication", defaultChecked: false },
                            { label: "Account active", defaultChecked: true }
                        ].map((setting) => (
                            <label key={setting.label} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    defaultChecked={setting.defaultChecked}
                                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                                />
                                <span className="text-sm text-gray-700">{setting.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                    <button type="button" className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                        Back
                    </button>
                    <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                        <ShieldCheck className="w-4 h-4" />
                        Finalize & Create Account
                    </button>
                </div>
            </form>
        </div>
    );
};


export default AddNewStaff;