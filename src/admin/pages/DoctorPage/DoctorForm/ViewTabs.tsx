import { Calendar, Clock, Users } from "lucide-react";

function ViewTabs({
  view,
  setView,
}: {
  view: string;
  setView: (v: any) => void;
}) {
  const tabs = [
    { id: "list", label: "List View", icon: Users },
    { id: "day", label: "Day View", icon: Clock },
    { id: "calendar", label: "Calendar", icon: Calendar },
  ];

  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setView(tab.id)}
          className={`flex-1 flex justify-center items-center gap-2 py-2 rounded-md text-sm
            ${
              view === tab.id
                ? "bg-white border font-medium"
                : "text-gray-500"
            }`}
        >
          <tab.icon size={16} />
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default ViewTabs
