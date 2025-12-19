import {
    ArrowLeft,
    ChevronDown,
    Download,
    Edit3,
    ExternalLink,
    Eye,
    FileText,
    Mail,
    MapPin,
    Phone,
    Search,
    ShoppingCart,
    Star,
    User
} from 'lucide-react';
import React, { useState } from 'react';



const SupplierInformationPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Products');

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans text-slate-900">
            {/* Top Navigation & Header Actions */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-900">PharmaTech Inc.</h1>
                        <p className="text-sm text-gray-400 font-medium">Supplier ID: SUP002</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-zinc-700 hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
                        <Edit3 size={16} /> Edit Supplier
                    </button>
                    <button className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-bold hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-sm">
                        <ShoppingCart size={16} /> Place Order
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Supplier Information Card */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                    <h2 className="text-lg font-bold text-zinc-900 mb-6">Supplier Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">About</label>
                                <p className="text-sm text-zinc-600 leading-relaxed">
                                    Specialized pharmaceutical supplier with a wide range of medications and healthcare products.
                                </p>
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-3">Contact Details</label>
                                <div className="space-y-3">
                                    <ContactItem icon={<User size={14} />} label="Contact Person" value="Michael Chen" />
                                    <ContactItem icon={<Phone size={14} />} label="Phone" value="(555) 987-6543" />
                                    <ContactItem icon={<Mail size={14} />} label="Email" value="sales@pharmatech.com" />
                                    <ContactItem icon={<MapPin size={14} />} label="Location" value="Boston, MA" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-3">Supplier Status</label>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-zinc-500 font-medium">Status:</span>
                                        <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full">Active</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-zinc-500 font-medium">Rating:</span>
                                        <div className="flex text-amber-400 gap-0.5">
                                            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} />)}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-zinc-500 font-medium">Category:</span>
                                        <span className="text-sm font-bold text-zinc-800">Medical Supplies</span>
                                    </div>
                                    <button className="w-full flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg text-xs font-bold text-zinc-600 hover:bg-gray-50 transition-colors">
                                        <ExternalLink size={14} /> Visit Website
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Summary Card */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                    <h2 className="text-lg font-bold text-zinc-900 mb-1">Order Summary</h2>
                    <p className="text-xs text-gray-400 font-medium mb-6">Recent orders with this supplier</p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <SummaryMetric label="Total Orders" value="24" />
                        <SummaryMetric label="Active Orders" value="3" />
                        <SummaryMetric label="Last Order" value="Apr 18" />
                        <SummaryMetric label="Total Spent" value="$12,450" />
                    </div>

                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-4">Recent Orders</label>
                    <div className="space-y-4 mb-6">
                        <MiniOrderRow id="#ORD4872" date="Apr 18, 2023" price="$1,245.00" status="Delivered" />
                        <MiniOrderRow id="#ORD4865" date="Apr 15, 2023" price="$876.50" status="Shipped" />
                        <MiniOrderRow id="#ORD4861" date="Apr 12, 2023" price="$2,340.75" status="Processing" />
                    </div>
                    <button className="w-full py-2 text-xs font-bold text-zinc-400 border-t border-gray-100 hover:text-zinc-800 transition-colors pt-4">
                        View All Orders
                    </button>
                </div>
            </div>

            {/* Tabs Navigation */}
            <SupplierTabs />

        
        </div>
    );
};

// --- HELPER COMPONENTS ---

const ContactItem = ({ icon, label, value }: any) => (
    <div className="flex items-start gap-3">
        <div className="mt-1 text-gray-400">{icon}</div>
        <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{label}</p>
            <p className="text-sm font-bold text-zinc-700">{value}</p>
        </div>
    </div>
);

const SummaryMetric = ({ label, value }: any) => (
    <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
        <p className="text-lg font-bold text-zinc-900">{value}</p>
    </div>
);

const MiniOrderRow = ({ id, date, price, status }: any) => {
    const statusColors: any = {
        'Delivered': 'bg-emerald-50 text-emerald-600',
        'Shipped': 'bg-blue-50 text-blue-600',
        'Processing': 'bg-amber-50 text-amber-600'
    };
    return (
        <div className="flex justify-between items-start pb-4 border-b border-gray-50 last:border-0 last:pb-0">
            <div>
                <p className="text-xs font-bold text-zinc-900">Order {id}</p>
                <p className="text-[10px] text-gray-400">{date}</p>
                <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded mt-1 ${statusColors[status]}`}>{status}</span>
            </div>
            <div className="text-right">
                <p className="text-xs font-bold text-zinc-900">{price}</p>
                <p className="text-[10px] text-gray-400">12 items</p>
            </div>
        </div>
    );
};





const SupplierTabs = () => {
    const [activeTab, setActiveTab] = useState('Products');

    return (
        <div className="w-full">
            {/* Tab Navigation Bar */}
            <div className="flex gap-1 mb-6 bg-gray-100/50 w-fit p-1 rounded-lg border border-gray-200">
                {['Products', 'Order History', 'Documents', 'Notes'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${activeTab === tab
                                ? 'bg-white shadow-sm text-zinc-900 border border-gray-100'
                                : 'text-gray-400 hover:text-zinc-600'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content Area */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {activeTab === 'Products' && <ProductsTab />}
                {activeTab === 'Order History' && <OrderHistoryTab />}
                {activeTab === 'Documents' && <DocumentsTab />}
                {activeTab === 'Notes' && <NotesTab />}
            </div>
        </div>
    );
};

// --- TAB CONTENT COMPONENTS ---



const ProductsTab = () => {
  return (
    <div className="p-8 animate-in fade-in duration-300">
      {/* Tab Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold text-zinc-900">Supplied Products</h2>
          <p className="text-sm text-gray-400 font-medium">Manage and view products from this supplier</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-zinc-700 hover:bg-gray-50 transition-colors shadow-sm">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Product Filters */}
      <div className="flex gap-2 mb-6">
        <button className="flex items-center gap-6 px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-zinc-600 hover:bg-gray-50 transition-colors">
          Category: All <ChevronDown size={14} className="text-gray-400" />
        </button>
        <button className="flex items-center gap-6 px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-zinc-600 hover:bg-gray-50 transition-colors">
          Stock: In Stock <ChevronDown size={14} className="text-gray-400" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
              <th className="pb-4 px-2">Product ID</th>
              <th className="pb-4 px-2">Name</th>
              <th className="pb-4 px-2">Category</th>
              <th className="pb-4 px-2">Unit Price</th>
              <th className="pb-4 px-2">Stock Level</th>
              <th className="pb-4 px-2">Lead Time</th>
              <th className="pb-4 px-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm">
            <ProductRow 
              id="PRD001" 
              name="Surgical Gloves (Box of 100)" 
              cat="Disposables" 
              price="$12.50" 
              stock="45 / 20" 
              lead="3-5 days" 
            />
            <ProductRow 
              id="PRD002" 
              name="Disposable Face Masks (Box of 50)" 
              cat="Disposables" 
              price="$8.99" 
              stock="12 / 20" 
              lead="2-4 days" 
              isLowStock
            />
            <ProductRow 
              id="PRD003" 
              name="Digital Thermometer" 
              cat="Equipment" 
              price="$24.95" 
              stock="8 / 5" 
              lead="5-7 days" 
            />
            <ProductRow 
              id="PRD004" 
              name="Hand Sanitizer 500ml" 
              cat="Hygiene" 
              price="$5.50" 
              stock="0 / 15" 
              lead="1-2 days" 
              isOutOfStock
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT ---

const ProductRow = ({ id, name, cat, price, stock, lead, isLowStock, isOutOfStock }: any) => (
  <tr className="group hover:bg-gray-50/50 transition-colors">
    <td className="py-4 px-2 font-bold text-zinc-400 text-xs uppercase">{id}</td>
    <td className="py-4 px-2 font-bold text-zinc-900">{name}</td>
    <td className="py-4 px-2 text-zinc-500 font-medium">{cat}</td>
    <td className="py-4 px-2 font-bold text-zinc-800">{price}</td>
    <td className="py-4 px-2">
      <div className="flex flex-col">
        <span className={`font-bold ${isOutOfStock ? 'text-red-600' : isLowStock ? 'text-amber-600' : 'text-zinc-800'}`}>
          {stock}
        </span>
        {isLowStock && <span className="text-[9px] font-black text-amber-500 uppercase">Low Stock</span>}
        {isOutOfStock && <span className="text-[9px] font-black text-red-500 uppercase">Out of Stock</span>}
      </div>
    </td>
    <td className="py-4 px-2 text-zinc-500 font-medium">{lead}</td>
    <td className="py-4 px-2 text-right">
      <button className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-[11px] font-bold text-zinc-600 hover:bg-white hover:border-zinc-300 transition-all shadow-sm">
        <Eye size={14} /> View
      </button>
    </td>
  </tr>
);


const OrderHistoryTab = () => (
    <div className="p-8">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h2 className="text-xl font-bold text-zinc-900">Order History</h2>
                <p className="text-sm text-gray-400 font-medium">Complete history of orders with this supplier</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm">
                <Download size={16} /> Export
            </button>
        </div>
        <table className="w-full text-left">
            <thead>
                <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                    <th className="pb-4">Order ID</th>
                    <th className="pb-4">Date</th>
                    <th className="pb-4">Items</th>
                    <th className="pb-4">Amount</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Delivery Date</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
                <OrderRow id="ORD4872" date="Apr 18, 2023" items={12} amount="$1,245.00" status="Delivered" delivery="Apr 22, 2023" />
                <OrderRow id="ORD4865" date="Apr 15, 2023" items={8} amount="$876.50" status="Shipped" delivery="Apr 19, 2023" />
                <OrderRow id="ORD4861" date="Apr 12, 2023" items={5} amount="$2,340.75" status="Processing" delivery="Apr 19, 2023 (Est.)" />
            </tbody>
        </table>
    </div>
);

const DocumentsTab = () => (
    <div className="p-8">
        <h2 className="text-xl font-bold text-zinc-900 mb-1">Documents</h2>
        <p className="text-sm text-gray-400 font-medium mb-8">Contracts, agreements, and other documents</p>
        <div className="space-y-4">
            <DocumentCard title="Supply Agreement" meta="PDF • 2.4 MB • Updated 3 months ago" />
            <DocumentCard title="Price List 2023" meta="XLSX • 1.8 MB • Updated 1 month ago" />
            <DocumentCard title="Quality Certification" meta="PDF • 3.1 MB • Updated 6 months ago" />
        </div>
    </div>
);

const NotesTab = () => (
    <div className="p-8">
        <h2 className="text-xl font-bold text-zinc-900 mb-1">Notes</h2>
        <p className="text-sm text-gray-400 font-medium mb-8">Internal notes about this supplier</p>
        <div className="space-y-4">
            <NoteItem
                title="Negotiated Discount"
                author="John Doe"
                date="Apr 10, 2023"
                content="We've negotiated a 10% discount on all orders over $1,000. This is valid until the end of the year."
            />
            <NoteItem
                title="Quality Issues"
                author="Jane Smith"
                date="Mar 15, 2023"
                content="There were some quality issues with the last batch of surgical gloves. The supplier has been notified."
            />
        </div>
    </div>
);

// --- SHARED UI ATOMS ---

const OrderRow = ({ id, date, items, amount, status, delivery }: any) => {
    const statusColor = status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700';
    return (
        <tr className="hover:bg-gray-50/50 transition-colors">
            <td className="py-4 font-bold text-zinc-900">{id}</td>
            <td className="py-4 text-zinc-500">{date}</td>
            <td className="py-4 text-zinc-500">{items}</td>
            <td className="py-4 font-bold text-zinc-900">{amount}</td>
            <td className="py-4"><span className={`${statusColor} text-[10px] font-bold px-3 py-1 rounded-full`}>{status}</span></td>
            <td className="py-4 text-zinc-500">{delivery}</td>
        </tr>
    );
};

const DocumentCard = ({ title, meta }: any) => (
    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-4">
            <div className="p-2.5 bg-gray-50 rounded-lg text-gray-400"><FileText size={20} /></div>
            <div>
                <h4 className="text-sm font-bold text-zinc-900">{title}</h4>
                <p className="text-[11px] text-gray-400 font-medium">{meta}</p>
            </div>
        </div>
        <button className="px-4 py-2 text-xs font-bold text-zinc-600 border border-gray-200 rounded-lg hover:bg-white transition-all shadow-sm">Download</button>
    </div>
);

const NoteItem = ({ title, author, date, content }: any) => (
    <div className="p-6 border border-gray-100 rounded-xl">
        <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-zinc-900">{title}</h4>
                <span className="text-[11px] text-gray-400 font-medium">Added by {author} • {date}</span>
            </div>
        </div>
        <p className="text-sm text-zinc-600 leading-relaxed">{content}</p>
    </div>
);


export default SupplierInformationPage;