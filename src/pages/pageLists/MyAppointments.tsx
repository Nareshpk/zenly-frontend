import {
  Calendar,
  CreditCard,
  Phone,
  Video
} from "lucide-react";
import { useEffect, useState } from "react";
import { Modal } from "../dialog/Modal";

import { useDispatch } from "react-redux";
import { getAppointmentsByPatient } from "../../redux/actions/appointmentActions";
import { useNavigate } from "react-router-dom";


export default function MyAppointments() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authString = localStorage.getItem("auth");
  const parsedAuth = authString ? JSON.parse(authString) : null;
  const [appointments, setAppointments] = useState([]);

  const [selected, setSelected] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);

  const formatDate = (d: string) => {
    const date = new Date(d + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const statusStyles: Record<string, string> = {
    confirmed: "bg-green-50 text-green-600 border-green-100",
    pending: "bg-amber-50 text-amber-700 border-amber-100",
    cancelled: "bg-red-50 text-red-600 border-red-100",
  };

  const startVideoCall = (a: any) => {
    alert(`Starting VIDEO call with ${a.doctorName}`);
  };

  const startAudioCall = (a: any) => {
    alert(`Starting AUDIO call with ${a.doctorName}`);
  };
  useEffect(() => {
    dispatch(getAppointmentsByPatient(parsedAuth.user.id) as any).then((action: any) => {
      console.log("action:", action)
      console.log("Patient:", action?.payload)
      setAppointments(action?.payload)
    })
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="w-full px-6">
        {/* HEADER */}
        <header className="rounded-2xl p-8 bg-gradient-to-r from-primary to-indigo-600 text-white shadow-lg mb-8 flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
            <Calendar className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold">My Appointments</h1>
            <p className="text-white/90 text-sm">
              Clean, modern view of your consultations
            </p>
          </div>
        </header>

        {/* APPOINTMENTS */}
        <div className="grid gap-6">
          {appointments.map((a: any) => (
            <article
              key={a._id}   // ✅ FIX
              className="rounded-2xl bg-white border shadow-md hover:shadow-xl transition"
            >
              <div className="p-6 md:p-8 grid md:grid-cols-3 gap-6">

                {/* DOCTOR */}
                <div className="flex gap-4">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" // ✅ fallback
                    className="w-20 h-20 rounded-xl object-cover"
                    alt="Doctor"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{a.doctorName}</h3>
                    <p className="text-primary text-sm">{a.specialties}</p>
                    <p className="text-sm text-gray-500 mt-1">{a.location}</p>
                  </div>
                </div>

                {/* DETAILS */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">
                      {formatDate(a.date)} • {a.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {a.appointmentType === "Video Call" ? (
                      <Video className="w-5 h-5 text-primary" />
                    ) : (
                      <Phone className="w-5 h-5 text-primary" />
                    )}
                    <span className="text-sm font-medium">{a.appointmentType}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <span className="text-sm">Pay at Clinic</span> {/* API safe */}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col gap-3 items-end">
                  <span
                    className={`px-3 py-1 rounded-full border text-sm font-medium ${statusStyles[a.status]}`}
                  >
                    {a.status}
                  </span>

                  {/* JOIN CALL – only when Confirmed */}
                  {a.status === "Confirmed" && a.appointmentType === "Video Call" && (
                    <button
                       onClick={() => navigate(`/app/patient/video-call/${a._id}`)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold"
                    >
                      <Video className="inline w-5 h-5 mr-2" />
                      Join Video Call
                    </button>
                  )}

                  {a.status === "Confirmed" && a.appointmentType === "Audio Call" && (
                    <button
                      onClick={() => navigate(`/app/patient/audio-call/${a._id}`)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold"
                    >
                      <Phone className="inline w-5 h-5 mr-2" />
                      Join Audio Call
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setSelected(a);
                      setShowReschedule(true);
                    }}
                    className="w-full py-3 rounded-xl bg-gray-100 font-semibold"
                  >
                    Reschedule
                  </button>

                </div>
              </div>
            </article>
          ))}
        </div>


        {/* DETAILS MODAL */}
        <Modal open={showDetails} onClose={() => setShowDetails(false)}>
          {selected && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Appointment Details</h2>
              <p><b>Doctor:</b> {selected.doctorName}</p>
              <p><b>Date:</b> {formatDate(selected.date)}</p>
              <p><b>Time:</b> {selected.time}</p>
              <p><b>Type:</b> {selected.appointmentType}</p>
              <p><b>Symptoms:</b> {selected.symptoms}</p>
            </div>
          )}
        </Modal>

        {/* RESCHEDULE MODAL */}
        <Modal open={showReschedule} onClose={() => setShowReschedule(false)}>
          <h2 className="text-xl font-semibold mb-4">Reschedule Appointment</h2>
          <input type="date" className="w-full border rounded-lg p-2 mb-3" />
          <input type="time" className="w-full border rounded-lg p-2 mb-4" />
          <button className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold">
            Confirm
          </button>
        </Modal>


      </div>
    </div>
  );
}
