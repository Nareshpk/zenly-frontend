import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { socket } from "../../../socket";

export default function DoctorAudioCall() {
  const { id: appointmentId } = useParams();
  const navigate = useNavigate();

  const pc = useRef<RTCPeerConnection | null>(null);
  const remoteAudio = useRef<HTMLAudioElement>(null);

  const [callActive, setCallActive] = useState(false);
  const [calling, setCalling] = useState(false);

  // ⏱ TIMER STATE
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const [status, setStatus] = useState<
    "Idle" | "Calling" | "In Progress" | "Ended"
  >("Idle");

  /* ================= TIMER LOGIC ================= */
  useEffect(() => {
    if (status === "In Progress") {
      if (intervalRef.current !== null) return;

      intervalRef.current = window.setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [status]);

  const formatTime = () => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  };

  /* ================= SOCKET + WEBRTC ================= */
  useEffect(() => {
    if (!appointmentId) return;

    socket.emit("join", appointmentId);

    pc.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pc.current.ontrack = (e) => {
      if (remoteAudio.current) {
        remoteAudio.current.srcObject = e.streams[0];
      }
    };

    pc.current.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("ice-candidate", {
          roomId: appointmentId,
          candidate: e.candidate,
        });
      }
    };

    socket.on("call-accepted", () => {
      setStatus("In Progress"); // ⏱ START TIMER
      setCallActive(true);
      setCalling(false);
    });

    socket.on("call-rejected", () => {
      alert("Patient rejected the call");
      endCall();
    });

    socket.on("answer", async (answer) => {
      await pc.current?.setRemoteDescription(answer);
    });

    socket.on("ice-candidate", async (candidate) => {
      await pc.current?.addIceCandidate(candidate);
    });

    return () => {
      socket.off();
      pc.current?.close();
    };
  }, [appointmentId]);

  /* ================= START CALL ================= */
  const startCall = async () => {
    if (!appointmentId) return;

    setStatus("Calling");
    setCalling(true);

    socket.emit("call-user", {
      roomId: appointmentId,
      appointmentId,
      caller: "Doctor",
    });

    socket.emit("call-status", {
      roomId: appointmentId,
      status: "Calling",
    });

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) =>
      pc.current?.addTrack(track, stream)
    );

    const offer = await pc.current?.createOffer();
    await pc.current?.setLocalDescription(offer);

    socket.emit("offer", { roomId: appointmentId, offer });
  };

  /* ================= END CALL ================= */
  const endCall = () => {
    if (!appointmentId) return;

    socket.emit("reject-call", { roomId: appointmentId });

    pc.current?.close();
    pc.current = null;

    setStatus("Ended");
    setCallActive(false);
    setCalling(false);
    setSeconds(0);

    navigate("/doctor/appointments");
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center w-96">
        <h2 className="text-xl font-semibold">Doctor Audio Call</h2>

        <p className="mt-2">
          Status: <b>{status}</b>
        </p>

        {status === "In Progress" && (
          <p className="mt-2 text-lg">⏱ {formatTime()}</p>
        )}

        {!callActive && !calling && (
          <button
            onClick={startCall}
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded-full"
          >
            ▶ Start Call
          </button>
        )}

        {calling && (
          <p className="mt-6 text-yellow-600">📞 Calling patient...</p>
        )}

        {callActive && (
          <button
            onClick={endCall}
            className="mt-6 px-6 py-3 bg-red-600 text-white rounded-full"
          >
            ❌ End Call
          </button>
        )}

        <audio ref={remoteAudio} autoPlay />
      </div>
    </div>
  );
}
