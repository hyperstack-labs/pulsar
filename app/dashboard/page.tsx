'use client';

import { DashboardHeader } from '@/components/dashboard/header';
import { RiskCard } from '@/components/dashboard/risk-card';
import { MetricCard } from '@/components/dashboard/metric-card';
import { RecommendationCard } from '@/components/dashboard/recommendation-card';
import { AlertsPanel } from '@/components/dashboard/alerts-panel';
import { mockRiskScores, mockRecommendations, mockMetrics } from '@/lib/mock-data';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Heart, Activity, Droplets, Moon, ChevronRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const recentHeartRateData = [
  { time: '12:00', value: 68 },
  { time: '12:30', value: 70 },
  { time: '13:00', value: 72 },
  { time: '13:30', value: 75 },
  { time: '14:00', value: 73 },
  { time: '14:30', value: 71 },
  { time: '15:00', value: 69 },
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

export default function DashboardPage() {
  const topRisks = mockRiskScores.slice(0, 3);
  const topRecommendations = mockRecommendations.slice(0, 2);
  const criticalAlerts = mockMetrics.filter(m => m.isAlert);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-background"
    >
      <DashboardHeader
        title="Your Daily Update"
        subtitle="Here's how your body is doing today."
      />

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Vitals Ribbon - Asymmetrical grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <MetricCard
                  label="Heart Rate"
                  value="72"
                  unit="bpm"
                  status="normal"
                  icon={Heart}
                />
              </div>
              <MetricCard
                label="Glucose"
                value="105"
                unit="mg/dL"
                status="normal"
                icon={Droplets}
              />
              <MetricCard
                label="Sleep"
                value="7.5"
                unit="h"
                status="good"
                icon={Moon}
              />
            </div>

            {/* Main Chart Card - Elevating high-impact data */}
            <div className="bg-card/30 border border-border/50 rounded-4xl p-8 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <div className="relative w-32 h-32 grayscale brightness-200 contrast-200 invert">
                  <Image
                    src="/logo.png"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-foreground mb-1 tracking-tight">Your Heart's Rhythm</h2>
                <p className="text-sm text-muted-foreground mb-8">Looking steady over the last 7 hours.</p>

                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={recentHeartRateData}>
                    <XAxis dataKey="time" hide />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(15, 15, 15, 0.8)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                      }}
                      itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: '800' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="var(--primary)"
                      strokeWidth={4}
                      dot={false}
                      activeDot={{ r: 8, fill: 'var(--primary)', strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Health Forecast - Simplified labels */}
            <div className="p-8 bg-card/40 border border-border rounded-4xl">
              <h2 className="text-xl font-bold text-foreground mb-6 tracking-tight">Looking Ahead</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {topRisks.map((risk) => (
                  <div key={risk.id} className="p-6 bg-background/50 rounded-2xl border border-border/50 hover:border-primary/30 transition-all">
                    <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">{risk.disease}</p>
                    <p className="text-2xl font-bold text-foreground">{risk.score}%</p>
                    <p className="text-[10px] text-muted-foreground mt-1">12-Year Forecast</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Area - Aggregated Actions */}
          <div className="lg:col-span-4 space-y-8">
            <AlertsPanel alerts={criticalAlerts} />

            <div className="bg-primary/5 border border-primary/20 rounded-[2.5rem] p-8 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-[80px] rounded-full" />
              <h3 className="text-xl font-bold text-foreground mb-6 tracking-tight">Focused Advice</h3>
              <div className="space-y-4">
                {topRecommendations.map((rec) => (
                  <div key={rec.id} className="group cursor-pointer">
                    <p className="text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{rec.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{rec.description}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-10 py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/10 hover:scale-[1.02] active:scale-[0.98] transition-all">
                See All Daily Actions
              </button>
            </div>

            <div className="p-8 bg-white/5 border border-white/5 rounded-4xl text-center">
              <p className="text-xs font-bold text-muted-foreground mb-1">DATA STATUS</p>
              <p className="text-sm font-bold uppercase tracking-widest text-[#00FF00]">Everything nominal</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
