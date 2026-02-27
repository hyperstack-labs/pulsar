'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronRight, Fingerprint, Lock, Cpu } from 'lucide-react';

export default function SignInPage() {
  const [error, setError] = useState('');
  const { signIn, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signIn();
      router.push('/dashboard');
    } catch (err) {
      setError('System authentication failure. Please re-validate session.');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] flex items-center justify-center px-4 overflow-hidden font-sans antialiased">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-primary/20 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-secondary/10 blur-[120px] rounded-full"
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] pointer-events-none" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-[440px]"
      >
        <div className="bg-[#0f0f0f]/60 backdrop-blur-2xl border border-white/5 rounded-[32px] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] space-y-10">
          {/* Logo Section */}
          <div className="flex flex-col items-center gap-6">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="relative w-16 h-16 group"
            >
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-125 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Image
                src="/logo.png"
                alt="PULSAR"
                fill
                className="object-contain relative z-10 drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
              />
            </motion.div>
            <div className="text-center">
              <h1 className="text-2xl font-black tracking-tighter text-white sm:text-4xl">
                WELCOME <span className="text-primary">BACK</span>
              </h1>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mt-2 opacity-60">
                A simpler way to track your health.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 text-destructive flex items-center gap-3"
              >
                <Lock className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">{error}</span>
              </motion.div>
            )}

            <div className="space-y-4">
              <div className="group relative">
                <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="relative w-full h-[64px] bg-white text-black hover:bg-white/90 font-bold text-base tracking-tight rounded-2xl transition-all shadow-[0_8px_24px_-8px_rgba(255,255,255,0.3)] flex items-center justify-center gap-3 border-none group"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      Enter Pulsar
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-2 py-4">
                <div className="h-px bg-white/5 self-center" />
                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest text-center">Secure Connection</span>
                <div className="h-px bg-white/5 self-center" />
              </div>

              <div className="flex justify-center flex-col items-center gap-4 text-muted-foreground opacity-30">
                <div className="relative w-10 h-10 grayscale brightness-200 contrast-200 invert opacity-50">
                  <Image
                    src="/logo.png"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-[8px] font-black uppercase tracking-[0.4em]">Official Product Environment</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 text-center">
            <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-[0.2em] leading-relaxed">
              Proprietary Enterprise Environment<br />
              <span className="text-primary/40">© 2026 PULSAR GLOBAL INTELLIGENCE</span>
            </p>
          </div>
        </div>

        {/* Floating Accents */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 blur-3xl -z-10 rounded-full" />
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-secondary/20 blur-3xl -z-10 rounded-full" />
      </motion.div>
    </div>
  );
}
