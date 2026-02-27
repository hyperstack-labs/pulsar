'use client';

import { DashboardHeader } from '@/components/dashboard/header';
import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { generateHeartRateHistory, generateGlucoseHistory, generateSleepHistory, generateCortisolHistory } from '@/lib/mock-data';
import { MetricCard } from '@/components/dashboard/metric-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Activity, Droplets, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

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

export default function MetricsPage() {
  const heartRateData = generateHeartRateHistory();
  const glucoseData = generateGlucoseHistory();
  const sleepData = generateSleepHistory();
  const cortisolData = generateCortisolHistory();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-background"
    >
      <DashboardHeader
        title="Your Body Stats"
        subtitle="A closer look at your vitals and trends."
      />

      <div className="p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Average Heart Rate"
            value="70"
            unit="bpm"
            status="normal"
            icon={Heart}
            trend={-2}
          />
          <MetricCard
            label="Blood Pressure"
            value="118/78"
            unit="mmHg"
            status="normal"
            icon={Activity}
            trend={0}
          />
          <MetricCard
            label="Glucose Range"
            value="90-130"
            unit="mg/dL"
            status="good"
            icon={Droplets}
            trend={-5}
          />
          <MetricCard
            label="Sleep Time"
            value="7.2"
            unit="h"
            status="good"
            icon={Moon}
            trend={3}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Heart Rate */}
          <Card className="p-8 border border-border bg-card/50 backdrop-blur-sm rounded-3xl">
            <h3 className="text-xl font-bold text-foreground mb-4">Heart Rate (last 24h)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={heartRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} vertical={false} />
                <XAxis dataKey="time" stroke="var(--muted-foreground)" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 15, 15, 0.9)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid var(--border)',
                    borderRadius: '16px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--primary)"
                  dot={false}
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Blood Glucose */}
          <Card className="p-8 border border-border bg-card/50 backdrop-blur-sm rounded-3xl">
            <h3 className="text-xl font-bold text-foreground mb-4">Glucose Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={glucoseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} vertical={false} />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 15, 15, 0.9)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid var(--border)',
                    borderRadius: '16px',
                  }}
                />
                <Bar dataKey="fasting" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="postMeal" fill="var(--accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Sleep Analysis */}
          <Card className="p-8 border border-border bg-card/50 backdrop-blur-sm rounded-3xl">
            <h3 className="text-xl font-bold text-foreground mb-4">Sleep Patterns</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sleepData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} vertical={false} />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 15, 15, 0.9)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid var(--border)',
                    borderRadius: '16px',
                  }}
                />
                <Line type="monotone" dataKey="sleep" stroke="var(--secondary)" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="quality" stroke="var(--accent)" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Cortisol Levels */}
          <Card className="p-8 border border-border bg-card/50 backdrop-blur-sm rounded-3xl">
            <h3 className="text-xl font-bold text-foreground mb-4">Daily Stress Levels</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cortisolData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                  }}
                />
                <Legend />
                <Bar dataKey="morning" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="afternoon" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="evening" fill="var(--chart-3)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Detailed Metrics Table */}
        <Card className="p-6 border border-border bg-card/50 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-foreground mb-4">Latest Measurements</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-muted-foreground font-medium uppercase tracking-wider text-xs">Metric</th>
                  <th className="text-left py-4 px-4 text-muted-foreground font-medium uppercase tracking-wider text-xs">Value</th>
                  <th className="text-left py-4 px-4 text-muted-foreground font-medium uppercase tracking-wider text-xs">Status</th>
                  <th className="text-left py-4 px-4 text-muted-foreground font-medium uppercase tracking-wider text-xs">Clinical Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: 'Heart Rate', value: '72 bpm', status: 'Normal', time: '2 min ago' },
                  { metric: 'Blood Pressure', value: '120/80 mmHg', status: 'Normal', time: '5 min ago' },
                  { metric: 'Blood Glucose', value: '105 mg/dL', status: 'Normal', time: '30 min ago' },
                  { metric: 'Oxygen Sat.', value: '98%', status: 'Normal', time: '5 min ago' },
                  { metric: 'Temperature', value: '98.6°F', status: 'Normal', time: '1 hour ago' },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-border last:border-0 hover:bg-primary/5 transition-colors">
                    <td className="py-4 px-4 text-foreground font-medium">{row.metric}</td>
                    <td className="py-4 px-4 font-bold text-foreground">{row.value}</td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight bg-green-500/10 text-green-600 border border-green-500/20">
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground text-xs">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
