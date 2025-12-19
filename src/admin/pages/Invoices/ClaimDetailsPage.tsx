import {
    ChevronLeft
} from 'lucide-react';

export const ClaimDetailsPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen text-slate-900 font-sans">
      
      {/* 1. TOP NAVIGATION & HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          <button className="p-2 bg-white border rounded-xl hover:bg-gray-50 transition-colors">
            <ChevronLeft size={20} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Claim Details</h1>
            <p className="text-sm text-slate-500 font-medium">View detailed information about claim CLM-001</p>
          </div>
        </div>
      </div>

      {/* 2. SECTION 1: CLAIM STATUS SUMMARY BAR */}
      <div className="bg-white rounded-2xl border p-6 shadow-sm mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Approved
          </span>
        </div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Claim Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatusItem label="Submitted Date" value="2024-04-15" />
          <StatusItem label="Claim Amount" value="$200.00" />
          <StatusItem label="Approved Amount" value="$180.00" isBold />
          <StatusItem label="Payment Date" value="2024-04-22" />
        </div>
      </div>

      {/* 3. SECTION 2: INFORMATION GRID (Patient & Claim Info) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Patient Information Card */}
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Patient Information</h3>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="Patient" />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900 leading-none">John Smith</p>
              <p className="text-xs font-medium text-slate-400 mt-1">Patient ID: P12345</p>
            </div>
          </div>
          <div className="space-y-4">
            <InfoRow label="Policy Number" value="BCBS123456789" />
            <InfoRow label="Group Number" value="GRP987654321" />
            <InfoRow label="Provider" value="Blue Cross Blue Shield" />
          </div>
        </div>

        {/* Claim Details Card */}
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Claim Details</h3>
          <div className="space-y-4">
            <InfoRow label="Claim Type" value="Medical" />
            <InfoRow label="Invoice Number" value="INV-001" isLink />
            <InfoRow label="Patient Responsibility" value="$20.00" />
            <div className="pt-4 border-t mt-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Notes</p>
              <p className="text-sm text-slate-600 font-medium italic">
                "Claim approved with standard copay deduction."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SECTION 3: SERVICES & PROCEDURES TABLE */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold">Services & Procedures</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Billed Amount</th>
                <th className="px-6 py-4 text-right">Allowed Amount</th>
                <th className="px-6 py-4 text-right">Patient Responsibility</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              <ServiceRow 
                name="General Consultation" 
                date="2024-04-15" 
                billed="150.00" 
                allowed="135.00" 
                patient="15.00" 
              />
              <ServiceRow 
                name="Blood Test - Basic Panel" 
                date="2024-04-15" 
                billed="50.00" 
                allowed="45.00" 
                patient="5.00" 
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const StatusItem = ({ label, value, isBold = false }: any) => (
  <div className="flex flex-col">
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</span>
    <span className={`text-lg ${isBold ? 'font-black text-slate-900' : 'font-bold text-slate-700'}`}>{value}</span>
  </div>
);

const InfoRow = ({ label, value, isLink = false }: any) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-slate-500 font-medium">{label}</span>
    <span className={`font-bold ${isLink ? 'text-blue-600 underline cursor-pointer' : 'text-slate-900'}`}>{value}</span>
  </div>
);

const ServiceRow = ({ name, date, billed, allowed, patient }: any) => (
  <tr className="hover:bg-gray-50/50 transition-colors">
    <td className="px-6 py-5 font-bold text-slate-900">{name}</td>
    <td className="px-6 py-5 text-slate-500 font-medium">{date}</td>
    <td className="px-6 py-5 text-right font-medium text-slate-700">${billed}</td>
    <td className="px-6 py-5 text-right font-medium text-slate-700">${allowed}</td>
    <td className="px-6 py-5 text-right font-black text-slate-900">${patient}</td>
  </tr>
);