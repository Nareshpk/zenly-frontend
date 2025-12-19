import { Download, Info } from 'lucide-react';
import { useState } from 'react';

type Action = 'View' | 'Create' | 'Edit' | 'Delete';

interface PermissionState {
  [module: string]: {
    [role: string]: {
      [action in Action]: boolean;
    };
  };
}

const ROLES = [
  'Administrator', 'Doctor', 'Nurse', 'Receptionist', 
  'Billing Staff', 'Lab Technician', 'Senior Doctor', 'Department Head'
];

const MODULES = [
  'Dashboard', 'Patients', 'Appointments', 'Billing', 
  'Reports', 'Settings', 'Inventory', 'Staff'
];
const PermissionMatrix = () => {
  // Initialize state with some dummy data (simulating the screenshot)
  const [permissions, setPermissions] = useState<PermissionState>({});

  const togglePermission = (module: string, role: string, action: Action) => {
    // Logic to update state would go here
    console.log(`Toggling ${action} for ${role} in ${module}`);
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Header Area */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Permission Matrix</h1>
          <p className="text-sm text-gray-500">Manage permissions for each role across different modules</p>
        </div>
        <button className="flex items-center gap-2 border border-gray-200 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition">
          <Download className="w-4 h-4" /> Export Matrix
        </button>
      </div>

      {/* Matrix Table */}
      <div className="overflow-x-auto border border-gray-100 rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10 w-48">
                Module / Role
              </th>
              {ROLES.map((role) => (
                <th key={role} className="p-4 text-xs font-semibold text-gray-500 text-center min-w-[140px]">
                  {role}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {MODULES.map((module) => (
              <tr key={module} className="hover:bg-gray-50/30 transition-colors">
                {/* Module Name with Info Icon */}
                <td className="p-4 sticky left-0 bg-white z-10 border-r border-gray-50">
                  <div className="flex items-center justify-between group">
                    <span className="font-bold text-gray-800 text-sm">{module}</span>
                    <Info className="w-4 h-4 text-gray-300 group-hover:text-gray-500 cursor-help transition" />
                  </div>
                </td>

                {/* Role Permission Cells */}
                {ROLES.map((role) => (
                  <td key={`${module}-${role}`} className="p-4">
                    <div className="flex flex-col gap-1.5 items-start pl-4">
                      {(['View', 'Create', 'Edit', 'Delete'] as Action[]).map((action) => (
                        <label 
                          key={action} 
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            className="w-3.5 h-3.5 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                            // In a real app, use: checked={permissions[module]?.[role]?.[action]}
                            onChange={() => togglePermission(module, role, action)}
                          />
                          <span className="text-[11px] font-medium text-gray-600 group-hover:text-black transition">
                            {action}
                          </span>
                        </label>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PermissionMatrix;