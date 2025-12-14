/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDoctorById } from "../../redux/actions/doctorProfileAction";
import Awards from "./ProfileSubPage/Awards";
import BasicDetails from "./ProfileSubPage/BasicDetails";
import BusinessHours from "./ProfileSubPage/BusinessHours";
import Clinics from "./ProfileSubPage/Clinics";
import Education from "./ProfileSubPage/Education";
import Experience from "./ProfileSubPage/Experience";
import Insurances from "./ProfileSubPage/Insurances";


export default function ProfileSettings() {
    const authString = localStorage.getItem("auth");
    const parsedAuth = authString ? JSON.parse(authString) : null;
    const dispatch = useDispatch();
    const tabItems: any = [
        { id: 1, title: "Basic Details" },
        { id: 2, title: "Experience" },
        { id: 3, title: "Education" },
        { id: 4, title: "Awards" },
        { id: 5, title: "Insurances" },
        { id: 6, title: "Clinics" },
        { id: 7, title: "Business Hours" }
    ]
    const [activeTab, setActiveTab] = useState<any>(1);
    const [doctorDetails, setDoctorDetails] = useState(null as any);


    useEffect(() => {
        dispatch(getDoctorById(parsedAuth.user.id) as any).then((action: any) => {
            if (action.type === "DOCTOR_DETAILS_SUCCESS") {
                setDoctorDetails(action.payload)
            }
        });

    }, [dispatch]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Profile Settings</h2>

            {/* Tabs */}
            <div className="mb-6">
                <div className="bg-white rounded-lg shadow-sm p-3 flex gap-3 flex-wrap">
                    {tabItems.map((t: any) => (
                        <button
                            key={t.id}
                            onClick={() => setActiveTab(t.id)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === t.id ? "bg-blue-500 text-white shadow" : "text-slate-600 bg-transparent border border-transparent hover:bg-slate-100"}`}
                        >
                            {t.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content card */}
            {activeTab === 1 && (
                <BasicDetails doctorDetails={doctorDetails} userDetails={parsedAuth.user} />
            )}
            {activeTab === 2 && (
                <Experience doctorDetails={doctorDetails} />
            )}
            {activeTab === 3 && (
                <Education doctorDetails={doctorDetails} />
            )}
            {activeTab === 4 && (
                <Awards doctorDetails={doctorDetails} />
            )}
            {activeTab === 5 && (
                <Insurances doctorDetails={doctorDetails} />
            )}
            {activeTab === 6 && (
                <Clinics doctorDetails={doctorDetails} />
            )}
            {activeTab === 7 && (
                <BusinessHours doctorDetails={doctorDetails} />
            )}
        </div>
    );
}
