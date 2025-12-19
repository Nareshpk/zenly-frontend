import { Upload, Heart } from "lucide-react";

/* ================= Branding Tab ================= */

export default function BrandingTab() {
    return (
        <div className="space-y-6">
            <Card
                title="Branding & Appearance"
                subtitle="Customize your clinic's visual identity"
            >
                {/* -------- Logo & Favicon -------- */}
                <div className="space-y-6">
                    <UploadBlock
                        title="Clinic Logo"
                        description="Recommended size: 512×512px. Max file size: 2MB. Formats: PNG, JPG, SVG"
                        buttonLabel="Upload New Logo"
                    />

                    <UploadBlock
                        title="Favicon"
                        description="Recommended size: 32×32px. Format: ICO, PNG"
                        buttonLabel="Upload Favicon"
                    />
                </div>

                {/* -------- Color Scheme -------- */}
                <div className="border-t pt-6 mt-6 space-y-6">
                    <h3 className="font-medium">Color Scheme</h3>

                    <Grid2>
                        <ColorInput
                            label="Primary Color"
                            value="#0284c7"
                        />
                        <ColorInput
                            label="Secondary Color"
                            value="#7c3aed"
                        />
                    </Grid2>

                    <Select
                        label="Theme Mode"
                        value="Dark"
                        options={["Light", "Dark", "System Default"]}
                    />
                </div>

                {/* -------- Email Template -------- */}
                <div className="border-t pt-6 mt-6 space-y-4">
                    <h3 className="font-medium">Email Template</h3>

                    <Input
                        label="Email Header Text"
                        defaultValue="MedixPro Clinic - Your Health, Our Priority"
                    />

                    <Textarea
                        label="Email Footer Text"
                        rows={3}
                        defaultValue="© 2023 MedixPro Clinic. All rights reserved. 123 Medical Plaza, Healthcare District, City, State, 12345"
                    />
                </div>

                <Actions />
            </Card>
        </div>
    );
}

/* ================= Reusable UI ================= */

const Card = ({ title, subtitle, children }: any) => (
    <div className="bg-white border rounded-xl p-6 space-y-6">
        <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        {children}
    </div>
);

const Grid2 = ({ children }: any) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
);

const UploadBlock = ({ title, description, buttonLabel }: any) => (
    <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">
            {title}
        </label>

        <div className="flex items-center gap-4">
            <div className="h-20 w-20 border border-dashed rounded-xl flex items-center justify-center text-gray-400">
                <Heart size={28} />
            </div>

            <div>
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
                    <Upload size={14} />
                    {buttonLabel}
                </button>
                <p className="text-xs text-gray-500 mt-1">{description}</p>
            </div>
        </div>
    </div>
);

const ColorInput = ({ label, value }: any) => (
    <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
            {label}
        </label>
        <div className="flex items-center gap-3">
            <div
                className="h-8 w-8 rounded-full border"
                style={{ backgroundColor: value }}
            />
            <input
                value={value}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
            />
        </div>
    </div>
);

const Input = ({ label, ...props }: any) => (
    <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
            {label}
        </label>
        <input
            {...props}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
        />
    </div>
);

const Textarea = ({ label, ...props }: any) => (
    <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
            {label}
        </label>
        <textarea
            {...props}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
        />
    </div>
);

const Select = ({ label, value, options }: any) => (
    <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
            {label}
        </label>
        <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/5">
            <option>{value}</option>
            {options.map((opt: string) => (
                <option key={opt}>{opt}</option>
            ))}
        </select>
    </div>
);

const Actions = () => (
    <div className="flex justify-end gap-3 pt-4">
        <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
            Reset to Defaults
        </button>
        <button className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800">
            Save Branding
        </button>
    </div>
);


