import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

type Platform = "Facebook" | "Linkedin" | "Twitter" | "Instagram" | "YouTube" | string;

type Item = {
    id: string;
    platform: Platform;
    url: string;
};

const PLATFORM_OPTIONS: Platform[] = [
    "Facebook",
    "Linkedin",
    "Twitter",
    "Instagram",
    "YouTube",
    "WhatsApp",
    "Telegram",
];


export default function SocialMedia() {
    const [items, setItems] = useState<Item[]>([
        { id: cryptoRandomId(), platform: "Facebook", url: "" },
        { id: cryptoRandomId(), platform: "Linkedin", url: "" },
    ]);

    function addNew() {
        setItems((s) => [...s, { id: cryptoRandomId(), platform: "Facebook", url: "" }]);
    }

    function removeItem(id: string) {
        setItems((s) => s.filter((i) => i.id !== id));
    }

    function updateItem(id: string, patch: Partial<Item>) {
        setItems((s) => s.map((it) => (it.id === id ? { ...it, ...patch } : it)));
    }

    function cryptoRandomId() {
        // small helper to generate unique-ish ids without extra deps
        return Math.random().toString(36).slice(2, 9);
    }

    return (
        <div className="p-6">
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">Social Media</h3>

            <div className="flex items-center gap-4 mb-6">
                <button
                    type="button"
                    onClick={addNew}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 text-white font-medium shadow-md hover:brightness-105 transition"
                >
                    <Plus size={16} />
                    Add New Social Media
                </button>
                <div className="text-sm text-gray-500">Add your social profiles so they appear on your public page.</div>
            </div>

            <div className="space-y-4">
                {items.map((item) => (
                    <div key={item.id} className="flex items-start gap-4">
                        {/* Left: select */}
                        <div className="w-48">
                            <label className="sr-only">Platform</label>
                            <select
                                value={item.platform}
                                onChange={(e) => updateItem(item.id, { platform: e.target.value })}
                                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            >
                                {PLATFORM_OPTIONS.map((p) => (
                                    <option key={p} value={p}>
                                        {p}
                                    </option>
                                ))}
                                
                            </select>
                        </div>

                        {/* Middle: url input */}
                        <div className="flex-1">
                            <label className="sr-only">Profile URL</label>
                            <input
                                placeholder="Add Url"
                                value={item.url}
                                onChange={(e) => updateItem(item.id, { url: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            />
                        </div>

                        {/* Right: remove */}
                        <div className="flex-shrink-0">
                            <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="px-4 py-2 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 shadow-sm flex items-center gap-2"
                                aria-label={`Remove ${item.platform}`}
                            >
                                <Trash2 size={14} />
                                Remove
                            </button>
                        </div>
                    </div>
                ))}

                {items.length === 0 && (
                    <div className="text-sm text-gray-500">No social media added yet. Click "Add New Social Media" to create one.</div>
                )}
            </div>

            {/* Footer actions (optional) */}
            <div className="mt-6 flex justify-end">
                <button
                    type="button"
                    onClick={() => alert(JSON.stringify(items, null, 2))}
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium shadow-sm hover:brightness-105"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
