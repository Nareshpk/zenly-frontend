/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import {
    Plus,
    Trash2,
    ArrowLeft,
    Search,
} from "lucide-react";
import UseMedicationTemplate from "./UseMedicationTemplate";
import { MedicationTemplate } from "../../../type/MedicationTypes";
import PrescriptionOptions from "./PrescriptionOptions";

interface Medication {
    name: string;
    dosage: string;
    frequency: string;
    route: string;
    duration: number;
    instructions: string;
    allowRefills: boolean;
    refills: number;
}

export default function CreatePrescription() {
    const [diagnosis, setDiagnosis] = useState("");




    const [medications, setMedications] = useState<Medication[]>([
        {
            name: "",
            dosage: "",
            frequency: "",
            route: "Oral",
            duration: 20,
            instructions: "",
            allowRefills: false,
            refills: 0,
        },
    ]);

    const addMedication = () => {
        setMedications([
            ...medications,
            {
                name: "",
                dosage: "",
                frequency: "",
                route: "Oral",
                duration: 20,
                instructions: "",
                allowRefills: false,
                refills: 0,
            },
        ]);
    };

    const removeMedication = (index: number) => {
        setMedications(medications.filter((_, i) => i !== index));
    };

    const updateMedication = (
        index: number,
        field: keyof Medication,
        value: any
    ) => {
        const updated: any = [...medications];
        updated[index][field] = value;
        setMedications(updated);
    };

    const applyTemplate = (template: MedicationTemplate) => {
        setDiagnosis(template.diagnosis);
        // setMedications(template.medications);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <button className="p-2 border rounded-lg">
                    <ArrowLeft size={16} />
                </button>
                <div>
                    <h1 className="text-2xl font-semibold">Create Prescription</h1>
                    <p className="text-sm text-gray-500">
                        Create a new prescription for a patient.
                    </p>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-3 gap-6">
                {/* LEFT – Prescription Form */}
                <div className="col-span-2 space-y-6">
                    {/* Prescription Details */}
                    <div className="bg-white border rounded-xl p-6 space-y-4">
                        <h2 className="font-semibold">Prescription Details</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm">Prescription Date</label>
                                <input
                                    type="date"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="text-sm">Prescription Type</label>
                                <select className="w-full border rounded-lg px-3 py-2">
                                    <option>Standard</option>
                                    <option>Controlled</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm">Diagnosis</label>
                            <textarea
                                className="w-full border rounded-lg px-3 py-2"
                                placeholder="Enter diagnosis or reason for prescription"
                            />
                        </div>
                    </div>
                    <UseMedicationTemplate onTemplateApply={applyTemplate} />
                    {/* Medications */}
                    <div className="bg-white border rounded-xl p-6 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="font-semibold">Medications</h2>
                            <button
                                onClick={addMedication}
                                className="flex items-center gap-2 px-3 py-2 bg-black text-white rounded-lg"
                            >
                                <Plus size={16} /> Add Medication
                            </button>
                        </div>

                        {medications.map((med, index) => (
                            <div
                                key={index}
                                className="border rounded-lg p-4 space-y-4"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="font-medium">
                                        Medication #{index + 1}
                                    </h3>
                                    {medications.length > 1 && (
                                        <button
                                            onClick={() => removeMedication(index)}
                                            className="text-red-500"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm">Medication Name</label>
                                    <input
                                        className="w-full border rounded-lg px-3 py-2"
                                        placeholder="Select medication"
                                        value={med.name}
                                        onChange={(e) =>
                                            updateMedication(index, "name", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm">Dosage</label>
                                        <input
                                            className="w-full border rounded-lg px-3 py-2"
                                            value={med.dosage}
                                            onChange={(e) =>
                                                updateMedication(index, "dosage", e.target.value)
                                            }
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm">Route</label>
                                        <select
                                            className="w-full border rounded-lg px-3 py-2"
                                            value={med.route}
                                            onChange={(e) =>
                                                updateMedication(index, "route", e.target.value)
                                            }
                                        >
                                            <option>Oral</option>
                                            <option>Injection</option>
                                            <option>Topical</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm">Frequency</label>
                                        <input
                                            className="w-full border rounded-lg px-3 py-2"
                                            value={med.frequency}
                                            onChange={(e) =>
                                                updateMedication(index, "frequency", e.target.value)
                                            }
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm">Duration (days)</label>
                                        <input
                                            type="number"
                                            className="w-full border rounded-lg px-3 py-2"
                                            value={med.duration}
                                            onChange={(e) =>
                                                updateMedication(
                                                    index,
                                                    "duration",
                                                    Number(e.target.value)
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm">Special Instructions</label>
                                    <textarea
                                        className="w-full border rounded-lg px-3 py-2"
                                        value={med.instructions}
                                        onChange={(e) =>
                                            updateMedication(
                                                index,
                                                "instructions",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="flex justify-between items-center">
                                    <label className="flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={med.allowRefills}
                                            onChange={(e) =>
                                                updateMedication(
                                                    index,
                                                    "allowRefills",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        Allow Refills
                                    </label>

                                    <div className="flex items-center gap-2">
                                        <span className="text-sm">Number of Refills</span>
                                        <input
                                            type="number"
                                            className="w-16 border rounded-lg px-2 py-1"
                                            value={med.refills}
                                            disabled={!med.allowRefills}
                                            onChange={(e) =>
                                                updateMedication(
                                                    index,
                                                    "refills",
                                                    Number(e.target.value)
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3">
                        <button className="px-4 py-2 border rounded-lg">
                            Cancel
                        </button>
                        <button className="px-4 py-2 bg-black text-white rounded-lg">
                            Create Prescription
                        </button>
                    </div>
                </div>

                {/* RIGHT – Patient & Options */}
                <div className="space-y-6">
                    {/* Patient Info */}
                    <div className="bg-white border rounded-xl p-6 space-y-4">
                        <h2 className="font-semibold">Patient Information</h2>

                        <div className="relative">
                            <Search
                                size={16}
                                className="absolute left-3 top-2.5 text-gray-400"
                            />
                            <input
                                className="w-full pl-9 border rounded-lg px-3 py-2"
                                placeholder="Search patients..."
                            />
                        </div>

                        <div className="border rounded-lg p-3">
                            <p className="font-medium">John Smith</p>
                            <p className="text-sm text-gray-500">Age: 45</p>
                            <p className="text-xs text-red-500">Allergy: Penicillin</p>
                            <p className="text-xs text-blue-500">
                                Condition: Type 2 Diabetes
                            </p>
                        </div>
                    </div>

                    {/* Prescription History */}
                    <div className="bg-white border rounded-xl p-6 space-y-3">
                        <h2 className="font-semibold">Prescription History</h2>

                        <div className="border rounded-lg p-3 text-sm">
                            <p className="font-medium">Lisinopril 10mg</p>
                            <p className="text-gray-500">Once daily • 30 days</p>
                        </div>

                        <div className="border rounded-lg p-3 text-sm">
                            <p className="font-medium">Metformin 500mg</p>
                            <p className="text-gray-500">Twice daily • 30 days</p>
                        </div>

                        <button className="w-full text-sm text-blue-600">
                            View All Prescriptions
                        </button>
                    </div>

                    {/* Options */}
                    <PrescriptionOptions />
                </div>
            </div>
        </div>
    );
}
