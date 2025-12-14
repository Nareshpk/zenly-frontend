/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import {
  Edit2,
  Mail,
  Phone,
  Save,
  UploadCloud,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserProfile, saveUserProfile } from "../../redux/actions/userProfileAction";



export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const authString = localStorage.getItem("auth");
  const parsedAuth = authString ? JSON.parse(authString) : null;
  const userId = parsedAuth?.user?.id

  const initial = {
    name: "",
    email: "",
    phone: "",
    bio: "",
    age: "",
    sex: "",
    bloodGroup: "",
    address: "",
    avatar: null as string | null,
  };

  const [profile, setProfile] = useState(initial);
  const [draft, setDraft] = useState(initial);
  const [editing, setEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  /* ================= IMAGE PICK ================= */
  const pickImage = (file?: File) => {
    if (!file) return;

    setImageFile(file); // real file for backend

    const reader = new FileReader();
    reader.onload = () =>
      setDraft((p) => ({ ...p, avatar: reader.result as string }));
    reader.readAsDataURL(file);
  };

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    if (!userId) return;

    dispatch(getUserProfile(userId) as any).then((res: any) => {
      if (res?.profile) {
        setProfile(res.profile);
        setDraft(res.profile);
      }
    });
  }, [userId, dispatch]);

  /* ================= ACTIONS ================= */
  const startEdit = () => {
    setDraft(profile);
    setEditing(true);
  };

  const cancelEdit = () => {
    setDraft(profile);
    setEditing(false);
  };

  const saveProfile = () => {
    dispatch(
      saveUserProfile(userId, {
        age: draft.age,
        sex: draft.sex,
        bloodGroup: draft.bloodGroup,
        address: draft.address,
        file: imageFile,
      }) as any
    ).then(() => {
      setProfile(draft);
      setEditing(false);
    });
  };

  useEffect(() => {
    const authUser =
      parsedAuth?.user ||
      parsedAuth?.payload ||
      parsedAuth ||
      {};

    setProfile((prev) => ({
      ...prev,
      name: authUser.name || "",
      email: authUser.email || "",
      phone: authUser.phone || "", // ✅ FIXED
    }));
  }, []);
  /* ================= UI ================= */
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="relative w-full px-10 py-12">

        {/* HERO */}
        <div className="w-full rounded-[32px] bg-white/80 backdrop-blur-xl border border-slate-200 shadow-xl p-10 flex flex-wrap lg:flex-nowrap items-center gap-10">

          {/* AVATAR */}
          <div className="relative">
            <div className="w-40 h-40 rounded-full overflow-hidden bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center shadow-lg">
              {draft.avatar ? (
                <img
                  src={draft.avatar}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-white" />
              )}
            </div>

            <button
              onClick={() => {
                fileRef.current?.click();
                if (!editing) startEdit();
              }}
              className="absolute -bottom-3 -right-3 bg-white p-3 rounded-full shadow-lg border"
            >
              <UploadCloud size={18} />
            </button>
          </div>

          {/* INFO */}
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-slate-900">
              {profile.name}
            </h1>

            <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-700">
              <span className="flex items-center gap-2">
                <Mail size={14} /> {profile.email ?? parsedAuth?.user?.email}
              </span>
              <span className="flex items-center gap-2">
                <Phone size={14} /> {profile.phone}
              </span>
              {profile.age && <span>Age: {profile.age}</span>}
              {profile.sex && <span>Sex: {profile.sex}</span>}
              {profile.bloodGroup && (
                <span>Blood: {profile.bloodGroup}</span>
              )}
            </div>
          </div>

          {/* ACTION */}
          {!editing ? (
            <button
              onClick={startEdit}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold shadow-lg"
            >
              <Edit2 className="inline w-4 h-4 mr-2" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={saveProfile}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold shadow-lg"
              >
                <Save className="inline w-4 h-4 mr-2" />
                Save
              </button>
              <button
                onClick={cancelEdit}
                className="px-5 py-3 rounded-full border border-slate-300"
              >
                <X />
              </button>
            </div>
          )}
        </div>

        {/* FORM */}
        <div className="mt-10 w-full rounded-[28px] bg-white/80 backdrop-blur-xl border border-slate-200 shadow-lg p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Field label="Age" value={draft.age} disabled={!editing} onChange={(v: any) => setDraft({ ...draft, age: v })} />
            <SelectField label="Sex" value={draft.sex} disabled={!editing} options={["Male", "Female", "Other"]} onChange={(v: any) => setDraft({ ...draft, sex: v })} />
            <SelectField label="Blood Group" value={draft.bloodGroup} disabled={!editing} options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]} onChange={(v: any) => setDraft({ ...draft, bloodGroup: v })} />
            <div className="md:col-span-2">
              <label className="text-sm font-semibold">Address</label>
              <textarea
                rows={3}
                disabled={!editing}
                value={draft.address}
                onChange={(e) => setDraft({ ...draft, address: e.target.value })}
                className="mt-2 w-full rounded-xl border px-4 py-3"
              />
            </div>
          </div>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => pickImage(e.target.files?.[0])}
        />
      </div>
    </div>
  );
}

/* ================= INPUTS ================= */
function Field({ label, value, onChange, disabled }: any) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border px-4 py-3"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, disabled, options }: any) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border px-4 py-3"
      >
        <option value="">Select</option>
        {options.map((o: string) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
