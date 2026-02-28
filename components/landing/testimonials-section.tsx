'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function TestimonialsSection() {
    const testimonials = [
        {
            quote: "Pulsar caught a downward trend in my HRV three days before I felt symptoms of a cold. The predictive analytics are simply unmatched.",
            author: "Dr. Sarah Chen",
            role: "Sports Physician",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop"
        },
        {
            quote: "I've tried a dozen tracking apps. None of them aggregate data from my Whoop and Apple Watch as cleanly and beautifully as Pulsar does.",
            author: "Marcus Reynolds",
            role: "Triathlete",
            image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=256&auto=format&fit=crop"
        },
        {
            quote: "As a data scientist, I appreciate the transparency of the ML models. As a user, I appreciate that I don't have to think about them to get value.",
            author: "Elena Rodriguez",
            role: "Machine Learning Engineer",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&auto=format&fit=crop"
        }
    ];

    return (
        <section id="testimonials" className="py-32 relative">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70"
                    >
                        Trusted by high performers
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        Join thousands of optimizing individuals who rely on Pulsar to maintain their peak state.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-4xl bg-card/40 border border-white/5 backdrop-blur-md flex flex-col justify-between"
                        >
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">"{t.quote}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
                                    <Image src={t.image} alt={t.author} width={48} height={48} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground">{t.author}</h4>
                                    <p className="text-sm text-muted-foreground">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

