import type { HealthMetric, RiskScore, Recommendation, HealthRecord } from './types';

export const mockMetrics: HealthMetric[] = [
  {
    id: '1',
    userId: 'user1',
    type: 'heart_rate',
    value: 72,
    unit: 'bpm',
    timestamp: new Date(Date.now() - 5 * 60000),
    isAlert: false,
  },
  {
    id: '2',
    userId: 'user1',
    type: 'heart_rate',
    value: 75,
    unit: 'bpm',
    timestamp: new Date(Date.now() - 10 * 60000),
    isAlert: false,
  },
  {
    id: '3',
    userId: 'user1',
    type: 'heart_rate',
    value: 68,
    unit: 'bpm',
    timestamp: new Date(Date.now() - 15 * 60000),
    isAlert: false,
  },
  {
    id: '4',
    userId: 'user1',
    type: 'blood_pressure',
    value: 120,
    unit: 'mmHg',
    timestamp: new Date(Date.now() - 5 * 60000),
    isAlert: false,
  },
  {
    id: '5',
    userId: 'user1',
    type: 'blood_glucose',
    value: 105,
    unit: 'mg/dL',
    timestamp: new Date(Date.now() - 2 * 3600000),
    isAlert: false,
  },
  {
    id: '6',
    userId: 'user1',
    type: 'sleep',
    value: 7.5,
    unit: 'hours',
    timestamp: new Date(Date.now() - 1 * 86400000),
    isAlert: false,
  },
  {
    id: '7',
    userId: 'user1',
    type: 'cortisol',
    value: 15,
    unit: 'μg/dL',
    timestamp: new Date(Date.now() - 3600000),
    isAlert: false,
  },
  {
    id: '8',
    userId: 'user1',
    type: 'oxygen_saturation',
    value: 98,
    unit: '%',
    timestamp: new Date(Date.now() - 5 * 60000),
    isAlert: false,
  },
];

export const mockRiskScores: RiskScore[] = [
  {
    id: '1',
    userId: 'user1',
    disease: 'Type 2 Diabetes',
    score: 35,
    riskLevel: 'moderate',
    yearsForecast: 10,
    factors: ['Family history', 'Elevated glucose', 'Sedentary lifestyle'],
    timestamp: new Date(),
  },
  {
    id: '2',
    userId: 'user1',
    disease: 'Cardiovascular Disease',
    score: 28,
    riskLevel: 'low',
    yearsForecast: 12,
    factors: ['Normal blood pressure', 'Active lifestyle'],
    timestamp: new Date(),
  },
  {
    id: '3',
    userId: 'user1',
    disease: 'Sleep Apnea',
    score: 42,
    riskLevel: 'moderate',
    yearsForecast: 5,
    factors: ['Increased cortisol', 'Sleep irregularities'],
    timestamp: new Date(),
  },
  {
    id: '4',
    userId: 'user1',
    disease: 'Hypertension',
    score: 22,
    riskLevel: 'low',
    yearsForecast: 15,
    factors: ['Regular exercise', 'Healthy diet'],
    timestamp: new Date(),
  },
];

export const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    userId: 'user1',
    category: 'nutrition',
    title: 'Increase Fiber Intake',
    description: 'Based on your blood glucose levels and family history of diabetes, increasing fiber intake can help regulate blood sugar.',
    priority: 'high',
    actionItems: [
      'Add whole grains to 2 meals daily',
      'Include leafy greens with lunch and dinner',
      'Snack on nuts and seeds',
    ],
    estimatedImpact: 'Reduce diabetes risk by 15-20%',
    timestamp: new Date(),
  },
  {
    id: '2',
    userId: 'user1',
    category: 'exercise',
    title: 'Daily 30-Minute Cardio',
    description: 'Regular cardiovascular exercise can improve heart health and reduce stress levels.',
    priority: 'high',
    actionItems: [
      'Walk 30 minutes daily',
      'Include 2-3 sessions of moderate intensity cardio weekly',
      'Track your heart rate during exercise',
    ],
    estimatedImpact: 'Reduce CVD risk by 20-25%',
    timestamp: new Date(),
  },
  {
    id: '3',
    userId: 'user1',
    category: 'sleep',
    title: 'Consistent Sleep Schedule',
    description: 'Maintaining a consistent sleep schedule helps regulate cortisol and improves overall health.',
    priority: 'medium',
    actionItems: [
      'Sleep 7-9 hours nightly',
      'Go to bed at the same time',
      'Avoid screens 1 hour before bed',
    ],
    estimatedImpact: 'Improve sleep quality by 30%',
    timestamp: new Date(),
  },
  {
    id: '4',
    userId: 'user1',
    category: 'stress',
    title: 'Stress Management Techniques',
    description: 'Lower cortisol levels through meditation and mindfulness practices.',
    priority: 'medium',
    actionItems: [
      'Practice 10-minute daily meditation',
      'Try deep breathing exercises',
      'Consider yoga or tai chi',
    ],
    estimatedImpact: 'Reduce cortisol levels by 20%',
    timestamp: new Date(),
  },
];

export const mockHealthRecords: HealthRecord[] = [
  {
    id: '1',
    userId: 'user1',
    type: 'lab_result',
    title: 'Complete Blood Count (CBC)',
    description: 'Annual preventive care lab work',
    date: new Date(Date.now() - 30 * 86400000),
    provider: 'Quest Diagnostics',
    results: {
      'WBC': '7.2 K/uL',
      'RBC': '4.8 M/uL',
      'Hemoglobin': '14.2 g/dL',
    },
  },
  {
    id: '2',
    userId: 'user1',
    type: 'doctor_visit',
    title: 'Annual Physical Exam',
    description: 'Routine checkup with primary care physician',
    date: new Date(Date.now() - 60 * 86400000),
    provider: 'Dr. Sarah Johnson',
    results: {
      'Height': '5\'10"',
      'Weight': '180 lbs',
      'BMI': '25.8',
      'BP': '120/80',
    },
  },
  {
    id: '3',
    userId: 'user1',
    type: 'prescription',
    title: 'Vitamin D Supplement',
    description: 'Daily supplement recommended',
    date: new Date(Date.now() - 45 * 86400000),
    provider: 'Dr. Sarah Johnson',
    results: {
      'Dosage': '2000 IU',
      'Frequency': 'Daily',
      'Quantity': '90 days',
    },
  },
];

// Generate historical data for charts
export function generateHeartRateHistory() {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      time: `${i}:00`,
      value: 60 + Math.random() * 40,
    });
  }
  return data;
}

export function generateGlucoseHistory() {
  const data = [];
  for (let i = 0; i < 7; i++) {
    data.push({
      day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i],
      fasting: 90 + Math.random() * 30,
      postMeal: 120 + Math.random() * 60,
    });
  }
  return data;
}

export function generateSleepHistory() {
  const data = [];
  for (let i = 0; i < 7; i++) {
    data.push({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      sleep: 6 + Math.random() * 3,
      quality: 60 + Math.random() * 40,
    });
  }
  return data;
}

export function generateCortisolHistory() {
  const data = [];
  for (let i = 0; i < 7; i++) {
    data.push({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      morning: 12 + Math.random() * 8,
      afternoon: 8 + Math.random() * 5,
      evening: 3 + Math.random() * 2,
    });
  }
  return data;
}
