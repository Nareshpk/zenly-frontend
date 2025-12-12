/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import { CheckCircle, XCircle } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const revenueData = [
  { day: "M", revenue: 50 },
  { day: "T", revenue: 40 },
  { day: "W", revenue: 10 },
  { day: "T", revenue: 45 },
  { day: "F", revenue: 35 },
  { day: "S", revenue: 50 },
  { day: "S", revenue: 65 },
];

const appointments = [
  { id: "Apt0001", name: "Adrian Marshall", time: "11 Nov 2025 10.45 AM", type: "General", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&auto=format&fit=crop" },
  { id: "Apt0002", name: "Kelly Stevens", time: "10 Nov 2025 11.00 AM", type: "Clinic Consulting", avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?cs=srgb&dl=pexels-danxavier-1239291.jpg&fm=jpg" },
  { id: "Apt0003", name: "Samuel Anderson", time: "03 Nov 2025 02.00 PM", type: "General", avatar: "https://thumbs.dreamstime.com/b/millennial-caucasian-woman-reading-news-social-networks-using-mobile-phone-cafe-millennial-caucasian-woman-reading-news-294996235.jpg" },
  { id: "Apt0004", name: "Catherine Griffin", time: "01 Nov 2025 04.00 PM", type: "Clinic Consulting", avatar: "https://thumbs.dreamstime.com/b/portrait-cheerful-beautiful-woman-eyewear-pleased-look-wears-grey-casual-sweater-portrait-cheerful-beautiful-woman-183224846.jpg" },
  { id: "Apt0005", name: "Robert Hutchinson", time: "28 Oct 2025 05.30 PM", type: "General", avatar: "https://thumbs.dreamstime.com/b/confident-adult-female-fingers-glasses-contemplating-looking-camera-grey-texture-background-64915326.jpg" },
];

const invoices = [
  { name: "Adrian", id: "Apt0001", amount: "$450", paidOn: "11 Nov 2025" },
  { name: "Kelly", id: "Apt0002", amount: "$500", paidOn: "10 Nov 2025" },
  { name: "Samuel", id: "Apt0003", amount: "$320", paidOn: "03 Nov 2025" },
  { name: "Catherine", id: "Apt0004", amount: "$240", paidOn: "01 Nov 2025" },
  { name: "Robert", id: "Apt0005", amount: "$380", paidOn: "28 Oct 2025" },
];

export default function DoctorDashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-12 gap-6">
        {/* Left summary cards */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-500">Total Patient</div>
                <div className="text-2xl font-semibold mt-1">978</div>
                <div className="text-xs text-emerald-600 mt-2">▲ 15% From Last Week</div>
              </div>
              <div className="text-slate-300 text-4xl">👤</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-500">Patients Today</div>
                <div className="text-2xl font-semibold mt-1">80</div>
                <div className="text-xs text-red-500 mt-2">▼ 15% From Yesterday</div>
              </div>
              <div className="text-slate-300 text-4xl">🕒</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-500">Appointments Today</div>
                <div className="text-2xl font-semibold mt-1">50</div>
                <div className="text-xs text-emerald-600 mt-2">▲ 20% From Yesterday</div>
              </div>
              <div className="text-slate-300 text-4xl">📅</div>
            </div>
          </div>
        </div>

        {/* Main appointments card */}
        <div className="col-span-12 lg:col-span-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Appointment</h3>
              <select className="border rounded px-3 py-2 text-sm">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>

            <ul className="space-y-3">
              {appointments.map((a) => (
                <li key={a.id} className="flex items-center justify-between p-3 rounded-md hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <img src={a.avatar} alt="" className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <div className="text-xs text-indigo-600 font-medium">#{a.id}</div>
                      <div className="font-semibold">{a.name}</div>
                    </div>
                  </div>

                  <div className="text-sm text-slate-500">{a.time}<div className="mt-1 inline-block text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{a.type}</div></div>

                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full border border-emerald-200 text-emerald-600"><CheckCircle size={18} /></button>
                    <button className="p-2 rounded-full border border-red-200 text-red-600"><XCircle size={18} /></button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right column */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-xl shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs">Upcoming Appointment</div>
                <div className="font-semibold text-lg mt-1">Adrian Marshall</div>
                <div className="text-sm mt-2">General visit · Today, 10:45 AM</div>
              </div>
              <img src={appointments[0].avatar} className="w-14 h-14 rounded-lg object-cover" />
            </div>

            <div className="mt-4 flex gap-3">
              <button className="bg-white/20 text-white px-4 py-2 rounded-full">Chat Now</button>
              <button className="bg-white px-4 py-2 rounded-full text-blue-600">Start Appointment</button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">Recent Invoices</h4>
              <a className="text-xs text-indigo-600">View All</a>
            </div>

            <ul className="space-y-3">
              {invoices.map((inv) => (
                <li key={inv.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{inv.name}</div>
                    <div className="text-xs text-slate-500">#{inv.id}</div>
                  </div>

                  <div className="text-sm text-slate-700">
                    <div>{inv.amount}</div>
                    <div className="text-xs text-slate-400">{inv.paidOn}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Second row: chart + recent patients + notifications */}
        <div className="col-span-12 lg:col-span-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">Weekly Overview</h4>
              <div className="text-sm text-slate-400">Mar 14 - Mar 21</div>
            </div>

            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 h-full">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">Recent Patients</h4>
              <a className="text-xs text-indigo-600">View All</a>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-lg">
                <img src={appointments[0].avatar} className="w-12 h-12 rounded-md" />
                <div className="font-semibold mt-2">Adrian Marshall</div>
                <div className="text-xs text-slate-400">Patient ID: P0001</div>
                <div className="text-xs mt-2">Last Appointment 15 Mar 2025</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg">
                <img src={appointments[1].avatar} className="w-12 h-12 rounded-md" />
                <div className="font-semibold mt-2">Kelly Stevens</div>
                <div className="text-xs text-slate-400">Patient ID: P0002</div>
                <div className="text-xs mt-2">Last Appointment 13 Mar 2025</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 h-full">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">Notifications</h4>
              <a className="text-xs text-indigo-600">View All</a>
            </div>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center">🔔</div>
                <div>
                  <div className="text-sm">Booking Confirmed on <span className="font-semibold">21 Mar 2025</span></div>
                  <div className="text-xs text-slate-400">Just Now</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center">⭐</div>
                <div>
                  <div className="text-sm">You have a <span className="font-semibold">New Review</span> for your Appointment</div>
                  <div className="text-xs text-slate-400">5 Days ago</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Clinics & Availability */}
        <div className="col-span-12 lg:col-span-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 h-full">
            <h4 className="font-semibold mb-3">Clinics & Availability</h4>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="https://thumbs.dreamstime.com/b/sofi-logo-headquarters-facade-social-finance-online-personal-finance-company-sofi-logo-headquarters-facade-social-197261368.jpg" className="w-12 h-12 rounded-md object-cover" />
                  <div>
                    <div className="font-semibold">Sofi's Clinic</div>
                    <div className="text-xs text-slate-500">Tue: 07:00 AM - 09:00 PM</div>
                  </div>
                </div>
                <div className="text-sm font-semibold">$900</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="https://media.istockphoto.com/id/1428114896/photo/empty-corridor-in-modern-hospital-with-waiting-area-and-hospital-bed-in-rooms-3d-rendering.jpg?s=612x612&w=0&k=20&c=tqhBTji0gY6XbD4yfW0Ab1Vc6NJe2cQYdqQqs9J2zhM=" className="w-12 h-12 rounded-md object-cover" />
                  <div>
                    <div className="font-semibold">The Family Dentistry Clinic</div>
                    <div className="text-xs text-slate-500">Sat: 07:00 AM - 09:00 PM</div>
                  </div>
                </div>
                <div className="text-sm font-semibold">$600</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
