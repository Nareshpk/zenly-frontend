import { Calendar, ChevronDown, ChevronUp, ImagePlus, Plus } from "lucide-react";
import { ChangeEvent, use, useState } from "react";
import { saveExperience } from "../../../redux/actions/doctorProfileAction";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

type ExperienceItem = {
    id: string;
    logo?: File | null;
    logoPreview?: string | null;
    title: string;
    hospital: string;
    years: string;
    location: string;
    employment: "Full Time" | "Part Time" | "Contract" | "Internship" | "Other" | string;
    description: string;
    startDate?: string;
    endDate?: string;
    currentlyWorking?: boolean;
    collapsed?: boolean;
};

export default function Experience() {
    const dispatch = useDispatch();
    const [items, setItems] = useState<ExperienceItem[]>([
        {
            id: id(),
            title: "",
            hospital: "",
            years: "",
            location: "",
            employment: "Part Time",
            description: "",
            startDate: "",
            endDate: "",
            currentlyWorking: false,
            collapsed: false,
        },
    ]);

    function id() {
        return Math.random().toString(36).slice(2, 9);
    }

    function addNew() {
        setItems((s) => [
            ...s,
            {
                id: id(),
                title: "",
                hospital: "",
                years: "",
                location: "",
                employment: "Part Time",
                description: "",
                startDate: "",
                endDate: "",
                currentlyWorking: false,
                collapsed: false,
            },
        ]);
    }

    function removeItem(idToRemove: string) {
        setItems((s) => s.filter((i) => i.id !== idToRemove));
    }

    function updateItem(idToUpdate: string, patch: Partial<ExperienceItem>) {
        setItems((s) => s.map((it) => (it.id === idToUpdate ? { ...it, ...patch } : it)));
    }

    function onLogoChange(e: ChangeEvent<HTMLInputElement>, id_: string) {
        const f = e.target.files?.[0];
        if (!f) return;
        const allowed = ["image/jpeg", "image/png", "image/svg+xml"];
        if (f.size > 4 * 1024 * 1024 || !allowed.includes(f.type)) {
            alert("Image should be below 4MB and in jpg/png/svg format.");
            return;
        }
        const url = URL.createObjectURL(f);
        updateItem(id_, { logo: f, logoPreview: url });
    }

    function resetItem(id_: string) {
        updateItem(id_, {
            logo: null,
            logoPreview: null,
            title: "",
            hospital: "",
            years: "",
            location: "",
            employment: "Part Time",
            description: "",
            startDate: "",
            endDate: "",
            currentlyWorking: false,
        });
    }

    function toggleCollapse(id_: string) {
        updateItem(id_, (items.find((it) => it.id === id_)?.collapsed ? { collapsed: false } : { collapsed: true }));
    }

    function formatSummary(it: ExperienceItem) {
        if (!it.hospital) return "(unsaved experience)";
        let dates = "";
        if (it.startDate) dates += it.startDate;
        if (it.endDate) dates += " - " + it.endDate;
        return `${it.hospital}${dates ? ` (${dates})` : ""}`;
    }

    function onSaveAll() {
        const doctorId = "693c3f419eeff6d09ce1cfa4"
        dispatch(saveExperience(doctorId, items) as any).then((res: any) => {
            if (res.type === "EXPERIENCE_ADD_SUCCESS") {
                toast.success("Experience saved successfully!");
                console.error("Error saving experience:", res.payload);
            }

        }).catch((err: any) => {
            console.error("Error saving experience:", err);
        });
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-slate-800">Experience</h2>
                <button onClick={addNew} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 text-white shadow">
                    <Plus size={16} /> Add New Experience
                </button>
            </div>

            <div className="space-y-4">
                {items.map((it) => (
                    <div key={it.id} className="bg-white rounded-md border border-gray-100 shadow-sm">
                        <div className="px-4 py-3 flex items-center justify-between">
                            <div className="font-medium text-sm">Experience</div>
                            <div className="flex items-center gap-4">
                                <button className="text-sm text-red-500" onClick={() => removeItem(it.id)}>
                                    Delete
                                </button>
                                <button onClick={() => toggleCollapse(it.id)} className="flex items-center gap-1 text-sm text-slate-600">
                                    {it.collapsed ? (
                                        <>
                                            <span>Expand</span>
                                            <ChevronDown size={16} />
                                        </>
                                    ) : (
                                        <>
                                            <span>Collapse</span>
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
                                                    <div className="text-xs">Hospital Logo</div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-2 text-xs text-gray-600">
                                            <label className="text-blue-600 cursor-pointer">
                                                <input type="file" accept="image/*" onChange={(e) => onLogoChange(e, it.id)} className="hidden" />
                                                Upload New
                                            </label>
                                            <button onClick={() => updateItem(it.id, { logo: null, logoPreview: null })} className="ml-3 text-red-500">Remove</button>
                                        </div>

                                        <div className="mt-1 text-xs text-gray-400">Your image should be below 4 MB, accepted format jpg,png,svg</div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium mb-1">Title</label>
                                                <input value={it.title} onChange={(e) => updateItem(it.id, { title: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm" />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-medium mb-1">Hospital *</label>
                                                <input value={it.hospital} onChange={(e) => updateItem(it.id, { hospital: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm" />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-medium mb-1">Year of Experience *</label>
                                                <input value={it.years} onChange={(e) => updateItem(it.id, { years: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 items-center">
                                            <div>
                                                <label className="block text-xs font-medium mb-1">Location *</label>
                                                <input value={it.location} onChange={(e) => updateItem(it.id, { location: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm" />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-medium mb-1">Employment</label>
                                                <select value={it.employment} onChange={(e) => updateItem(it.id, { employment: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm">
                                                    <option>Full Time</option>
                                                    <option>Part Time</option>
                                                    <option>Contract</option>
                                                    <option>Internship</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <label className="block text-xs font-medium mb-1">Job Description *</label>
                                            <textarea value={it.description} onChange={(e) => updateItem(it.id, { description: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm h-28" />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 items-center">
                                            <div>
                                                <label className="block text-xs font-medium mb-1">Start Date *</label>
                                                <div className="relative">
                                                    <input type="date" value={it.startDate} onChange={(e) => updateItem(it.id, { startDate: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm" />
                                                    <Calendar className="absolute right-3 top-3 text-gray-400" />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-medium mb-1">End Date *</label>
                                                <div className="relative">
                                                    <input type="date" value={it.endDate} onChange={(e) => updateItem(it.id, { endDate: e.target.value })} disabled={it.currentlyWorking} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm" />
                                                    <Calendar className="absolute right-3 top-3 text-gray-400" />
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <input id={`cw_${it.id}`} type="checkbox" checked={it.currentlyWorking} onChange={(e) => updateItem(it.id, { currentlyWorking: e.target.checked, endDate: e.target.checked ? "" : it.endDate })} className="h-4 w-4" />
                                                <label htmlFor={`cw_${it.id}`} className="text-sm">I Currently Working Here</label>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <button onClick={() => resetItem(it.id)} className="text-sm text-red-500">Reset</button>
                                            <div className="text-sm text-gray-500">&nbsp;</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {it.collapsed && (
                            <div className="px-6 py-3">
                                <div className="text-sm text-gray-700">{formatSummary(it)}</div>
                            </div>
                        )}
                    </div>
                ))}

                <div className="flex items-center justify-end gap-4 mt-4">
                    <button onClick={() => window.location.reload()} className="px-4 py-2 rounded-full border text-sm">Cancel</button>
                    <button onClick={onSaveAll} className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 text-white text-sm">Save Changes</button>
                </div>
            </div>
        </div>
    );
}
