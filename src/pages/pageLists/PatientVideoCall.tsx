import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../socket";


export default function PatientVideoCall() {
  const { id: appointmentId } = useParams();

  const pc = useRef<RTCPeerConnection | null>(null);
  const localVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);

  const [incoming, setIncoming] = useState(false);
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

    socket.on("incoming-call", () => setIncoming(true));

    socket.on("offer", async (offer) => {
      await pc.current?.setRemoteDescription(offer);

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

      const answer = await pc.current?.createAnswer();
      await pc.current?.setLocalDescription(answer);

      socket.emit("answer", { roomId: appointmentId, answer });
      setCallActive(true);
    });

    socket.on("call-rejected", endCall);

    return () => {
      socket.off();
      pc.current?.close();
    };
  }, [appointmentId]);

  const acceptCall = () => {
    socket.emit("accept-call", { roomId: appointmentId });
    setIncoming(false);
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
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h2 className="text-xl mb-4">Patient Video Call</h2>

      {incoming && !callActive && (
        <div>
          <p>📞 Incoming video call</p>
          <button onClick={acceptCall} className="bg-green-600 px-4 py-2 mr-2">
            Accept
          </button>
          <button onClick={rejectCall} className="bg-red-600 px-4 py-2">
            Reject
          </button>
        </div>
      )}

      <div className="flex gap-4 mt-4">
        <video ref={localVideo} autoPlay muted className="w-64 rounded" />
        <video ref={remoteVideo} autoPlay className="w-64 rounded" />
      </div>

      {callActive && (
        <button onClick={endCall} className="mt-6 bg-red-600 px-6 py-3 rounded">
          ❌ End Call
        </button>
      )}
    </div>
  );
}
