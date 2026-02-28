'use client';

import { motion } from 'framer-motion';
import { Activity, BrainCircuit, Lock } from 'lucide-react';

export function HowItWorksSection() {
    const steps = [
        {
            icon: Activity,
            title: "Connect & Collect",
            description: "Sync your Apple Watch, Oura Ring, or Whoop strap securely. Pulsar continuously ingests your raw vitals in the background.",
            step: "01"
        },
        {
            icon: BrainCircuit,
            title: "Process & Predict",
            description: "Our proprietary AI models analyze your biometric trends, identifying patterns and generating personalized predictive forecasts.",
            step: "02"
        },
        {
            icon: Lock,
            title: "Act & Optimize",
            description: "Receive actionable insights and preemptive warnings directly to your dashboard, allowing you to optimize your health before issues arise.",
            step: "03"
        }
    ];

    return (
        <section id="how-it-works" className="py-32 relative border-t border-white/5 bg-background/50">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70"
                    >
                        Intelligence seamlessly integrated
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        We do the heavy computational lifting so you can focus on living better. Just three simple steps to predictive health.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-linear-to-r from-transparent via-primary/20 to-transparent pointer-events-none" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="relative flex flex-col items-center text-center group"
                        >
                            <div className="w-16 h-16 rounded-full bg-card border border-white/10 flex items-center justify-center mb-8 relative z-10 shadow-[0_0_20px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] group-hover:border-primary/30 transition-all">
                                <span className="absolute -top-3 -right-3 text-[10px] font-bold py-0.5 px-2 rounded-full bg-primary/20 text-primary border border-primary/20">{step.step}</span>
                                <step.icon className="w-6 h-6 text-foreground" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 tracking-tight">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

