import React, { useState } from "react";

const PatientInsuranceBilling: React.FC = () => {
  const [secondaryEnabled, setSecondaryEnabled] = useState(false);

  return (
    <div className="bg-white rounded-xl border p-6 space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">Insurance & Billing Information</h2>
        <p className="text-sm text-gray-500">
          Enter the patient's insurance and payment details.
        </p>
      </div>

      {/* Primary Insurance */}
      <div className="space-y-4">
        <h3 className="font-medium">Primary Insurance</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Insurance Provider</label>
            <input className="input" placeholder="Enter insurance provider" />
          </div>

          <div>
            <label className="label">Policy Number</label>
            <input className="input" placeholder="Enter policy number" />
          </div>

          <div>
            <label className="label">Group Number</label>
            <input className="input" placeholder="Enter group number" />
          </div>

          <div>
            <label className="label">Policy Holder Name</label>
            <input className="input" placeholder="Enter policy holder name" />
          </div>

          <div>
            <label className="label">Relationship to Patient</label>
            <select className="input">
              <option>Select relationship</option>
              <option>Self</option>
              <option>Spouse</option>
              <option>Parent</option>
              <option>Guardian</option>
            </select>
          </div>

          <div>
            <label className="label">Insurance Phone Number</label>
            <input className="input" placeholder="Enter insurance phone number" />
          </div>
        </div>
      </div>

      {/* Secondary Insurance */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Secondary Insurance</h3>

          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={secondaryEnabled}
              onChange={() => setSecondaryEnabled(!secondaryEnabled)}
            />
            <div className="peer h-5 w-9 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-black peer-checked:after:translate-x-full" />
          </label>
        </div>

        {secondaryEnabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Insurance Provider</label>
              <input className="input" placeholder="Enter insurance provider" />
            </div>

            <div>
              <label className="label">Policy Number</label>
              <input className="input" placeholder="Enter policy number" />
            </div>
          </div>
        )}
      </div>

      {/* Billing Preferences */}
      <div className="space-y-4">
        <h3 className="font-medium">Billing Preferences</h3>

        <div>
          <label className="label">Preferred Billing Method</label>
          <select className="input">
            <option>Select method</option>
            <option>Insurance</option>
            <option>Self Pay</option>
            <option>Split Billing</option>
          </select>
        </div>

        <div>
          <label className="label">Payment Methods</label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            <label className="checkbox">
              <input type="checkbox" /> Credit Card
            </label>
            <label className="checkbox">
              <input type="checkbox" /> Debit Card
            </label>
            <label className="checkbox">
              <input type="checkbox" /> Cash
            </label>
            <label className="checkbox">
              <input type="checkbox" /> Check
            </label>
            <label className="checkbox">
              <input type="checkbox" /> Online Payment
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInsuranceBilling;
