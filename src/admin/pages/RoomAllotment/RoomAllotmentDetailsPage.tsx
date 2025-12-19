import {
    ArrowLeft,
    BedDouble,
    Calendar,
    CreditCard,
    Download,
    LogOut,
    Pencil,
    Printer,
    User
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import RoomDetailsTabs from "./RoomDetailsTabs";

export default function RoomAllotmentDetailsPage() {
    const navigate = useNavigate();

    const data = {
        allotmentId: "RA-001",
        status: "Occupied",
        room: "301",
        patient: "John Smith",

        patientInfo: {
            name: "John Smith",
            id: "P-1001",
            age: "45 years",
            gender: "Male",
            contact: "+1 (555) 123-4567",
            email: "john.smith@example.com",
            address: "123 Main St, Anytown, CA 12345",
        },

        roomInfo: {
            number: "301",
            type: "Private",
            floor: "3rd Floor",
            department: "Cardiology",
            rate: "$350/day",
            facilities: [
                "Private Bathroom",
                "TV",
                "WiFi",
                "Adjustable Bed",
                "Nurse Call System",
                "Oxygen Supply",
            ],
        },

        allotment: {
            date: "2023-04-15",
            time: "10:30 AM",
            expectedDischarge: "2023-04-20",
            actualDischarge: "Not discharged yet",
            doctor: "Dr. Emily Chen",
            doctorId: "D-2001",
            reason: "Chest pain and shortness of breath",
            diagnosis: "Acute Myocardial Infarction",
            notes: "Patient requires regular monitoring of vital signs every 4 hours.",
        },

        billing: {
            status: "Insurance Verified",
            provider: "Blue Cross Blue Shield",
            policy: "BCBS-12345678",
            dailyRate: "$350.00",
            items: [
                { name: "Room Charges (Private)", rate: "$350/day", days: 5, amount: "$1750.00" },
                { name: "Nursing Care", rate: "$150/day", days: 5, amount: "$750.00" },
                { name: "Medications", rate: "-", days: "-", amount: "$320.00" },
                { name: "Laboratory Tests", rate: "-", days: "-", amount: "$450.00" },
            ],
            total: "$3270.00",
        },
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <button onClick={() => navigate(-1)} className="p-2 border rounded-lg">
                            <ArrowLeft size={18} />
                        </button>
                        <h1 className="text-2xl font-bold">Room Allotment Details</h1>
                        <span className="px-3 py-1 rounded-full text-xs bg-black text-white">
                            {data.status}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500">
                        Allotment ID: {data.allotmentId} | Room: {data.room} | Patient: {data.patient}
                    </p>
                </div>

                <div className="flex gap-2">
                    <button className="btn-outline flex items-center gap-2">
                        <LogOut size={16} /> Discharge Patient
                    </button>
                    <button className="btn-outline flex items-center gap-2">
                        <Pencil size={16} /> Edit
                    </button>
                    <button className="btn-outline flex items-center gap-2">
                        <Printer size={16} /> Print
                    </button>
                    <button className="btn-primary flex items-center gap-2">
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            {/* Top Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Section title="Patient Information" icon={<User size={18} />}>
                    <Grid2>
                        <Info label="Name" value={data.patientInfo.name} />
                        <Info label="Patient ID" value={data.patientInfo.id} />
                        <Info label="Age" value={data.patientInfo.age} />
                        <Info label="Gender" value={data.patientInfo.gender} />
                        <Info label="Contact" value={data.patientInfo.contact} />
                        <Info label="Email" value={data.patientInfo.email} />
                    </Grid2>
                    <Info label="Address" value={data.patientInfo.address} full />
                </Section>

                <Section title="Room Information" icon={<BedDouble size={18} />}>
                    <Grid2>
                        <Info label="Room Number" value={data.roomInfo.number} />
                        <Info label="Room Type" value={data.roomInfo.type} />
                        <Info label="Floor" value={data.roomInfo.floor} />
                        <Info label="Department" value={data.roomInfo.department} />
                        <Info label="Daily Rate" value={data.roomInfo.rate} />
                    </Grid2>
                    <div>
                        <p className="text-xs text-gray-500 mb-2">Facilities</p>
                        <div className="flex flex-wrap gap-2">
                            {data.roomInfo.facilities.map((f) => (
                                <span key={f} className="px-2 py-1 text-xs border rounded-full">
                                    {f}
                                </span>
                            ))}
                        </div>
                    </div>
                </Section>
            </div>

            {/* Bottom Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Section title="Allotment Details" icon={<Calendar size={18} />}>
                    <Grid2>
                        <Info label="Allotment Date" value={data.allotment.date} />
                        <Info label="Allotment Time" value={data.allotment.time} />
                        <Info label="Expected Discharge" value={data.allotment.expectedDischarge} />
                        <Info label="Actual Discharge" value={data.allotment.actualDischarge} />
                        <Info label="Attending Doctor" value={data.allotment.doctor} />
                        <Info label="Doctor ID" value={data.allotment.doctorId} />
                    </Grid2>
                    <Info label="Admission Reason" value={data.allotment.reason} full />
                    <Info label="Diagnosis" value={data.allotment.diagnosis} full />
                    <Info label="Notes" value={data.allotment.notes} full />
                </Section>

                <Section title="Billing Information" icon={<CreditCard size={18} />}>
                    <Grid2>
                        <Info label="Billing Status" value={data.billing.status} />
                        <Info label="Daily Room Rate" value={data.billing.dailyRate} />
                        <Info label="Insurance Provider" value={data.billing.provider} />
                        <Info label="Policy Number" value={data.billing.policy} />
                    </Grid2>

                    <div className="mt-4 border rounded-xl overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr className="text-xs text-gray-400">
                                    <th className="px-4 py-3 text-left">Item</th>
                                    <th className="px-4 py-3 text-right">Rate</th>
                                    <th className="px-4 py-3 text-right">Days</th>
                                    <th className="px-4 py-3 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {data.billing.items.map((i) => (
                                    <tr key={i.name}>
                                        <td className="px-4 py-3">{i.name}</td>
                                        <td className="px-4 py-3 text-right">{i.rate}</td>
                                        <td className="px-4 py-3 text-right">{i.days}</td>
                                        <td className="px-4 py-3 text-right">{i.amount}</td>
                                    </tr>
                                ))}
                                <tr className="font-semibold">
                                    <td colSpan={3} className="px-4 py-3 text-right">Total Estimated Charges</td>
                                    <td className="px-4 py-3 text-right">{data.billing.total}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Section>
            </div>
            <RoomDetailsTabs />
        </div>
    );
}

/* ---------------- Reusable Components ---------------- */

const Section = ({ title, icon, children }: any) => (
    <div className="bg-white border rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 font-semibold">
            {icon}
            {title}
        </div>
        {children}
    </div>
);

const Grid2 = ({ children }: any) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">{children}</div>
);

const Info = ({ label, value, full = false }: any) => (
    <div className={full ? "sm:col-span-2" : ""}>
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <p className="text-sm font-medium">{value}</p>
    </div>
);

/* Tailwind helpers (global)
.btn-primary { @apply bg-black text-white px-4 py-2.5 rounded-xl text-sm hover:bg-gray-900; }
.btn-outline { @apply border border-gray-200 px-4 py-2.5 rounded-xl text-sm bg-white hover:bg-gray-50; }
*/
