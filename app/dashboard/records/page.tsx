'use client';

import { DashboardHeader } from '@/components/dashboard/header';
import { Card } from '@/components/ui/card';
import { mockHealthRecords } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Plus, Download, FileText, User, Pill, Image as ImageIcon, Calendar, MoreVertical, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const recordTypeIcons = {
  lab_result: <FileText className="w-5 h-5" />,
  doctor_visit: <User className="w-5 h-5" />,
  prescription: <Pill className="w-5 h-5" />,
  medical_imaging: <ImageIcon className="w-5 h-5" />,
};

const recordTypeLabels = {
  lab_result: 'Laboratory Analysis',
  doctor_visit: 'Clinical Consultation',
  prescription: 'Pharmacological Protocol',
  medical_imaging: 'Diagnostic Imaging',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1 },
};

export default function HealthRecordsPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-background"
    >
      <DashboardHeader
        title="Your Medical Record"
        subtitle="A safe, organized place for all your health documents."
      />

      <div className="p-6 space-y-6">
        {/* Upload Section */}
        <motion.div
          whileHover={{ scale: 1.002 }}
          className="border-2 border-dashed border-primary/20 bg-primary/5 rounded-4xl p-12 text-center transition-all hover:bg-primary/10 hover:border-primary/40 shadow-inner"
        >
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 shadow-xl">
            <Plus className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2 tracking-tight">Add a Document</h3>
          <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
            Upload your lab results, imaging, or any other health files to keep everything in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary hover:bg-primary/90 px-10 h-12 font-bold text-white shadow-xl shadow-primary/10 rounded-xl">Upload Files</Button>
            <Button variant="outline" className="border-border text-foreground hover:bg-card h-12 px-10 rounded-xl font-bold transition-all">Connect Provider</Button>
          </div>
        </motion.div>

        {/* Records Timeline */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">Your Files</h2>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-muted-foreground/60">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              Secure Storage
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence>
              {mockHealthRecords.map((record) => {
                const Icon = recordTypeIcons[record.type as keyof typeof recordTypeIcons];
                const Label = recordTypeLabels[record.type as keyof typeof recordTypeLabels];

                return (
                  <motion.div
                    key={record.id}
                    variants={itemVariants}
                    layout
                  >
                    <Card className="p-8 border border-border bg-card/40 backdrop-blur-md hover:border-primary/40 transition-all group rounded-4xl hover:shadow-2xl">
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex items-start gap-6 flex-1">
                          <div className="shrink-0 w-16 h-16 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors shadow-inner">
                            {Icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-4 mb-2">
                              <h3 className="text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                                {record.title}
                              </h3>
                              <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/80 border border-white/5">
                                {Label}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 max-w-2xl">{record.description}</p>

                            {record.results && (
                              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {Object.entries(record.results).map(([key, value]) => (
                                  <div key={key} className="p-2.5 bg-background/50 rounded-lg border border-border/50 flex flex-col gap-0.5">
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{key}</span>
                                    <span className="text-sm font-bold text-foreground">{String(value)}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="flex items-center gap-6 mt-5 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary/60" />
                                {record.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </div>
                              {record.provider && (
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-primary/60" />
                                  {record.provider}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 border-border text-foreground hover:bg-primary/5 hover:border-primary/30"
                          >
                            <Download className="w-4 h-4" />
                            Export
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-primary hover:bg-primary/5"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Data Sharing & Privacy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-8 border border-border bg-card/50 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-foreground tracking-tight mb-4">Interoperability & Governance</h3>
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-bold text-foreground">Delegated Provider Access</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    Authorize healthcare entities to securely access your longitudinal record for diagnostic continuity.
                  </p>
                </div>
                <Button variant="outline" className="border-border text-foreground hover:bg-card shrink-0">
                  Configure
                </Button>
              </div>
              <div className="border-t border-border pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold text-foreground">Standardized Clinical Export</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      Generate a comprehensive summary of your health history in FHIR or HL7 international standards.
                    </p>
                  </div>
                  <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/10 shrink-0">
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Upcoming Appointments */}
          <Card className="p-8 border border-border bg-card/50 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-foreground tracking-tight mb-4">Scheduled Consultations</h3>
            <div className="space-y-3">
              {[
                {
                  doctor: 'Dr. Sarah Johnson',
                  specialty: 'Primary Care Specialist',
                  date: 'Mar 15, 2026',
                  time: '10:00 AM',
                },
                {
                  doctor: 'Dr. James Chen',
                  specialty: 'Cardiological Oncology',
                  date: 'Mar 22, 2026',
                  time: '02:00 PM',
                },
                {
                  doctor: 'Dr. Maria Garcia',
                  specialty: 'Metabolic Endocrinology',
                  date: 'Apr 05, 2026',
                  time: '09:30 AM',
                },
              ].map((appt, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-4 bg-background/40 rounded-xl border border-border/50 hover:border-primary/20 hover:bg-primary/5 transition-all group"
                >
                  <div>
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">{appt.doctor}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">{appt.specialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{appt.date}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{appt.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <Button className="w-full mt-6 gap-2 border border-border text-foreground hover:bg-primary/5 font-bold">
              <Plus className="w-4 h-4" />
              Schedule Intervention
            </Button>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
