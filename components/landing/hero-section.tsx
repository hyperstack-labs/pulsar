'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronRight } from 'lucide-react';

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
            {/* Clean, Modern Background */}
            <div className="absolute inset-0 w-full h-full bg-background z-[-1]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.05),transparent_50%)]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link href="/sign-up" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 hover:bg-secondary border border-white/5 transition-colors mb-8 text-sm font-medium group">
                        <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-semibold">New</span>
                        <span>Introducing AI Predictions</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 max-w-4xl"
                >
                    Your health, <br />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-purple-400 to-accent">
                        better tracked.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
                >
                    A simpler, more intelligent way to monitor your vitals, understand trends, and take control of your well-being with predictive analytics.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
                >
                    <Button size="lg" asChild className="w-full sm:w-auto rounded-full px-8 h-14 text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_rgba(59,130,246,0.5)] group">
                        <Link href="/sign-up">
                            Start tracking for free
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                    <Link
                        href="#features"
                        className="w-full sm:w-auto flex items-center justify-center rounded-full px-8 h-14 text-base font-medium border border-white/10 hover:bg-white/5 text-muted-foreground hover:text-white transition-all"
                    >
                        Explore features
                    </Link>
                </motion.div>

                {/* Dashboard Screenshot Mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="mt-20 w-full max-w-5xl relative rounded-2xl md:rounded-[2.5rem] p-2 bg-white/5 border border-white/10 shadow-2xl backdrop-blur-sm"
                >
                    <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent z-10 rounded-[2.5rem] pointer-events-none" />

                    <div className="relative rounded-xl md:rounded-4xl overflow-hidden bg-background border border-white/5 flex items-center justify-center">
                        <Image
                            src="/dashboard.png"
                            alt="Pulsar Dashboard Preview"
                            width={1400}
                            height={900}
                            className="w-full h-auto object-cover"
                            priority
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

