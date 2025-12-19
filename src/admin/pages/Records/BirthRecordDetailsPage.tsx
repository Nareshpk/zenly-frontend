import { ArrowLeft, Pencil, FileText } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BirthRecordDetailsPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<"details" | "audit">("details");

    const record = {
        recordId: "BR-2023-001",
        certificateNo: "BC-2023-0542",
        status: "Verified",
        child: {
            name: "Emma Johnson",
            gender: "Female",
            dob: "5/15/2023",
            time: "08:30",
            place: "City General Hospital",
            weight: "3.2 kg",
            length: "50 cm",
        },
        mother: {
            name: "Sarah Johnson",
            dob: "3/12/1988",
            nationality: "American",
            occupation: "Software Engineer",
        },
        father: {
            name: "Michael Johnson",
            dob: "7/22/1986",
            nationality: "American",
            occupation: "Architect",
        },
        medical: {
            doctor: "Dr. Lisa Chen",
            hospital: "City General Hospital",
            remarks: "Normal delivery without complications.",
        },
        registration: {
            date: "5/17/2023",
            by: "Admin User",
        },
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <button className="p-2 rounded-lg border hover:bg-gray-50">
                            <ArrowLeft size={18} />
                        </button>
                        <h1 className="text-xl font-semibold">Birth Record Details</h1>
                    </div>
                    <div className="text-sm text-gray-500 space-x-6">
                        <span>Record ID: <b>{record.recordId}</b></span>
                        <span>Certificate Number: <b>{record.certificateNo}</b></span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        {record.status}
                    </span>
                    <button className="btn-outline flex items-center gap-2">
                        <Pencil size={14} /> Edit Record
                    </button>
                    <button onClick={() => navigate("/admin/records/birth-records-certificate")} className="btn-primary flex items-center gap-2">
                        <FileText size={14} /> View Certificate
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border rounded-lg p-1 bg-gray-50">
                <button
                    onClick={() => setActiveTab("details")}
                    className={`flex-1 py-2 text-sm rounded-md ${activeTab === "details" ? "bg-white shadow font-medium" : "text-gray-500"}`}
                >
                    Record Details
                </button>
                <button
                    onClick={() => setActiveTab("audit")}
                    className={`flex-1 py-2 text-sm rounded-md ${activeTab === "audit" ? "bg-white shadow font-medium" : "text-gray-500"}`}
                >
                    Audit History
                </button>
            </div>

            {activeTab === "details" && (
                <>

                    {/* Child Information */}
                    <Section title="Child Information">
                        <Grid4>
                            <Info label="Full Name" value={record.child.name} />
                            <Info label="Gender" value={record.child.gender} />
                            <Info label="Date of Birth" value={record.child.dob} />
                            <Info label="Time of Birth" value={record.child.time} />
                            <Info label="Place of Birth" value={record.child.place} />
                            <Info label="Weight" value={record.child.weight} />
                            <Info label="Length" value={record.child.length} />
                        </Grid4>
                    </Section>

                    {/* Parents */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Section title="Mother's Information">
                            <Grid2>
                                <Info label="Full Name" value={record.mother.name} />
                                <Info label="Date of Birth" value={record.mother.dob} />
                                <Info label="Nationality" value={record.mother.nationality} />
                                <Info label="Occupation" value={record.mother.occupation} />
                            </Grid2>
                        </Section>

                        <Section title="Father's Information">
                            <Grid2>
                                <Info label="Full Name" value={record.father.name} />
                                <Info label="Date of Birth" value={record.father.dob} />
                                <Info label="Nationality" value={record.father.nationality} />
                                <Info label="Occupation" value={record.father.occupation} />
                            </Grid2>
                        </Section>
                    </div>

                    {/* Medical */}
                    <Section title="Medical Information">
                        <Grid2>
                            <Info label="Attending Doctor" value={record.medical.doctor} />
                            <Info label="Hospital / Facility" value={record.medical.hospital} />
                        </Grid2>
                        <Info label="Remarks" value={record.medical.remarks} full />
                    </Section>

                    {/* Registration */}
                    <Section title="Registration Information">
                        <Grid2>
                            <Info label="Registration Date" value={record.registration.date} />
                            <Info label="Registered By" value={record.registration.by} />
                        </Grid2>
                    </Section>

                    {/* Registration */}
                    <Section title="Registration Information">
                        <Grid2>
                            <Info label="Registration Date" value={record.registration.date} />
                            <Info label="Registered By" value={record.registration.by} />
                        </Grid2>
                    </Section>
                </>
            )}

            {activeTab === "audit" && (
                <Section title="Audit History">
                    <p className="text-sm text-gray-500 mb-6">Record of all changes and actions</p>
                    <AuditItem
                        title="Record Created"
                        by="Admin User"
                        date="5/17/2023, 10:15 AM"
                        description="Initial record creation"
                    />
                    <AuditItem
                        title="Record Verified"
                        by="Dr. Lisa Chen"
                        date="5/18/2023, 2:30 PM"
                        description="Medical information verified"
                    />
                    <AuditItem
                        title="Certificate Generated"
                        by="Admin User"
                        date="5/19/2023, 9:45 AM"
                        description="Birth certificate generated"
                    />
                </Section>
            )}
        </div>
    );
}

/* ---------------- Reusable Components ---------------- */

const Section = ({ title, children }: any) => (
    <div className="bg-white border rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        {children}
    </div>
);

const Grid4 = ({ children }: any) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{children}</div>
);

const Grid2 = ({ children }: any) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">{children}</div>
);

const Info = ({ label, value, full = false }: any) => (
    <div className={full ? "sm:col-span-2" : ""}>
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value}</p>
    </div>
);

const AuditItem = ({ title, by, date, description }: any) => (
    <div className="flex justify-between gap-6 py-4 border-b last:border-b-0">
        <div>
            <p className="font-medium text-sm">{title}</p>
            <p className="text-sm mt-1">By: {by}</p>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
        </div>
        <p className="text-sm text-gray-500 whitespace-nowrap">{date}</p>
    </div>
);
