export interface User {
  id: string;
  name: string;
  email: string;
  type: 'patient' | 'doctor';
  phone?: string;
  address?: string;
  languages?: string[];
}

export interface Medicine {
  id: string;
  name: string;
  namepunjabi: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  descriptionPunjabi: string;
  prescriptionRequired: boolean;
  image?: string;
  storeStock?: Record<string, number>;
}

export interface Order {
  id: string;
  patientId: string;
  medicines: OrderMedicine[];
  status: 'pending' | 'confirmed' | 'packed' | 'out_for_delivery' | 'delivered';
  totalAmount: number;
  deliveryAddress: string;
  paymentMode: 'upi' | 'card' | 'cod';
  paymentStatus: 'pending' | 'paid' | 'failed';
  prescriptionUrl?: string;
  driverId?: string;
  estimatedDelivery?: string;
  createdAt: string;
}

export interface OrderMedicine {
  medicineId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface HealthRecord {
  id: string;
  patientId: string;
  type: 'consultation' | 'prescription' | 'lab_report' | 'diagnosis';
  title: string;
  titlePunjabi: string;
  content: string;
  contentPunjabi: string;
  doctorId?: string;
  doctorName?: string;
  date: string;
  attachments?: string[];
}

export interface Doctor {
  id: string;
  name: string;
  namePunjabi: string;
  specialization: string;
  specializationPunjabi: string;
  experience: number;
  rating: number;
  available: boolean;
  languages: string[];
  consultationFee: number;
  image?: string;
}

export interface Consultation {
  id: string;
  patientId: string;
  doctorId: string;
  scheduledAt: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  symptoms: string;
  notes?: string;
  prescription?: string;
  meetingLink?: string;
}

export interface SymptomQuestion {
  id: string;
  question: string;
  questionPunjabi: string;
  type: 'multiple_choice' | 'yes_no' | 'scale';
  options?: string[];
  optionsPunjabi?: string[];
}

export interface SymptomAssessment {
  id: string;
  patientId: string;
  answers: Record<string, any>;
  recommendation: string;
  recommendationPunjabi: string;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  suggestedSpecialist?: string;
  createdAt: string;
}

export type Language = 'en' | 'pa';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}