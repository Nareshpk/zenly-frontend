import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import PersonalInformationForm from "./DoctorPage/DoctorForm/PersonalInformationForm";
import AddDoctorProfessionalDetails from "./DoctorPage/DoctorForm/AddDoctorProfessionalDetails";
import AddDoctorAccountSettings from "./DoctorPage/DoctorForm/AddDoctorAccountSettings";

import {
  createDoctor,
  updateDoctor,
  getDoctorById,
} from "../../redux/actions/doctorAction/doctor.actions";
import { DOCTOR_CREATE_RESET, DOCTOR_UPDATE_RESET } from "../../redux/constants/doctorConstants/doctor.types";

type Tab = "personal" | "professional" | "account";

export default function AddDoctorPersonalInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  /* ================= REDUX ================= */
  const { success } = useSelector((state: any) => state.doctorCreate);
  const { success: updateSuccess } = useSelector((state: any) => state.doctorUpdate);
  const { doctor: editDoctor } = useSelector(
    (state: any) => state.doctorDetails
  );

  /* ================= LOCAL STATE ================= */
  const [activeTab, setActiveTab] = useState<Tab>("personal");

  const [doctorData, setDoctorData] = useState<any>({
    personal: {},
    professional: {},
    account: {},
  });

  /* ================= FETCH FOR EDIT ================= */
  useEffect(() => {
    if (id) {
      dispatch(getDoctorById(id) as any);
    }
  }, [id, dispatch]);

  /* ================= PREFILL DATA ================= */
  useEffect(() => {
    if (editDoctor) {
      setDoctorData({
        personal: editDoctor.personal,
        professional: editDoctor.professional,
        account: editDoctor.account,
      });
    }
  }, [editDoctor]);

  /* ================= SUCCESS RESET ================= */
  useEffect(() => {
    if (success || updateSuccess) {
      toast.success(`Doctor ${id ? "updated" : "created"} successfully`);

      if (!id) {
        dispatch({ type: DOCTOR_CREATE_RESET });
        setDoctorData({
          personal: {},
          professional: {},
          account: {},
        });
        setActiveTab("personal");
      } else {
        navigate("/admin/doctors-lit")
        dispatch({ type: DOCTOR_UPDATE_RESET });
      }

    }
  }, [success, updateSuccess, dispatch, id]);

  /* ================= FINAL SAVE ================= */
  const finalSave = (accountData: any) => {
    const finalDoctorData = {
      personal: doctorData.personal,
      professional: doctorData.professional,
      account: accountData.account,
      access: accountData.access,
      notifications: accountData.notifications,
    };

    const formData = new FormData();

    if (doctorData.personal?.profileImage) {
      formData.append("profileImage", doctorData.personal.profileImage);
    }

    formData.append("data", JSON.stringify(finalDoctorData));

    if (id) {
      dispatch(updateDoctor(id, formData) as any);
    } else {
      dispatch(createDoctor(formData) as any);
    }
  };

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-3">
        <button className="border rounded-md p-2">
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="text-xl font-semibold">
            {id ? "Edit Doctor" : "Add Doctor"}
          </h1>
          <p className="text-sm text-gray-500">
            {id ? "Update doctor information" : "Add a new doctor"}
          </p>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="flex gap-2 text-sm">
        <TabButton active={activeTab === "personal"} onClick={() => setActiveTab("personal")}>
          Personal Information
        </TabButton>
        <TabButton active={activeTab === "professional"} onClick={() => setActiveTab("professional")}>
          Professional Details
        </TabButton>
        <TabButton active={activeTab === "account"} onClick={() => setActiveTab("account")}>
          Account Settings
        </TabButton>
      </div>

      {/* ================= FORMS ================= */}
      {activeTab === "personal" && (
        <PersonalInformationForm
          mode={id ? "edit" : "add"}
          initialValues={doctorData.personal}
          onSave={(data) => {
            setDoctorData((prev: any) => ({ ...prev, personal: data }));
            setActiveTab("professional");
          }}
        />
      )}

      {activeTab === "professional" && (
        <AddDoctorProfessionalDetails
          mode={id ? "edit" : "add"}
          initialValues={doctorData.professional}
          onSave={(data) => {
            setDoctorData((prev: any) => ({ ...prev, professional: data }));
            setActiveTab("account");
          }}
        />

      )}

      {activeTab === "account" && (
        <AddDoctorAccountSettings
          mode={id ? "edit" : "add"}
          initialValues={doctorData.account}
          onFinalSave={finalSave}
        />

      )}
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
      className={`px-4 py-1.5 rounded-md text-sm ${active ? "bg-gray-100 font-medium" : "text-gray-500"
        }`}
    >
      {children}
    </button>
  );
}
