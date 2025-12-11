/* eslint-disable no-multi-str */
import { CheckCheckIcon } from "lucide-react";

const banner = require("./banner.jpg");
const appointment = require("./appointment.png");
const book_appointment = require("./book_appointment.jpg");
const calculator = require("./calculator.png");
const car = require("./car.png");
const Cardiology = require("./Cardiology.png");
const clock = require("./clock.png");
const doctor_1 = require("./doctor_1.jpg");
const doctor_2 = require("./doctor_2.jpg");
const doctor_3 = require("./doctor_3.jpg");
const doctor_4 = require("./doctor_4.jpg");
const doctor = require("./doctor.png");
const Fever = require("./Fever.png");
const gallery_1 = require("./gallery_1.jpg");
const gallery_2 = require("./gallery_2.jpg");
const gallery_3 = require("./gallery_3.jpg");
const gallery_4 = require("./gallery_4.jpg");

const Hematology = require("./Hematology.png");
const hero_img = require("./hero_img.jpg");
const home = require("./home.png");
const Infection = require("./Infection.png");
const mission_img1 = require("./mission_img1.jpg");
const mission_img2 = require("./mission_img2.jpg");
const mobile = require("./mobile.png");
const Neurology = require("./Neurology.png");
const Oncology = require("./Oncology.png");
const Paediatrician = require("./Paediatrician.png");
const profile = require("./profile.png");
const Pulmonology = require("./Pulmonology.png");
const t1 = require("./t1.jpg");
const t2 = require("./t2.jpg");
const t3 = require("./t3.jpg");
const telephone = require("./telephone.png");
const why_choose_us = require("./why_choose_us.jpg");

const banner_img = require("./banner_img.jpg");
const logo = require("./logo.png");
export const assets: any = {
  mission_img1,
  mission_img2,
  profile,
  logo,
  banner_img,
  hero_img,
  why_choose_us,
  banner,
  appointment,
  book_appointment,
};

export type Specialty = {
  id: string;
  name: string;
  image: any;
  description: string;
  // add other specialty fields if required
};
export const specialtiesData: any = [
  {
    id: 1,
    name: "Hematology",
    image: Hematology,
    description: "Diagnosis and treatment of blood-related disorders.",
  },
  {
    id: 2,
    name: "Neurology",
    image: Neurology,
    description: "Care for brain, spine, and nervous system issues.",
  },
  {
    id: 3,
    name: "Oncology",
    image: Oncology,
    description: "Cancer prevention, diagnosis, and treatment services.",
  },
  {
    id: 4,
    name: "Paediatrician",
    image: Paediatrician,
    description: "Specialized healthcare for infants, children, and teens.",
  },
  {
    id: 5,
    name: "Pulmonology",
    image: Pulmonology,
    description: "Treatment for lung and respiratory system conditions.",
  },
  {
    id: 6,
    name: "Infection",
    image: Infection,
    description: "Expert care for bacterial, viral, and fungal infections.",
  },
  {
    id: 7,
    name: "Cardiology",
    image: Cardiology,
    description: "Heart checkups, treatments, and cardiovascular care.",
  },
  {
    id: 8,
    name: "Fever",
    image: Fever,
    description: "Quick consultation for fever and related symptoms.",
  },
];

export const featuresData = [
  {
    image: home,
    heading: "Home MD",
    description:
      "Get medical care from the comfort of your home. Our qualified doctors visit you when you need them most.",
  },
  {
    image: calculator,
    heading: "Book Appointment",
    description:
      "Easily schedule appointments with just a few clicks. Choose your doctor, date, and time instantly.",
  },
  {
    image: mobile,
    heading: "Tele-Health",
    description:
      "Connect with doctors virtually through secure video calls. Get expert advice without leaving your home.",
  },
  {
    image: telephone,
    heading: "Get Consultation",
    description:
      "Talk to a doctor over the phone for quick medical guidance. Perfect for follow-ups and urgent concerns.",
  },
];
export const howItWorks = [
  {
    icon: CheckCheckIcon,
    heading: "Choose Medical Specialist",
    description:
      "Browse and select from our wide range of verified doctors. Find the right specialist for your health concern.",
  },
  {
    icon: CheckCheckIcon,
    heading: "Choose Consultation Service",
    description:
      "Pick how you want to consult — in-person, tele-health, or phone. We make healthcare convenient for you.",
  },
  {
    icon: CheckCheckIcon,
    heading: "Make an Appointment",
    description:
      "Schedule your appointment in just a few clicks. Get instant confirmation for your preferred date and time.",
  },
  {
    icon: CheckCheckIcon,
    heading: "Get Diagnosed",
    description:
      "Meet with the doctor and receive a proper diagnosis. Follow-up instructions and treatment plans included.",
  },
];
export const benefitsData = [
  {
    image: car,
    heading: "Fast And Reliable",
    description:
      "Access high-quality medical care without delays. Our streamlined system ensures tests, consultations, and procedures are handled swiftly and smoothly.",
    highlights: [
      "Shorter waiting times at every step",
      "Instant verification & scheduling",
      "Optimized workflow for faster results",
    ],
    badge: "Fast Service",
    link: "/services/fast-reliable",
  },

  {
    image: clock,
    heading: "Healthcare Anywhere, Anytime",
    description:
      "Whether you're at home, at work, or traveling, our advanced telehealth system provides round-the-clock support, so you never feel alone in your healthcare journey.",
    highlights: [
      "24/7 doctor availability",
      "Virtual care from any device",
      "Emergency response within minutes",
    ],
    badge: "24/7 Support",
    link: "/services/anytime-care",
  },

  {
    image: doctor,
    heading: "Experienced Professionals",
    description:
      "Your health is in the hands of certified, trusted, and compassionate medical experts committed to delivering top-grade treatment and personalized care.",
    highlights: [
      "Board-certified specialists",
      "Multi-disciplinary expert team",
      "Dedicated to patient-first quality",
    ],
    badge: "Top Doctors",
    link: "/services/experts",
  },

  {
    image: calculator,
    heading: "Easy Appointment",
    description:
      "Booking an appointment takes just a few seconds. Choose your specialist, select your preferred time, and receive instant confirmation — no long queues, no frustration.",
    highlights: [
      "Instant online booking",
      "Smart reminders & notifications",
      "Simple, frustration-free scheduling",
    ],
    badge: "Hassle-Free",
    link: "/services/appointments",
  },
];

export const doctorsData = [
  {
    _id: 1,
    image: doctor_1,
    name: "Dr. Richmond Herrick",
    specialty: "Neurosurgeon",
    rating: 5,
    education: "MBBS, MS (Neurosurgery)",
    experience: "12 years",
    fees: 1500, // in PKR or USD
    location: "City Hospital, Karachi",
    phone: "+92-300-1234567",
    email: "richmond.herrick@example.com",
    buttonText: "Book Appointment",
  },
  {
    _id: 2,
    image: doctor_2,
    name: "Dr. Olivia Bennett",
    specialty: "Cardiologist",
    rating: 4.9,
    education: "MBBS, MD (Cardiology)",
    experience: "10 years",
    fees: 1200,
    location: "Heart Care Clinic, Lahore",
    phone: "+92-322-9876543",
    email: "olivia.bennett@example.com",
    buttonText: "Book Appointment",
  },
  {
    _id: 3,
    image: doctor_3,
    name: "Dr. Sophia Martinez",
    specialty: "Pediatrician",
    rating: 4.8,
    education: "MBBS, DCH (Pediatrics)",
    experience: "8 years",
    fees: 1000,
    location: "Children’s Hospital, Islamabad",
    phone: "+92-345-5678910",
    email: "sophia.martinez@example.com",
    buttonText: "Book Appointment",
  },
  {
    _id: 4,
    image: doctor_4,
    name: "Dr. Amelia Clarke",
    specialty: "Dermatologist",
    rating: 4.7,
    education: "MBBS, MD (Dermatology)",
    experience: "7 years",
    fees: 900,
    location: "Skin Care Clinic, Karachi",
    phone: "+92-312-2233445",
    email: "amelia.clarke@example.com",
    buttonText: "Book Appointment",
  },
  {
    _id: 5,
    image: doctor_3,
    name: "Dr. Sophia Martinez",
    specialty: "Pediatrician",
    rating: 4.8,
    education: "MBBS, DCH (Pediatrics)",
    experience: "8 years",
    fees: 1000,
    location: "Children’s Hospital, Islamabad",
    phone: "+92-345-5678910",
    email: "sophia.martinez@example.com",
    buttonText: "Book Appointment",
  },
  {
    _id: 6,
    image: doctor_4,
    name: "Dr. Amelia Clarke",
    specialty: "Dermatologist",
    rating: 4.7,
    education: "MBBS, MD (Dermatology)",
    experience: "7 years",
    fees: 900,
    location: "Skin Care Clinic, Karachi",
    phone: "+92-312-2233445",
    email: "amelia.clarke@example.com",
    buttonText: "Book Appointment",
  },
];

export const testimonialsData = [
  {
    image: t1,
    name: "Johnathan Miller",
    designation: "Software Engineer",
    description:
      "I had a wonderful experience booking my appointment through this platform. \
The process was smooth and hassle-free. The doctor was professional and caring. \
I was able to get a proper diagnosis quickly. Highly recommended for anyone seeking reliable healthcare services.",
  },
  {
    image: t2,
    name: "Emily Johnson",
    designation: "Marketing Specialist",
    description:
      "Booking a consultation was super easy and convenient. \
I loved how quickly I could find a doctor in my area. \
The tele-health option saved me a lot of time. \
Great service, I will definitely use it again in the future.",
  },
  {
    image: t3,
    name: "Michael Brown",
    designation: "Business Analyst",
    description:
      "The platform is very user-friendly and well-designed. \
I was able to compare doctors and choose the best one for my needs. \
The appointment reminder system is a great touch. \
I felt supported throughout the whole process.",
  },
];
export const galleryData = [
  {
    image: gallery_1,
    heading: "Surgeons in ICU",
    description:
      "Our experienced surgeons performing critical procedures with precision.",
  },
  {
    image: gallery_2,
    heading: "Modern Operation Theatre",
    description:
      "Fully equipped OT with advanced surgical technology and safety standards.",
  },
  {
    image: gallery_3,
    heading: "Emergency Ward",
    description:
      "Round-the-clock emergency care available for all patients in need.",
  },
  {
    image: gallery_4,
    heading: "Patient Recovery Room",
    description:
      "Comfortable and clean recovery space for post-surgery patient care.",
  },
];
