import { MoreVertical, Pencil, Plus, Search, Trash2, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddSpecializationModal from "../../../Modal/AddSpecializationModal";

import toast from "react-hot-toast";
import { getAllSpecializations, createSpecialization } from "../../../../redux/actions/specializationAction/specialization.actions";
import { SPECIALIZATION_CREATE_RESET } from "../../../../redux/constants/specializationConstants/specializationConstants";
import { useNavigate } from "react-router-dom";

interface Props {
    onEdit?: () => void;
    onViewDoctors?: () => void;
    onDelete?: () => void;
}
type Status = "Active" | "Inactive";

export default function SpecializationsPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /* ================= LOCAL STATE ================= */
    const [openModal, setOpenModal] = useState(false);
    const [search, setSearch] = useState("");

    /* ================= REDUX STATE ================= */
    const specializationList = useSelector(
        (state: any) => state.specializationList
    );
    const { loading, specializations, error } = specializationList;

    const specializationCreate = useSelector(
        (state: any) => state.specializationCreate
    );
    const { success: createSuccess, error: createError } = specializationCreate;

    /* ================= FETCH LIST ================= */
    useEffect(() => {
        dispatch(getAllSpecializations() as any);
    }, [dispatch]);

    /* ================= AFTER CREATE ================= */
    useEffect(() => {
        if (createSuccess) {
            toast.success("Specialization created successfully");
            setOpenModal(false);
            dispatch({ type: SPECIALIZATION_CREATE_RESET });
            dispatch(getAllSpecializations() as any);
        }

        if (createError) {
            toast.error(createError.message || "Failed to create specialization");
        }
    }, [createSuccess, createError, dispatch]);

    /* ================= SEARCH FILTER ================= */


    return (
        <div className="space-y-6">
            {/* ================= HEADER ================= */}
            <div>
                <h1 className="text-xl font-semibold">Specializations</h1>
                <p className="text-sm text-gray-500">
                    Manage medical specializations in your clinic.
                </p>
            </div>

            {/* ================= LIST CARD ================= */}
            <div className="bg-white border rounded-xl">
                <div className="flex items-center justify-between p-4 border-b">
                    <div>
                        <h2 className="font-semibold">Specializations List</h2>
                        <p className="text-sm text-gray-500">
                            View and manage all medical specializations.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search
                                size={16}
                                className="absolute left-3 top-2.5 text-gray-400"
                            />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search specializations..."
                                className="pl-9 pr-3 py-2 text-sm border rounded-md"
                            />
                        </div>

                        <button
                            onClick={() => setOpenModal(true)}
                            className="flex items-center gap-2 bg-black text-white px-3 py-2 text-sm rounded-md"
                        >
                            <Plus size={16} /> Add Specialization
                        </button>
                    </div>
                </div>

                {/* ================= TABLE ================= */}
                {loading ? (
                    <p className="text-center py-10 text-gray-500">
                        Loading specializations...
                    </p>
                ) : error ? (
                    <p className="text-center py-10 text-red-500">
                        {error.message || "Error loading data"}
                    </p>
                ) : (
                    <table className="w-full text-sm">
                        <thead className="text-gray-500 border-b">
                            <tr>
                                <th className="text-left p-4">Name</th>
                                <th className="text-left p-4">Description</th>
                                <th className="text-left p-4">Department</th>
                                <th className="text-center p-4">Status</th>
                                <th className="text-right p-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {specializations?.map((s: any) => (
                                <tr key={s._id}>
                                    <td className="p-4 font-medium">{s.name}</td>
                                    <td className="p-4 text-gray-600">
                                        {s.description || "-"}
                                    </td>
                                    <td className="p-4">{s.department || "-"}</td>
                                    <td className="p-4 text-center">
                                        <StatusBadge
                                            status={s.isActive ? "Active" : "Inactive"}
                                        />
                                    </td>
                                    <td className="p-4 text-right">
                                        <ActionsMenu
                                            onEdit={() => {
                                                navigate(`/admin/doctors/specializations-edit/${s._id}`)
                                            }}
                                            onViewDoctors={() => {
                                                console.log("View doctors for", s._id);
                                            }}
                                            onDelete={() => {
                                                console.log("Delete specialization", s._id);
                                            }}
                                        />

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* ================= MODAL ================= */}
            <AddSpecializationModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSave={(data) => {
                    dispatch(createSpecialization(data) as any);
                }}
            />
        </div>
    );
}

/* ================= COMPONENTS ================= */

function StatusBadge({ status }: { status: Status }) {
    return (
        <span
            className={`px-2 py-0.5 text-xs rounded-full font-medium ${status === "Active"
                ? "bg-green-100 text-green-600"
                : "bg-yellow-100 text-yellow-700"
                }`}
        >
            {status}
        </span>
    );
}


function ActionsMenu({
    onEdit,
    onViewDoctors,
    onDelete,
}: Props) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    /* Close on outside click */
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative inline-block text-left">
            {/* Trigger */}
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="p-2 rounded-md hover:bg-gray-100"
            >
                <MoreVertical size={16} />
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-20">
                    <div className="px-3 py-2 text-sm font-medium text-gray-700 border-b">
                        Actions
                    </div>

                    <button
                        onClick={() => {
                            setOpen(false);
                            onEdit?.();
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100"
                    >
                        <Pencil size={14} />
                        Edit
                    </button>

                    <button
                        onClick={() => {
                            setOpen(false);
                            onViewDoctors?.();
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100"
                    >
                        <Users size={14} />
                        View doctors
                    </button>

                    <button
                        onClick={() => {
                            setOpen(false);
                            onDelete?.();
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                        <Trash2 size={14} />
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}

