'use client';

import { DashboardHeader } from '@/components/dashboard/header';
import { Card } from '@/components/ui/card';
import { RiskCard } from '@/components/dashboard/risk-card';
import { mockRiskScores } from '@/lib/mock-data';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import { ShieldAlert, TrendingUp, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const riskTrendData = [
  { year: '2024', diabetes: 25, cvd: 15, sleep: 30 },
  { year: '2026', diabetes: 30, cvd: 18, sleep: 35 },
  { year: '2028', diabetes: 35, cvd: 22, sleep: 40 },
  { year: '2030', diabetes: 40, cvd: 28, sleep: 45 },
  { year: '2032', diabetes: 48, cvd: 35, sleep: 52 },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

export default function PredictionsPage() {
  const chartData = mockRiskScores.map((risk) => ({
    disease: risk.disease,
    score: risk.score,
    level: risk.riskLevel,
  }));

  const getRiskColor = (score: number) => {
    if (score >= 50) return 'var(--destructive)';
    if (score >= 35) return 'var(--accent)';
    if (score >= 20) return 'var(--chart-2)';
    return 'var(--chart-3)';
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-background"
    >
      <DashboardHeader
        title="Future Health Forecast"
        subtitle="A look at where your health trends are headed."
      />

      <div className="p-6 space-y-6">
        {/* Prediction Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-8 border border-border bg-card/40 backdrop-blur-md rounded-3xl">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Overall Risk Level</h3>
            <p className="text-4xl font-bold text-foreground mt-2">
              {Math.round(mockRiskScores.reduce((a, b) => a + b.score, 0) / mockRiskScores.length)}%
            </p>
            <p className="text-[10px] text-muted-foreground/80 mt-3 font-medium">BASED ON 8 KEY FACTORS</p>
          </Card>

          <Card className="p-8 border border-border bg-card/40 backdrop-blur-md rounded-3xl">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Needs Attention</h3>
            <p className="text-4xl font-bold text-destructive mt-2">
              {mockRiskScores.filter((r) => r.riskLevel === 'critical').length}
            </p>
            <p className="text-[10px] text-muted-foreground/80 mt-3 font-medium">POSSIBLE AREAS FOR CARE</p>
          </Card>

          <Card className="p-8 border border-border bg-card/40 backdrop-blur-md rounded-3xl">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Potential for Improvement</h3>
            <p className="text-4xl font-bold text-green-500 mt-2">
              {Math.round(
                (mockRiskScores.filter((r) => r.riskLevel === 'low').length /
                  mockRiskScores.length) *
                100
              )}%
            </p>
            <p className="text-[10px] text-muted-foreground/80 mt-3 font-medium">REVERSIBLE VIA LIFESTYLE</p>
          </Card>
        </div>

        {/* Risk Scores Overview */}
        <Card className="p-10 border border-border bg-card/50 backdrop-blur-sm rounded-4xl">
          <h3 className="text-2xl font-bold text-foreground mb-6 tracking-tight">Your Health Baseline</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} vertical={false} />
              <XAxis dataKey="disease" stroke="var(--muted-foreground)" fontSize={12} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 15, 15, 0.9)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                }}
              />
              <Bar dataKey="score" fill="var(--primary)" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={getRiskColor(entry.score)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* 12-Year Forecast */}
        <Card className="p-10 border border-border bg-card/50 backdrop-blur-sm rounded-4xl">
          <h3 className="text-2xl font-bold text-foreground mb-6 tracking-tight">Looking 12 Years Ahead</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={riskTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} vertical={false} />
              <XAxis dataKey="year" stroke="var(--muted-foreground)" fontSize={12} axisLine={false} tickLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 15, 15, 0.9)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                }}
              />
              <Legend verticalAlign="top" height={48} iconType="circle" />
              <Line
                type="monotone"
                dataKey="diabetes"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={{ fill: 'var(--chart-1)', r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="cvd"
                stroke="var(--chart-2)"
                strokeWidth={2}
                dot={{ fill: 'var(--chart-2)', r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="sleep"
                stroke="var(--chart-3)"
                strokeWidth={2}
                dot={{ fill: 'var(--chart-3)', r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Detailed Risk Breakdown */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-foreground">Stratified Condition Analysis</h3>
            <Button variant="outline" className="gap-2 border-border text-foreground hover:bg-primary/5">
              <TrendingUp className="w-4 h-4" />
              Full Clinical Report
            </Button>
          </div>
          <div className="space-y-3">
            {mockRiskScores.map((risk) => (
              <RiskCard key={risk.id} risk={risk} />
            ))}
          </div>
        </div>

        {/* Insights */}
        <Card className="p-6 border border-primary/20 bg-primary/5 backdrop-blur-md">
          <div className="flex gap-4">
            <Info className="w-6 h-6 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-foreground mb-2">Clinical Insights & Observations</h4>
              <ul className="space-y-3 text-sm text-foreground/80">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Diabetes marker escalation observed (+5%) correlated with trending glycemic flux.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Direct correlation detected between nocturnal cortisol levels and observed sleep latency.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Stochastic modeling indicates a 20-30% risk mitigation potential through targeted aerobic intervals.</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
