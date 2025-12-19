import {
    ArrowLeft,
    Printer,
    Download,
    Pencil,
    Calendar,
} from "lucide-react";
import { useState } from "react";

import { Plus } from "lucide-react";

type BatchStatus = "Active" | "Depleted";

interface Batch {
    batchNumber: string;
    quantityReceived: number;
    dateReceived: string;
    expiryDate: string;
    remaining: number;
    status: BatchStatus;
}

const batches: Batch[] = [
    {
        batchNumber: "BAT20240315",
        quantityReceived: 2000,
        dateReceived: "2023-12-10",
        expiryDate: "2025-06-15",
        remaining: 1250,
        status: "Active",
    },
    {
        batchNumber: "BAT20230610",
        quantityReceived: 1500,
        dateReceived: "2023-06-10",
        expiryDate: "2024-12-20",
        remaining: 0,
        status: "Depleted",
    },
    {
        batchNumber: "BAT20221205",
        quantityReceived: 1800,
        dateReceived: "2022-12-05",
        expiryDate: "2024-06-05",
        remaining: 0,
        status: "Depleted",
    },
];


interface AlternativeMedicine {
    id: string;
    medicineName: string;
    genericName: string;
    stock: number;
}

const alternatives: AlternativeMedicine[] = [
    {
        id: "ALT001",
        medicineName: "Augmentin 500mg",
        genericName: "Amoxicillin/Clavulanate",
        stock: 850,
    },
    {
        id: "ALT002",
        medicineName: "Azithromycin 250mg",
        genericName: "Azithromycin",
        stock: 620,
    },
    {
        id: "ALT003",
        medicineName: "Cefuroxime 500mg",
        genericName: "Cefuroxime",
        stock: 480,
    },
];


type Tab = "transactions" | "batches" | "alternatives";

export default function MedicineInformationPage() {
    const [tab, setTab] = useState<Tab>("transactions");

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button className="p-2 border rounded-md hover:bg-gray-100">
                        <ArrowLeft size={16} />
                    </button>
                    <h1 className="text-xl font-semibold">
                        Amoxicillin 500mg
                    </h1>
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs">
                        In Stock
                    </span>
                </div>

                <div className="flex gap-2">
                    <ActionButton icon={<Printer size={14} />} label="Print" />
                    <ActionButton icon={<Download size={14} />} label="Export" />
                    <ActionButton
                        icon={<Pencil size={14} />}
                        label="Edit"
                        primary
                    />
                </div>
            </div>

            {/* Top Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Medicine Info */}
                <InfoCard title="Medicine Information" subtitle="Basic details about this medicine">
                    <InfoGrid
                        items={[
                            ["ID", "MED005"],
                            ["Generic Name", "Amoxicillin"],
                            ["Category", "Antibiotics"],
                            ["Type", "Prescription"],
                            ["Manufacturer", "PharmaCorp Inc."],
                            ["Current Stock", "1250 units"],
                            ["Batch Number", "BAT20240315"],
                            ["Expiry Date", "2025-06-15"],
                            ["Purchase Price", "$0.75"],
                            ["Selling Price", "$1.25"],
                            ["Storage Location", "Shelf A-12"],
                        ]}
                    />
                </InfoCard>

                {/* Clinical Info */}
                <InfoCard
                    title="Clinical Information"
                    subtitle="Medical details and usage information"
                >
                    <Section label="Description">
                        Amoxicillin is a penicillin antibiotic that fights bacteria.
                        It is used to treat infections such as tonsillitis,
                        bronchitis, pneumonia, and urinary tract infections.
                    </Section>

                    <Section label="Dosage">
                        One capsule three times daily or as directed by physician.
                    </Section>

                    <Section label="Side Effects">
                        Diarrhea, nausea, vomiting, rash, allergic reactions.
                    </Section>

                    <Section label="Contraindications">
                        Hypersensitivity to penicillins or cephalosporins.
                    </Section>

                    <Section label="Storage Instructions">
                        Store at 15-30°C (59-86°F). Protect from moisture and heat.
                    </Section>
                </InfoCard>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b">
                <TabButton
                    active={tab === "transactions"}
                    onClick={() => setTab("transactions")}
                >
                    Transaction History
                </TabButton>
                <TabButton
                    active={tab === "batches"}
                    onClick={() => setTab("batches")}
                >
                    Batch History
                </TabButton>
                <TabButton
                    active={tab === "alternatives"}
                    onClick={() => setTab("alternatives")}
                >
                    Alternatives
                </TabButton>
            </div>

            {/* Tab Content */}
            {tab === "transactions" && <TransactionTable />}
            {tab === "batches" && <BatchHistoryTab />}
            {tab === "alternatives" && <AlternativesTab />}
        </div>
    );
}

/* =================== COMPONENTS =================== */

function ActionButton({
    icon,
    label,
    primary,
}: {
    icon: React.ReactNode;
    label: string;
    primary?: boolean;
}) {
    return (
        <button
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm border
      ${primary ? "bg-black text-white" : "bg-white hover:bg-gray-100"}`}
        >
            {icon}
            {label}
        </button>
    );
}

function InfoCard({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-white rounded-lg border p-6">
            <h2 className="font-semibold">{title}</h2>
            <p className="text-sm text-gray-500 mb-4">{subtitle}</p>
            {children}
        </div>
    );
}

function InfoGrid({ items }: { items: [string, string][] }) {
    return (
        <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
            {items.map(([label, value]) => (
                <div key={label}>
                    <div className="text-gray-500">{label}</div>
                    <div className="font-medium">{value}</div>
                </div>
            ))}
        </div>
    );
}

function Section({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="mb-4">
            <div className="text-sm text-gray-500 mb-1">{label}</div>
            <div className="text-sm">{children}</div>
        </div>
    );
}

function TabButton({
    active,
    children,
    onClick,
}: {
    active: boolean;
    children: React.ReactNode;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 text-sm rounded-t-md border-b-2
        ${active ? "border-black font-medium" : "border-transparent text-gray-500"}`}
        >
            {children}
        </button>
    );
}

function TransactionTable() {
    return (
        <div className="bg-white rounded-lg border p-6">
            <div className="flex justify-between mb-4">
                <h3 className="font-semibold">Recent Transactions</h3>
                <button className="flex items-center gap-2 px-3 py-2 border rounded-md text-sm">
                    <Calendar size={14} /> Filter by Date
                </button>
            </div>

            <table className="w-full text-sm">
                <thead className="text-gray-500 border-b">
                    <tr>
                        <th className="text-left py-2">Date</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Reference</th>
                        <th>Patient / Supplier</th>
                    </tr>
                </thead>
                <tbody>
                    <TransactionRow
                        date="2024-04-15"
                        type="Dispensed"
                        qty="-30"
                        ref="PRE20240415001"
                        party="John Doe"
                        negative
                    />
                    <TransactionRow
                        date="2024-04-10"
                        type="Dispensed"
                        qty="-20"
                        ref="PRE20240410003"
                        party="Jane Smith"
                        negative
                    />
                    <TransactionRow
                        date="2024-04-05"
                        type="Dispensed"
                        qty="-15"
                        ref="PRE20240405002"
                        party="Robert Johnson"
                        negative
                    />
                    <TransactionRow
                        date="2024-04-01"
                        type="Stock Adjustment"
                        qty="-5"
                        ref="ADJ20240401"
                        party="N/A"
                        negative
                    />
                    <TransactionRow
                        date="2024-03-25"
                        type="Received"
                        qty="+500"
                        ref="PO20240325"
                        party="N/A"
                    />
                </tbody>
            </table>
        </div>
    );
}

function TransactionRow({
    date,
    type,
    qty,
    ref,
    party,
    negative,
}: {
    date: string;
    type: string;
    qty: string;
    ref: string;
    party: string;
    negative?: boolean;
}) {
    return (
        <tr className="border-b last:border-none">
            <td className="py-3">{date}</td>
            <td>
                <span className="px-2 py-1 rounded-full text-xs border">
                    {type}
                </span>
            </td>
            <td className={negative ? "text-red-600" : "text-green-600"}>
                {qty}
            </td>
            <td className="text-yellow-600">{ref}</td>
            <td>{party}</td>
        </tr>
    );
}

function BatchHistoryTab() {
    return (
        <div className="bg-white border rounded-lg p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Batch History</h3>

                <button className="flex items-center gap-2 px-3 py-2 border rounded-md text-sm hover:bg-gray-100">
                    <Plus size={14} />
                    Add Batch
                </button>
            </div>

            {/* Table */}
            <table className="w-full text-sm">
                <thead className="text-gray-500 border-b">
                    <tr>
                        <th className="text-left py-3">Batch Number</th>
                        <th className="text-left">Quantity Received</th>
                        <th className="text-left">Date Received</th>
                        <th className="text-left">Expiry Date</th>
                        <th className="text-left">Remaining</th>
                        <th className="text-left">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {batches.map((batch) => (
                        <tr key={batch.batchNumber} className="border-b last:border-none">
                            <td className="py-3 font-medium">{batch.batchNumber}</td>
                            <td>{batch.quantityReceived}</td>
                            <td>{batch.dateReceived}</td>
                            <td>{batch.expiryDate}</td>
                            <td>{batch.remaining}</td>
                            <td>
                                <StatusBadge status={batch.status} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

/* ================= STATUS BADGE ================= */

function StatusBadge({ status }: { status: BatchStatus }) {
    const styles =
        status === "Active"
            ? "bg-black text-white"
            : "bg-gray-100 text-gray-700";

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles}`}>
            {status}
        </span>
    );
}


function AlternativesTab() {
    return (
        <div className="bg-white border rounded-lg p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Alternative Medicines</h3>

                <button className="flex items-center gap-2 px-3 py-2 border rounded-md text-sm hover:bg-gray-100">
                    <Pencil size={14} />
                    Add Alternative
                </button>
            </div>

            {/* Table */}
            <table className="w-full text-sm">
                <thead className="border-b text-gray-500">
                    <tr>
                        <th className="text-left py-3">Medicine Name</th>
                        <th className="text-left">Generic Name</th>
                        <th className="text-left">Current Stock</th>
                        <th className="text-right">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {alternatives.map((item) => (
                        <tr
                            key={item.id}
                            className="border-b last:border-none hover:bg-gray-50"
                        >
                            <td className="py-3 font-medium">{item.medicineName}</td>
                            <td>{item.genericName}</td>
                            <td>{item.stock} units</td>
                            <td className="text-right">
                                <button className="text-sm font-medium hover:underline">
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
