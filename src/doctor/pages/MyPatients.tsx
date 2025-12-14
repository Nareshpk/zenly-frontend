import React, { useEffect, useState } from "react";
import { Search, Calendar, Filter, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useData } from "../../shared/DataProvider";
import { getAppointmentsByDoctor } from "../../redux/actions/appointmentActions";

type Patient = {
  id: string;
  appointmentId: string;
  name: string;
  avatar?: string;
  age?: number;
  gender?: string;
  blood?: string;
  nextAppointment?: string; // display string
  location?: string;
  lastBooking?: string;
};

const SAMPLE: Patient[] = [
  { id: "1", appointmentId: "Apt0001", name: "Adrian", avatar: "https://i.pravatar.cc/80?img=5", age: 42, gender: "Male", blood: "AB+", nextAppointment: "11 Nov 2025 10.45 AM", location: "Alabama, USA", lastBooking: "27 Feb 2025" },
  { id: "2", appointmentId: "Apt0002", name: "Kelly Stevens", avatar: "https://i.pravatar.cc/80?img=8", age: 37, gender: "Female", blood: "O+", nextAppointment: "05 Nov 2025 11.50 AM", location: "San Diego, USA", lastBooking: "20 Mar 2025" },
  { id: "3", appointmentId: "Apt0003", name: "Samuel James", avatar: "https://i.pravatar.cc/80?img=10", age: 43, gender: "Male", blood: "B+", nextAppointment: "27 Oct 2025 09.30 AM", location: "Chicago, USA", lastBooking: "12 Mar 2025" },
  { id: "4", appointmentId: "Apt0004", name: "Catherine Gracey", avatar: "https://i.pravatar.cc/80?img=9", age: 36, gender: "Female", blood: "AB-", nextAppointment: "18 Oct 2025 12.20 PM", location: "Los Angeles, USA", lastBooking: "27 Feb 2025" },
  { id: "5", appointmentId: "Apt0005", name: "Robert Miller", avatar: "https://i.pravatar.cc/80?img=4", age: 38, gender: "Male", blood: "A+", nextAppointment: "10 Oct 2025 11.30 AM", location: "Dallas, USA", lastBooking: "18 Feb 2025" },
  { id: "6", appointmentId: "Apt0006", name: "Andrea Kearns", avatar: "https://i.pravatar.cc/80?img=7", age: 40, gender: "Female", blood: "B-", nextAppointment: "26 Sep 2025 10.20 AM", location: "San Francisco, USA", lastBooking: "11 Feb 2025" },
  { id: "7", appointmentId: "Apt0007", name: "Peter Anderson", avatar: "https://i.pravatar.cc/80?img=12", age: 30, gender: "Male", blood: "A-", nextAppointment: "14 Sep 2025 08.10 AM", location: "Austin, USA", lastBooking: "25 Jan 2025" },
  { id: "8", appointmentId: "Apt0008", name: "Emily Musick", avatar: "https://i.pravatar.cc/80?img=11", age: 32, gender: "Female", blood: "O-", nextAppointment: "03 Sep 2025 06.00 PM", location: "Nashville, USA", lastBooking: "13 Jan 2025" },
  { id: "9", appointmentId: "Apt0009", name: "Darrell Tan", avatar: "https://i.pravatar.cc/80?img=6", age: 31, gender: "Male", blood: "AB+", nextAppointment: "25 Aug 2025 10.45 AM", location: "San Antonio, USA", lastBooking: "03 Jan 2025" },
];

export default function MyPatients() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { docId, setDocId } = useData() as any;
  const authString = localStorage.getItem("auth");
  const parsedAuth = authString ? JSON.parse(authString) : null;
  const userId = parsedAuth?.user?.id
  const docdetails = localStorage.getItem("docId");
  const getdocdetails = docdetails ? JSON.parse(docdetails) : null;

  const [items, setItems] = useState<Request[]>([]);

  const [tab, setTab] = useState<"Active" | "InActive">("Active");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(6);

  const filtered = items.filter((p: any) => {
    if (!query) return true;
    return (
      p.patientName.toLowerCase().includes(query.toLowerCase()) ||
      p.appointmentNo.toLowerCase().includes(query.toLowerCase()) ||
      p.address?.toLowerCase().includes(query.toLowerCase())
    );
  });

  const shown = filtered.slice(0, visible);

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
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">My Patients</h2>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" className="w-56 border rounded-md px-3 py-2 pr-10 text-sm" />
            <Search className="absolute right-3 top-3 text-gray-400" />
          </div>

          <button className="inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm bg-white"><Calendar size={16} />12 December 25 - 12 Decen</button>
          <button className="inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm bg-white"><Filter size={16} /> Filter By</button>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <button onClick={() => setTab("Active")} className={`px-4 py-2 rounded-md text-sm font-medium ${tab === "Active" ? 'bg-blue-500 text-white' : 'bg-white border'}`}>Active <span className="ml-2 inline-block bg-white text-blue-600 px-2 py-0.5 rounded-full text-xs">200</span></button>
        <button onClick={() => setTab("InActive")} className={`px-4 py-2 rounded-md text-sm font-medium ${tab === "InActive" ? 'bg-blue-500 text-white' : 'bg-white border'}`}>InActive <span className="ml-2 inline-block bg-white text-slate-600 px-2 py-0.5 rounded-full text-xs">22</span></button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shown.map((p: any) => (
          <div key={p._id} className="bg-white rounded-lg shadow p-5">
            <div className="flex items-start gap-4">
              <img src={`http://localhost:5000${p.avatar}`} alt={p.patientName} className="w-16 h-16 rounded-lg object-cover" />

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-sky-600 font-medium">#{p.appointmentNo}</div>
                    <div className="text-lg font-semibold text-slate-800">{p.patientName}</div>
                    <div className="text-sm text-slate-500 mt-1">Age : {p.age} | {p.sex} | {p.bloodGroup}</div>
                  </div>
                </div>

                <div className="mt-4 bg-sky-50 rounded-md p-3 text-sm text-slate-700">
                  {p?.nextAppointment && (<div className="flex items-center gap-3 mb-2"><Clock size={16} /> {p?.nextAppointment}</div>)}
                  <div className="flex items-center gap-3"><MapPin size={16} /> {p.address}</div>
                </div>

                <div className="mt-4 border-t pt-3 text-sm text-slate-500"> <span className="inline-block"><Calendar size={14} /></span> Last Booking {p.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="mt-8 text-center">
        {visible < filtered.length ? (
          <button onClick={() => setVisible((v) => v + 6)} className="text-sm text-slate-700">Load More</button>
        ) : (
          <div className="text-sm text-slate-500">No more results</div>
        )}
      </div> */}
    </div>
  );
}
