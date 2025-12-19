import {
    ArrowLeft,
    Clock,
    Plus,
    Save,
    Trash2
} from "lucide-react";
import { useState } from "react";

/* -------------------------------------------------- */
/* MAIN PAGE */
/* -------------------------------------------------- */

export default function WorkingHoursPage() {
    const [use24Hour, setUse24Hour] = useState(false);
    const [specialTab, setSpecialTab] = useState<"special" | "holiday">("special");

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button className="p-2 border rounded-lg hover:bg-gray-50">
                        <ArrowLeft size={16} />
                    </button>
                    <h1 className="text-2xl font-semibold">Working Hours</h1>
                </div>

                <div className="flex gap-3">
                    <button className="btn-outline">Cancel</button>
                    <button className="btn-primary flex items-center gap-2">
                        <Save size={16} />
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Top Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ClinicHours use24Hour={use24Hour} setUse24Hour={setUse24Hour} />
                <BreakTimes />
            </div>

            {/* Special Hours */}
            <SpecialHours specialTab={specialTab} setSpecialTab={setSpecialTab} />

            {/* Appointment Slots */}
            <AppointmentSlots />
        </div>
    );
}

/* -------------------------------------------------- */
/* CLINIC HOURS */
/* -------------------------------------------------- */

const ClinicHours = ({
    use24Hour,
    setUse24Hour,
}: any) => {
    const days = [
        { name: "Monday", enabled: true },
        { name: "Tuesday", enabled: true },
        { name: "Wednesday", enabled: true },
        { name: "Thursday", enabled: true },
        { name: "Friday", enabled: true },
        { name: "Saturday", enabled: true, start: "9:00 AM", end: "3:00 PM" },
        { name: "Sunday", enabled: false, start: "9:00 AM", end: "3:00 PM" },
    ];

    return (
        <Card title="Clinic Hours" subtitle="Set your clinic's regular operating hours for each day of the week">
            <div className="space-y-4">
                {days.map((day) => (
                    <div key={day.name} className="flex items-center gap-4">
                        <input type="checkbox" defaultChecked={day.enabled} />
                        <span className="w-24 text-sm">{day.name}</span>

                        <select className="input">
                            <option>{day.start || "8:00 AM"}</option>
                        </select>

                        <span className="text-sm text-gray-400">to</span>

                        <select className="input">
                            <option>{day.end || "6:00 PM"}</option>
                        </select>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between pt-4">
                <Toggle
                    label="Use 24-hour format"
                    checked={use24Hour}
                    onChange={() => setUse24Hour(!use24Hour)}
                />
                <button className="btn-outline">Reset to Default</button>
            </div>
        </Card>
    );
};

/* -------------------------------------------------- */
/* BREAK TIMES */
/* -------------------------------------------------- */

const BreakTimes = () => {
    return (
        <Card title="Break Times" subtitle="Configure daily break times for your clinic">
            <div className="space-y-4">
                <BreakRow label="Lunch Break" start="12:00 PM" end="1:00 PM" />
                <BreakRow label="Coffee Break" start="3:00 PM" end="3:30 PM" />
            </div>

            <button className="btn-outline mt-4 flex items-center gap-2">
                <Plus size={16} />
                Add Break Time
            </button>
        </Card>
    );
};

const BreakRow = ({ label, start, end }: any) => (
    <div className="grid grid-cols-3 gap-3 items-center">
        <span className="text-sm">{label}</span>
        <select className="input">
            <option>{start}</option>
        </select>
        <select className="input">
            <option>{end}</option>
        </select>
    </div>
);

/* -------------------------------------------------- */
/* SPECIAL HOURS */
/* -------------------------------------------------- */

const SpecialHours = ({ specialTab, setSpecialTab }: any) => {
    const [specialHours, setSpecialHours] = useState([
        {
            date: "Thu Dec 18 2025",
            startTime: "10:00",
            endTime: "16:00",
        },
    ]);

    const [holidays, setHolidays] = useState([
        { date: "Thu Dec 18 2025", name: "" },
        { date: "Thu Dec 18 2025", name: "" },
    ]);

    const addHoliday = () => {
        setHolidays([...holidays, { date: "", name: "" }]);
    };

    const removeHoliday = (index: number) => {
        setHolidays(holidays.filter((_, i) => i !== index));
    };

    return (
        <Card
            title="Special Hours & Holidays"
            subtitle="Set special operating hours or mark holidays"
        >
            {/* Tabs */}
            <div className="flex gap-2 bg-gray-50 p-1 rounded-lg w-fit mb-6">
                <Tab
                    active={specialTab === "special"}
                    onClick={() => setSpecialTab("special")}
                >
                    Special Hours
                </Tab>
                <Tab
                    active={specialTab === "holiday"}
                    onClick={() => setSpecialTab("holiday")}
                >
                    Holidays
                </Tab>
            </div>

            {specialTab === "special" && (
                <>
                    <div className="space-y-4">
                        {specialHours.map((item, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_auto] gap-4 items-center"
                            >
                                {/* Date */}
                                <div>
                                    <label className="label">Date</label>
                                    <input
                                        value={item.date}
                                        placeholder="Select date"
                                        readOnly
                                        className="input"
                                    />
                                </div>

                                {/* Start Time */}
                                <div>
                                    <label className="label">Start Time</label>
                                    <div className="relative">
                                        <input
                                            value={item.startTime}
                                            placeholder="Start time"
                                            className="input pr-10"
                                        />
                                       
                                    </div>
                                </div>

                                {/* End Time */}
                                <div>
                                    <label className="label">End Time</label>
                                    <div className="relative">
                                        <input
                                            value={item.endTime}
                                            placeholder="End time"
                                            className="input pr-10"
                                        />
                                       
                                    </div>
                                </div>


                            </div>
                        ))}
                    </div>

                    {/* Add Button */}
                    <button

                        className="btn-outline mt-6 flex items-center gap-2"
                    >
                        <Plus size={16} />
                        Add Special Hours
                    </button>
                </>
            )}

            {/* HOLIDAYS TAB */}
            {specialTab === "holiday" && (
                <>
                    <div className="space-y-4">
                        {holidays.map((holiday, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-center"
                            >
                                {/* Date */}
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Date</label>
                                    <input
                                        type="text"
                                        value={holiday.date}
                                        placeholder="Select date"
                                        className="input"
                                        readOnly
                                    />
                                </div>

                                {/* Holiday Name */}
                                <div>
                                    <label className="text-sm font-medium mb-1 block">
                                        Holiday Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Christmas Day"
                                        value={holiday.name}
                                        onChange={(e) => {
                                            const copy = [...holidays];
                                            copy[index].name = e.target.value;
                                            setHolidays(copy);
                                        }}
                                        className="input"
                                    />
                                </div>

                                {/* Delete */}
                                <button
                                    onClick={() => removeHoliday(index)}
                                    className="mt-6 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Add Holiday */}
                    <button
                        onClick={addHoliday}
                        className="btn-outline mt-6 flex items-center gap-2"
                    >
                        <Plus size={16} />
                        Add Holiday
                    </button>
                </>
            )}
        </Card>
    );
};

/* -------------------------------------------------- */
/* APPOINTMENT SLOTS */
/* -------------------------------------------------- */

const AppointmentSlots = () => {
    return (
        <Card title="Appointment Slots" subtitle="Configure default appointment duration and scheduling rules">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Select label="Default Appointment Duration" value="30 minutes" />
                <Select label="Buffer Time Between Appointments" value="5 minutes" />
                <Select label="Maximum Advance Booking" value="60 days" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <Toggle label="Allow same-day appointments" checked />
                <Toggle label="Allow concurrent appointments" />
                <Toggle label="Require approval for new patients" checked />
                <Toggle label="Allow patient rescheduling" checked />
            </div>
        </Card>
    );
};

/* -------------------------------------------------- */
/* REUSABLE UI */
/* -------------------------------------------------- */

const Card = ({ title, subtitle, children }: any) => (
    <div className="bg-white border rounded-xl p-6 space-y-6">
        <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        {children}
    </div>
);

const Toggle = ({ label, checked, onChange }: any) => (
    <label className="flex items-center gap-3 cursor-pointer">
        <div
            onClick={onChange}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition ${checked ? "bg-black" : "bg-gray-300"
                }`}
        >
            <div
                className={`bg-white w-4 h-4 rounded-full transition ${checked ? "translate-x-5" : ""
                    }`}
            />
        </div>
        <span className="text-sm">{label}</span>
    </label>
);

const Select = ({ label, value }: any) => (
    <div>
        <label className="text-sm font-medium mb-1 block">{label}</label>
        <select className="input">
            <option>{value}</option>
        </select>
    </div>
);

const Tab = ({ active, children, onClick }: any) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm rounded-md transition ${active ? "bg-white shadow font-medium" : "text-gray-500"
            }`}
    >
        {children}
    </button>
);

/* -------------------------------------------------- */
/* TAILWIND HELPERS */
/* -------------------------------------------------- */
/*
Add once globally:

.input {
  @apply w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white;
}
.btn-primary {
  @apply bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800;
}
.btn-outline {
  @apply border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50;
}
*/
