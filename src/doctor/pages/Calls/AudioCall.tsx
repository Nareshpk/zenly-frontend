import { useEffect, useRef, useState } from "react";
import { socket } from "../../../socket";


type Props = {
  appointmentId: string;
  role: "doctor" | "patient";
};

export default function AudioCall({ appointmentId, role }: Props) {
  const pc = useRef<RTCPeerConnection | null>(null);
  const remoteAudio = useRef<HTMLAudioElement>(null);

  const [incoming, setIncoming] = useState(false);
  const [callActive, setCallActive] = useState(false);

  useEffect(() => {
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

    // Incoming call (PATIENT)
    socket.on("incoming-call", () => {
      if (role === "patient") setIncoming(true);
    });

    socket.on("call-accepted", () => {
      setCallActive(true);
    });

    socket.on("call-rejected", () => {
      alert("Call rejected");
      endCall();
    });

    socket.on("offer", async (offer) => {
      await pc.current?.setRemoteDescription(offer);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => pc.current?.addTrack(t, stream));

      const answer = await pc.current?.createAnswer();
      await pc.current?.setLocalDescription(answer);

      socket.emit("answer", { roomId: appointmentId, answer });
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
  }, [appointmentId, role]);

  // DOCTOR starts call
  const startCall = async () => {
    // 🔔 Notify patient (for redirect + ringing)
    socket.emit("call-user", {
      roomId: appointmentId,
      appointmentId: appointmentId, // ✅ IMPORTANT
      caller: "Doctor",
    });

    // 🎤 Start WebRTC audio
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) =>
      pc.current?.addTrack(track, stream)
    );

    const offer = await pc.current?.createOffer();
    await pc.current?.setLocalDescription(offer);

    socket.emit("offer", {
      roomId: appointmentId,
      offer,
    });

    setCallActive(true);
  };

  // PATIENT accepts call
  const acceptCall = () => {
    socket.emit("accept-call", { roomId: appointmentId });
    setIncoming(false);
    setCallActive(true);
  };

  const rejectCall = () => {
    socket.emit("reject-call", { roomId: appointmentId });
    setIncoming(false);
  };

  const endCall = () => {
    pc.current?.close();
    setCallActive(false);
  };

  return (
    <div className="p-6">
      {/* Doctor UI */}
      {role === "doctor" && !callActive && (
        <button onClick={startCall} className="btn">
          Start Audio Call
        </button>
      )}

      {/* Patient Incoming UI */}
      {incoming && (
        <div>
          <p>Incoming Call...</p>
          <button onClick={acceptCall}>Accept</button>
          <button onClick={rejectCall}>Reject</button>
        </div>
      )}

      {callActive && <p>🔊 Call Connected</p>}

      <audio ref={remoteAudio} autoPlay />
    </div>
  );
}
