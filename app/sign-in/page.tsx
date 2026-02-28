'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Activity, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Pass email and password in case the mock auth context uses it later, 
      // or just ignore if it doesn't take args. (TypeScript might complain if it strictly takes 0 args,
      // but usually the mock signIn takes or ignores). Wait, TS might complain. Let's just pass them.
      // If it fails typing, I'll fallback. Actually, let's just call `signIn()`.
      await signIn();
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background px-4">
      {/* Clean, Modern Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.05),transparent_50%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <Link href="/" className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowRight className="w-4 h-4 rotate-180" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <div className="flex justify-center mb-8">
              <div className="bg-primary/10 p-3 rounded-2xl border border-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <Activity className="w-8 h-8 text-primary" />
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold tracking-tight mb-2 text-foreground">Welcome back</h1>
              <p className="text-sm text-muted-foreground">Sign in to continue to Pulsar</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-destructive/10 border border-destructive/20 rounded-xl p-3 mb-6 text-destructive flex items-center gap-2 text-sm"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-11 px-4 rounded-xl bg-background/50 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <input
                    type="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-11 px-4 rounded-xl bg-background/50 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-[0_4px_14px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link href="/sign-up" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Create one now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
