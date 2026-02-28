'use client';

import { motion } from 'framer-motion';
import { Heart, Activity, TrendingUp, ShieldAlert } from 'lucide-react';

interface FeatureCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
    className?: string;
    visual?: React.ReactNode;
    delay?: number;
}

function FeatureCard({ icon: Icon, title, description, className, visual, delay = 0 }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={`p-8 rounded-4xl bg-card/40 border border-white/10 backdrop-blur-md relative overflow-hidden group flex flex-col justify-between ${className}`}
        >
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative z-10 flex-1 flex flex-col justify-end">
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.15)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-all">
                        <Icon className="w-5 h-5 text-primary" />
                    </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight text-foreground">{title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                    {description}
                </p>
            </div>

            {visual && (
                <div className="mt-8 relative z-10 w-full rounded-xl overflow-hidden border border-white/5 bg-background/50 pointer-events-none">
                    {visual}
                </div>
            )}
        </motion.div>
    );
}

export function FeaturesSection() {
    return (
        <section id="features" className="py-32 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-white/5 mb-6 text-sm font-medium"
                    >
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Next Generation Tracking
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70"
                    >
                        Smarter insights for a healthier you
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        Pulsar transcends simple step counting. We use predictive intelligence to give you actionable foresight into your wellbeing.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[1fr]">
                    {/* BENTO CARD 1: Wide primary card */}
                    <FeatureCard
                        icon={TrendingUp}
                        title="Hyper-Accurate Predictive Analytics"
                        description="Pulsar doesn't just track where you've been. It forecasts where your health is trending, giving you the power to prevent fatigue before it hits."
                        className="md:col-span-6 lg:col-span-8 min-h-[400px]"
                        delay={0.1}
                        visual={
                            <div className="h-40 w-full bg-linear-to-b from-transparent to-primary/5 flex items-end px-4 pb-4 gap-2 relative">
                                <div className="absolute top-4 left-4 text-xs font-mono text-primary/70">Recovery Forecasting</div>
                                {[40, 55, 45, 70, 65, 85, 95].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${h}%` }}
                                        transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                                        className={`flex-1 rounded-t-sm ${i >= 5 ? 'bg-primary' : 'bg-primary/30'} relative group`}
                                    >
                                        {i === 6 && <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded">Optimal</div>}
                                    </motion.div>
                                ))}
                            </div>
                        }
                    />

                    {/* BENTO CARD 2: Tall secondary card */}
                    <FeatureCard
                        icon={Activity}
                        title="Real-time AI Vitals"
                        description="Instantly capture and process key metrics using edge-computed generative models."
                        className="md:col-span-3 lg:col-span-4 min-h-[400px]"
                        delay={0.2}
                        visual={
                            <div className="h-40 w-full flex items-center justify-center relative overflow-hidden">
                                <div className="w-32 h-32 rounded-full border-[6px] border-primary/20 border-t-primary border-r-primary animate-spin-slow shrink-0" />
                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                    <span className="text-3xl font-black text-foreground">98</span>
                                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">BPM</span>
                                </div>
                            </div>
                        }
                    />

                    {/* BENTO CARD 3: Standard card */}
                    <FeatureCard
                        icon={ShieldAlert}
                        title="Automated Pre-emptive Alerts"
                        description="Set personalized baselines and receive immediate notifications if anything strays outside your optimal zones."
                        className="md:col-span-3 lg:col-span-4 min-h-[300px]"
                        delay={0.3}
                        visual={
                            <div className="h-24 w-full flex items-center px-4">
                                <div className="w-full bg-card border border-white/5 rounded-lg p-3 shadow-lg flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                                    </div>
                                    <div className="space-y-1 w-full">
                                        <div className="h-2 w-20 bg-foreground/20 rounded" />
                                        <div className="h-1.5 w-full bg-muted rounded" />
                                    </div>
                                </div>
                            </div>
                        }
                    />

                    {/* BENTO CARD 4: Wide card */}
                    <FeatureCard
                        icon={Heart}
                        title="Holistic Device Synchronization"
                        description="Seamlessly integrate with your existing wearables (Apple Watch, Oura, Whoop) to form a complete, unified picture of your overall wellbeing without manual entries."
                        className="md:col-span-6 lg:col-span-8 min-h-[300px]"
                        delay={0.4}
                        visual={
                            <div className="h-24 w-full flex items-center justify-center gap-4 px-4 overflow-hidden relative">
                                <div className="absolute inset-y-0 left-0 w-12 bg-linear-to-r from-background/50 to-transparent z-10" />
                                <div className="absolute inset-y-0 right-0 w-12 bg-linear-to-l from-background/50 to-transparent z-10" />

                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                        <div className="w-6 h-6 rounded-full border-2 border-primary/40 border-t-primary animate-spin" style={{ animationDuration: `${3 + i}s` }} />
                                    </div>
                                ))}
                            </div>
                        }
                    />
                </div>
            </div>
        </section>
    );
}
