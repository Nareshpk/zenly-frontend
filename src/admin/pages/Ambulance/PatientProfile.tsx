export default function PatientProfile() {
  return (
    <div className="border rounded-xl p-6 space-y-4">
      <div className="flex justify-between">
        <h3 className="font-semibold">Patient Profile</h3>
        <button>⋯</button>
      </div>

      <div className="flex flex-col items-center text-center">
        <img
          src="https://i.pravatar.cc/100?img=68"
          className="w-20 h-20 rounded-full"
        />
        <h4 className="mt-3 font-semibold">John Smith</h4>
        <p className="text-sm text-gray-500">45 years • Male</p>

        <div className="flex gap-2 mt-2">
          <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
            Active
          </span>
        </div>
      </div>

      <ProfileSection title="Personal Information">
        <Info label="DOB" value="1978-05-15" />
        <Info label="Phone" value="+1 (555) 123-4567" />
        <Info label="Email" value="john.smith@example.com" />
        <Info
          label="Address"
          value="123 Main Street, Apt 4B, New York, NY 10001"
        />
      </ProfileSection>

      <ProfileSection title="Medical Information">
        <Info label="Blood Type" value="O+" />
        <Info label="Allergies" value="Penicillin, Peanuts" />
        <Info label="Conditions" value="Hypertension, Type 2 Diabetes" />
        <Info label="Primary Doctor" value="Dr. Sarah Johnson" />
      </ProfileSection>

      <ProfileSection title="Insurance Information">
        <Info label="Provider" value="Blue Cross Blue Shield" />
        <Info label="Policy No" value="BCBS123456789" />
      </ProfileSection>

      <ProfileSection title="Emergency Contact">
        <Info label="Name" value="Mary Smith" />
        <Info label="Relation" value="Wife" />
        <Info label="Phone" value="+1 (555) 987-6543" />
      </ProfileSection>

      <div className="text-xs text-gray-400 flex justify-between pt-2">
        <span>Registered: 2020-03-10</span>
        <span>Updated: 2024-03-15</span>
      </div>
    </div>
  );
}

function ProfileSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t pt-3">
      <h5 className="text-sm font-medium mb-2">{title}</h5>
      <div className="space-y-1 text-sm">{children}</div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-gray-500">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}
