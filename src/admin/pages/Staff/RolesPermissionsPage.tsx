import {
    FileText,
    Shield,
    Stethoscope,
    Users
} from 'lucide-react';
import React, { useState } from 'react';
import PermissionAuditLogs from './tabs/PermissionAuditLogs';
import PermissionMatrix from './tabs/PermissionMatrix';
import RoleListPage from './tabs/RoleListPage';
import RoleTemplatesPage from './tabs/RoleTemplatesPage';

const RolesAndPermissions: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Roles');

    // Layout switcher based on tab selection
    const renderTabContent = () => {
        switch (activeTab) {
            case 'Roles': return <RoleListPage />;
            case 'Templates': return <RoleTemplatesPage />;
            case 'Permission Matrix': return <PermissionMatrix />;
            case 'Audit Logs': return <PermissionAuditLogs />;
            default: return null;
        }
    };

    return (
        <div className="p-8 bg-[#F9FAFB] min-h-screen font-sans text-[#111827]">
            {/* Page Header and Stats Dashboard */}
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold">Roles & Permissions</h1>
                    <p className="text-gray-500 text-sm">Manage staff access and security controls</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Roles', value: '8', sub: '6 default, 2 custom', icon: <Shield className="text-gray-400" /> },
                    { label: 'Staff Assigned', value: '53', sub: 'Across all roles', icon: <Users className="text-gray-400" /> },
                    { label: 'Medical Roles', value: '3', sub: '36 staff assigned', icon: <Stethoscope className="text-gray-400" /> },
                    { label: 'Permission Sets', value: '8', sub: '4 permission types', icon: <FileText className="text-gray-400" /> },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-bold">{stat.label}</span>
                            {stat.icon}
                        </div>
                        <div className="text-3xl font-bold">{stat.value}</div>
                        <div className="text-[11px] text-gray-400 font-medium mt-1">{stat.sub}</div>
                    </div>
                ))}
            </div>

            {/* Main Container */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Navigation Tabs */}
                <div className="flex gap-8 px-6 border-b border-gray-100">
                    {['Roles', 'Templates', 'Permission Matrix', 'Audit Logs'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-4 text-sm font-medium transition-all relative ${activeTab === tab ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {tab}
                            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />}
                        </button>
                    ))}
                </div>

                {renderTabContent()}
            </div>
        </div>
    );
};

export default RolesAndPermissions;