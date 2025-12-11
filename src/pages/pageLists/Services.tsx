import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ServicesPremium from "./ServicesPremium";

type Service = {
  id: number;
  title: string;
  description: string;
  detail?: string;
  image?: string;
  tests?: string[];
};

const SERVICES: Service[] = [
  {
    id: 1,
    title: "Hematology",
    image:
      "https://img.freepik.com/premium-photo/close-up-technician-hand-holding-blood-tube-test-sample-laboratory_704508-3739.jpg?semt=ais_hybrid&w=740&q=80",
    description:
      "Diagnosis and treatment of blood disorders such as anemia, clotting disorders, and blood cancers.",
    detail:
      "Hematology focuses on conditions of the blood, bone marrow and lymphatic system. Our hematologists evaluate blood counts, perform bone marrow testing when needed, and manage chronic and acute blood disorders.",
    tests: [
      "Complete Blood Count (CBC)",
      "Bone Marrow Test",
      "Clotting Profile",
      "Hemoglobin Electrophoresis"
    ]
  },
  {
    id: 2,
    title: "Neurology",
    image:
      "https://vishwarajhospital.com/wp-content/uploads/2023/07/17_Neurology.jpg",
    description:
      "Care for disorders of the brain, spinal cord and nerves like stroke, epilepsy and migraine.",
    detail:
      "Neurology provides diagnostics and treatment for conditions affecting the central and peripheral nervous systems. Services include neuroimaging, EMG/NCS testing, stroke care and long-term management of chronic neurological diseases.",
    tests: [
      "MRI Brain",
      "EEG (Electroencephalogram)",
      "Nerve Conduction Study",
      "CT Scan"
    ]
  },
  {
    id: 3,
    title: "Oncology",
    image:
      "https://bmhkannur.com/wp-content/uploads/2024/05/medical-oncology.jpg",
    description:
      "Comprehensive cancer care including chemotherapy, follow-up and supportive therapy.",
    detail:
      "Oncology covers cancer diagnosis, staging, treatment planning and delivery, plus survivorship and palliative care.",
    tests: [
      "Biopsy",
      "PET Scan",
      "Tumor Marker Tests",
      "Chemotherapy Evaluation"
    ]
  },
  {
    id: 4,
    title: "Paediatrics",
    image:
      "https://media.istockphoto.com/id/497132461/photo/pediatrician-and-child.jpg?s=612x612&w=0&k=20&c=WB9a2s3tYqliOFOODh2K065qHA94yorl0eLaIGTXTos=",
    description:
      "Healthcare for infants, children and adolescents — vaccinations, growth and illness management.",
    detail:
      "Pediatrics ensures healthy growth and development for children including routine checkups, immunizations, and developmental screenings.",

    tests: [
      "Child Growth Assessment",
      "Vaccination Schedule",
      "Development Screening",
      "Blood Tests"
    ]
  },
  {
    id: 5,
    title: "Pulmonology",
    image:
      "https://www.inspirahealthnetwork.org/sites/default/files/2024-07/iStock-1556982796_0.jpg",
    description: "Diagnosis and treatment of lung and breathing problems such as asthma and COPD.",
    detail:
      "Pulmonology focuses on respiratory health — asthma management, COPD care, pneumonia treatment, and sleep-related breathing disorders.",
    tests: [
      "Pulmonary Function Test",
      "Chest X-Ray",
      "CT Chest",
      "Sleep Study"
    ]
  },
  {
    id: 6,
    title: "Infectious Diseases",
    image:
      "https://media.istockphoto.com/id/151617200/photo/science-and-lab-research.jpg?s=612x612&w=0&k=20&c=A0eHs5FyGYcI9Z0ghWY8-q2_Zv6mBrq1rzej45ginNc=",
    description: "Expert management of bacterial, viral, fungal and parasitic infections.",
    detail:
      "Infectious disease specialists evaluate complex or recurrent infections and guide antibiotic/antiviral treatment plans.",
    tests: [
      "Blood Culture",
      "Viral Panel",
      "COVID / Dengue / Malaria Tests",
      "Antibiotic Sensitivity"
    ]
  },
  {
    id: 7,
    title: "Cardiology",
    image:
      "https://eozxehncj7g.exactdn.com/wp-content/uploads/2025/04/Cardiology-Banner.jpg?lossy=1&ssl=1",
    description:
      "Heart and vascular care including ECG, echocardiography and heart disease management.",
    detail:
      "Cardiology provides diagnosis and treatment for heart conditions such as hypertension, coronary artery disease, arrhythmias and heart failure.",
    tests: [
      "ECG",
      "Echocardiogram",
      "Treadmill Test",
      "Holter Monitoring"
    ]
  },
  {
    id: 8,
    title: "Fever & General Medicine",
    image:
      "https://dm1zcrsul8wju.cloudfront.net/sites/rcn_nspace/files/styles/tile_image/public/Article-images/209121/103441.jpeg?itok=68ooxGt0",
    description:
      "Evaluation and treatment of fever — identifying the root cause and prescribing the right treatment.",
    detail:
      "Fever services include rapid evaluation and tailored treatments depending on whether the cause is viral, bacterial or environmental.",
    tests: [
      "CBC Test",
      "Urine Test",
      "Malaria/Dengue Panel",
      "Chest X-Ray (if required)"
    ]
  },
];

export default function Services() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  // If no id → Show all services list
  if (!id) {
    return (
      <>
        <ServicesPremium services={SERVICES} />
      </>
    );
  }

  // If id exists → find the service
  const service = SERVICES.find((s) => s.id === Number(id));

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Service not found</h2>
          <p className="text-gray-600 mb-4">The requested service doesn't exist.</p>
          <button
            onClick={() => navigate("/services")}
            className="px-4 py-2 bg-primary text-white rounded-lg shadow"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // SINGLE SERVICE DETAILS VIEW
  // =========================
  return (
    <div className="py-12 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-gray-700 mb-6 hover:underline"
      >
        ← Back
      </button>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

          {/* Image */}
          <div className="relative h-64 md:h-auto">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover md:rounded-l-2xl"
            />

            <span className="absolute top-4 left-4 bg-white/90 text-sm text-primary font-semibold px-3 py-1 rounded-full shadow">
              {service.title}
            </span>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10 flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-3">
              {service.title}
            </h1>

            <p className="text-gray-700 text-lg mb-4">{service.description}</p>

            <p className="text-gray-600 leading-relaxed">{service.detail}</p>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                onClick={() => navigate("/app/doctor-details/" + id)}
                className="inline-block px-5 py-3 bg-primary text-white rounded-lg shadow hover:scale-[1.02] transition-transform"
              >
                Book Appointment
              </button>

              <a
                href="/app/contact"
                className="text-sm text-primary underline hover:opacity-90"
              >
                Contact department
              </a>
            </div>

            {service.tests && (
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">
                  Common Tests & Procedures
                </h4>

                <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  {service.tests.map((test, index) => (
                    <li key={index} className="px-3 py-2 bg-gray-50 rounded">
                      {test}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div id="contact" className="mt-auto pt-6">
              <p className="text-xs text-gray-500">
                For urgent care call:{" "}
                <span className="font-medium text-gray-800">+91 82480 40188</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

