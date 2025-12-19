import { ArrowLeft } from "lucide-react";
import { useState } from "react";

/* ================= TYPES ================= */

type TabKey = "basic" | "details" | "inventory";

/* ================= PAGE ================= */

export default function AddNewMedicine() {
  const [activeTab, setActiveTab] = useState<TabKey>("basic");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button className="p-2 border rounded-lg hover:bg-gray-100">
          <ArrowLeft size={16} />
        </button>
        <h1 className="text-xl font-semibold">Add New Medicine</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 text-sm border-b">
        <TabButton
          active={activeTab === "basic"}
          onClick={() => setActiveTab("basic")}
        >
          Basic Information
        </TabButton>
        <TabButton
          active={activeTab === "details"}
          onClick={() => setActiveTab("details")}
        >
          Detailed Information
        </TabButton>
        <TabButton
          active={activeTab === "inventory"}
          onClick={() => setActiveTab("inventory")}
        >
          Inventory & Pricing
        </TabButton>
      </div>

      {/* Content */}
      {activeTab === "basic" && <BasicInformationTab />}
      {activeTab === "details" && <DetailedInformationTab />}
      {activeTab === "inventory" && <InventoryPricingTab />}

      {/* Footer Note */}
      <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 border border-blue-100 rounded-lg p-3">
        ℹ️ Fields marked with <span className="font-semibold">*</span> are required.
        Make sure to fill all required fields before submitting.
      </div>
    </div>
  );
}

/* ================= TAB BUTTON ================= */

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-t-md text-sm font-medium ${
        active
          ? "bg-white border border-b-0"
          : "text-gray-500 hover:text-black"
      }`}
    >
      {children}
    </button>
  );
}

/* ================= BASIC INFO TAB ================= */

function BasicInformationTab() {
  return (
    <div className="border rounded-xl p-6 space-y-6 bg-white">
      <div>
        <h2 className="font-semibold text-lg">Basic Information</h2>
        <p className="text-sm text-gray-500">
          Enter the basic details of the medicine
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Input label="Medicine Name" required placeholder="Enter medicine name" />
        <Input label="Generic Name" required placeholder="Enter generic name" />

        <Select label="Category" required placeholder="Select category" />
        <Select label="Medicine Type" required placeholder="Select type" />
      </div>

      <Textarea label="Description" placeholder="Enter medicine description" />

      <div>
        <label className="text-sm font-medium">
          Medicine Form <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-4 mt-2 text-sm">
          {[
            "Tablet",
            "Capsule",
            "Syrup",
            "Injection",
            "Cream/Ointment",
            "Drops",
            "Other",
          ].map((item) => (
            <label key={item} className="flex items-center gap-2">
              <input type="radio" name="form" />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button className="px-4 py-2 border rounded-md">Cancel</button>
        <button className="px-5 py-2 bg-black text-white rounded-md">
          Next
        </button>
      </div>
    </div>
  );
}

/* ================= DETAILED INFO TAB ================= */
function DetailedInformationTab({
  onPrevious,
  onNext,
}: {
  onPrevious?: () => void;
  onNext?: () => void;
}) {
  return (
    <div className="space-y-6">
      {/* Card */}
      <div className="bg-white border rounded-xl p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold">Detailed Information</h2>
          <p className="text-sm text-gray-500">
            Enter detailed specifications of the medicine
          </p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Manufacturer */}
          <div>
            <label className="text-sm font-medium">Manufacturer</label>
            <input
              type="text"
              placeholder="Enter manufacturer name"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Supplier */}
          <div>
            <label className="text-sm font-medium">Supplier</label>
            <input
              type="text"
              placeholder="Enter supplier name"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Manufacturing Date */}
          <div>
            <label className="text-sm font-medium">Manufacturing Date</label>
            <input
              type="date"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Expiry Date */}
          <div>
            <label className="text-sm font-medium">
              Expiry Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Batch Number */}
          <div>
            <label className="text-sm font-medium">Batch Number</label>
            <input
              type="text"
              placeholder="Enter batch number"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Dosage */}
          <div>
            <label className="text-sm font-medium">Dosage</label>
            <input
              type="text"
              placeholder="e.g., 500mg, 5ml"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Side Effects */}
        <div>
          <label className="text-sm font-medium">Side Effects</label>
          <textarea
            rows={3}
            placeholder="Enter potential side effects"
            className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Precautions */}
        <div>
          <label className="text-sm font-medium">Precautions & Warnings</label>
          <textarea
            rows={3}
            placeholder="Enter precautions and warnings"
            className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <button
            onClick={onPrevious}
            className="px-4 py-2 border rounded-md text-sm"
          >
            Previous
          </button>

          <button
            onClick={onNext}
            className="px-5 py-2 bg-black text-white rounded-md text-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}


/* ================= INVENTORY TAB ================= */

function InventoryPricingTab({
  onPrevious,
  onSave,
}: {
  onPrevious?: () => void;
  onSave?: () => void;
}) {
  return (
    <div className="space-y-6">
      {/* Main Card */}
      <div className="bg-white border rounded-xl p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold">Inventory & Pricing</h2>
          <p className="text-sm text-gray-500">
            Enter inventory and pricing details
          </p>
        </div>

        {/* Inventory Fields */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium">
              Initial Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter quantity"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Reorder Level</label>
            <input
              type="number"
              placeholder="Enter reorder level"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Maximum Level</label>
            <input
              type="number"
              placeholder="Enter maximum level"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Pricing Fields */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium">
              Purchase Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter purchase price"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Selling Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter selling price"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Tax Rate (%)</label>
            <input
              type="number"
              placeholder="Enter tax rate"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Storage Conditions */}
        <div>
          <label className="text-sm font-medium">Storage Conditions</label>
          <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Room Temperature
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Refrigerated
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Frozen
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Protect from Light
            </label>
          </div>
        </div>

        {/* Upload Images */}
        <div>
          <label className="text-sm font-medium">Upload Images</label>

          <div className="mt-3 grid grid-cols-2 gap-6">
            {/* Medicine Image */}
            <div className="border border-dashed rounded-lg p-6 text-center text-sm text-gray-500 cursor-pointer hover:bg-gray-50">
              ⬆️
              <div className="mt-2">Click to upload medicine image</div>
              <input type="file" className="hidden" />
            </div>

            {/* Package Image */}
            <div className="border border-dashed rounded-lg p-6 text-center text-sm text-gray-500 cursor-pointer hover:bg-gray-50">
              ⬆️
              <div className="mt-2">Click to upload package image</div>
              <input type="file" className="hidden" />
            </div>
          </div>
        </div>

        {/* Active Toggle */}
        <div className="flex items-center gap-2 text-sm">
          <input type="checkbox" defaultChecked />
          <span>Active (Available for sale)</span>
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <button
            onClick={onPrevious}
            className="px-4 py-2 border rounded-md text-sm"
          >
            Previous
          </button>

          <button
            onClick={onSave}
            className="px-5 py-2 bg-black text-white rounded-md text-sm"
          >
            Save Medicine
          </button>
        </div>
      </div>
    </div>
  );
}


/* ================= REUSABLE INPUTS ================= */

function Input({
  label,
  placeholder,
  required,
  type = "text",
}: any) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
      />
    </div>
  );
}

function Select({ label, placeholder, required }: any) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select className="mt-1 w-full border rounded-md px-3 py-2 text-sm text-gray-500">
        <option>{placeholder}</option>
      </select>
    </div>
  );
}

function Textarea({ label, placeholder }: any) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <textarea
        placeholder={placeholder}
        rows={3}
        className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
      />
    </div>
  );
}
