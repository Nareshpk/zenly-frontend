import React, { useEffect, useState, ChangeEvent } from "react";
import { Plus, ImagePlus, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { saveClinic } from "../../../redux/actions/doctorProfileAction";

type ClinicItem = {
  id: string;
  logo: File | null;                // actual file
  logoPreview?: string | null;      // URL.createObjectURL for preview
  name?: string;
  location?: string;
  address?: string;
  galleryFiles?: File[];            // actual files
  galleryPreviews?: string[];       // object URLs for previews
  collapsed?: boolean;
};

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export default function Clinics() {
  const dispatch = useDispatch();
  const [items, setItems] = useState<ClinicItem[]>([
    {
      id: uid(),
      logo: null,
      logoPreview: null,
      name: "",
      location: "",
      address: "",
      galleryFiles: [],
      galleryPreviews: [],
      collapsed: false,
    },
  ]);

  // cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      items.forEach((it) => {
        if (it.logoPreview) URL.revokeObjectURL(it.logoPreview);
        (it.galleryPreviews || []).forEach((p) => URL.revokeObjectURL(p));
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run only on unmount

  function addNew() {
    setItems((s) => [
      ...s,
      {
        id: uid(),
        logo: null,
        logoPreview: null,
        name: "",
        location: "",
        address: "",
        galleryFiles: [],
        galleryPreviews: [],
        collapsed: false,
      },
    ]);
  }

  function updateItem(id: string, patch: Partial<ClinicItem>) {
    setItems((s) => s.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }

  function removeItem(id: string) {
    setItems((s) => {
      const target = s.find((x) => x.id === id);
      if (target) {
        if (target.logoPreview) URL.revokeObjectURL(target.logoPreview);
        (target.galleryPreviews || []).forEach((p) => URL.revokeObjectURL(p));
      }
      return s.filter((it) => it.id !== id);
    });
  }

  function resetItem(id: string) {
    setItems((s) =>
      s.map((it) => {
        if (it.id !== id) return it;
        // revoke existing previews
        if (it.logoPreview) URL.revokeObjectURL(it.logoPreview);
        (it.galleryPreviews || []).forEach((p) => URL.revokeObjectURL(p));
        return { ...it, logo: null, logoPreview: null, name: "", location: "", address: "", galleryFiles: [], galleryPreviews: [] };
      })
    );
  }

  function onLogoChange(e: ChangeEvent<HTMLInputElement>, id: string) {
    const f = e.target.files?.[0];
    if (!f) return;
    const allowed = ["image/jpeg", "image/png", "image/svg+xml"];
    if (f.size > 4 * 1024 * 1024 || !allowed.includes(f.type)) {
      alert("Logo should be below 4MB and in jpg/png/svg format.");
      return;
    }
    const url = URL.createObjectURL(f);
    // revoke previous preview if any
    setItems((s) =>
      s.map((it) => {
        if (it.id !== id) return it;
        if (it.logoPreview) URL.revokeObjectURL(it.logoPreview);
        return { ...it, logo: f, logoPreview: url };
      })
    );
  }

  // unified gallery file handler used for both input change and drop
  function onGalleryFiles(files: FileList | null, id: string) {
    if (!files) return;
    const arr = Array.from(files).slice(0, 10);
    const allowed = ["image/jpeg", "image/png", "image/svg+xml"];
    const validFiles = arr.filter((f) => f.size <= 4 * 1024 * 1024 && allowed.includes(f.type));
    const previews = validFiles.map((f) => URL.createObjectURL(f));

    setItems((s) =>
      s.map((it) => {
        if (it.id !== id) return it;
        return {
          ...it,
          galleryFiles: [...(it.galleryFiles || []), ...validFiles],
          galleryPreviews: [...(it.galleryPreviews || []), ...previews],
        };
      })
    );
  }

  function removeGalleryImage(id: string, index: number) {
    setItems((s) =>
      s.map((it) => {
        if (it.id !== id) return it;
        const newFiles = (it.galleryFiles || []).slice();
        const newPreviews = (it.galleryPreviews || []).slice();
        const removedPreview = newPreviews.splice(index, 1)[0];
        newFiles.splice(index, 1);
        if (removedPreview) URL.revokeObjectURL(removedPreview);
        return { ...it, galleryFiles: newFiles, galleryPreviews: newPreviews };
      })
    );
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>, id: string) {
    e.preventDefault();
    if (!e.dataTransfer.files) return;
    onGalleryFiles(e.dataTransfer.files, id);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function toggleCollapse(id: string) {
    setItems((s) => s.map((it) => (it.id === id ? { ...it, collapsed: !it.collapsed } : it)));
  }

  function saveAll() {
    const doctorId = "693c3f419eeff6d09ce1cfa4";
    // dispatch one request per clinic (matches saveClinic signature)
    items.forEach((item) => {
      const clinicMeta = {
        name: item.name || "",
        location: item.location || "",
        address: item.address || "",
        // add any other non-file fields you need to persist
      };
      dispatch(saveClinic(doctorId, clinicMeta, item.logo, item.galleryFiles || []) as any);
    });
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-slate-800">Clinics</h2>
        <button onClick={addNew} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 text-white shadow">
          <Plus size={16} /> Add New Clinic
        </button>
      </div>

      <div className="space-y-4">
        {items.map((it) => (
          <div key={it.id} className="bg-white rounded-md border border-gray-100 shadow-sm">
            <div className="px-4 py-3 flex items-center justify-between cursor-pointer" onClick={() => toggleCollapse(it.id)}>
              <div className="text-sm font-medium text-slate-700">{it.name || "Clinic"}</div>

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
                        <input type="file" accept="image/png,image/jpeg,image/svg+xml" onChange={(e) => onLogoChange(e, it.id)} className="hidden" />
                        <span className="text-sm font-medium">Upload New</span>
                      </label>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (it.logoPreview) URL.revokeObjectURL(it.logoPreview);
                          updateItem(it.id, { logo: null, logoPreview: null });
                        }}
                        className="ml-3 text-red-500"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-1 text-xs text-gray-400">Your Image should be below 4 MB, Accepted format Jpg,Png,Svg</div>
                  </div>

                  <div className="flex-1">
                    <div>
                      <label className="block text-xs font-medium mb-1">Clinic Name</label>
                      <input value={it.name} onChange={(e) => updateItem(it.id, { name: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-xs font-medium mb-1">Location</label>
                        <input value={it.location} onChange={(e) => updateItem(it.id, { location: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm" />
                      </div>

                      <div>
                        <label className="block text-xs font-medium mb-1">Address</label>
                        <input value={it.address} onChange={(e) => updateItem(it.id, { address: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm" />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-xs font-medium mb-2">Gallery</label>

                      <div
                        onDrop={(e) => handleDrop(e as React.DragEvent<HTMLDivElement>, it.id)}
                        onDragOver={(e) => handleDragOver(e as React.DragEvent<HTMLDivElement>)}
                        className="w-full min-h-[80px] rounded-md border-2 border-dashed border-gray-200 bg-white flex items-center justify-center text-gray-400 text-sm"
                      >
                        <label className="w-full h-full flex items-center justify-center cursor-pointer">
                          <input type="file" accept="image/png,image/jpeg,image/svg+xml" multiple onChange={(e) => onGalleryFiles(e.target.files, it.id)} className="hidden" />
                          Drop files or Click to upload
                        </label>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-3">
                        {(it.galleryPreviews || []).map((p, idx) => (
                          <div key={p} className="w-28 bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
                            <img src={p} className="w-full h-20 object-cover" alt={`gallery-${idx}`} />
                            <div className="p-2 text-center">
                              <button onClick={() => removeGalleryImage(it.id, idx)} className="text-xs text-red-500 inline-flex items-center gap-2">
                                <Trash2 size={12} /> Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 text-xs text-gray-400">You can upload up to 10 images. Each should be &lt; 4MB.</div>
                    </div>

                    <div className="mt-4 border-t pt-4">
                      <div className="mt-2 flex items-center justify-between">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            resetItem(it.id);
                          }}
                          className="text-sm text-red-500"
                        >
                          Reset
                        </button>
                        <div />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* saved example (static preview) */}
        <div className="bg-white rounded-md border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm">Adrian's Dentistry</div>
            <div className="text-sm text-red-500">Delete</div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 mt-4">
          <button onClick={() => window.location.reload()} className="px-4 py-2 rounded-full border text-sm">
            Cancel
          </button>
          <button onClick={saveAll} className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 text-white text-sm">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
