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
    <div className="w-64 bg-background/80 backdrop-blur-xl border-r border-border h-screen flex flex-col sticky top-0 transition-all">
      {/* Logo Section */}
      <div className="p-6 border-b border-border/40">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="relative shrink-0 w-10 h-10 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="PULSAR"
              fill
              className="object-contain relative z-10"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-foreground leading-none">Pulsar</span>
            <span className="text-xs font-medium text-muted-foreground mt-1">Health Tracker</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider mb-3 px-3">Menu</p>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <button
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group relative',
                  isActive
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                )}
              >
                {/* Active Background using Framer Motion for smooth transitions */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-bg"
                    className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}

                <div className="flex items-center gap-3 relative z-10">
                  <Icon className={cn("w-4 h-4 transition-colors", isActive ? "text-primary" : "group-hover:text-foreground")} />
                  <span className="text-sm tracking-tight">{item.name}</span>
                </div>
              </button>
            </Link>
          );
        })}
      </nav>

      {/* Account Section */}
      <div className="p-4 border-t border-border/40">
        <div className="p-3 rounded-2xl bg-secondary/30 border border-border/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="shrink-0 w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm border border-primary/20">
              <span className="relative z-10">{user?.name?.charAt(0) || 'G'}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{user?.name || 'Guest User'}</p>
              <p className="text-[11px] text-muted-foreground truncate uppercase font-medium tracking-wide">Pro Member</p>
            </div>
          </div>
          <Button
            onClick={handleSignOut}
            variant="ghost"
            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground hover:bg-secondary h-9 px-3 rounded-lg transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-xs font-medium">Sign Out</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
