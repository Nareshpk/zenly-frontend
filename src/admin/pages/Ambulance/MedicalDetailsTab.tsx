export default function MedicalDetailsTab() {
  return (
    <div className="bg-white border rounded-xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Medical Details</h2>
        <p className="text-sm text-gray-500">
          Patient's medical information and vital signs
        </p>
      </div>

      <div>
        <h4 className="font-medium mb-1">Description</h4>
        <p className="text-sm">
          Patient experiencing severe chest pain radiating to left arm.
          History of cardiac issues.
        </p>
      </div>

      <div>
        <h4 className="font-medium mb-3">Vital Signs</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            ["Blood Pressure", "140/90"],
            ["Heart Rate", "95 bpm"],
            ["Respiratory Rate", "18 breaths/min"],
            ["Oxygen Saturation", "94%"],
            ["Temperature", "37.2°C"],
            ["Blood Glucose", "110 mg/dL"],
          ].map(([label, value]) => (
            <div key={label} className="border rounded-lg p-4">
              <p className="text-sm text-gray-500">{label}</p>
              <p className="font-medium">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Medications Administered</h4>
        <div className="space-y-3">
          {[
            ["Aspirin", "325mg", "08:50 AM"],
            ["Nitroglycerin", "0.4mg", "08:55 AM"],
          ].map(([name, dose, time]) => (
            <div key={name} className="border rounded-lg p-4 flex justify-between">
              <div>
                <p className="font-medium">{name}</p>
                <p className="text-sm text-gray-500">Dosage: {dose}</p>
              </div>
              <span className="text-sm">{time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
