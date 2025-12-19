/* eslint-disable jsx-a11y/alt-text */
import {
  Edit3,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Power,
  Search,
  User,
  UserCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ListLoader from "../../../../CommenPage/ListLoader";
import { getAllDoctors } from "../../../../redux/actions/doctorAction/doctor.actions";


/* ================= PAGE ================= */

export default function DoctorsListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /* ================= REDUX ================= */
  const { loading, doctors = [], error } = useSelector(
    (state: any) => state.doctorList
  );

  /* ================= LOCAL STATE ================= */
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");

  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(getAllDoctors(page, limit, search, status) as any);
  }, [dispatch, page, search, status]);

  /* ================= RENDER ================= */

  return (
    <div className="space-y-6">
      {/* ================= PAGE HEADER ================= */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">Doctors</h1>
          <p className="text-gray-500">
            Manage your medical staff and their information.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md">
          <Plus size={16} />
          Add Doctor
        </button>
      </div>

      {/* ================= LIST CARD ================= */}
      <div className="bg-white border rounded-xl p-6 flex flex-col h-[calc(100vh-220px)]">
        {/* ================= TOP BAR ================= */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">Doctors List</h2>
            <p className="text-sm text-gray-500">
              A list of all doctors in your clinic.
            </p>
          </div>

          {/* SEARCH + FILTER */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                placeholder="Search doctors..."
                className="pl-9 pr-3 py-2 border rounded-md text-sm"
              />
            </div>

            <select
              value={status}
              onChange={(e) => {
                setPage(1);
                setStatus(e.target.value as any);
              }}
              className="border px-3 py-2 rounded-md text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <button className="border p-2 rounded-md">
              <Filter size={16} />
            </button>
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="overflow-auto flex-1">
          {loading ? (
            <ListLoader />
          ) : error ? (
            <p className="text-center text-red-500 py-10">{error}</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-gray-500 border-b sticky top-0 bg-white z-10">
                <tr>
                  <th className="text-left py-3">Name</th>
                  <th className="text-left">Specialty</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Experience</th>
                  <th className="text-left">Contact</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {doctors.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-6">
                      No doctors found
                    </td>
                  </tr>
                )}

                {doctors.map((d: any) => (
                  <tr
                    key={d._id}
                    className="border-b last:border-none hover:bg-gray-50"
                  >
                    {/* NAME */}
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            d?.personal?.profileImage
                              ? `http://localhost:5000/uploads/${d.personal.profileImage}`
                              : "/avatar.png"
                          }
                          className="w-9 h-9 rounded-full object-cover"
                        />
                        <span className="font-medium">
                          {d.personal.firstName} {d.personal.lastName}
                        </span>
                      </div>
                    </td>

                    {/* SPECIALTY */}
                    <td>{d.professional.primarySpecialization}</td>

                    {/* STATUS */}
                    <td>
                      <StatusBadge
                        status={d.isActive ? "Active" : "Inactive"}
                      />
                    </td>

                    {/* EXPERIENCE */}
                    <td>{d.professional.experience} yrs</td>

                    {/* CONTACT */}
                    <td>
                      <div>{d.account.email}</div>
                      <div className="text-xs text-gray-400">
                        {d.personal.phone}
                      </div>
                    </td>

                    {/* ACTIONS */}
                    <td className="text-right relative">
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === d._id ? null : d._id)
                        }
                      >
                        <MoreHorizontal />
                      </button>

                      {openMenu === d._id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-[60] py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-100">

                          {/* View Profile */}
                          <button
                            onClick={() => navigate("/admin/doctor-profile")}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                          >
                            <User size={16} className="text-slate-400" />
                            <span className="font-medium">View Profile</span>
                          </button>
                          <button onClick={() => navigate(`/admin/doctors/edit/${d._id}`)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                          >
                            <Edit3 size={16} className="text-slate-400" />
                            <span className="font-medium">Edit Details</span>
                          </button>

                          <button onClick={() => navigate("/admin/doctors/appointment-schedule")}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                          >
                            <Eye size={16} className="text-slate-400" />
                            <span className="font-medium">View Schedule</span>
                          </button>

                          <div className="h-px bg-gray-100 my-1 mx-2" />

                          <button
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${d.isActive
                              ? "text-rose-600 hover:bg-rose-50"
                              : "text-emerald-600 hover:bg-emerald-50"
                              }`}
                          >
                            {d.isActive ? (
                              <>
                                <Power size={16} />
                                <span className="font-bold">Deactivate</span>
                              </>
                            ) : (
                              <>
                                <UserCheck size={16} />
                                <span className="font-bold">Activate</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ================= PAGINATION ================= */}
        <div className="flex justify-between items-center pt-4 border-t">
          <span className="text-sm text-gray-500">Page {page}</span>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 border rounded-md text-sm disabled:opacity-50"
            >
              Previous
            </button>

            <button
              disabled={doctors.length < limit}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 border rounded-md text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= STATUS BADGE ================= */

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "Active"
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600";

  return (
    <span className={`px-3 py-1 text-xs rounded-full ${styles}`}>
      {status}
    </span>
  );
}
