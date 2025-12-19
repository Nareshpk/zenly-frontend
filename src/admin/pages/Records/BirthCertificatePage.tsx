import { ArrowLeft, Printer, Download } from "lucide-react";

export default function BirthCertificatePage() {
    const certificate = {
        certificateNo: "BC-2023-0542",
        childName: "Emma Johnson",
        gender: "Female",
        dob: "5/15/2023",
        time: "08:30",
        place: "City General Hospital",
        weight: "3.2 kg",
        length: "50 cm",
        mother: "Sarah Johnson",
        father: "Michael Johnson",
        nationality: "American",
        doctor: "Dr. Lisa Chen",
        hospital: "City General Hospital",
        registeredOn: "5/17/2023",
    };

    return (
        <div className=" bg-gray-50 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button className="btn-outline flex items-center gap-2">
                    <ArrowLeft size={16} /> Back to Details
                </button>
                <div className="flex gap-3">
                    <button onClick={() => window.print()} className="btn-outline flex items-center gap-2">
                        <Printer size={16} /> Print
                    </button>
                    <button className="btn-primary flex items-center gap-2">
                        <Download size={16} /> Download PDF
                    </button>
                </div>
            </div>

            {/* Certificate */}
            <div className="bg-white border max-w-3xl mx-auto p-10 shadow-sm print:p-6" id="certificate">
                <div className="text-center mb-8">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-xl font-bold">🏛️</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-wide">
                        CERTIFICATE OF BIRTH
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Official Birth Registration</p>
                    <p className="text-xs text-gray-600 mt-2">Certificate Number: {certificate.certificateNo}</p>
                </div>

                {/* Child Information */}
                <Section title="Child Information">
                    <TwoCol label="Full Name" value={certificate.childName} label2="Gender" value2={certificate.gender} />
                    <TwoCol label="Date of Birth" value={certificate.dob} label2="Time of Birth" value2={certificate.time} />
                    <TwoCol label="Place of Birth" value={certificate.place} label2="Weight & Length" value2={`${certificate.weight}, ${certificate.length}`} />
                </Section>

                {/* Parents */}
                <Section title="Parents Information">
                    <TwoCol label="Mother's Name" value={certificate.mother} label2="Father's Name" value2={certificate.father} />
                    <TwoCol label="Nationality" value={certificate.nationality} label2="" value2="" />
                </Section>

                {/* Medical */}
                <Section title="Medical Information">
                    <TwoCol label="Attending Doctor" value={certificate.doctor} label2="Hospital / Facility" value2={certificate.hospital} />
                </Section>

                {/* Footer */}
                <div className="mt-10 text-center text-xs text-gray-500">
                    <div className="flex justify-between mb-10 px-10">
                        <div>
                            <div className="border-t w-40 mx-auto mb-1" />
                            Registrar's Signature
                        </div>
                        <div>
                            <div className="border-t w-40 mx-auto mb-1" />
                            Official Seal
                        </div>
                    </div>
                    <p>Registered on {certificate.registeredOn} in accordance with the Civil Registry Law</p>
                    <p>This certificate is an official document and any alteration or falsification is punishable by law</p>
                </div>
            </div>
        </div>
    );
}

/* ---------------- Components ---------------- */

const Section = ({ title, children }: any) => (
    <div className="mb-6">
        <h3 className="font-semibold text-center mb-4">{title}</h3>
        <div className="border-t pt-4 space-y-3">{children}</div>
    </div>
);

const TwoCol = ({ label, value, label2, value2 }: any) => (
    <div className="grid grid-cols-2 gap-6 text-sm">
        <div>
            <p className="text-gray-500 text-xs">{label}</p>
            <p className="font-medium">{value}</p>
        </div>
        {label2 && (
            <div>
                <p className="text-gray-500 text-xs">{label2}</p>
                <p className="font-medium">{value2}</p>
            </div>
        )}
    </div>
);

/* Tailwind helpers (global)
.btn-primary { @apply px-4 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800; }
.btn-outline { @apply px-4 py-2 border rounded-md text-sm hover:bg-gray-50; }

@media print {
  body { background: white; }
  button { display: none; }
}
*/
