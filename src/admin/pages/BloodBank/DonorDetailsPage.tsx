import {
    ArrowLeft,
    Calendar,
    Edit3,
    Mail, MapPin,
    Phone
} from 'lucide-react';
import { useState } from 'react';

const DonorDetailsPage = () => {
  const [activeTab, setActiveTab] = useState('Medical Information');

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-900">
      {/* Top Navigation */}
      <button className="flex items-center gap-2 mb-6 text-gray-600 hover:text-black transition-colors">
        <div className="p-1.5 bg-white border border-gray-200 rounded-md shadow-sm">
          <ArrowLeft size={16} />
        </div>
        <span className="text-lg font-bold">Donor Details</span>
      </button>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* LEFT COLUMN: Donor Profile Card */}
        <div className="w-full lg:w-[320px] shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative">
            <button className="absolute top-4 right-4 p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50">
              <Edit3 size={16} />
            </button>

            {/* Profile Header */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2574&auto=format&fit=crop" 
                  alt="John Smith" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold mb-2">John Smith</h2>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 border border-red-200 text-red-600 bg-red-50 rounded-full text-[10px] font-bold">O+</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold">Eligible</span>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-[10px] font-bold">Silver Donor</span>
              </div>
              <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">ID: D-1004</span>
            </div>

            {/* Profile Details */}
            <div className="space-y-5">
              <ProfileItem icon={<Users size={16} />} title="Personal Information">
                <p className="text-xs text-gray-600 font-medium">Male, 40 years</p>
                <p className="text-xs text-gray-400">75 kg, 180 cm</p>
              </ProfileItem>

              <ProfileItem icon={<Phone size={16} />} title="Phone">
                <p className="text-xs text-gray-600 font-medium">+1 (555) 123-4567</p>
              </ProfileItem>

              <ProfileItem icon={<Mail size={16} />} title="Email">
                <p className="text-xs text-gray-600 font-medium">john.smith@example.com</p>
              </ProfileItem>

              <ProfileItem icon={<MapPin size={16} />} title="Address">
                <p className="text-xs text-gray-600 font-medium">123 Main Street, Anytown, CA 12345</p>
              </ProfileItem>

              <ProfileItem icon={<Calendar size={16} />} title="Donation Status">
                <div className="text-[11px] space-y-1">
                  <div className="flex justify-between text-gray-400"><span>Last donation:</span> <span className="text-gray-600 font-medium">3/15/2023</span></div>
                  <div className="flex justify-between text-gray-400"><span>Next eligible:</span> <span className="text-gray-600 font-medium">7/15/2023</span></div>
                  <div className="flex justify-between text-gray-400"><span>Total donations:</span> <span className="text-gray-600 font-medium">8</span></div>
                </div>
              </ProfileItem>
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-3">
              <button className="w-full py-2.5 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
                Schedule Donation
              </button>
              <button className="w-full py-2.5 bg-white border border-gray-200 text-gray-900 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
                View Donation History
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Information Tabs */}
        <div className="flex-1">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-[600px]">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold mb-1">Donor Information</h3>
              <p className="text-sm text-gray-400">Detailed information about the donor</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 p-4 bg-gray-50/50 border-b border-gray-100">
              {['Medical Information', 'Donation History', 'Deferral History'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === tab 
                    ? 'bg-white shadow-sm border border-gray-200 text-black' 
                    : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === 'Medical Information' && <MedicalInfoTab />}
              {activeTab === 'Donation History' && <DonationHistoryTab />}
              {activeTab === 'Deferral History' && <DeferralHistoryTab />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Components ---

const ProfileItem = ({ icon, title, children }: any) => (
  <div className="flex gap-3">
    <div className="text-gray-400 shrink-0 mt-0.5">{icon}</div>
    <div className="w-full">
      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{title}</h4>
      {children}
    </div>
  </div>
);

const MedicalInfoTab = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-2xl">
    <div className="space-y-6">
      <InfoBlock label="Blood Pressure" value="120/80" />
      <InfoBlock label="Hemoglobin" value="14.5 g/dL" />
      <InfoBlock label="Allergies" value="None" />
    </div>
    <div className="space-y-6">
      <InfoBlock label="Current Medications" value="None" />
      <InfoBlock label="Chronic Conditions" value="None" />
      <InfoBlock label="Previous Surgeries" value="Appendectomy (2010)" />
    </div>
  </div>
);

const DonationHistoryTab = () => (
  <div className="overflow-x-auto -mx-8">
    <table className="w-full text-left text-sm">
      <thead className="text-[11px] text-gray-400 uppercase tracking-widest font-bold">
        <tr>
          <th className="px-8 py-3">Date</th>
          <th className="px-8 py-3">Type</th>
          <th className="px-8 py-3">Blood Unit</th>
          <th className="px-8 py-3">Location</th>
          <th className="px-8 py-3">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {[
          { date: '3/15/2023', type: 'Whole Blood', unit: 'BU-5678', loc: 'Main Clinic', status: 'Completed' },
          { date: '11/20/2022', type: 'Whole Blood', unit: 'BU-4567', loc: 'Mobile Drive - City Hall', status: 'Completed' },
          { date: '7/5/2022', type: 'Plasma', unit: 'BU-3456', loc: 'Main Clinic', status: 'Completed' },
        ].map((item, idx) => (
          <tr key={idx} className="hover:bg-gray-50/50">
            <td className="px-8 py-4 font-medium text-gray-700">{item.date}</td>
            <td className="px-8 py-4 text-gray-500">{item.type}</td>
            <td className="px-8 py-4 text-blue-600 font-medium">{item.unit}</td>
            <td className="px-8 py-4 text-gray-500">{item.loc}</td>
            <td className="px-8 py-4">
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold">
                {item.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const DeferralHistoryTab = () => (
  <div className="overflow-x-auto -mx-8">
    <table className="w-full text-left text-sm">
      <thead className="text-[11px] text-gray-400 uppercase tracking-widest font-bold">
        <tr>
          <th className="px-8 py-3">Date</th>
          <th className="px-8 py-3">Reason</th>
          <th className="px-8 py-3">Duration</th>
          <th className="px-8 py-3">End Date</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-gray-100">
          <td className="px-8 py-4 font-medium text-gray-700">7/10/2021</td>
          <td className="px-8 py-4 text-gray-500">Low Hemoglobin</td>
          <td className="px-8 py-4 text-gray-500">3 months</td>
          <td className="px-8 py-4 text-gray-500">10/10/2021</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const InfoBlock = ({ label, value }: any) => (
  <div>
    <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</h5>
    <p className="text-sm text-gray-700 font-medium">{value}</p>
  </div>
);

const Users = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export default DonorDetailsPage;