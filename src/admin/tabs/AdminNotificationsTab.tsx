import {
  AlertCircle,
  Calendar,
  UserPlus,
  Users,
  DollarSign,
  Wrench,
  CheckCircle,
  XCircle,
  FlaskConical,
  UserCheck,
  Filter,
} from "lucide-react";
import { useState } from "react";

/* ---------------- DATA ---------------- */

const unreadNotifications = [
  {
    icon: <AlertCircle className="text-red-500" />,
    title: "Urgent: Low medication stock",
    desc: "Amoxicillin stock is critically low. Please reorder.",
    time: "10 minutes ago",
  },
  {
    icon: <Calendar className="text-blue-500" />,
    title: "New appointment request",
    desc: "Patient James Wilson requested an appointment for tomorrow.",
    time: "30 minutes ago",
  },
  {
    icon: <UserPlus className="text-green-500" />,
    title: "New patient registration",
    desc: "Emily Parker has registered as a new patient.",
    time: "1 hour ago",
  },
  {
    icon: <Users className="text-purple-500" />,
    title: "Staff schedule update",
    desc: "Dr. Rodriguez has requested time off next week.",
    time: "2 hours ago",
  },
  {
    icon: <DollarSign className="text-emerald-500" />,
    title: "Payment received",
    desc: "Invoice #INV-2045 has been paid successfully.",
    time: "3 hours ago",
  },
];

const todayNotifications = [
  {
    icon: <CheckCircle className="text-green-500" />,
    title: "Appointment confirmed",
    desc: "Dr. Chen confirmed appointment with patient #23456.",
    time: "4 hours ago",
  },
  {
    icon: <Users className="text-blue-500" />,
    title: "Staff meeting reminder",
    desc: "Weekly staff meeting today at 3:00 PM in Conference Room A.",
    time: "5 hours ago",
  },
  {
    icon: <Calendar className="text-purple-500" />,
    title: "Schedule change",
    desc: "Your 2:00 PM appointment has been rescheduled to 3:30 PM.",
    time: "6 hours ago",
  },
  {
    icon: <DollarSign className="text-emerald-500" />,
    title: "Invoice paid",
    desc: "Patient Maria Garcia has paid invoice #INV-2023-0456.",
    time: "8 hours ago",
  },
];

const earlierNotifications = [
  {
    icon: <XCircle className="text-red-500" />,
    title: "Appointment cancelled",
    desc: "Patient Thomas Brown cancelled his appointment for yesterday.",
    time: "Yesterday",
  },
  {
    icon: <Wrench className="text-orange-500" />,
    title: "System maintenance",
    desc: "Scheduled system maintenance completed successfully.",
    time: "Yesterday",
  },
  {
    icon: <FlaskConical className="text-green-500" />,
    title: "Lab results ready",
    desc: "Lab results for patient #34567 are now available.",
    time: "2 days ago",
  },
  {
    icon: <UserCheck className="text-blue-500" />,
    title: "New staff onboarding",
    desc: "Please welcome Dr. Lisa Wong to the Pediatrics department.",
    time: "3 days ago",
  },
];

/* ---------------- COMPONENT ---------------- */

export default function AdminNotificationsTab() {
  const [settings, setSettings] = useState({
    appointments: true,
    patientUpdates: true,
    staffAlerts: true,
    inventoryAlerts: true,
    inApp: true,
    email: true,
    sms: false,
    push: false,
  });

  const toggle = (key: keyof typeof settings) =>
    setSettings({ ...settings, [key]: !settings[key] });

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">Notifications</h2>
          <p className="text-sm text-gray-500">
            Stay updated with important alerts and messages
          </p>
        </div>

        <div className="flex gap-2">
          <button className="px-3 py-1.5 border rounded-md text-sm">
            Mark All as Read
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      {/* ================= NOTIFICATION LISTS ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <NotificationColumn
          title="Unread"
          count={12}
          items={unreadNotifications}
          scroll
        />
        <NotificationColumn
          title="Today"
          count={8}
          items={todayNotifications}
        />
        <NotificationColumn
          title="Earlier"
          count={15}
          items={earlierNotifications}
        />
      </div>

      {/* ================= SETTINGS ================= */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="font-semibold text-lg mb-1">
          Notification Settings
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Manage how you receive notifications
        </p>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {/* Categories */}
          <div className="space-y-4">
            <SettingItem
              label="Appointments"
              desc="New, cancelled, and rescheduled appointments"
              enabled={settings.appointments}
              onToggle={() => toggle("appointments")}
            />
            <SettingItem
              label="Patient Updates"
              desc="New registrations and patient status changes"
              enabled={settings.patientUpdates}
              onToggle={() => toggle("patientUpdates")}
            />
            <SettingItem
              label="Staff Alerts"
              desc="Schedule changes and staff announcements"
              enabled={settings.staffAlerts}
              onToggle={() => toggle("staffAlerts")}
            />
            <SettingItem
              label="Inventory Alerts"
              desc="Low stock and reorder notifications"
              enabled={settings.inventoryAlerts}
              onToggle={() => toggle("inventoryAlerts")}
            />
          </div>

          {/* Delivery */}
          <div className="space-y-4">
            <SettingItem
              label="In-app Notifications"
              desc="Receive notifications within the dashboard"
              enabled={settings.inApp}
              onToggle={() => toggle("inApp")}
            />
            <SettingItem
              label="Email Notifications"
              desc="Receive notifications via email"
              enabled={settings.email}
              onToggle={() => toggle("email")}
            />
            <SettingItem
              label="SMS Notifications"
              desc="Receive notifications via text message"
              enabled={settings.sms}
              onToggle={() => toggle("sms")}
            />
            <SettingItem
              label="Push Notifications"
              desc="Receive notifications on your mobile device"
              enabled={settings.push}
              onToggle={() => toggle("push")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function NotificationColumn({
  title,
  count,
  items,
  scroll,
}: any) {
  return (
    <div className="bg-white border rounded-xl p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-xs bg-gray-100 px-2 rounded-full">
          {count}
        </span>
      </div>

      <div
        className={`space-y-3 ${
          scroll ? "max-h-[360px] overflow-y-auto pr-1" : ""
        }`}
      >
        {items.map((n: any, i: number) => (
          <div key={i} className="border-b last:border-0 pb-3">
            <div className="flex items-start gap-3">
              <div className="mt-1">{n.icon}</div>
              <div>
                <div className="text-sm font-medium">{n.title}</div>
                <p className="text-xs text-gray-500">{n.desc}</p>
                <p className="text-xs text-gray-400 mt-1">{n.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingItem({
  label,
  desc,
  enabled,
  onToggle,
}: any) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="font-medium text-sm">{label}</div>
        <div className="text-xs text-gray-500">{desc}</div>
      </div>

      <button
        onClick={onToggle}
        className={`w-11 h-6 rounded-full relative transition ${
          enabled ? "bg-black" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 bg-white rounded-full transition ${
            enabled ? "right-0.5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}
