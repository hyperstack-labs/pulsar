'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import {
  LayoutDashboard,
  Activity,
  Zap,
  ClipboardList,
  FileText,
  Settings,
  LogOut,
  Shield,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Your Stats', href: '/dashboard/metrics', icon: Activity },
  { name: 'Health Insights', href: '/dashboard/predictions', icon: Zap },
  { name: 'Daily Actions', href: '/dashboard/recommendations', icon: ClipboardList },
  { name: 'Medical Records', href: '/dashboard/records', icon: FileText },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    window.location.href = '/sign-in';
  };

  return (
    <div className="w-64 bg-card border-r border-border h-screen flex flex-col sticky top-0 shadow-2xl shadow-primary/5 transition-all">
      {/* Logo Section */}
      <div className="p-8 border-b border-border/50">
        <Link href="/dashboard" className="flex items-center gap-4 group">
          <div className="relative shrink-0 w-12 h-12 transition-transform duration-500 group-hover:rotate-180">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Image
              src="/logo.png"
              alt="PULSAR"
              fill
              className="object-contain relative z-10"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter text-foreground leading-none">PULSAR</span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mt-1 opacity-80">Intelligence</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4 opacity-50 px-4">Core Intelligence</p>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <motion.button
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group',
                  isActive
                    ? 'bg-primary/10 text-primary shadow-[inset_0_0_12px_rgba(var(--primary-rgb),0.05)]'
                    : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("w-5 h-5 transition-all", isActive ? "scale-110" : "group-hover:text-primary group-hover:scale-110")} />
                  <span className={cn("text-sm font-bold tracking-tight", isActive ? "text-foreground" : "")}>{item.name}</span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="w-1.5 h-6 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            </Link>
          );
        })}
      </nav>

      {/* Account Section */}
      <div className="p-6 border-t border-border/50 space-y-6">
        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-lg shadow-primary/20 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 grayscale brightness-200 contrast-200 invert">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pulsar_nobg-IV0ICxY46KlQP0Yg6GsnD6JYopL0Dr.png"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <span className="relative z-10">{user?.name?.charAt(0) || 'G'}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground truncate tracking-tight">{user?.name || 'Guest User'}</p>
              <p className="text-[10px] text-muted-foreground truncate uppercase font-bold tracking-widest opacity-60">Verified Clinical ID</p>
            </div>
          </div>
          <Button
            onClick={handleSignOut}
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/5 h-10 px-3 rounded-xl transition-all group"
          >
            <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="text-[11px] font-bold uppercase tracking-widest">Terminate Session</span>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 opacity-30 select-none">
          <Shield className="w-4 h-4" />
          <span className="text-[9px] font-bold uppercase tracking-[0.3em]">AES-256 Encrypted</span>
        </div>
      </div>
    </div>
  );
}
