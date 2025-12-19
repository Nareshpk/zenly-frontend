import { Filter, Search } from "lucide-react";

export default function PatientsTab() {
  const patients = [
    { name: "John Smith", condition: "Hypertension", date: "2023-04-15" },
    { name: "Emily Davis", condition: "Arrhythmia", date: "2023-04-10" },
    { name: "Michael Brown", condition: "CAD", date: "2023-04-05" },
  ];

  return (
    <Card
      title="Patient List"
      right={
        <div className="flex gap-2">
          <div className="flex items-center border rounded-md px-2">
            <Search size={16} />
            <input
              placeholder="Search patients..."
              className="px-2 py-1 text-sm outline-none"
            />
          </div>
          <button className="border rounded-md px-3 py-2 text-sm flex gap-1">
            <Filter size={16} /> Filter
          </button>
        </div>
      }
    >
      <table className="w-full text-sm">
        <thead className="text-left text-gray-500">
          <tr>
            <th>Name</th>
            <th>Condition</th>
            <th>Last Visit</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.name} className="border-t">
              <td className="py-3 font-medium">{p.name}</td>
              <td>{p.condition}</td>
              <td>{p.date}</td>
              <td>
                <button className="text-sm border px-3 py-1 rounded-md">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

function Card({
  title,
  children,
  right,
}: {
  title: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="border rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">{title}</h3>
        {right}
      </div>
      {children}
    </div>
  );
}
