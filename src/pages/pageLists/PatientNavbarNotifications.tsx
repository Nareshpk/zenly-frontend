import { useEffect, useState } from "react";
import { Bell, Trash2 } from "lucide-react";

import axiosInstance from "../../redux/actions/axiosInstance";
import { socket } from "../../socket";


type Notification = {
    _id: string;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
};

export default function PatientNavbarNotifications({
    patientId,
}: {
    patientId: string;
}) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [open, setOpen] = useState(false);

    // 🔔 unread count
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    useEffect(() => {
        if (!patientId) return;

        socket.connect();

        socket.on("connect", () => {
            console.log("🟢 Patient socket connected:", socket.id);

            // ✅ JOIN USER ROOM
            socket.emit("join-user", patientId);
        });

        // ✅ LISTEN TO CORRECT EVENT
        socket.on("new-notification", (data) => {
            console.log("🔔 Patient notification:", data);
            setNotifications((prev) => [data, ...prev]);
        });

        return () => {
            socket.off("new-notification");
            socket.disconnect();
        };
    }, [patientId]);


    const markRead = async (id: string) => {
        try {
            await axiosInstance.put(`/api/notifications/mark/${id}/read`);
            setNotifications((prev) =>
                prev.map((n) =>
                    n._id === id ? { ...n, isRead: true } : n
                )
            );
        } catch (err) {
            console.error("Failed to mark as read");
        }
    };

    const deleteNoti = async (id: string) => {
        try {
            await axiosInstance.delete(`/api/notifications/delete/${id}`);
            setNotifications((prev) =>
                prev.filter((n) => n._id !== id)
            );
        } catch (err) {
            console.error("Failed to delete notification");
        }
    };

    useEffect(() => {
        if (!patientId) return;

        const getNotifications = async () => {
            try {


                const res = await axiosInstance.get(
                    `/api/notifications/patient/${patientId}`
                );

                setNotifications(res.data);
            } catch (err) {
                console.error("Failed to get notifications", err);
            } finally {

            }
        };

        getNotifications();
    }, [patientId]);

    console.log("notifications=====================>>>" + notifications);


    return (
        <div className="relative">
            {/* 🔔 Bell */}
            <button
                onClick={() => setOpen(!open)}
                className="relative p-2 rounded-full hover:bg-gray-100"
            >
                <Bell className="w-6 h-6 text-gray-700" />

                {unreadCount > 0 && (
                    <span
                        className="absolute -top-1 -right-1 w-5 h-5 text-xs font-bold
        bg-red-600 text-white rounded-full flex items-center justify-center"
                    >
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* 📩 Dropdown */}
            {open && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border z-50">
                    {/* Header */}
                    <div className="px-4 py-3 font-semibold border-b">
                        Notifications
                    </div>

                    {/* List */}
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <p className="p-4 text-sm text-gray-500 text-center">
                                No notifications
                            </p>
                        ) : (
                            notifications.map((n) => (
                                <div
                                    key={n._id}
                                    onClick={() => markRead(n._id)}
                                    className={`px-4 py-3 text-sm cursor-pointer
              border-b last:border-b-0
              hover:bg-gray-50
              ${!n.isRead ? "bg-blue-50" : "bg-white"}`}
                                >
                                    <div className="flex justify-between items-start gap-3">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800">
                                                {n.title}
                                            </p>
                                            <p className="text-gray-600 text-sm">
                                                {n.message}
                                            </p>
                                        </div>

                                        {/* Delete */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteNoti(n._id);
                                            }}
                                            className="shrink-0 mt-1 text-gray-400 hover:text-red-500"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>

    );
}
