/* eslint-disable jsx-a11y/alt-text */
import { ImagePlus, Plus } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { saveBasicDetails } from "../../../redux/actions/doctorProfileAction";

/* ---------------- Types ---------------- */
type Membership = {
    id: string;
    title: string;
    about: string;
};



/* ---------------- Component ---------------- */
function BasicDetails({ doctorDetails, userDetails }: any) {
    const dispatch = useDispatch();

    /* ---------- Utils ---------- */
    function uid() {
        return Math.random().toString(36).slice(2, 9);
    }

    /* ---------- Profile image ---------- */
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageError, setImageError] = useState<string | null>(null);

    function onImageChange(e: ChangeEvent<HTMLInputElement>) {
        setImageError(null);
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 4 * 1024 * 1024) {
            setImageError("Image should be below 4 MB.");
            return;
        }

        const allowed = ["image/jpeg", "image/png", "image/svg+xml"];
        if (!allowed.includes(file.type)) {
            setImageError("Accepted formats: jpg, png, svg");
            return;
        }

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    }

    function removeImage() {
        setImageFile(null);
        setImagePreview(null);
        setImageError(null);
    }

    /* ---------- Basic info ---------- */
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [designation, setDesignation] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const [languageInput, setLanguageInput] = useState("");
    const [languages, setLanguages] = useState<string[]>([]);

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

    /* ---------- Specialties (NEW) ---------- */
    const [specialtyInput, setSpecialtyInput] = useState("");
    const [specialties, setSpecialties] = useState<string[]>([]);

    function addSpecialty() {
        const val = specialtyInput.trim();
        if (val && !specialties.includes(val)) {
            setSpecialties((s) => [...s, val]);
        }
        setSpecialtyInput("");
    }

    function removeSpecialty(s: string) {
        setSpecialties((prev) => prev.filter((x) => x !== s));
    }

    /* ---------- Memberships ---------- */
    const [memberships, setMemberships] = useState<Membership[]>([
        { id: uid(), title: "", about: "" },
    ]);

    function addMembership() {
        setMemberships((s) => [...s, { id: uid(), title: "", about: "" }]);
    }

    function updateMembership(id: string, patch: Partial<Membership>) {
        setMemberships((s) =>
            s.map((m) => (m.id === id ? { ...m, ...patch } : m))
        );
    }

    function removeMembership(id: string) {
        setMemberships((s) => s.filter((m) => m.id !== id));
    }

    /* ---------- Save ---------- */
    function onSave() {
        const payload = {
            firstName,
            lastName,
            displayName,
            designation,
            phone,
            email,
            languages,
            specialties,
            memberships,
        };

        dispatch<any>(saveBasicDetails(payload, imageFile))
            .then((res: any) => {
                if (res.type === "DOCTOR_BASIC_SUCCESS") {
                    toast.success("Basic details saved successfully!");
                }
            })
            .catch(() => toast.error("Failed to save details"));
    }


    function InputField({ label, value, set }: any) {
        return (
            <div>
                <label className="text-xs font-medium mb-1 block">{label}</label>
                <input
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    readOnly={label === "Phone" || label === "Email"}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-200
    ${label === "Phone" || label === "Email"
                            ? "bg-gray-100 text-gray-600 cursor-not-allowed"
                            : "bg-white"}
  `}
                />

            </div>
        );
    }

    useEffect(() => {
        if (!doctorDetails) return;

        setFirstName(doctorDetails.firstName ?? "");
        setLastName(doctorDetails.lastName ?? "");
        setDisplayName(doctorDetails.displayName ?? "");
        setDesignation(doctorDetails.designation ?? "");
        setLanguages(doctorDetails.languages ?? []);
        if (doctorDetails?.memberships?.length) {
            setMemberships(
                doctorDetails.memberships.map((m: any) => ({
                    id: m.id || uid(),   // ensure id exists
                    title: m.title ?? "",
                    about: m.about ?? "",
                }))
            );
        }

        if (doctorDetails?.specialties?.length) {
            setSpecialties(
                doctorDetails.specialties.map((s: any) => s.title)
            );
        }
    }, [doctorDetails]);

    useEffect(() => {
        if (!userDetails) return;

        setPhone(userDetails.phone ?? "");
        setEmail(userDetails.email ?? "");
    }, [userDetails]);


    /* ---------------- JSX ---------------- */
    return (
        <div className="bg-white rounded-lg shadow p-6 space-y-6">

            {/* Profile Image */}
            <div className="border rounded-md p-4">
                <div className="flex gap-4">
                    <div className="w-28 h-28 border border-dashed rounded-md flex items-center justify-center bg-gray-100 overflow-hidden">
                        {imagePreview ? (
                            <img src={imagePreview} className="w-full h-full object-cover" />
                        ) : (
                            <ImagePlus className="text-gray-400" />
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium">Profile Image</label>
                        <div className="flex gap-4 mt-2">
                            <label className="text-blue-600 cursor-pointer text-sm">
                                <input type="file" hidden onChange={onImageChange} />
                                Upload New
                            </label>
                            <button onClick={removeImage} className="text-red-500 text-sm">
                                Remove
                            </button>
                        </div>
                        {imageError && (
                            <div className="text-red-500 text-xs mt-1">{imageError}</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Information */}
            <div className="border rounded-md p-4">
                <div className="grid md:grid-cols-3 gap-4">
                    <InputField label="First Name" value={firstName} set={setFirstName} />
                    <InputField label="Last Name" value={lastName} set={setLastName} />
                    <InputField label="Display Name" value={displayName} set={setDisplayName} />
                    <InputField label="Designation" value={designation} set={setDesignation} />
                    <InputField label="Phone" value={phone} set={setPhone} />
                    <InputField label="Email" value={email} set={setEmail} />

                    {/* Languages */}
                    <TagInput
                        label="Known Languages"
                        items={languages}
                        input={languageInput}
                        setInput={setLanguageInput}
                        onAdd={addLanguage}
                        onRemove={removeLanguage}
                        placeholder="Add language"
                    />

                    {/* Specialties */}
                    <TagInput
                        label="Doctor Specialties"
                        items={specialties}
                        input={specialtyInput}
                        setInput={setSpecialtyInput}
                        onAdd={addSpecialty}
                        onRemove={removeSpecialty}
                        placeholder="e.g. Cardiologist"
                    />
                </div>
            </div>

            {/* Memberships */}
            <div className="border rounded-md p-4 space-y-4">
                {memberships.map((m) => (
                    <div key={m.id} className="grid md:grid-cols-3 gap-4">
                        <input
                            placeholder="Title"
                            value={m.title}
                            onChange={(e) =>
                                updateMembership(m.id, { title: e.target.value })
                            }
                            className="border px-3 py-2 rounded-md"
                        />
                        <input
                            placeholder="About"
                            value={m.about}
                            onChange={(e) =>
                                updateMembership(m.id, { about: e.target.value })
                            }
                            className="border px-3 py-2 rounded-md"
                        />
                        <button
                            onClick={() => removeMembership(m.id)}
                            className="text-red-500 text-sm"
                        >
                            Delete
                        </button>
                    </div>
                ))}

                <button
                    onClick={addMembership}
                    className="inline-flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-full text-sm"
                >
                    <Plus size={14} /> Add Membership
                </button>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4">
                <button className="border px-4 py-2 rounded-full">Cancel</button>
                <button
                    onClick={onSave}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-full"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}

/* ---------------- Reusable Components ---------------- */


function TagInput({
    label,
    items,
    input,
    setInput,
    onAdd,
    onRemove,
    placeholder,
}: any) {
    return (
        <div className="md:col-span-3">
            <label className="text-xs font-medium">{label}</label>
            <div className="flex gap-2 flex-wrap mt-1">
                {items.map((i: string) => (
                    <span
                        key={i}
                        className="bg-gray-100 px-3 py-1 rounded-md text-sm flex items-center gap-2"
                    >
                        {i}
                        <button onClick={() => onRemove(i)}>×</button>
                    </span>
                ))}
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) =>
                        e.key === "Enter" && (e.preventDefault(), onAdd())
                    }
                    placeholder={placeholder}
                    className="border px-3 py-2 rounded-md text-sm"
                />
                <button onClick={onAdd} className="text-indigo-600 text-sm">
                    Add
                </button>
            </div>
        </div>
    );
}

export default BasicDetails;
