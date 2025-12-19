export type AppointmentStatus =
  | "Confirmed"
  | "In Progress"
  | "Completed"
  | "Cancelled";

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  type: string;
  status: AppointmentStatus;
}
