/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Calendar,
  CheckCircle,
  Clock,
  PlayCircle,
  Search,
  StopCircle,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  endAppointment,
  getAppointmentsByDoctor,
  startAppointment,
  updateAppointmentStatus,
} from "../../redux/actions/appointmentActions";
import { useData } from "../../shared/DataProvider";
import { useNavigate } from "react-router-dom";

type Request = {
  _id: string;
  doctorId: any;
  appointmentNo: string;
  patientName: string;
  doctorName: string;
  appointmentType: "Audio Call" | "Video Call" | "Direct Visit";
  date: string;
  time: string;
  startedAt?: Date;
  endedAt?: Date;
  durationInSeconds?: number;
  consultationFor: string;
  status: "Pending" | "Confirmed" | "Cancelled" | "In Progress" | "Completed";
  createdAt: Date;
};

export default function Requests() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { docId, setDocId } = useData() as any;

  const authString = localStorage.getItem("auth");
  const parsedAuth = authString ? JSON.parse(authString) : null;
  const docdetails = localStorage.getItem("docId");
  const getdocdetails = docdetails ? JSON.parse(docdetails) : null;
  const [items, setItems] = useState<Request[]>([]);
  const [range, setRange] = useState("Last 7 Days");

  // timer state
  const [activeTimerId, setActiveTimerId] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);

  /* ================= TIMER ================= */
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (activeTimerId) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeTimerId]);

  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds || seconds <= 0) return "0 sec";

    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) return `${hrs} hr ${mins} min`;
    if (mins > 0) return `${mins} min ${secs} sec`;
    return `${secs} sec`;
  };

  /* ================= API ================= */

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
  }, [docId, getdocdetails]);

  /* ================= STATUS ================= */
  const handleStatus = (
    id: string,
    status: "Confirmed" | "Cancelled" | "In Progress" | "Completed"
  ) => {
    dispatch(updateAppointmentStatus(id, status) as any)
      .then(() => getRequests())
      .catch((err: any) => console.error(err));
  };

  /* ================= CALL HANDLERS ================= */
  const handleStart = (r: Request) => {
    setActiveTimerId(r._id);
    setSeconds(0);

    dispatch(startAppointment(r._id) as any)
      .then(() => getRequests())
      .catch((err: any) => console.error(err));
  };

  const handleEnd = (id: string) => {
    setActiveTimerId(null);

    dispatch(endAppointment(id) as any)
      .then(() => getRequests())
      .catch((err: any) => console.error(err));
  };

  const handleVideoCall = (r: Request) => {
    handleStart(r);
    window.open(`/doctor/video-call/${r._id}`, "_blank");
  };

  const handleAudioCall = (r: Request) => {
    handleStart(r);
    window.open(`/doctor/audio-call/${r._id}`, "_blank");
  };

  /* ================= UI ================= */
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="w-full px-4">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-slate-800">Requests</h2>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                placeholder="Search"
                className="w-56 border rounded-md px-3 py-2 pr-10 text-sm"
              />
              <Search className="absolute right-3 top-3 text-gray-400" />
            </div>

            <div className="relative">
              <select
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Custom Range</option>
              </select>
              <Calendar className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>

        {/* LIST */}
        <div className="space-y-4">
          {items.map((r) => (
            <div
              key={r._id}
              className="bg-white rounded-lg border p-4 flex items-center gap-4"
            >
              <img
                src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
                className="w-14 h-14 rounded-lg object-cover"
              />

              <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                {/* PATIENT */}
                <div>
                  <div className="text-xs text-sky-600">
                    #{r.appointmentNo}
                  </div>
                  <div className="font-medium text-slate-800">
                    {r.patientName}
                  </div>
                </div>

                {/* TIME */}
                <div className="text-sm text-slate-600">
                  <div className="inline-flex items-center gap-2">
                    <Clock size={14} /> {r.time} {r.date}
                  </div>
                  <div className="mt-1">
                    Consultation for {r.consultationFor}
                  </div>
                </div>

                {/* STATUS */}
                <div className="text-sm">
                  <div className="font-medium">Status</div>
                  <div>{r.status}</div>
                </div>

                {/* DURATION */}
                <div className="text-sm">
                  <div className="font-medium">Visit Duration</div>
                  <div>{formatDuration(r.durationInSeconds)}</div>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-4">
                  <div className="text-sm">
                    <div className="mb-2 font-medium">Type of Appointment</div>
                    <div className="inline-flex items-center gap-2 text-sm">
                      {r.appointmentType === "Video Call" && <span className="inline-flex items-center gap-1 text-sm"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M23 7l-7 5 7 5V7zM1 5v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H3a2 2 0 00-2 2z" fill="#3B82F6" /></svg> Video Call</span>}
                      {r.appointmentType === "Audio Call" && <span className="inline-flex items-center gap-1 text-sm"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3v10l3-2V3h-3zM3 6v12h6v-6H6V6H3z" fill="#6D28D9" /></svg> Audio Call</span>}
                      {r.appointmentType === "Direct Visit" && <span className="inline-flex items-center gap-1 text-sm"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5" fill="#059669" /></svg> Direct Visit</span>}
                    </div>
                  </div>

                  {r.status === "Pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleStatus(r._id, "Confirmed")
                        }
                        className="inline-flex items-center gap-1 text-green-600 text-sm"
                      >
                        <CheckCircle size={16} /> Accept
                      </button>
                      <button
                        onClick={() =>
                          handleStatus(r._id, "Cancelled")
                        }
                        className="inline-flex items-center gap-1 text-red-600 text-sm"
                      >
                        <XCircle size={16} /> Reject
                      </button>
                    </>
                  )}

                  {r.status === "Confirmed" && (
                    <>
                      {r.appointmentType === "Video Call" && (
                        <button
                          onClick={() => navigate(`/doctor/video-call/${r._id}`)}
                          className="inline-flex items-center gap-2 text-indigo-600 text-sm font-medium"
                        >
                          <PlayCircle size={18} /> Start Video Call
                        </button>
                      )}

                      {r.appointmentType === "Audio Call" && (
                        <button
                          onClick={() => navigate(`/doctor/audio-call/${r._id}`)}
                          className="inline-flex items-center gap-2 text-purple-600 text-sm font-medium"
                        >
                          <PlayCircle size={18} /> Start Audio Call
                        </button>
                      )}

                      {r.appointmentType === "Direct Visit" && (
                        <button
                          onClick={() => handleStart(r)}
                          className="inline-flex items-center gap-2 text-green-600 text-sm font-medium"
                        >
                          <PlayCircle size={18} /> Start Visit
                        </button>
                      )}
                    </>
                  )}

                  {r.status === "In Progress" &&
                    activeTimerId === r._id && (
                      <>
                        <span className="font-mono text-sm">
                          ⏱ {formatTime(seconds)}
                        </span>
                        <button
                          onClick={() => handleEnd(r._id)}
                          className="inline-flex items-center gap-2 text-red-600 text-sm"
                        >
                          <StopCircle size={18} /> End
                        </button>
                      </>
                    )}
                </div>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="text-center text-sm text-slate-500 py-8">
              No requests found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
