'use client';

import { motion } from 'framer-motion';
import { Heart, Activity, TrendingUp, ShieldAlert } from 'lucide-react';

interface FeatureCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
    delay: number;
}

function FeatureCard({ icon: Icon, title, description, delay }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl bg-secondary/30 border border-white/5 backdrop-blur-sm relative overflow-hidden group"
        >
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="h-12 w-12 rounded-2xl bg-background flex items-center justify-center mb-6 shadow-sm border border-white/5 group-hover:border-primary/20 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}

export function FeaturesSection() {
    const features = [
        {
            icon: Activity,
            title: "Real-time AI Vitals",
            description: "Instantly capture and process key health metrics using our advanced generative models. We look beyond basic numbers.",
            delay: 0.1,
        },
        {
            icon: TrendingUp,
            title: "Predictive Analytics",
            description: "Pulsar doesn't just track where you've been. It forecasts where your health is trending, giving you actionable foresight.",
            delay: 0.2,
        },
        {
            icon: ShieldAlert,
            title: "Automated Alerts",
            description: "Set personalized baselines and receive immediate notifications if anything strays outside your optimal zones.",
            delay: 0.3,
        },
        {
            icon: Heart,
            title: "Holistic Sync",
            description: "Seamlessly integrate with your existing wearables to form a complete, unified picture of your overall wellbeing.",
            delay: 0.4,
        }
    ];

    return (
        <section id="features" className="py-32 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
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
                        className="text-4xl md:text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70"
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
                        Pulsar elevates traditional health tracking with predictive intelligence, deep insights, and a beautiful interface designed for clarity.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, i) => (
                        <FeatureCard key={i} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
}
