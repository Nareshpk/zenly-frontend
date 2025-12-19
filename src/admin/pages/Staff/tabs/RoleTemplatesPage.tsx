import React, { useState } from 'react';
import { Search, Plus, FileText, Copy, ShieldCheck, UserPlus } from 'lucide-react';
import CreateTemplateModal from '../Modal/CreateTemplateModal';
import ViewDetailsModal from '../Modal/ViewDetailsModal';

// --- Types ---
interface RoleTemplate {
    id: string;
    title: string;
    category: 'Medical' | 'Administrative';
    description: string;
    permissions: string[];
}

const TEMPLATES: RoleTemplate[] = [
    {
        id: '1',
        title: 'Medical Director',
        category: 'Medical',
        description: 'Full access to all medical functions with administrative oversight',
        permissions: ['dashboard', 'patients', 'appointments', 'billing', 'reports', 'settings'],
    },
    {
        id: '2',
        title: 'Head Nurse',
        category: 'Medical',
        description: 'Supervises nursing staff and manages patient care',
        permissions: ['dashboard', 'patients', 'appointments', 'billing', 'reports', 'settings'],
    },
    {
        id: '3',
        title: 'Finance Manager',
        category: 'Administrative',
        description: 'Manages financial operations and billing',
        permissions: ['dashboard', 'patients', 'appointments', 'billing', 'reports', 'settings'],
    },
    {
        id: '4',
        title: 'IT Administrator',
        category: 'Administrative',
        description: 'Manages system settings and user access',
        permissions: ['dashboard', 'patients', 'appointments', 'billing', 'reports', 'settings'],
    },
    {
        id: '5',
        title: 'Front Desk Coordinator',
        category: 'Administrative',
        description: 'Manages appointments and patient registration',
        permissions: ['dashboard', 'patients', 'appointments', 'billing', 'reports'],
    },
];

// --- Sub-component: Template Card ---
const TemplateCard = ({ template }: { template: RoleTemplate }) => {
    const permissionsData = [
        { module: 'Dashboard', view: true, create: false, edit: true, delete: false },
        { module: 'Patients', view: true, create: true, edit: true, delete: true },
        { module: 'Appointments', view: true, create: true, edit: true, delete: true },
        { module: 'Billing', view: true, create: false, edit: true, delete: false },
        { module: 'Reports', view: true, create: true, edit: true, delete: true },
        { module: 'Settings', view: true, create: false, edit: true, delete: false },
    ];
    const [isViewOpen, setIsViewOpen] = useState(false);
    return (<div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div>
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900">{template.title}</h3>
                <span className="text-[10px] font-bold px-2 py-1 rounded-full border border-gray-200 text-gray-600 uppercase tracking-tight">
                    {template.category}
                </span>
            </div>
            <p className="text-sm text-gray-500 mb-6">{template.description}</p>

            <div className="flex flex-wrap gap-2 mb-8">
                {template.permissions.map((perm) => (
                    <span key={perm} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                        {perm}
                    </span>
                ))}
            </div>
        </div>

        <div className="flex items-center justify-between pt-4">
            <button onClick={() => setIsViewOpen(true)} className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-black">
                <FileText className="w-4 h-4" /> View Details
            </button>
            <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50">
                    <Copy className="w-4 h-4" /> Clone
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800">
                    <ShieldCheck className="w-4 h-4" /> Apply
                </button>
            </div>
        </div>
        <ViewDetailsModal
            isOpen={isViewOpen}
            onClose={() => setIsViewOpen(false)}
            templateName={template.title}
            description={template.description}
            permissions={permissionsData}
        />
    </div>
    )
};

// --- Main Page ---
const RoleTemplatesPage = () => {
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const filteredTemplates = TEMPLATES.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Top Search Bar */}
            <div className="flex justify-between items-center mb-8">
                <div className="relative w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search templates..."
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition">
                    <Plus className="w-4 h-4" /> Create Template
                </button>
            </div>

            {/* Hero Section */}
            <div className="mb-10">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Role Templates</h1>
                <p className="text-gray-500 text-sm">Pre-defined role configurations that can be applied to new staff members</p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                ))}

                {/* Placeholder: Create New Template */}
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center bg-white/50 hover:bg-white transition-colors min-h-[280px]">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                        <UserPlus className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Create Template</h3>
                    <p className="text-gray-500 text-sm text-center mb-6 max-w-[200px]">
                        Define a new role template with custom permissions
                    </p>
                    <button onClick={() => setIsModalOpen(true)} className="bg-black text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-gray-800 transition">
                        Create New Template
                    </button>
                </div>
            </div>
            <CreateTemplateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default RoleTemplatesPage;