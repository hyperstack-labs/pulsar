'use client';

import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card/80 backdrop-blur-md border-b border-border p-6 sticky top-0 z-50"
    >
      <div className="flex items-center justify-between max-w-[1400px] mx-auto">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-foreground tracking-tight">{title}</h1>
          {subtitle && <p className="text-sm font-medium text-muted-foreground tracking-tight opacity-80">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-3 bg-muted/50 border border-border rounded-xl px-4 py-2 w-80 group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="text"
              placeholder="Query clinical data..."
              className="border-0 bg-transparent outline-none text-sm w-full h-auto p-0 placeholder:text-muted-foreground focus-visible:ring-0"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-card border border-border text-foreground hover:bg-primary/5 hover:border-primary/30 hover:text-foreground rounded-xl relative h-11 w-11 shadow-sm transition-all"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-card" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
