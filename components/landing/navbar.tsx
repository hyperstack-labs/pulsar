'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';

export function Navbar() {
    const { isAuthenticated } = useAuth();
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [atTop, setAtTop] = useState(true);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;

        // Check if we are at the very top of the page
        if (latest <= 50) {
            setAtTop(true);
            setHidden(false);
        } else {
            setAtTop(false);
            // If scrolling down, hide the navbar
            if (latest > previous && latest > 150) {
                setHidden(true);
            }
            // If scrolling up, show the navbar
            else if (latest < previous) {
                setHidden(false);
            }
        }
    });

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: hidden ? "-150%" : 0, opacity: hidden ? 0 : 1 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-5xl px-4"
        >
            <div
                className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 relative ${atTop
                    ? 'bg-transparent'
                    : 'bg-background/70 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
                    }`}
            >
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-1 group relative z-10 hover:opacity-80 transition-opacity">
                    <div className="relative w-10 h-10">
                        <Image
                            src="/logo.png"
                            alt="Pulsar Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white hidden sm:block">PULSAR</span>
                </Link>

                {/* Centered Navigation */}
                <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center gap-1 z-0">
                    <Link href="#features" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/10 rounded-full transition-all">Features</Link>
                    <Link href="#how-it-works" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/10 rounded-full transition-all">How it works</Link>
                    <Link href="#testimonials" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/10 rounded-full transition-all">Testimonials</Link>
                </nav>

                {/* Authentication / CTA Actions */}
                <div className="flex items-center gap-3 relative z-10">
                    {isAuthenticated ? (
                        <Button asChild className="rounded-full px-6 h-10 font-bold">
                            <Link href="/dashboard">Dashboard</Link>
                        </Button>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                asChild
                                className="rounded-full hidden sm:inline-flex h-10 text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <Link href="/sign-in">Sign in</Link>
                            </Button>
                            <Button
                                asChild
                                className="rounded-full px-6 h-10 font-bold bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all"
                            >
                                <Link href="/sign-up">Get Started</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </motion.header>
    );
}

