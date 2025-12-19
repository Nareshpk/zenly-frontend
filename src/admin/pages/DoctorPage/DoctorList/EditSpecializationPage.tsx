 import { ArrowLeft, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getSpecializationById, updateSpecialization } from "../../../../redux/actions/specializationAction/specialization.actions";
import { SPECIALIZATION_UPDATE_RESET } from "../../../../redux/constants/specializationConstants/specializationConstants";

export default function EditSpecializationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ================= REDUX ================= */

  const { loading, specialization, error } = useSelector(
    (state: any) => state.specializationDetails
  );

  const {
    loading: updating,
    success: updateSuccess,
    error: updateError,
  } = useSelector((state: any) => state.specializationUpdate);

  /* ================= LOCAL STATE ================= */

  const [form, setForm] = useState({
    name: "",
    description: "",
    department: "",
    status: "Active",
  });

  /* ================= EFFECTS ================= */

  useEffect(() => {
    if (id) {
      dispatch(getSpecializationById(id) as any);
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (specialization) {
      setForm({
        name: specialization.name || "",
        description: specialization.description || "",
        department: specialization.department || "",
        status: specialization.isActive ? "Active" : "Inactive",
      });
    }
  }, [specialization]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Specialization updated successfully");
      dispatch({ type: SPECIALIZATION_UPDATE_RESET });
      navigate("/admin/doctors/specializations");
    }

    if (updateError) {
      toast.error(updateError);
    }
  }, [updateSuccess, updateError, dispatch, navigate]);

  /* ================= HANDLERS ================= */

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    dispatch(
      updateSpecialization(id as string, {
        name: form.name,
        description: form.description,
        department: form.department,
        isActive: form.status === "Active",
      }) as any
    );
  };

  if (loading) {
    return <p className="p-6">Loading specialization...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-6">
      {/* ================= BREADCRUMB ================= */}
      <div className="text-sm text-gray-500">
        Doctors &nbsp;›&nbsp; Specializations &nbsp;›&nbsp; Edit
      </div>

      {/* ================= HEADER ================= */}
      <div className="flex items-start gap-3">
        <button
          onClick={() => navigate(-1)}
          className="border rounded-md p-2 hover:bg-gray-50"
        >
          <ArrowLeft size={16} />
        </button>

        <div>
          <h1 className="text-2xl font-semibold">Edit Specialization</h1>
          <p className="text-sm text-gray-500">
            Update specialization details and information.
          </p>
        </div>
      </div>

      {/* ================= FORM CARD ================= */}
      <div className="bg-white border rounded-xl p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Specialization Information</h2>
          <p className="text-sm text-gray-500">
            Update the details of this medical specialization.
          </p>
        </div>

        {/* NAME */}
        <Input
          label="Specialization Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        {/* DESCRIPTION */}
        <Textarea
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />

        {/* DEPARTMENT */}
        <Input
          label="Department"
          name="department"
          value={form.department}
          onChange={handleChange}
          required
        />

        {/* STATUS */}
        <Select
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          options={["Active", "Inactive"]}
        />

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded-md"
          >
            Cancel
          </button>

          <button
            disabled={updating}
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md disabled:opacity-60"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE INPUTS ================= */

function Input({ label, required, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-black"
      />
    </div>
  );
}

function Textarea({ label, required, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        {...props}
        rows={4}
        className="w-full border rounded-md px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}

function Select({ label, options, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>
      <select
        {...props}
        className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-black"
      >
        {options.map((o: string) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
