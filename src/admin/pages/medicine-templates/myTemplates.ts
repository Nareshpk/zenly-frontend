export const myTemplates: any[] = [
  {
    id: "tpl-allergy-seasonal",
    name: "Allergy - Seasonal",
    category: "Allergy",
    medicationsCount: 1,
    createdOn: "2023-10-08",
    lastUsed: "2024-04-05",
    createdBy: "Dr. Sarah Johnson",
    usage: 19,
    medications: [],
  },
  {
    id: "tpl-hypertension-standard",
    name: "Hypertension Standard",
    category: "Cardiovascular",
    medicationsCount: 2,
    createdOn: "2023-05-10",
    lastUsed: "2024-03-15",
    createdBy: "Dr. Sarah Johnson",
    usage: 42,
    medications: [
      {
        name: "Lisinopril 10mg",
        route: "Oral",
        frequency: "Once daily",
        duration: "30 days",
        instructions: "Take in the morning with or without food",
      },
      {
        name: "Hydrochlorothiazide 12.5mg",
        route: "Oral",
        frequency: "Once daily",
        duration: "30 days",
        instructions: "Take in the morning with food",
      },
    ],
  },
];
