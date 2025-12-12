import { ImagePlus, Plus } from 'lucide-react';
import React, { ChangeEvent, use, useState } from 'react'
import { useDispatch } from 'react-redux';
import { saveBasicDetails } from '../../../redux/actions/doctorProfileAction';
import { toast } from 'react-hot-toast';

type Membership = { id: string; title: string; about: string };
function BasicDetails() {
    const dispatch = useDispatch();
    // Profile image
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageError, setImageError] = useState<string | null>(null);

    // Basic info
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [designation, setDesignation] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    // languages (simple tag input)
    const [languageInput, setLanguageInput] = useState("");
    const [languages, setLanguages] = useState<string[]>(["English"]);

    // memberships
    const [memberships, setMemberships] = useState<Membership[]>([
        { id: id(), title: "", about: "" },
    ]);

    function id() {
        return Math.random().toString(36).slice(2, 9);
    }

    function onImageChange(e: ChangeEvent<HTMLInputElement>) {
        setImageError(null);
        const f = e.target.files?.[0];
        if (!f) return;
        if (f.size > 4 * 1024 * 1024) {
            setImageError("Image should be below 4 MB.");
            return;
        }
        const allowed = ["image/jpeg", "image/png", "image/svg+xml"];
        if (!allowed.includes(f.type)) {
            setImageError("Accepted formats: jpg, png, svg");
            return;
        }
        setImageFile(f);
        const url = URL.createObjectURL(f);
        setImagePreview(url);
    }

    function removeImage() {
        setImageFile(null);
        setImagePreview(null);
        setImageError(null);
    }

    function addLanguage() {
        const val = languageInput.trim();
        if (val && !languages.includes(val)) {
            setLanguages((s) => [...s, val]);
        }
        setLanguageInput("");
    }

    function removeLanguage(l: string) {
        setLanguages((s) => s.filter((x) => x !== l));
    }

    function addMembership() {
        setMemberships((s) => [...s, { id: id(), title: "", about: "" }]);
    }

    function updateMembership(id_: string, patch: Partial<Membership>) {
        setMemberships((s) => s.map((m) => (m.id === id_ ? { ...m, ...patch } : m)));
    }

    function removeMembership(id_: string) {
        setMemberships((s) => s.filter((m) => m.id !== id_));
    }

    function onSave() {
        // gather data and send to API
        const payload = {
            firstName,
            lastName,
            displayName,
            designation,
            phone,
            email,
            languages,
            memberships,
        };
        dispatch<any>(saveBasicDetails(payload, imageFile)).then((res: any) => {
            console.log("Saved basic details:", res);
            if (res.type === "DOCTOR_BASIC_SUCCESS") {
                toast.success("Basic details saved successfully!");
                console.log("Doctor ID:", res.payload._id);
            }
        }).catch((err: any) => {
            console.error("Error saving basic details:", err);
        })

    }
    return (
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
            {/* Profile image */}
            <div className="border border-gray-200 rounded-md p-4">
                <div className="flex items-center gap-4">
                    <div className="w-28 h-28 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden border border-dashed border-gray-200">
                        {imagePreview ? (
                            <img src={imagePreview} alt="profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-gray-400 flex flex-col items-center gap-2">
                                <ImagePlus size={28} />
                                <div className="text-xs">No image</div>
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="text-sm font-medium">Profile Image</div>
                        <div className="flex items-center gap-4 mt-2">
                            <label className="inline-flex items-center gap-2 text-sm text-blue-600 cursor-pointer">
                                <input type="file" accept="image/*" onChange={onImageChange} className="hidden" />
                                <span className="text-sm font-medium">Upload New</span>
                            </label>

                            <button onClick={removeImage} className="text-sm text-red-500">Remove</button>
                        </div>

                        <div className="text-xs text-gray-500 mt-2">Your Image should be below 4 MB, Accepted format jpg, png, svg</div>
                        {imageError && <div className="text-sm text-red-500 mt-2">{imageError}</div>}
                    </div>
                </div>
            </div>

            {/* Information grid */}
            <div className="border border-gray-100 rounded-md p-4">
                <div className="text-sm font-medium mb-4">Information</div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-medium mb-1">First Name *</label>
                        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200" />
                    </div>

                    <div>
                        <label className="block text-xs font-medium mb-1">Last Name *</label>
                        <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200" />
                    </div>

                    <div>
                        <label className="block text-xs font-medium mb-1">Display Name *</label>
                        <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200" />
                    </div>

                    <div>
                        <label className="block text-xs font-medium mb-1">Designation *</label>
                        <input value={designation} onChange={(e) => setDesignation(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200" />
                    </div>

                    <div>
                        <label className="block text-xs font-medium mb-1">Phone Numbers *</label>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200" />
                    </div>

                    <div>
                        <label className="block text-xs font-medium mb-1">Email Address *</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200" />
                    </div>

                    <div className="md:col-span-3">
                        <label className="block text-xs font-medium mb-1">Known Languages *</label>

                        <div className="flex items-center gap-2 flex-wrap">
                            {languages.map((l) => (
                                <div key={l} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md text-sm">
                                    <span>{l}</span>
                                    <button onClick={() => removeLanguage(l)} className="text-xs text-gray-500">×</button>
                                </div>
                            ))}

                            <input
                                value={languageInput}
                                onChange={(e) => setLanguageInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addLanguage())}
                                placeholder="Add a tag"
                                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
                            />

                            <button onClick={addLanguage} className="ml-3 text-sm text-indigo-600">Save</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Memberships */}
            <div className="border border-gray-100 rounded-md p-4">
                <div className="text-sm font-medium mb-4">Memberships</div>

                <div className="space-y-4">
                    {memberships.map((m) => (
                        <div key={m.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                            <div>
                                <label className="block text-xs font-medium mb-1">Title *</label>
                                <input value={m.title} onChange={(e) => updateMembership(m.id, { title: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm" placeholder="Add Title" />
                            </div>

                            <div>
                                <label className="block text-xs font-medium mb-1">About Membership</label>
                                <input value={m.about} onChange={(e) => updateMembership(m.id, { about: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm" placeholder="About membership" />
                            </div>

                            <div className="flex gap-2 justify-end md:justify-start">
                                <button onClick={() => removeMembership(m.id)} className="text-sm text-red-500">Delete</button>
                            </div>
                        </div>
                    ))}

                    <div className="text-right">
                        <button onClick={addMembership} className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 text-white text-sm">
                            <Plus size={14} /> Add New
                        </button>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4">
                <button onClick={() => window.location.reload()} className="px-4 py-2 rounded-full border text-sm">Cancel</button>
                <button onClick={onSave} className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 text-white text-sm">Save Changes</button>
            </div>
        </div>
    )
}

export default BasicDetails
