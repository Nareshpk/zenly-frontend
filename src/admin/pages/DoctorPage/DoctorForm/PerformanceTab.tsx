import React from 'react'

function PerformanceTab() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card title="Performance Metrics">
        <Progress label="Patient Satisfaction" value={92} />
        <Progress label="Appointment Completion" value={98} />
        <Progress label="Record Completion Rate" value={95} />
      </Card>

      <Card title="Time Management">
        <p className="text-sm">Average Wait Time</p>
        <p className="font-semibold mb-4">12 minutes</p>

        <p className="text-sm">Average Consultation Time</p>
        <p className="font-semibold">25 minutes</p>
      </Card>
    </div>
  );
}

function Progress({ label, value }: any) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded">
        <div
          className="h-2 bg-black rounded"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}


export default PerformanceTab

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
