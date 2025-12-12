import React, { useState, ChangeEvent, use } from "react";
import { Plus, ImagePlus, ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch } from "react-redux";
import { saveEducation } from "../../../redux/actions/doctorProfileAction";
import toast from "react-hot-toast";

type EducationItem = {
    id: string;
    logo?: File | null;
    logoPreview?: string | null;
    institution?: string;
    course?: string;
    startDate?: string;
    endDate?: string;
    years?: string;
    description?: string;
    collapsed?: boolean;
};

function uid() {
    return Math.random().toString(36).slice(2, 9);
}

export default function Education() {
    const dispatch = useDispatch();
    const [items, setItems] = useState<EducationItem[]>([
        {
            id: uid(),
            logoPreview: null,
            institution: "",
            course: "",
            startDate: "",
            endDate: "",
            years: "",
            description: "",
            collapsed: false,
        },
    ]);

    function addNew() {
        setItems((s) => [
            ...s,
            {
                id: uid(),
                logoPreview: null,
                institution: "",
                course: "",
                startDate: "",
                endDate: "",
                years: "",
                description: "",
                collapsed: false,
            },
        ]);
    }

    function updateItem(id: string, patch: Partial<EducationItem>) {
        setItems((s) => s.map((it) => (it.id === id ? { ...it, ...patch } : it)));
    }

    function removeItem(id: string) {
        setItems((s) => s.filter((it) => it.id !== id));
    }

    function resetItem(id: string) {
        updateItem(id, {
             logo: null,
            logoPreview: null,
            institution: "",
            course: "",
            startDate: "",
            endDate: "",
            years: "",
            description: "",
        });
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

    function formatHeader(it: EducationItem) {
        if (!it.institution) return "Education";
        const dates = it.startDate || it.endDate ? ` (${it.startDate ?? ""}${it.endDate ? ` - ${it.endDate}` : ""})` : "";
        return `${it.institution}${dates}`;
    }

    function saveAll() {
        const doctorId = "693c3f419eeff6d09ce1cfa4"
        dispatch(saveEducation(doctorId, items) as any).then((res: any) => {
            if (res.type === "EDUCATION_ADD_SUCCESS") {
                toast.success("Education saved successfully!");
            }
        }).catch((err: any) => {
            console.error("Error saving education:", err);
        });
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-slate-800">Education</h2>
                <button onClick={addNew} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 text-white shadow">
                    <Plus size={16} /> Add New Education
                </button>
            </div>

            <div className="space-y-4">
                {items.map((it) => (
                    <div key={it.id} className="bg-white rounded-md border border-gray-100 shadow-sm">
                        <div className="px-4 py-3 flex items-center justify-between cursor-pointer" onClick={() => toggleCollapse(it.id)}>
                            <div className="text-sm font-medium text-slate-700">{formatHeader(it)}</div>

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
                                <div className="flex gap-6">
                                    <div className="w-28">
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

                                    <div className="flex-1">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium mb-1">Name of the institution</label>
                                                <input
                                                    value={it.institution}
                                                    onChange={(e) => updateItem(it.id, { institution: e.target.value })}
                                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-medium mb-1">Course</label>
                                                <input
                                                    value={it.course}
                                                    onChange={(e) => updateItem(it.id, { course: e.target.value })}
                                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-medium mb-1">No of Years *</label>
                                                <input
                                                    value={it.years}
                                                    onChange={(e) => updateItem(it.id, { years: e.target.value })}
                                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 items-center">
                                            <div>
                                                <label className="block text-xs font-medium mb-1">Start Date *</label>
                                                <input type="date" value={it.startDate} onChange={(e) => updateItem(it.id, { startDate: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm" />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-medium mb-1">End Date *</label>
                                                <input type="date" value={it.endDate} onChange={(e) => updateItem(it.id, { endDate: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm" />
                                            </div>

                                            <div />
                                        </div>

                                        <div className="mt-4">
                                            <label className="block text-xs font-medium mb-1">Description *</label>
                                            <textarea value={it.description} onChange={(e) => updateItem(it.id, { description: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm h-28" />
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <button onClick={(e) => { e.stopPropagation(); resetItem(it.id); }} className="text-sm text-red-500">Reset</button>
                                            <div />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {/* Example saved summary */}
                <div className="bg-white rounded-md border border-gray-100 p-4">
                    <div className="flex items-center justify-between">
                        <div className="text-sm">Cambridge (MBBS)</div>
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
