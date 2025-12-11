import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function NavLink({ to, label, collapsed }: { to: string; label: string; collapsed: boolean }) {
    return (
        <Link
            to={to}
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 text-sm text-gray-700"
            aria-current={to === "/" ? "page" : undefined}
        >
            <span className="h-5 w-5 bg-gray-200 rounded" />
            <span className={`${collapsed ? "hidden" : "block"}`}>{label}</span>
        </Link>
    );
}

function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <aside className={`bg-white border-r transition-all duration-200 ${collapsed ? "w-16" : "w-64"} hidden sm:block`}>
                <div className="h-full flex flex-col">
                    <div className="px-4 py-5 flex items-center gap-3 border-b">
                        <div className={`text-xl font-bold ${collapsed ? "hidden" : "block"}`}>MyApp</div>
                        <button
                            onClick={() => setCollapsed((c) => !c)}
                            className="ml-auto p-1 rounded hover:bg-gray-100"
                            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                        >
                            {collapsed ? "»" : "«"}
                        </button>
                    </div>

                    <nav className="flex-1 px-2 py-4 space-y-1">
                        <NavLink to="/app/dashboard" label="Dashboard" collapsed={collapsed} />
                        <NavLink to="/app/user" label="Users" collapsed={collapsed} />
                        <NavLink to="/app/reports" label="Reports" collapsed={collapsed} />
                        <NavLink to="/app/settings" label="Settings" collapsed={collapsed} />
                    </nav>

                    <div className="p-4 border-t">
                        <button className="w-full text-left text-sm text-gray-600 hover:text-gray-900">Logout</button>
                    </div>
                </div>
            </aside>

        </div>
    )
}

export default Sidebar
