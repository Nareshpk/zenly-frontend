export type Medication = {
  name: string;
  dosage: string;
  frequency: string;
  route: string;
  duration: number;
  instructions: string;
};

export type MedicationTemplate = {
  id: string;
  label: string;
  diagnosis: string;
  medications: Medication[];
};
