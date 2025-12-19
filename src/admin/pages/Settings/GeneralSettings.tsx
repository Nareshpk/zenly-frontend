import { useState, ReactNode } from "react";
import { Building2, Mail, Phone, Globe } from "lucide-react";
import PreferencesTab from "./PreferencesTab";
import BrandingTab from "./BrandingTab";
import SecuritySettingsTab from "./SecuritySettingsTab";
import SystemSettingsTab from "./SystemSettingsTab";

type TabKey = "clinic" | "preferences" | "branding" | "security" | "system";

export default function GeneralSettings() {
    const [activeTab, setActiveTab] = useState<TabKey>("clinic");

    const tabs: { label: string; key: TabKey }[] = [
        { label: "Clinic Info", key: "clinic" },
        { label: "Preferences", key: "preferences" },
        { label: "Branding", key: "branding" },
        { label: "Security", key: "security" },
        { label: "System", key: "system" },
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold">General Settings</h1>
                <p className="text-sm text-gray-500">
                    Configure your clinic settings and preferences
                </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-gray-50 p-1 rounded-xl w-fit">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-4 py-2 rounded-lg text-sm transition ${activeTab === tab.key
                            ? "bg-white shadow font-medium"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Clinic Info */}
            {activeTab === "clinic" && (
                <>
                    {/* Clinic Information */}
                    <Card
                        title="Clinic Information"
                        subtitle="Update your clinic's basic information and contact details"
                    >
                        <Grid2>
                            <Input
                                label="Clinic Name"
                                defaultValue="MedixPro Clinic"
                                icon={<Building2 size={16} />}
                            />
                            <Input
                                label="Clinic ID / Registration Number"
                                defaultValue="MC-12345-XYZ"
                            />
                        </Grid2>

                        <Textarea
                            label="Address"
                            defaultValue="123 Medical Plaza, Healthcare District, City, State, 12345"
                        />

                        <Grid2>
                            <Input
                                label="Email Address"
                                defaultValue="contact@medixpro-clinic.com"
                                icon={<Mail size={16} />}
                            />
                            <Input
                                label="Phone Number"
                                defaultValue="+1 (555) 123-4567"
                                icon={<Phone size={16} />}
                            />
                        </Grid2>

                        <Grid2>
                            <Input
                                label="Website"
                                defaultValue="https://medixpro-clinic.com"
                                icon={<Globe size={16} />}
                            />
                            <Input label="Tax ID" defaultValue="TAX-987654321" />
                        </Grid2>

                        <div className="border-t pt-6 mt-6">
                            <h3 className="font-medium mb-4">Operating Hours</h3>
                            <Grid2>
                                <Input label="Weekdays" defaultValue="8:00 AM - 6:00 PM" />
                                <Input label="Weekends" defaultValue="9:00 AM - 2:00 PM" />
                            </Grid2>
                        </div>

                        <Actions />
                    </Card>

                    {/* Emergency Contact */}
                    <Card
                        title="Emergency Contact"
                        subtitle="Set up emergency contact information for your clinic"
                    >
                        <Grid2>
                            <Input label="Contact Name" defaultValue="Dr. Sarah Johnson" />
                            <Input
                                label="Emergency Phone"
                                defaultValue="+1 (555) 987-6543"
                            />
                        </Grid2>

                        <Textarea
                            label="Emergency Instructions"
                            defaultValue="In case of system failure, contact the emergency number immediately. For power outages, the backup generator should activate automatically."
                        />

                        <Actions />
                    </Card>
                </>
            )}
            {activeTab === "preferences" && (<PreferencesTab />)}
            {activeTab === "branding" && (<BrandingTab />)}
            {activeTab === "security" && (<SecuritySettingsTab />)}
            {activeTab === "system" && (<SystemSettingsTab />)}
        </div>
    );
}

/* ---------------- Reusable UI ---------------- */

interface CardProps {
    title: string;
    subtitle?: string;
    children: ReactNode;
}

const Card = ({ title, subtitle, children }: CardProps) => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
        <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        {children}
    </div>
);

const Grid2 = ({ children }: { children: ReactNode }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
    </div>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: ReactNode;
}

const Input = ({ label, icon, ...props }: InputProps) => (
    <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
            {label}
        </label>
        <div className="relative">
            {icon && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {icon}
                </span>
            )}
            <input
                {...props}
                className={`w-full ${icon ? "pl-10" : "pl-4"
                    } pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5`}
            />
        </div>
    </div>
);

interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

const Textarea = ({ label, ...props }: TextareaProps) => (
    <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
            {label}
        </label>
        <textarea
            {...props}
            rows={4}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
        />
    </div>
);

const Actions = () => (
    <div className="flex justify-end gap-3 pt-4">
        <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            Cancel
        </button>
        <button className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800">
            Save Changes
        </button>
    </div>
);

