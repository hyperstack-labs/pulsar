'use client';

import { DashboardHeader } from '@/components/dashboard/header';
import { RiskCard } from '@/components/dashboard/risk-card';
import { MetricCard } from '@/components/dashboard/metric-card';
import { RecommendationCard } from '@/components/dashboard/recommendation-card';
import { AlertsPanel } from '@/components/dashboard/alerts-panel';
import { mockRiskScores, mockRecommendations, mockMetrics } from '@/lib/mock-data';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Heart, Droplets, Moon, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

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
      className="min-h-screen bg-background pb-12"
    >
      <DashboardHeader
        title="Your Daily Update"
        subtitle="Here's how your body is doing today."
      />

      <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">

          {/* Main Content Column */}
          <div className="xl:col-span-8 flex flex-col gap-6 lg:gap-8">

            {/* Vitals Ribbon */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              <div className="md:col-span-1">
                <MetricCard
                  label="Heart Rate"
                  value="72"
                  unit="bpm"
                  status="normal"
                  icon={Heart}
                />
              </div>
              <div className="md:col-span-1">
                <MetricCard
                  label="Glucose"
                  value="105"
                  unit="mg/dL"
                  status="normal"
                  icon={Droplets}
                />
              </div>
              <div className="md:col-span-1">
                <MetricCard
                  label="Sleep"
                  value="7.5"
                  unit="h"
                  status="good"
                  icon={Moon}
                />
              </div>
            </div>

            {/* Main Chart Card */}
            <div className="bg-card/40 border border-border/50 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-sm relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">Your Heart's Rhythm</h2>
                    <p className="text-sm text-muted-foreground mt-1">Steady and healthy over the last 7 hours.</p>
                  </div>
                </div>

                <div className="h-[250px] md:h-[300px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={recentHeartRateData}>
                      <XAxis dataKey="time" hide />
                      <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--card)',
                          backdropFilter: 'blur(12px)',
                          border: '1px solid var(--border)',
                          borderRadius: '16px',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        }}
                        itemStyle={{ color: 'var(--foreground)', fontSize: '14px', fontWeight: '600' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="var(--primary)"
                        strokeWidth={3}
                        dot={{ r: 4, fill: 'var(--background)', stroke: 'var(--primary)', strokeWidth: 2 }}
                        activeDot={{ r: 6, fill: 'var(--primary)', strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Health Forecast */}
            <div className="p-6 md:p-8 bg-card/40 border border-border/50 rounded-3xl backdrop-blur-md shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground tracking-tight">Looking Ahead</h2>
                <span className="text-xs font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full">12-Year Forecast</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                {topRisks.map((risk) => (
                  <div key={risk.id} className="p-5 bg-background/50 rounded-2xl border border-border/40 hover:border-primary/30 hover:bg-card/60 transition-all group cursor-default">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 group-hover:text-foreground/80 transition-colors">{risk.disease}</p>
                    <div className="flex items-baseline gap-1">
                      <p className="text-3xl font-bold text-foreground tracking-tight">{risk.score}%</p>
                      <p className="text-xs text-muted-foreground font-medium">risk</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="xl:col-span-4 flex flex-col gap-6 lg:gap-8 min-h-0">
            {/* Using min-h-[300px] to ensure panels take up substantial space but remain responsive */}
            <div className="min-h-[250px]">
              <AlertsPanel alerts={criticalAlerts} />
            </div>

            {/* Focused Advice */}
            <div className="flex-1 bg-card/40 border border-border/50 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-sm flex flex-col relative overflow-hidden group hover:border-border transition-colors">
              <div className="relative z-10 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-foreground mb-6 tracking-tight">Focused Advice</h3>
                <div className="space-y-4 flex-1">
                  {topRecommendations.map((rec) => (
                    <div key={rec.id} className="p-4 rounded-2xl bg-secondary/30 border border-border/40 hover:bg-secondary/50 cursor-pointer transition-colors">
                      <p className="text-sm font-semibold text-foreground mb-1">{rec.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{rec.description}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-3.5 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground font-semibold rounded-xl transition-colors">
                  See All Actions
                </button>
              </div>
            </div>

            {/* System Status Container */}
            <div className="p-5 md:p-6 bg-card/40 border border-border/50 rounded-3xl backdrop-blur-md flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-sm font-semibold text-muted-foreground">System Status</p>
              </div>
              <div className="flex items-center gap-1.5 text-green-500 bg-green-500/10 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-4 h-4" />
                <p className="text-xs font-semibold tracking-wide uppercase">Nominal</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
