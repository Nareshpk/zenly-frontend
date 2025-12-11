import {
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  CreditCard,
  Mail,
  Phone,
  XCircle,
  X,
} from "lucide-react";
import { useState } from "react";

export default function MyAppointments() {
  const [appointments] = useState([
    {
      id: 1,
      doctorName: "Dr. Sarah Ahmed",
      specialty: "Cardiologist",
      date: "2024-10-15",
      time: "10:00 AM",
      status: "confirmed",
      patientName: "John Doe",
      phone: "+92-300-1234567",
      email: "john.doe@example.com",
      location: "City Hospital, Karachi",
      fees: 2000,
      paymentMethod: "online",
      symptoms: "Chest pain and irregular heartbeat",
      doctorImage:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
    },
    {
      id: 2,
      doctorName: "Dr. Ahmad Khan",
      specialty: "Neurologist",
      date: "2024-10-18",
      time: "02:30 PM",
      status: "pending",
      patientName: "Jane Smith",
      phone: "+92-321-9876543",
      email: "jane.smith@example.com",
      location: "Medical Center, Lahore",
      fees: 1800,
      paymentMethod: "clinic",
      symptoms: "Severe headaches and dizziness",
      doctorImage:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
    },
  ]);

  // MODAL STATE
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

  // MODAL COMPONENT (with close on outside click)
  const Modal = ({ open, onClose, children }: any) => {
    if (!open) return null;
    return (
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={onClose} // click outside = close
      >
        <div
          className="bg-white rounded-2xl shadow-xl w-[90%] max-w-lg p-6 animate-scaleIn relative"
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <X className="w-5 h-5" />
          </button>

          {children}
        </div>

        {/* Animation */}
        <style>{`
          .animate-scaleIn {
            animation: scaleIn 0.25s ease-out;
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <header className="rounded-2xl p-8 bg-gradient-to-r from-primary to-indigo-600 text-white shadow-lg mb-8 flex items-center gap-6">
          <div className="w-20 h-20 shrink-0 rounded-full bg-white/10 flex items-center justify-center ring-1 ring-white/20">
            <Calendar className="w-10 h-10" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold">My Appointments</h1>
            <p className="mt-1 text-sm text-white/90">
              Clean, modern view of your consultations.
            </p>
          </div>
        </header>

        {/* Appointment Cards */}
        <div className="grid gap-6">
          {appointments.map((a) => (
            <article
              key={a.id}
              className="relative overflow-hidden rounded-2xl shadow-md bg-white border border-gray-100 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-primary to-indigo-500" />

              <div className="p-6 md:p-8 grid md:grid-cols-3 gap-6">
                {/* Doctor Info */}
                <div className="flex items-start gap-4 md:col-span-1">
                  <img
                    src={a.doctorImage}
                    alt={a.doctorName}
                    className="w-20 h-20 rounded-xl object-cover ring-1 ring-gray-100"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {a.doctorName}
                    </h3>
                    <p className="text-sm text-primary font-medium">
                      {a.specialty}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">{a.location}</p>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="md:col-span-1 flex flex-col justify-center gap-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div className="text-sm text-gray-700 font-medium">
                      {formatDate(a.date)} • {a.time}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div className="text-sm text-gray-700 font-medium">
                      {a.time}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <div className="text-sm text-gray-700 font-medium">
                      {a.paymentMethod === "clinic"
                        ? "Pay at clinic"
                        : "Paid online"}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="md:col-span-1 flex flex-col justify-between items-end gap-4">
                  <div className="w-full flex justify-end">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${statusStyles[a.status]
                        }`}
                    >
                      {a.status === "confirmed" && <CheckCircle className="w-4 h-4" />}
                      {a.status === "cancelled" && <XCircle className="w-4 h-4" />}
                      <span className="capitalize">{a.status}</span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600">Patient</p>
                    <p className="font-medium text-gray-900">{a.patientName}</p>
                  </div>

                  {/* Buttons */}
                  <div className="w-full flex gap-3 items-center">

                    {/* PRIMARY — View Details (Glass + Shine + Icon) */}
                    <button
                      type="button"
                      onClick={() => { setSelected(a); setShowDetails(true); }}
                      aria-label={`View details for ${a.doctorName}`}
                      className="
      relative flex-1 items-center gap-3 pl-4 pr-5 py-3 rounded-2xl
      inline-flex text-white font-semibold text-sm
      bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500
      shadow-[0_10px_30px_rgba(99,102,241,0.18)]
      hover:scale-[1.02] active:translate-y-[1px]
      transition-transform duration-200
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300
      overflow-hidden
    "
                    >
                      {/* label */}
                      <span className="flex-1 text-left">View Details</span>

                      {/* chevron */}
                      <span className="opacity-90">
                        <ChevronRight className="w-4 h-4" />
                      </span>

                      {/* subtle shine */}
                      <span className="absolute inset-0 pointer-events-none">
                        <span className="absolute -left-28 top-0 h-full w-28 bg-white/12 transform -skew-x-12 blur-md animate-shine"></span>
                      </span>
                    </button>

                    {/* SECONDARY — Reschedule (Soft Glass / Accent) */}
                    <button
                      type="button"
                      onClick={() => { setSelected(a); setShowReschedule(true); }}
                      aria-label={`Reschedule appointment with ${a.doctorName}`}
                      className="
      relative px-5 py-3 rounded-2xl inline-flex items-center gap-3
      bg-gradient-to-br from-sky-600 to-cyan-500 text-white font-semibold text-sm
      shadow-[0_8px_20px_rgba(14,165,233,0.18)]
      hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(14,165,233,0.22)]
      active:translate-y-[1px]
      transition-all duration-200
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-300
    "
                    >
                
                      <span>Reschedule</span>

                      {/* tiny pulse accent */}
                      <span className="ml-2 w-2 h-2 rounded-full bg-white/30 animate-pulse-slow" />
                    </button>

                    {/* Local styles (paste once in the component) */}
                  
                  </div>


                </div>
              </div>
            </article>
          ))}
        </div>

        {/* DETAILS MODAL */}
        <Modal open={showDetails} onClose={() => setShowDetails(false)}>
          {selected && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Appointment Details
              </h2>

              <div className="flex gap-4">
                <img
                  src={selected.doctorImage}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div>
                  <p className="text-lg font-bold">{selected.doctorName}</p>
                  <p className="text-primary">{selected.specialty}</p>
                </div>
              </div>

              <p className="text-gray-700">
                <b>Date:</b> {formatDate(selected.date)}
              </p>
              <p className="text-gray-700">
                <b>Time:</b> {selected.time}
              </p>
              <p className="text-gray-700">
                <b>Symptoms:</b> {selected.symptoms}
              </p>
              <p className="text-gray-700">
                <b>Fees:</b> ₹ {selected.fees}
              </p>
            </div>
          )}
        </Modal>

        {/* RESCHEDULE MODAL */}
        <Modal open={showReschedule} onClose={() => setShowReschedule(false)}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Reschedule Appointment
          </h2>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              New Date
            </label>
            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2"
            />

            <label className="block text-sm font-medium text-gray-700">
              New Time
            </label>
            <input
              type="time"
              className="w-full border rounded-lg px-3 py-2"
            />

            <button
              className="
    w-full py-3 rounded-xl font-semibold text-white
    bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500
    shadow-lg shadow-purple-300/40
    hover:scale-[1.03] hover:shadow-purple-400/50
    transition-all duration-200
  "
            >
              Confirm Reschedule
            </button>

          </div>
        </Modal>
      </div>
    </div>
  );
}
