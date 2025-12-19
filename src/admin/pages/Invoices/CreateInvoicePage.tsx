import { useState } from "react";
import { ArrowLeft, Plus, Trash2, Search } from "lucide-react";

/* -------------------- SERVICE MASTER -------------------- */
const SERVICES = [
    { label: "General Consultation", price: 150 },
    { label: "Specialist Consultation", price: 200 },
    { label: "Follow-up Consultation", price: 100 },
    { label: "Blood Test - Basic Panel", price: 80 },
    { label: "Blood Test - Comprehensive Panel", price: 150 },
    { label: "Urinalysis", price: 50 },
    { label: "X-Ray - Chest", price: 200 },
    { label: "X-Ray - Extremity", price: 150 },
    { label: "ECG", price: 120 },
    { label: "Physical Therapy Session", price: 100 },
    { label: "Vaccination - Flu", price: 45 },
];

/* -------------------- TYPES -------------------- */
type InvoiceItem = {
    checked: boolean;
    service: string;
    qty: number;
    unitPrice: number;
};

/* -------------------- COMPONENT -------------------- */
export default function CreateInvoicePage() {
    const [items, setItems] = useState<InvoiceItem[]>([
        { checked: false, service: "", qty: 1, unitPrice: 0 },
    ]);

    /* -------------------- CALCULATIONS -------------------- */
    const subtotal = items.reduce((sum, i) => sum + i.qty * i.unitPrice, 0);
    const taxRate = 0.08;
    const tax = subtotal * taxRate;
    const discount = 0;
    const total = subtotal + tax - discount;

    /* -------------------- HANDLERS -------------------- */
    const addItem = () =>
        setItems([...items, { checked: false, service: "", qty: 1, unitPrice: 0 }]);

    const removeItem = (index: number) =>
        setItems(items.filter((_, i) => i !== index));

    const updateItem = (index: number, key: keyof InvoiceItem, value: any) => {
        const copy: any = [...items];
        copy[index][key] = value;
        setItems(copy);
    };

    const handleServiceChange = (index: number, serviceName: string) => {
        const service = SERVICES.find((s) => s.label === serviceName);
        const copy = [...items];

        copy[index].service = serviceName;
        copy[index].unitPrice = service ? service.price : 0;

        setItems(copy);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* ---------------- HEADER ---------------- */}
            <div className="flex items-center gap-3 mb-6">
                <button className="p-2 rounded-lg border bg-white">
                    <ArrowLeft size={16} />
                </button>
                <div>
                    <h1 className="text-xl font-semibold">Create Invoice</h1>
                    <p className="text-sm text-gray-500">Create a new invoice for a patient.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ================= LEFT ================= */}
                <div className="lg:col-span-2 space-y-6">
                    {/* -------- Invoice Details -------- */}
                    <div className="bg-white border rounded-xl p-6 space-y-4">
                        <h2 className="font-semibold">Invoice Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="label">Invoice Number</label>
                                <input className="input" defaultValue="INV-008" />
                            </div>
                            <div>
                                <label className="label">Invoice Date</label>
                                <input className="input" defaultValue="Wed Dec 17 2025" />
                            </div>
                            <div>
                                <label className="label">Due Date</label>
                                <input className="input" defaultValue="Wed Dec 17 2025" />
                            </div>
                        </div>

                        <div>
                            <label className="label">Invoice Type</label>
                            <select className="input">
                                <option>Standard Invoice</option>
                            </select>
                        </div>

                        <div>
                            <label className="label">Reference / PO Number (Optional)</label>
                            <input className="input" placeholder="Enter reference or PO number" />
                        </div>
                    </div>

                    {/* -------- Items & Services -------- */}
                    <div className="bg-white border rounded-xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-semibold">Items & Services</h2>
                            <button onClick={addItem} className="btn-primary flex gap-2">
                                <Plus size={16} /> Add Item
                            </button>
                        </div>

                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-3 text-sm text-gray-500 mb-2">
                            <div className="col-span-1"></div>
                            <div className="col-span-6">Description</div>
                            <div className="col-span-2">Quantity</div>
                            <div className="col-span-2">Unit Price</div>
                            <div className="col-span-1 text-right">Total</div>
                        </div>

                        {items.map((item, index) => {
                            const rowTotal = item.qty * item.unitPrice;
                            return (
                                <div key={index} className="grid grid-cols-12 gap-3 items-center mb-3">
                                    <input type="checkbox" checked={item.checked} onChange={(e) => updateItem(index, "checked", e.target.checked)} />

                                    <select className="input col-span-6" value={item.service} onChange={(e) => handleServiceChange(index, e.target.value)}>
                                        <option value="">Select service or item</option>
                                        {SERVICES.map((s) => (
                                            <option key={s.label} value={s.label}>{s.label} - ${s.price.toFixed(2)}</option>
                                        ))}
                                    </select>

                                    <input type="number" min={1} className="input col-span-2" value={item.qty} onChange={(e) => updateItem(index, "qty", Number(e.target.value))} />

                                    <input type="number" className="input col-span-2" value={item.unitPrice} onChange={(e) => updateItem(index, "unitPrice", Number(e.target.value))} />

                                    <div className="col-span-1 text-right font-medium">${rowTotal.toFixed(2)}</div>

                                    <button onClick={() => removeItem(index)} className="text-red-500">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            );
                        })}

                        {/* Totals */}
                        <div className="mt-6 border-t pt-4 text-sm space-y-1 text-right">
                            <p>Subtotal: ${subtotal.toFixed(2)}</p>
                            <p>Tax (8%): ${tax.toFixed(2)}</p>
                            <p className="font-semibold text-base">Total: ${total.toFixed(2)}</p>
                        </div>
                    </div>

                    {/* -------- Notes -------- */}
                    <div className="bg-white border rounded-xl p-6 space-y-3">
                        <h2 className="font-semibold">Additional Information</h2>
                        <textarea className="input h-24" placeholder="Enter any additional notes" />
                        <select className="input"><option>Net 30 Days</option></select>
                    </div>

                    {/* -------- Actions -------- */}
                    <div className="flex justify-end gap-3">
                        <button className="btn-outline">Save as Draft</button>
                        <button className="btn-primary">Create Invoice</button>
                    </div>
                </div>

                {/* ================= RIGHT ================= */}
                <div className="space-y-6">
                    {/* -------- Patient Information -------- */}
                    <div className="bg-white border rounded-xl p-6">
                        <h2 className="font-semibold mb-1">Patient Information</h2>
                        <p className="text-xs text-gray-500 mb-3">Select a patient for this invoice.</p>

                        <div className="relative mb-4">
                            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                            <input className="input pl-9" placeholder="Search patients..." />
                        </div>

                        <div className="border rounded-lg p-4 text-sm space-y-1">
                            <div className="flex items-center gap-3 mb-2">
                                <img
                                    src="https://i.pravatar.cc/40"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="font-medium">John Smith</p>
                                    <p className="text-xs text-gray-500">45 • Male • ID: P12345</p>
                                </div>
                            </div>
                            <p>Email: john.smith@example.com</p>
                            <p>Phone: +1 (555) 123-4567</p>
                            <p className="text-gray-500">
                                Address: 123 Main Street, Apt 4B, New York, NY 10001
                            </p>
                            <button className="text-xs text-black underline mt-2">
                                View patient details
                            </button>
                        </div>
                    </div>

                    {/* -------- Insurance Information -------- */}
                    <div className="bg-white border rounded-xl p-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="font-semibold">Insurance Information</h2>
                                <p className="text-xs text-gray-500">Patient’s insurance details.</p>
                            </div>
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only" defaultChecked />
                                <div className="w-10 h-5 bg-gray-300 rounded-full relative">
                                    <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all" />
                                </div>
                            </label>
                        </div>

                        <div className="border rounded-lg p-4 text-sm">
                            <p className="font-medium">Blue Cross Blue Shield</p>
                            <p className="text-gray-500">Policy #: BCS123456789</p>
                            <p className="text-gray-500">Group #: GRP987654321</p>
                            <p className="text-gray-500">Coverage: PPO</p>
                        </div>

                        <div>
                            <label className="label">Copay Amount</label>
                            <input className="input" defaultValue="0.00" />
                        </div>

                        <div className="space-y-1 text-sm">
                            <p className="label">Coverage Verification</p>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="coverage" defaultChecked /> Verified
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="coverage" /> Pending Verification
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="coverage" /> Not Covered
                            </label>
                        </div>
                    </div>

                    {/* -------- Payment Options -------- */}
                    <div className="bg-white border rounded-xl p-6 space-y-4">
                        <h2 className="font-semibold">Payment Options</h2>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                            {[
                                "Credit Card",
                                "Debit Card",
                                "Cash",
                                "Check",
                                "Bank Transfer",
                                "Insurance",
                                "Patient Portal",
                                "Payment Plan",
                            ].map((m) => (
                                <label key={m} className="flex items-center gap-2">
                                    <input type="checkbox" defaultChecked /> {m}
                                </label>
                            ))}
                        </div>

                        <div className="flex justify-between items-center pt-2">
                            <button className="btn-outline text-xs">🧮 Tax Calculator</button>
                            <button className="btn-outline text-xs">👁 Preview</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
