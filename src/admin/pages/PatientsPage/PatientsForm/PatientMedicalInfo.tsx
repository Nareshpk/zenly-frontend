import React from "react";

const PatientMedicalInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border p-6 space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">Medical Information</h2>
        <p className="text-sm text-gray-500">
          Enter the patient's medical history and details.
        </p>
      </div>

      {/* Basic Medical Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="label">Blood Type</label>
          <select className="input">
            <option>Select blood type</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>O+</option>
            <option>O-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>
        </div>

        <div>
          <label className="label">Height (cm)</label>
          <input className="input" placeholder="Enter height" />
        </div>

        <div>
          <label className="label">Weight (kg)</label>
          <input className="input" placeholder="Enter weight" />
        </div>
      </div>

      {/* Allergies & Medications */}
      <div className="space-y-4">
        <div>
          <label className="label">Allergies</label>
          <textarea
            className="textarea"
            placeholder="List any allergies (medications, food, etc.)"
          />
        </div>

        <div>
          <label className="label">Current Medications</label>
          <textarea
            className="textarea"
            placeholder="List any current medications"
          />
        </div>

        <div>
          <label className="label">Chronic Conditions</label>
          <textarea
            className="textarea"
            placeholder="List any chronic conditions"
          />
        </div>
      </div>

      {/* Medical History */}
      <div className="space-y-4">
        <h3 className="font-medium">Medical History</h3>

        <div>
          <label className="label">Past Surgeries</label>
          <textarea
            className="textarea"
            placeholder="List any past surgeries with dates"
          />
        </div>

        <div>
          <label className="label">Previous Hospitalizations</label>
          <textarea
            className="textarea"
            placeholder="List any previous hospitalizations with dates"
          />
        </div>
      </div>

      {/* Family Medical History */}
      <div className="space-y-4">
        <h3 className="font-medium">Family Medical History</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="checkbox">
              <input type="checkbox" /> Diabetes
            </label>
            <label className="checkbox">
              <input type="checkbox" /> Hypertension
            </label>
            <label className="checkbox">
              <input type="checkbox" /> Asthma
            </label>
          </div>

          <div className="space-y-2">
            <label className="checkbox">
              <input type="checkbox" /> Heart Disease
            </label>
            <label className="checkbox">
              <input type="checkbox" /> Cancer
            </label>
            <label className="checkbox">
              <input type="checkbox" /> Mental Health Conditions
            </label>
          </div>
        </div>

        <div>
          <label className="label">Additional Family History Notes</label>
          <textarea
            className="textarea"
            placeholder="Enter any additional family medical history"
          />
        </div>
      </div>

      {/* Lifestyle Information */}
      <div className="space-y-4">
        <h3 className="font-medium">Lifestyle Information</h3>

        <div>
          <label className="label">Smoking Status</label>
          <select className="input">
            <option>Select status</option>
            <option>Non-smoker</option>
            <option>Former smoker</option>
            <option>Current smoker</option>
          </select>
        </div>

        <div>
          <label className="label">Alcohol Consumption</label>
          <select className="input">
            <option>Select consumption</option>
            <option>None</option>
            <option>Occasional</option>
            <option>Regular</option>
          </select>
        </div>

        <div>
          <label className="label">Exercise Frequency</label>
          <select className="input">
            <option>Select frequency</option>
            <option>None</option>
            <option>1–2 times/week</option>
            <option>3–5 times/week</option>
            <option>Daily</option>
          </select>
        </div>

        <div>
          <label className="label">Dietary Habits</label>
          <textarea
            className="textarea"
            placeholder="Describe dietary habits"
          />
        </div>
      </div>
    </div>
  );
};

export default PatientMedicalInfo;
