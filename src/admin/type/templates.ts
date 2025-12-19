import { MedicationTemplate } from "./MedicationTypes";


export const MEDICATION_TEMPLATES: MedicationTemplate[] = [
  {
    id: "hypertension",
    label: "Hypertension Standard",
    diagnosis: "Hypertension",
    medications: [
      {
        name: "Amlodipine",
        dosage: "5 mg",
        frequency: "Once daily",
        route: "Oral",
        duration: 30,
        instructions: "Take in the morning",
      },
    ],
  },
  {
    id: "diabetes",
    label: "Diabetes Type 2",
    diagnosis: "Diabetes Type 2",
    medications: [
      {
        name: "Metformin",
        dosage: "500 mg",
        frequency: "Twice daily",
        route: "Oral",
        duration: 30,
        instructions: "Take with meals",
      },
    ],
  },
  {
    id: "antibiotic",
    label: "Antibiotic - Respiratory",
    diagnosis: "Respiratory Infection",
    medications: [
      {
        name: "Amoxicillin",
        dosage: "500 mg",
        frequency: "Three times daily",
        route: "Oral",
        duration: 7,
        instructions: "Complete full course",
      },
    ],
  },
];
