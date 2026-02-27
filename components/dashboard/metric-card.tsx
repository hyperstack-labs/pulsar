import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  label: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'critical' | 'good';
  icon: LucideIcon;
  trend?: number;
}

export function MetricCard({
  label,
  value,
  unit,
  status,
  icon: Icon,
  trend,
}: MetricCardProps) {
  const statusColors = {
    normal: 'border-accent/20 bg-card/50',
    warning: 'border-yellow-500/30 bg-card/50',
    critical: 'border-destructive/30 bg-card/50',
    good: 'border-green-500/30 bg-card/50',
  };

  const statusGlows = {
    normal: 'shadow-[0_0_15px_-5px_var(--accent)]',
    warning: 'shadow-[0_0_15px_-5px_rgba(234,179,8,0.3)]',
    critical: 'shadow-[0_0_15px_-5px_rgba(239,68,68,0.3)]',
    good: 'shadow-[0_0_15px_-5px_rgba(34,197,94,0.3)]',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, translateY: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card className={`p-6 border-2 backdrop-blur-sm transition-all duration-300 ${statusColors[status]} ${statusGlows[status]}`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground transition-all">{value}</span>
              <span className="text-sm font-medium text-muted-foreground">{unit}</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary/20">
            <Icon className="w-6 h-6" />
          </div>
        </div>
        {trend !== undefined && (
          <div className="flex items-center gap-1 mt-4 text-xs font-semibold">
            {trend > 0 ? (
              <>
                <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                <span className="text-green-500">+{trend}%</span>
              </>
            ) : (
              <>
                <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                <span className="text-red-500">{trend}%</span>
              </>
            )}
            <span className="text-muted-foreground font-normal ml-1">vs last period</span>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
