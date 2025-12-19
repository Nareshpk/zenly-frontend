import { Shield, Key, Lock, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function SecuritySettingsTab() {
  return (
    <div className="space-y-6">
      <SecurityPolicyCard />
      <ApiAccessCard />
    </div>
  );
}

/* ---------------- SECURITY SETTINGS ---------------- */

function SecurityPolicyCard() {
  const [uppercase, setUppercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [special, setSpecial] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [encrypt, setEncrypt] = useState(true);
  const [audit, setAudit] = useState(true);

  return (
    <Card
      icon={<Shield size={18} />}
      title="Security Settings"
      subtitle="Configure security and privacy settings for your clinic"
    >
      {/* Password Policy */}
      <Section title="Password Policy">
        <Select label="Password Expiry" value="90 days" />
        <Select label="Minimum Password Length" value="8 characters" />

        <Toggle label="Require uppercase letters" checked={uppercase} onChange={setUppercase} />
        <Toggle label="Require numbers" checked={numbers} onChange={setNumbers} />
        <Toggle label="Require special characters" checked={special} onChange={setSpecial} />
      </Section>

      {/* Login Security */}
      <Section title="Login Security">
        <Toggle
          label="Enforce two-factor authentication"
          checked={twoFactor}
          onChange={setTwoFactor}
        />

        <Select label="Session Timeout" value="30 minutes" />
        <Select label="Maximum Login Attempts" value="5 attempts" />
      </Section>

      {/* Data Protection */}
      <Section title="Data Protection">
        <Toggle label="Encrypt sensitive data" checked={encrypt} onChange={setEncrypt} />
        <Toggle label="Enable audit logs" checked={audit} onChange={setAudit} />
        <Select label="Log Retention Period" value="1 year" />
      </Section>

      <Actions
        primaryLabel="Save Security Settings"
        secondaryLabel="Reset to Defaults"
      />
    </Card>
  );
}

/* ---------------- API ACCESS ---------------- */

function ApiAccessCard() {
  const [enabled, setEnabled] = useState(true);
  const [showKey, setShowKey] = useState(false);

  return (
    <Card
      icon={<Key size={18} />}
      title="API Access"
      subtitle="Manage API keys and external integrations"
    >
      <Toggle
        label="Enable API access"
        checked={enabled}
        onChange={setEnabled}
      />

      <div>
        <label className="label">API Key</label>
        <div className="flex gap-2">
          <input
            type={showKey ? "text" : "password"}
            value="sk_live_xxxxxxxxxxxxxxxxxxxxx"
            readOnly
            className="input flex-1"
          />
          <button
            onClick={() => setShowKey(!showKey)}
            className="btn-outline"
          >
            {showKey ? "Hide" : "Show"}
          </button>
          <button className="btn-outline flex items-center gap-2">
            <RefreshCw size={14} />
            Regenerate
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Last generated: 2023-10-15
        </p>
      </div>

      <Select label="Requests per Minute" value="100 requests" />

      <Textarea
        label="Allowed Origins"
        defaultValue={`https://medixpro-clinic.com
https://api.medixpro-clinic.com`}
        hint="Enter one domain per line"
      />

      <Actions primaryLabel="Save API Settings" />
    </Card>
  );
}

/* ---------------- REUSABLE UI ---------------- */

function Card({
  icon,
  title,
  subtitle,
  children,
}: any) {
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

function Toggle({ label, checked, onChange }: any) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <span
        className={`relative w-10 h-6 rounded-full transition ${
          checked ? "bg-black" : "bg-gray-300"
        }`}
        onClick={() => onChange(!checked)}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
            checked ? "translate-x-4" : ""
          }`}
        />
      </span>
      <span className="text-sm">{label}</span>
    </label>
  );
}

function Textarea({ label, hint, ...props }: any) {
  return (
    <div>
      <label className="label">{label}</label>
      <textarea rows={4} {...props} className="input" />
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}

function Actions({ primaryLabel, secondaryLabel }: any) {
  return (
    <div className="flex justify-end gap-3 pt-4">
      {secondaryLabel && (
        <button className="btn-outline">{secondaryLabel}</button>
      )}
      <button className="btn-primary flex items-center gap-2">
        <Lock size={14} />
        {primaryLabel}
      </button>
    </div>
  );
}


