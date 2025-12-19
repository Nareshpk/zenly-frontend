import React from 'react'

function OverviewTab() {
  return (
    <div className="space-y-6">
      <Card title="About">
        <p className="text-sm text-gray-600">
          Dr. Sarah Johnson is a board-certified cardiologist with over 8 years
          of experience in diagnosing and treating heart conditions. She
          specializes in preventive cardiology and heart failure management.
        </p>
      </Card>

      <Card title="Education & Certifications">
        <ul className="space-y-3 text-sm">
          <li>
            <strong>MD</strong> – Harvard Medical School (2012)
          </li>
          <li>
            <strong>Residency</strong> – Massachusetts General Hospital (2015)
          </li>
          <li>
            <strong>Fellowship</strong> – Johns Hopkins Hospital (2018)
          </li>
        </ul>
      </Card>

      <Card title="Today's Schedule">
        <ul className="space-y-2 text-sm">
          <li>09:00 AM – Check-up (Completed)</li>
          <li>10:30 AM – Consultation (Completed)</li>
          <li>01:00 PM – Follow-up (Scheduled)</li>
          <li>03:30 PM – New Patient (Scheduled)</li>
        </ul>
      </Card>
    </div>
  );
}


export default OverviewTab

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
