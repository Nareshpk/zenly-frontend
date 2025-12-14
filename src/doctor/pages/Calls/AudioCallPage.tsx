import { useParams } from "react-router-dom";
import AudioCall from "./AudioCall";

export default function AudioCallPage() {
  const { id } = useParams();
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  console.log("auth==================>>>", auth.user.role);

  if (!id) return <div>Invalid Call</div>;
  return <AudioCall appointmentId={id} role={auth.user.role} />;
}
