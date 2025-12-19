import React from "react";

const PatientConsentDocuments: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border p-6 space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">Consent & Documents</h2>
        <p className="text-sm text-gray-500">
          Manage patient consent forms and documents.
        </p>
      </div>

      {/* Required Consent Forms */}
      <div className="space-y-4">
        <h3 className="font-medium">Required Consent Forms</h3>

        {[
          {
            title: "HIPAA Consent Form",
            desc: "Patient consent for use and disclosure of health information",
          },
          {
            title: "Treatment Consent",
            desc: "Consent to receive medical treatment",
          },
          {
            title: "Financial Agreement",
            desc: "Agreement to pay for services",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between border rounded-lg p-4"
          >
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>

            <button className="btn-outline">Upload</button>
          </div>
        ))}
      </div>

      {/* Additional Documents */}
      <div className="space-y-4 border-t pt-6">
        <h3 className="font-medium">Additional Documents</h3>

        <div>
          <label className="label">Document Type</label>
          <select className="input">
            <option>Select document type</option>
            <option>ID Proof</option>
            <option>Insurance Card</option>
            <option>Referral Letter</option>
            <option>Other</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <button className="btn-outline">Upload Document</button>
          <span className="text-sm text-gray-500">
            Upload additional patient documents. PDF, JPG, or PNG. Max 10MB.
          </span>
        </div>
      </div>

      {/* Communication Preferences */}
      <div className="space-y-4 border-t pt-6">
        <h3 className="font-medium">Communication Preferences</h3>

        <div className="space-y-2">
          <label className="checkbox">
            <input type="checkbox" /> Receive appointment reminders
          </label>

          <label className="checkbox">
            <input type="checkbox" /> Receive lab result notifications
          </label>

          <label className="checkbox">
            <input type="checkbox" /> Receive prescription notifications
          </label>

          <label className="checkbox">
            <input type="checkbox" /> Receive clinic newsletter and updates
          </label>
        </div>
      </div>
    </div>
  );
};

export default PatientConsentDocuments;
