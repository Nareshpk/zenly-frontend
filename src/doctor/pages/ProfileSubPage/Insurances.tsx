import React, { useState, ChangeEvent } from "react";
import { Plus, ImagePlus, ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { saveInsurance } from "../../../redux/actions/doctorProfileAction";

type InsuranceItem = {
    id: string;
    logo?: File | null;
    logoPreview?: string | null;
    name?: string;
    collapsed?: boolean;
};

function uid() {
    return Math.random().toString(36).slice(2, 9);
}

export default function Insurance({doctorDetails}:any) {
    const dispatch = useDispatch();
    const [items, setItems] = useState<InsuranceItem[]>([
        { id: uid(), logoPreview: null, name: "", collapsed: false },
    ]);

    function addNew() {
        setItems((s) => [...s, { id: uid(), logoPreview: null, name: "", collapsed: false }]);
    }

    function updateItem(id: string, patch: Partial<InsuranceItem>) {
        setItems((s) => s.map((it) => (it.id === id ? { ...it, ...patch } : it)));
    }

    function removeItem(id: string) {
        setItems((s) => s.filter((it) => it.id !== id));
    }

    function resetItem(id: string) {
        updateItem(id, { logo: null, logoPreview: null, name: "" });
    }

    function onLogoChange(e: ChangeEvent<HTMLInputElement>, id: string) {
        const f = e.target.files?.[0];
        if (!f) return;
        const allowed = ["image/jpeg", "image/png", "image/svg+xml"];
        if (f.size > 4 * 1024 * 1024 || !allowed.includes(f.type)) {
            alert("Image should be below 4MB and in jpg/png/svg format.");
            return;
        }
        const url = URL.createObjectURL(f);
        updateItem(id, { logo: f, logoPreview: url });
    }
    function toggleCollapse(id: string) {
        updateItem(id, { collapsed: !items.find((i) => i.id === id)?.collapsed });
    }

    function saveAll() {
        const doctorId = "693c3f419eeff6d09ce1cfa4"
        dispatch(saveInsurance(doctorId, items) as any).then((res: any) => {
            if (res.type === "INSURANCE_ADD_SUCCESS") {
                toast.success("Insurance saved successfully!");
            }
        }).catch((err: any) => {
            console.error("Error saving insurance:", err);
        });
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-slate-800">Insurance</h2>
                <button onClick={addNew} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 text-white shadow">
                    <Plus size={16} /> Add New Insurance
                </button>
            </div>

            <div className="space-y-4">
                {items.map((it) => (
                    <div key={it.id} className="bg-white rounded-md border border-gray-100 shadow-sm">
                        <div className="px-4 py-3 flex items-center justify-between cursor-pointer" onClick={() => toggleCollapse(it.id)}>
                            <div className="text-sm font-medium text-slate-700">{it.name || "Insurance"}</div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeItem(it.id);
                                    }}
                                    className="text-sm text-red-500"
                                >
                                    Delete
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleCollapse(it.id);
                                    }}
                                    className="flex items-center gap-1 text-sm text-slate-600"
                                >
                                    {it.collapsed ? (
                                        <>
                                            <span>Open</span>
                                            <ChevronDown size={16} />
                                        </>
                                    ) : (
                                        <>
                                            <span>Close</span>
                                            <ChevronUp size={16} />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {!it.collapsed && (
                            <div className="px-6 pb-6 pt-2 space-y-4">
                                <div className="flex flex-col gap-6">
                                    <div className="w-full flex flex-row items-center">
                                        <div className="w-24 h-24 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden border border-dashed border-gray-200">
                                            {it.logoPreview ? (
                                                <img src={it.logoPreview} alt="logo" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="text-gray-400 flex flex-col items-center gap-2">
                                                    <ImagePlus size={28} />
                                                    <div className="text-xs">Logo</div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1 pl-4">
                                            <div className="mt-2 text-xs text-gray-600">
                                                <label className="text-blue-600 cursor-pointer inline-flex items-center gap-2">
                                                    <input type="file" accept="image/*" onChange={(e) => onLogoChange(e, it.id)} className="hidden" />
                                                    <span className="text-sm font-medium">Upload New</span>
                                                </label>

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        updateItem(it.id, { logoPreview: null });
                                                    }}
                                                    className="ml-3 text-red-500"
                                                >
                                                    Remove
                                                </button>
                                            </div>

                                            <div className="mt-1 text-xs text-gray-400">Your Image should be below 4 MB, Accepted format Jpg,Png,Svg</div>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div>
                                            <label className="block text-xs font-medium mb-1">Insurance Name</label>
                                            <input value={it.name} onChange={(e) => updateItem(it.id, { name: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm" />
                                        </div>

                                        <div className="mt-4 border-t pt-4">
                                            <div className="mt-2 flex items-center justify-between">
                                                <div></div>
                                                <button onClick={(e) => { e.stopPropagation(); resetItem(it.id); }} className="text-sm text-red-500">Reset</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {/* example saved summary */}
                <div className="bg-white rounded-md border border-gray-100 p-4">
                    <div className="flex items-center justify-between">
                        <div className="text-sm">Star health</div>
                        <div className="text-sm text-red-500">Delete</div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4 mt-4">
                    <button onClick={() => window.location.reload()} className="px-4 py-2 rounded-full border text-sm">Cancel</button>
                    <button onClick={saveAll} className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 text-white text-sm">Save Changes</button>
                </div>
            </div>
        </div>
    );
}
