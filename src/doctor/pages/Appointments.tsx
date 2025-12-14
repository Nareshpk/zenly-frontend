import React, { useEffect, useState } from "react";
import { Search, Calendar, Grid, List, Filter, Eye, Phone, Mail, Video, Headphones, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAppointmentsByDoctor } from "../../redux/actions/appointmentActions";
import { useData } from "../../shared/DataProvider";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../../redux/actions/userProfileAction";

export default function Appointments() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { docId, setDocId } = useData() as any;
  const authString = localStorage.getItem("auth");
  const parsedAuth = authString ? JSON.parse(authString) : null;
  const userId = parsedAuth?.user?.id
  const docdetails = localStorage.getItem("docId");
  const getdocdetails = docdetails ? JSON.parse(docdetails) : null;

  const [items, setItems] = useState<Request[]>([]);

  const [view, setView] = useState<"list" | "grid">("list");
  const [tab, setTab] = useState<"Upcoming" | "Cancelled" | "Completed">("Upcoming");
  const [q, setQ] = useState("");

  const filtered = items?.filter((a: any) => {
    if (!q.trim()) return true;
    const s = q.toLowerCase();
    return a.patientName.toLowerCase().includes(s) || a.appointmentNo.toLowerCase().includes(s) || a.email?.toLowerCase().includes(s);
  });


  const getRequests = async () => {
    dispatch(getAppointmentsByDoctor(docId?._id ?? getdocdetails?._id) as any)
      .then((res: any) => {
        if (res.type === "APPOINTMENT_LIST_SUCCESS") {
          setItems(res.payload);
        }
      })
      .catch((err: any) => console.error(err));
  };

  useEffect(() => {
    getRequests();
  }, []);


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">Appointments</h2>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="w-56 border rounded-md px-3 py-2 pr-10 text-sm" />
            <Search className="absolute right-3 top-3 text-gray-400" />
          </div>

          <button className="px-3 py-2 border rounded-md bg-white"><Calendar size={16} /></button>
          <button onClick={() => setView(view === "list" ? "grid" : "list")} className="px-3 py-2 border rounded-md bg-white">
            {view === "list" ? <Grid size={16} /> : <List size={16} />}
          </button>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <button onClick={() => setTab("Upcoming")} className={`px-4 py-2 rounded-md text-sm font-medium ${tab === "Upcoming" ? 'bg-blue-500 text-white' : 'bg-white border'}`}>
          Upcoming <span className="ml-2 inline-block bg-white text-blue-600 px-2 py-0.5 rounded-full text-xs">21</span>
        </button>

        <button onClick={() => setTab("Cancelled")} className={`px-4 py-2 rounded-md text-sm font-medium ${tab === "Cancelled" ? 'bg-blue-500 text-white' : 'bg-white border'}`}>
          Cancelled <span className="ml-2 inline-block bg-white text-slate-600 px-2 py-0.5 rounded-full text-xs">16</span>
        </button>

        <button onClick={() => setTab("Completed")} className={`px-4 py-2 rounded-md text-sm font-medium ${tab === "Completed" ? 'bg-blue-500 text-white' : 'bg-white border'}`}>
          Completed <span className="ml-2 inline-block bg-white text-slate-600 px-2 py-0.5 rounded-full text-xs">214</span>
        </button>

        <div className="ml-auto flex items-center gap-3">
          <button className="px-3 py-2 border rounded-md text-sm bg-white">08/04/2020 - 08/11/2020</button>
          <button className="px-3 py-2 border rounded-md text-sm bg-white"><Filter size={16} /> Filter By</button>
        </div>
      </div>

      {/* List view */}
      {view === "list" ? (
        <div className="space-y-4">
          {filtered.map((a: any) => (
            <div key={a._id} className="bg-white rounded-lg border p-4 flex items-center gap-4">
              <img
                src={`http://localhost:5000${a.avatar}`}
                alt={a.name}
                className="w-16 h-16 rounded-lg object-cover"
              />

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs text-sky-600">#{a.appointmentNo}</div>
                    <div className="text-lg font-semibold text-slate-800">{a.patientName} {!a?.tag && <span className="ml-2 inline-block bg-purple-500 text-white text-xs px-2 py-0.5 rounded">{"New"}</span>}</div>
                    <div className="text-sm text-slate-500 mt-1">{"General Visit | " + a.appointmentType}</div>
                  </div>

                  <div className="text-sm text-right">
                    <div className="text-slate-600">{a.date}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="inline-flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-full"><Mail size={14} /> {a.email}</div>
                      <div className="inline-flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-full"><Phone size={14} /> {a.phone}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center"><Eye size={16} /></button>
                    <button className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center"><Video size={16} /></button>
                    <button className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center"><Headphones size={16} /></button>
                  </div>

                  <a href="#" className="text-sm font-medium text-sky-600">Start Now</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Grid / card view */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((a: any) => (
            <div key={a?._id} className="bg-white rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <img src={a.avatar} alt={a.name} className="w-14 h-14 rounded-lg object-cover" />
                <div className="flex-1">
                  <div className="text-xs text-sky-600">#{a.appointmentNo}</div>
                  <div className="text-lg font-semibold">{a.patientName}</div>
                  <div className="text-sm text-slate-500 mt-1">{"General Visit | " + a.appointmentType}</div>

                  <div className="mt-3 bg-sky-50 rounded-md p-3 text-sm">
                    <div className="flex items-center gap-3"><Clock size={16} /> {a.date}</div>
                    <div className="flex items-center gap-3 mt-2"><MapPin size={16} /> {a.email}</div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span onClick={() => navigate("/doctor/doctor-appointment-details")} className="text-sm font-medium text-sky-600">Start Now</span>
                    <div className="flex items-center gap-2">
                      <button className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center"><Eye size={16} /></button>
                      <button className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center"><Video size={16} /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
