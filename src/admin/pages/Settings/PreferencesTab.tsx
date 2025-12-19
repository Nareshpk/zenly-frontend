import { useState } from "react";
import { Clock, Calendar } from "lucide-react";

/* ================= Preferences Tab ================= */

export default function PreferencesTab() {
    const [showWeekends, setShowWeekends] = useState(true);
    const [onlineBooking, setOnlineBooking] = useState(true);
    const [requireApproval, setRequireApproval] = useState(false);
    const [sendReminders, setSendReminders] = useState(true);

    return (
        <div className="space-y-6">
            {/* -------- Regional Settings -------- */}
            <Card
                icon={<Clock size={18} />}
                title="Regional Settings"
                subtitle="Configure time, date, and regional preferences"
            >
                <Grid2>
                    <Select
                        label="Timezone"
                        value="America/New York (UTC-05:00)"
                        options={["America/New York (UTC-05:00)", "Asia/Kolkata (UTC+05:30)"]}
                    />
                    <Select
                        label="Date Format"
                        value="MM/DD/YYYY"
                        options={["MM/DD/YYYY", "DD/MM/YYYY"]}
                    />

                    <Select
                        label="Time Format"
                        value="12-hour (AM/PM)"
                        options={["12-hour (AM/PM)", "24-hour"]}
                    />
                    <Select
                        label="First Day of Week"
                        value="Sunday"
                        options={["Sunday", "Monday"]}
                    />

                    <Select
                        label="Language"
                        value="English"
                        options={["English", "Tamil", "Hindi"]}
                    />
                </Grid2>

                <div className="border-t pt-5 mt-5">
                    <h3 className="font-medium mb-4">Calendar Settings</h3>

                    <Grid2>
                        <Select
                            label="Default Calendar View"
                            value="Week"
                            options={["Day", "Week", "Month"]}
                        />
                        <Select
                            label="Default Appointment Duration"
                            value="30 minutes"
                            options={["15 minutes", "30 minutes", "60 minutes"]}
                        />
                    </Grid2>

                    <Toggle
                        label="Show weekends in calendar"
                        checked={showWeekends}
                        onChange={setShowWeekends}
                    />
                </div>

                <Actions primaryLabel="Save Preferences" secondaryLabel="Reset to Defaults" />
            </Card>

            {/* -------- Appointment Settings -------- */}
            <Card
                icon={<Calendar size={18} />}
                title="Appointment Settings"
                subtitle="Configure appointment scheduling preferences"
            >
                <div className="space-y-4">
                    <Toggle
                        label="Allow online appointment booking"
                        checked={onlineBooking}
                        onChange={setOnlineBooking}
                    />

                    <Toggle
                        label="Require approval for online bookings"
                        checked={requireApproval}
                        onChange={setRequireApproval}
                    />

                    <Toggle
                        label="Send appointment reminders"
                        checked={sendReminders}
                        onChange={setSendReminders}
                    />
                </div>

                <Grid2 className="mt-6">
                    <Select
                        label="Reminder Time"
                        value="24 hours before"
                        options={["1 hour before", "12 hours before", "24 hours before"]}
                    />
                    <Select
                        label="Buffer Time Between Appointments"
                        value="15 minutes"
                        options={["5 minutes", "10 minutes", "15 minutes"]}
                    />
                </Grid2>

                <Actions primaryLabel="Save Settings" />
            </Card>
        </div>
    );
}

/* ================= Reusable UI ================= */

const Card = ({ icon, title, subtitle, children }: any) => (
    <div className="bg-white border rounded-xl p-6 space-y-6">
        <div className="flex items-start gap-2">
            {icon && <div className="text-gray-500 mt-1">{icon}</div>}
            <div>
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
        </div>
        {children}
    </div>
);

const Grid2 = ({ children, className = "" }: any) => (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
        {children}
    </div>
);

const Select = ({ label, value, options }: any) => (
    <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
            {label}
        </label>
        <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/5">
            <option>{value}</option>
            {options.map((opt: string) => (
                <option key={opt}>{opt}</option>
            ))}
        </select>
    </div>
);

const Toggle = ({ label, checked, onChange }: any) => (
    <label className="flex items-center gap-3 cursor-pointer">
        <div
            className={`w-10 h-6 rounded-full p-1 transition ${checked ? "bg-black" : "bg-gray-300"
                }`}
            onClick={() => onChange(!checked)}
        >
            <div
                className={`h-4 w-4 rounded-full bg-white transition ${checked ? "translate-x-4" : ""
                    }`}
            />
        </div>
        <span className="text-sm text-gray-700">{label}</span>
    </label>
);

const Actions = ({
    primaryLabel = "Save",
    secondaryLabel = "Cancel",
}: any) => (
    <div className="flex justify-end gap-3 pt-4">
        <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
            {secondaryLabel}
        </button>
        <button className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800">
            {primaryLabel}
        </button>
    </div>
);


