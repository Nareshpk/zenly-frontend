import { Star, Mail, Phone, MapPin, Users, Clock } from "lucide-react";

export default function DoctorCard() {
  return (
    <div className="border rounded-xl p-6 space-y-5">
      <div className="flex flex-col items-center text-center">
        <img
          src="https://i.pravatar.cc/150?img=32"
          className="w-24 h-24 rounded-full"
        />
        <h2 className="font-semibold mt-3">Dr. Sarah Johnson</h2>
        <p className="text-sm text-gray-500">Cardiology</p>
        <span className="mt-2 px-3 py-1 bg-green-100 text-green-600 text-xs rounded-full">
          Active
        </span>

        <div className="flex items-center gap-1 mt-2 text-sm">
          <Star className="w-4 h-4 text-yellow-400" />
          4.8 · 87 reviews
        </div>
      </div>

      <InfoItem icon={<Mail size={14} />} text="sarah.johnson@medixpro.com" />
      <InfoItem icon={<Phone size={14} />} text="+1 (555) 123-4567" />
      <InfoItem
        icon={<MapPin size={14} />}
        text="123 Medical Center Blvd, NY"
      />
      <InfoItem icon={<Users size={14} />} text="120 active patients" />
      <InfoItem icon={<Clock size={14} />} text="8 years experience" />

      <button className="w-full border rounded-md py-2 text-sm hover:bg-gray-50">
        Message
      </button>
    </div>
  );
}

function InfoItem({ icon, text }: any) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      {icon}
      {text}
    </div>
  );
}
