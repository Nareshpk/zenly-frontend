import React, { useState } from 'react';
import { ArrowLeft, Save, RotateCcw, Info } from 'lucide-react';

// --- Types ---
interface Permission {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
}

interface RoleFormState {
    name: string;
    category: string;
    description: string;
    isDefault: boolean;
    permissions: Record<string, Permission>;
}

const MODULES = [
    'Dashboard', 'Patients', 'Appointments', 'Billing',
    'Reports', 'Settings', 'Inventory', 'Staff'
];

const EditAdministratorRole = () => {
    const [formData, setFormData] = useState<RoleFormState>({
        name: 'Administrator',
        category: 'Administrative',
        description: 'Full system access with all permissions',
        isDefault: true,
        permissions: MODULES.reduce((acc, module) => ({
            ...acc,
            [module]: { view: true, create: true, edit: true, delete: true }
        }), {})
    });

    const togglePermission = (module: string, action: keyof Permission) => {
        setFormData(prev => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [module]: {
                    ...prev.permissions[module],
                    [action]: !prev.permissions[module][action]
                }
            }
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50/30 p-8 font-sans">
            {/* Breadcrumb / Back Button */}
            <button className="flex items-center gap-2 text-gray-500 hover:text-black mb-6 transition group">
                <ArrowLeft className="w-4 h-4" />
                <div>
                    <h1 className="text-sm font-bold text-gray-900 leading-none">Edit Administrator Role</h1>
                    <p className="text-[11px] text-gray-400 mt-1">Modify role details and permissions</p>
                </div>
            </button>

            {/* Role Information Section */}
            <section className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
                <h2 className="text-base font-bold text-gray-900 mb-1">Role Information</h2>
                <p className="text-xs text-gray-500 mb-6">Basic information about the role</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-500 uppercase">Role Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-black/5 outline-none transition"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-500 uppercase">Category</label>
                        <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none">
                            <option>Administrative</option>
                            <option>Medical</option>
                            <option>Custom</option>
                        </select>
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-500 uppercase">Description</label>
                        <textarea
                            rows={3}
                            value={formData.description}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none resize-none"
                        />
                    </div>
                </div>

                {/* Default Role Toggle */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setFormData(p => ({ ...p, isDefault: !p.isDefault }))}
                        className={`w-10 h-5 rounded-full relative transition-colors ${formData.isDefault ? 'bg-black' : 'bg-gray-200'}`}
                    >
                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${formData.isDefault ? 'left-6' : 'left-1'}`} />
                    </button>
                    <span className="text-xs font-bold text-gray-700">Set as default role</span>
                </div>
            </section>

            {/* Permissions Configuration Section */}
            <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-20">
                <h2 className="text-base font-bold text-gray-900 mb-1">Permissions</h2>
                <p className="text-xs text-gray-500 mb-8">Configure access permissions for this role</p>

                <div className="space-y-8">
                    {MODULES.map((module) => (
                        <div key={module} className="relative">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-bold text-gray-800">{module}</h3>
                                <Info className="w-4 h-4 text-gray-300 cursor-help" />
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {(['view', 'create', 'edit', 'delete'] as Array<keyof Permission>).map((action) => (
                                    <label key={action} className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={formData.permissions[module][action]}
                                                onChange={() => togglePermission(module, action)}
                                                className="peer appearance-none w-4 h-4 border-2 border-gray-200 rounded checked:bg-black checked:border-black transition-all cursor-pointer"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100">
                                                <div className="w-1.5 h-1.5 bg-white rounded-sm" />
                                            </div>
                                        </div>
                                        <span className="text-xs font-semibold text-gray-600 group-hover:text-black transition uppercase tracking-tight">
                                            {action}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Floating Footer Actions */}

            <div className="sticky bottom-0 z-20 bg-white">
                <div className="flex justify-between items-center pt-4 mt-6 border-t border-gray-200 px-6 pb-4">
                    <button
                        type="button"
                        className="flex items-center px-6 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                        <RotateCcw className="w-4 h-4" /> Reset Changes
                    </button>

                    <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                        <Save className="w-4 h-4" /> Save Changes
                    </button>
                </div>
            </div>

        </div>
    );
};

export default EditAdministratorRole;