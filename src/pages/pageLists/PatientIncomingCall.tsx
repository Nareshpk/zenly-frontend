import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../socket";


export default function PatientIncomingCall() {
  const { id: appointmentId } = useParams();

  const pc = useRef<RTCPeerConnection | null>(null);
  const remoteAudio = useRef<HTMLAudioElement>(null);

  const [incoming, setIncoming] = useState(false);
  const [callActive, setCallActive] = useState(false);

  useEffect(() => {
    if (!appointmentId) return;

    // ✅ join appointment room
    socket.emit("join", appointmentId);

    pc.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pc.current.ontrack = (event) => {
      if (remoteAudio.current) {
        remoteAudio.current.srcObject = event.streams[0];
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

    // 🔔 RECEIVE CALL
    socket.on("incoming-call", () => {
      setIncoming(true);
    });

    socket.on("offer", async (offer) => {
      await pc.current?.setRemoteDescription(offer);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) =>
        pc.current?.addTrack(t, stream)
      );

      const answer = await pc.current?.createAnswer();
      await pc.current?.setLocalDescription(answer);

      socket.emit("answer", { roomId: appointmentId, answer });
      setCallActive(true);
    });

    socket.on("ice-candidate", async (candidate) => {
      await pc.current?.addIceCandidate(candidate);
    });

    socket.on("call-rejected", () => {
      endCall();
    });

    return () => {
      socket.off();
      pc.current?.close();
    };
  }, [appointmentId]);

  // ✅ ACCEPT CALL
  const acceptCall = () => {
    socket.emit("accept-call", { roomId: appointmentId });
    setIncoming(false);
  };

  // ❌ REJECT CALL
  const rejectCall = () => {
    socket.emit("reject-call", { roomId: appointmentId });
    setIncoming(false);
  };

  // ☎ END CALL
  const endCall = () => {
    pc.current?.close();
    setCallActive(false);
    setIncoming(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Incoming Call Screen */}
      {incoming && !callActive && (
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-xl font-semibold">📞 Incoming Call</h2>
          <p className="text-gray-500 mt-2">Doctor is calling you</p>

          <div className="flex gap-4 mt-6 justify-center">
            <button
              onClick={acceptCall}
              className="px-6 py-3 bg-green-600 text-white rounded-full"
            >
              Accept
            </button>

            <button
              onClick={rejectCall}
              className="px-6 py-3 bg-red-600 text-white rounded-full"
            >
              Reject
            </button>
          </div>
        </div>
      )}

      {/* Call Connected */}
      {callActive && (
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-xl font-semibold">🔊 Call Connected</h2>

          <button
            onClick={endCall}
            className="mt-6 px-6 py-3 bg-red-600 text-white rounded-full"
          >
            End Call
          </button>
        </div>
      )}

      <audio ref={remoteAudio} autoPlay />
    </div>
  );
}
