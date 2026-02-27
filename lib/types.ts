export type User = {
  id: string;
  email: string;
  name: string;
  age?: number;
  gender?: 'M' | 'F' | 'Other';
  medicalConditions?: string[];
  medications?: string[];
  createdAt: Date;
};

export type HealthMetric = {
  id: string;
  userId: string;
  type: 'heart_rate' | 'blood_pressure' | 'blood_glucose' | 'sleep' | 'cortisol' | 'temperature' | 'oxygen_saturation';
  value: number;
  unit: string;
  timestamp: Date;
  isAlert?: boolean;
};

export type RiskScore = {
  id: string;
  userId: string;
  disease: string;
  score: number;
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  yearsForecast: number;
  factors: string[];
  timestamp: Date;
};

export type Recommendation = {
  id: string;
  userId: string;
  category: 'nutrition' | 'exercise' | 'sleep' | 'stress' | 'medication';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  actionItems: string[];
  estimatedImpact: string;
  timestamp: Date;
};

export type HealthRecord = {
  id: string;
  userId: string;
  type: 'lab_result' | 'doctor_visit' | 'prescription' | 'medical_imaging';
  title: string;
  description: string;
  date: Date;
  provider?: string;
  results?: Record<string, any>;
};
