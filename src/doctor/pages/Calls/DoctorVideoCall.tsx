import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { socket } from "../../../socket";

export default function DoctorVideoCall() {
  const { id: appointmentId } = useParams();
  const navigate = useNavigate();

  const pc = useRef<RTCPeerConnection | null>(null);
  const localVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);

  const [calling, setCalling] = useState(false);
  const [callActive, setCallActive] = useState(false);

  useEffect(() => {
    if (!appointmentId) return;

    socket.emit("join", appointmentId);

    pc.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pc.current.ontrack = (event) => {
      if (remoteVideo.current) {
        remoteVideo.current.srcObject = event.streams[0];
      }
    };

    pc.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          roomId: appointmentId,
          candidate: event.candidate,
        });
      }
    };

    socket.on("call-accepted", () => {
      setCalling(false);
      setCallActive(true);
    });

    socket.on("call-rejected", endCall);

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

  // ▶ START VIDEO CALL
  const startCall = async () => {
    setCalling(true);

    socket.emit("call-user", {
      roomId: appointmentId,
      appointmentId,
      caller: "Doctor",
    });

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (localVideo.current) {
      localVideo.current.srcObject = stream;
    }

    stream.getTracks().forEach((track) =>
      pc.current?.addTrack(track, stream)
    );

    const offer = await pc.current?.createOffer();
    await pc.current?.setLocalDescription(offer);

    socket.emit("offer", { roomId: appointmentId, offer });
  };

  // ❌ END CALL
  const endCall = () => {
    socket.emit("reject-call", { roomId: appointmentId });
    pc.current?.close();
    navigate("/doctor/appointments");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h2 className="text-xl mb-4">Doctor Video Call</h2>

      <div className="flex gap-4">
        <video ref={localVideo} autoPlay muted className="w-64 rounded" />
        <video ref={remoteVideo} autoPlay className="w-64 rounded" />
      </div>

      {!callActive && !calling && (
        <button onClick={startCall} className="mt-6 bg-green-600 px-6 py-3 rounded">
          ▶ Start Video Call
        </button>
      )}

      {calling && <p className="mt-4">📞 Calling patient...</p>}

      {callActive && (
        <button onClick={endCall} className="mt-6 bg-red-600 px-6 py-3 rounded">
          ❌ End Call
        </button>
      )}
    </div>
  );
}
