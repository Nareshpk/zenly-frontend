/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from "react";
import { Send, Paperclip, Smile, Mic } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
    getAppointmentsByDoctor,
    getAppointmentsByPatient,
} from "../../redux/actions/appointmentActions";
import { socket } from "../../socket";
import axiosInstance from "../../redux/actions/axiosInstance";

export default function Message() {
    const dispatch = useDispatch();

    const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    const userId = auth?.user?.id;
    const role = auth?.role;

    const docdetails = JSON.parse(localStorage.getItem("docId") || "null");

    const myId =
        role === "doctor" ? String(docdetails?._id) : String(userId);

    const { appointments = [] } = useSelector(
        (state: any) => state.appointmentList
    );

    const [users, setUsers] = useState<any[]>([]);
    const [selected, setSelected] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    const [recording, setRecording] = useState(false);

    const scrollRef = useRef<HTMLDivElement | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    /* ---------------- LOAD APPOINTMENTS ---------------- */
    useEffect(() => {
        if (!userId) return;
        role === "doctor"
            ? dispatch(getAppointmentsByDoctor(docdetails?._id) as any)
            : dispatch(getAppointmentsByPatient(userId) as any);
    }, [dispatch, role, userId]);

    /* ---------------- BUILD USERS ---------------- */
    useEffect(() => {
        if (!appointments.length) return;

        const map = new Map();
        appointments.forEach((a: any) => {
            map.set(
                role === "doctor" ? a.patientId : a.doctorId,
                {
                    id: role === "doctor" ? a.patientId : a.doctorId,
                    name: role === "doctor" ? a.patientName : a.doctorName,
                    avatar:
                        role === "doctor" ? a.patientAvatar : a.doctorAvatar,
                }
            );
        });

        const list = Array.from(map.values());
        setUsers(list);
        setSelected(list[0]);
    }, [appointments, role]);

    const appointmentId = appointments.find((a: any) =>
        role === "doctor"
            ? a.patientId === selected?.id
            : a.doctorId === selected?.id
    )?._id;

    /* ---------------- SOCKET ---------------- */
    useEffect(() => {
        socket.connect();

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!appointmentId) return;
        socket.emit("join", appointmentId);
    }, [appointmentId]);

    useEffect(() => {
        socket.on("receive-message", (msg: any) => {
            setMessages((prev) => [
                ...prev,
                { ...msg, direction: "received" },
            ]);
        });
        return () => {
            socket.off("receive-message");
        };
    }, []);

    useEffect(() => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages]);


    useEffect(() => {
        if (!appointmentId) return;

        const loadHistory = async () => {
            const res = await fetch(
                `http://localhost:5000/api/messages/${appointmentId}`
            );

            const data = await res.json();

            setMessages(
                data.map((m: any) => ({
                    ...m,
                    direction: String(m.from) === myId ? "sent" : "received",
                }))
            );
        };

        loadHistory();
    }, [appointmentId]);

    /* ---------------- SEND TEXT ---------------- */
    const sendMessage = () => {
        if (!input.trim() || !selected || !appointmentId) return;

        const msg = {
            id: Date.now().toString(),
            from: myId,
            to: selected.id,
            text: input,
            type: "text",
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            direction: "sent",
        };

        socket.emit("send-message", { roomId: appointmentId, message: msg });
        setMessages((p) => [...p, msg]);
        setInput("");
    };

    /* ---------------- IMAGE ---------------- */
    const handleMediaUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file || !selected || !appointmentId) return;

        const isImage = file.type.startsWith("image/");
        const isVideo = file.type.startsWith("video/");

        let uploadUrl = "";

        if (isImage) {
            uploadUrl = "http://localhost:5000/api/upload/image";
        } else if (isVideo) {
            uploadUrl = "http://localhost:5000/api/upload/video";
        } else {
            alert("Only image or video files are allowed");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(uploadUrl, {
            method: "POST",
            body: formData,
        });

        const data = await res.json(); // { url: "/uploads/xyz.mp4" }

        // ✅ BUILD MESSAGE OBJECT
        const msg: any = {
            id: Date.now().toString(),
            from: myId,
            to: selected.id,
            type: isImage ? "image" : "video",
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            direction: "sent",
        };

        if (isImage) msg.imageUrl = data.url;
        if (isVideo) msg.videoUrl = data.url;

        // 🔥 SEND VIA SOCKET
        socket.emit("send-message", {
            roomId: appointmentId,
            message: msg,
        });

        // optimistic UI
        setMessages((prev) => [...prev, msg]);

        // reset input
        e.target.value = "";
    };



    /* ---------------- VOICE ---------------- */
    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;

        const chunks: any[] = [];
        recorder.ondataavailable = (e) => chunks.push(e.data);

        recorder.onstop = async () => {
            const blob = new Blob(chunks, { type: "audio/webm" });
            const formData = new FormData();
            formData.append("file", blob);

            const res = await axiosInstance.post("/api/upload/audio", formData);

            const msg = {
                id: Date.now().toString(),
                from: myId,
                to: selected.id,
                audioUrl: res.data.url,
                type: "audio",
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                direction: "sent",
            };

            socket.emit("send-message", { roomId: appointmentId, message: msg });
            setMessages((p) => [...p, msg]);
        };

        recorder.start();
        setRecording(true);
    };

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        setRecording(false);
    };

    /* ---------------- UI ---------------- */
    return (
        <div className="bg-gray-50 p-6">
            <div className="grid grid-cols-4 gap-6 h-[80vh]">
                <aside className="bg-white p-4 shadow rounded-lg">
                    {users.map((u) => (
                        <div
                            key={u.id}
                            onClick={() => setSelected(u)}
                            className="flex gap-3 p-2 cursor-pointer hover:bg-gray-100"
                        >
                            <img src={"https://cdn-icons-png.flaticon.com/512/3774/3774299.png"} className="w-10 h-10 rounded-full" />
                            <span>{u.name}</span>
                        </div>
                    ))}
                </aside>

                <main className="col-span-3 bg-white flex flex-col rounded-lg shadow h-[80vh]">
                    {/* ================= HEADER (FIXED) ================= */}
                    <div className="flex items-center gap-4 p-4 border-b">
                        <img
                            src={
                                selected?.avatar ||
                                "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
                            }
                            className="w-12 h-12 rounded-full"
                        />
                        <div className="font-semibold">{selected?.name}</div>
                    </div>

                    {/* ================= MESSAGES (SCROLL ONLY HERE) ================= */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-4"
                    >
                        {messages.map((m) => {
                            const sent = m.from === myId;

                            return (
                                <div
                                    key={m.id}
                                    className={`flex ${sent ? "justify-end" : "justify-start"} mb-2`}
                                >
                                    <div
                                        className={`p-3 rounded-lg max-w-xs break-words ${sent
                                            ? "bg-indigo-600 text-white"
                                            : "bg-gray-100 text-gray-900"
                                            }`}
                                    >
                                        {/* TEXT */}
                                        {m.type === "text" && m.text}

                                        {/* IMAGE */}
                                        {m.type === "image" && (
                                            <img
                                                src={`http://localhost:5000${m.imageUrl}`}
                                                className="rounded max-w-xs"
                                            />
                                        )}

                                        {/* AUDIO */}
                                        {m.type === "audio" && (
                                            <audio
                                                controls
                                                src={`http://localhost:5000${m.audioUrl}`}
                                                className="w-64"
                                            />
                                        )}

                                        {/* VIDEO */}
                                        {m.type === "video" && (
                                            <video
                                                controls
                                                src={`http://localhost:5000${m.videoUrl}`}
                                                className="rounded max-w-xs"
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* ================= COMPOSER (FIXED) ================= */}
                    <div className="p-4 border-t flex items-center gap-3">
                        <button onClick={() => setShowEmoji(!showEmoji)}>
                            <Smile />
                        </button>

                        <input
                            type="file"
                            hidden
                            id="mediaUpload"
                            accept="image/*,video/*"
                            onChange={handleMediaUpload}
                        />

                        <button
                            onClick={() =>
                                document.getElementById("mediaUpload")?.click()
                            }
                        >
                            <Paperclip />
                        </button>

                        <button onClick={recording ? stopRecording : startRecording}>
                            <Mic className={recording ? "text-red-500" : ""} />
                        </button>

                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="Type a message..."
                            className="flex-1 border rounded-full px-4 py-2 text-sm"
                        />

                        <button
                            onClick={sendMessage}
                            className="bg-indigo-600 text-white p-2 rounded-full"
                        >
                            <Send />
                        </button>
                    </div>
                </main>


            </div>
        </div>
    );
}
