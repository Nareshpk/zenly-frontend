import {
    Database,
    Download,
    RotateCcw,
    Settings,
    Upload
} from "lucide-react";
import { useState } from "react";

export default function SystemSettingsTab() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="space-y-6">
      <Card
        icon={<Settings size={18} />}
        title="System Configuration"
        subtitle="Advanced system settings and maintenance options"
      >
        {/* System Maintenance */}
        <Section title="System Maintenance">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ActionButton icon={<RotateCcw size={16} />} label="Clear Cache" />
            <ActionButton icon={<Database size={16} />} label="Optimize Database" />
          </div>

          <Toggle
            label="Enable maintenance mode"
            description="This will make the system inaccessible to regular users"
            checked={maintenanceMode}
            onChange={setMaintenanceMode}
          />
        </Section>

        {/* Backup & Restore */}
        <Section title="Backup & Restore">
          <Select label="Automatic Backup Frequency" value="Daily" />
          <Select label="Backup Retention" value="30 days" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ActionButton
              icon={<Upload size={16} />}
              label="Create Manual Backup"
            />
            <ActionButton
              icon={<Download size={16} />}
              label="Restore from Backup"
            />
          </div>
        </Section>

        {/* System Information */}
        <Section title="System Information">
          <InfoRow label="Version" value="v2.5.3" />
          <InfoRow label="Last Updated" value="2023-11-10" />
          <InfoRow label="Database Size" value="1.2 GB" />
          <InfoRow
            label="Storage Usage"
            value="45.8 GB / 100 GB"
          />
        </Section>

        <Actions
          primaryLabel="Save System Settings"
          secondaryLabel="Reset to Defaults"
        />
      </Card>
    </div>
  );
}

/* ---------------- REUSABLE UI ---------------- */

function Card({ icon, title, subtitle, children }: any) {
  return (
    <div className="bg-white border rounded-xl p-6 space-y-6">
      <div className="flex items-start gap-2">
        <span className="text-gray-700">{icon}</span>
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div className="space-y-4 border-t pt-4">
      <h3 className="font-medium">{title}</h3>
      {children}
    </div>
  );
}

function Select({ label, value }: any) {
  return (
    <div>
      <label className="label">{label}</label>
      <select className="input">
        <option>{value}</option>
      </select>
    </div>
  );
}

function Toggle({ label, description, checked, onChange }: any) {
  return (
    <div className="flex items-start gap-4">
      <span
        onClick={() => onChange(!checked)}
        className={`relative mt-1 w-10 h-6 rounded-full cursor-pointer transition ${
          checked ? "bg-black" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
            checked ? "translate-x-4" : ""
          }`}
        />
      </span>
      <div>
        <p className="text-sm font-medium">{label}</p>
        {description && (
          <p className="text-xs text-gray-500">{description}</p>
        )}
      </div>
    </div>
  );
}

function ActionButton({ icon, label }: any) {
  return (
    <button className="flex items-center justify-center gap-2 border rounded-xl px-4 py-2.5 text-sm hover:bg-gray-50 transition">
      {icon}
      {label}
    </button>
  );
}

function InfoRow({ label, value }: any) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function Actions({ primaryLabel, secondaryLabel }: any) {
  return (
    <div className="flex justify-end gap-3 pt-4">
      {secondaryLabel && (
        <button className="btn-outline">{secondaryLabel}</button>
      )}
      <button className="btn-primary">{primaryLabel}</button>
    </div>
  );
}

