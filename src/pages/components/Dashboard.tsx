import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Stat = { id: string; title: string; value: string; delta?: string };
type RecentItem = { id: string; name: string; email?: string; phone?: string; role?: string; createdAt: string };

export default function Dashboard(){
  const [collapsed, setCollapsed] = useState(false);
  const [stats, setStats] = useState<Stat[]>([
    { id: "s1", title: "Active Users", value: "-", delta: "+" },
    { id: "s2", title: "Revenue", value: "-", delta: "+" },
    { id: "s3", title: "Orders", value: "-", delta: "-" },
  ]);
  const [recent, setRecent] = useState<RecentItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Example: fetch dashboard data from protected endpoint
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        // adjust URL to your backend
        const token = localStorage.getItem("token") || sessionStorage.getItem("token") || "";
        const res = await fetch("/api/dashboard", {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        });

        if (res.ok) {
          const body = await res.json();
          // expected shape: { stats: [...], recent: [...] } — adapt to your API
          if (body.stats) setStats(body.stats);
          if (body.recent) setRecent(body.recent);
        } else {
          // fallback to dummy data
          setStats([
            { id: "s1", title: "Active Users", value: "1,230", delta: "+4.2%" },
            { id: "s2", title: "Revenue", value: "₹42,400", delta: "+1.8%" },
            { id: "s3", title: "Orders", value: "312", delta: "-0.6%" },
          ]);
          setRecent([
            { id: "u1", name: "Naresh PK", email: "naresh@example.com", phone: "+919876543210", role: "user", createdAt: "2025-12-05" },
            { id: "u2", name: "Deepika B", email: "deepika@example.com", phone: "+919812345678", role: "manager", createdAt: "2025-12-04" },
          ]);
        }
      } catch (e) {
        console.error(e);
        setStats([
          { id: "s1", title: "Active Users", value: "1,230", delta: "+4.2%" },
          { id: "s2", title: "Revenue", value: "₹42,400", delta: "+1.8%" },
          { id: "s3", title: "Orders", value: "312", delta: "-0.6%" },
        ]);
        setRecent([
          { id: "u1", name: "Naresh PK", email: "naresh@example.com", phone: "+919876543210", role: "user", createdAt: "2025-12-05" },
          { id: "u2", name: "Deepika B", email: "deepika@example.com", phone: "+919812345678", role: "manager", createdAt: "2025-12-04" },
        ]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
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
            <NavLink to="/" label="Dashboard" collapsed={collapsed} />
            <NavLink to="/users" label="Users" collapsed={collapsed} />
            <NavLink to="/reports" label="Reports" collapsed={collapsed} />
            <NavLink to="/settings" label="Settings" collapsed={collapsed} />
          </nav>

          <div className="p-4 border-t">
            <button className="w-full text-left text-sm text-gray-600 hover:text-gray-900">Logout</button>
          </div>
        </div>
      </aside>

      {/* Mobile topbar and collapsible panel */}
      <div className="sm:hidden w-full">
        <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
          <div className="font-bold">MyApp</div>
          <div className="flex items-center gap-2">
            <MobileMenu />
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <input
                type="search"
                placeholder="Search..."
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <button className="px-3 py-2 rounded-md bg-white border hover:bg-gray-50">Notifications</button>
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">U</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {stats.map((s) => (
            <div key={s.id} className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-sm text-gray-500">{s.title}</div>
              <div className="mt-2 flex items-baseline justify-between">
                <div className="text-2xl font-semibold">{s.value}</div>
                {s.delta && (
                  <div className={`text-sm font-medium ${s.delta.startsWith("-") ? "text-red-600" : "text-green-600"}`}>
                    {s.delta}
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Content grid: chart placeholder + recent table */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-4 rounded-lg border shadow-sm">
            <h2 className="text-lg font-medium mb-3">Overview</h2>
            {/* Placeholder for chart */}
            <div className="h-48 flex items-center justify-center text-gray-400 border-dashed border rounded">Chart placeholder</div>
          </div>

          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <h2 className="text-lg font-medium mb-3">Recent Users</h2>

            {loading ? (
              <div className="text-sm text-gray-500">Loading...</div>
            ) : recent.length === 0 ? (
              <div className="text-sm text-gray-500">No recent activity</div>
            ) : (
              <ul className="space-y-3">
                {recent.map((r) => (
                  <li key={r.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{r.name}</div>
                      <div className="text-xs text-gray-500">{r.email ?? r.phone}</div>
                    </div>
                    <div className="text-xs text-gray-400">{r.createdAt}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Recent table */}
        <section className="mt-6 bg-white p-4 rounded-lg border shadow-sm">
          <h2 className="text-lg font-medium mb-3">Recent Signups</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="text-sm text-gray-600">
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Phone</th>
                  <th className="px-3 py-2">Role</th>
                  <th className="px-3 py-2">Joined</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="px-3 py-2">{r.name}</td>
                    <td className="px-3 py-2 text-sm text-gray-600">{r.email}</td>
                    <td className="px-3 py-2">{r.phone}</td>
                    <td className="px-3 py-2">{r.role}</td>
                    <td className="px-3 py-2">{r.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

/* Small helper components below */

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

function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen((s) => !s)} className="px-3 py-2 border rounded">
        Menu
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-20">
          <Link to="/" className="block px-3 py-2 hover:bg-gray-50">
            Dashboard
          </Link>
          <Link to="/users" className="block px-3 py-2 hover:bg-gray-50">
            Users
          </Link>
          <Link to="/settings" className="block px-3 py-2 hover:bg-gray-50">
            Settings
          </Link>
        </div>
      )}
    </div>
  );
}
