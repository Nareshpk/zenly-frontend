import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../../socket";


export default function CallListener() {
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("incoming-call", ({ appointmentId }) => {
      console.log("Incoming call:", appointmentId);

      // 🔴 Auto redirect patient
      navigate(`/patient/audio-call/${appointmentId}`);
    });

    return () => {
      socket.off("incoming-call");
    };
  }, [navigate]);

  return null; // no UI
}
