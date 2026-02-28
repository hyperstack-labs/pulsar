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
    normal: 'text-primary bg-primary/10',
    warning: 'text-yellow-500 bg-yellow-500/10',
    critical: 'text-destructive bg-destructive/10',
    good: 'text-green-500 bg-green-500/10',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, translateY: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Card className="h-full p-6 border-border/50 bg-card/40 backdrop-blur-md transition-all duration-300 hover:border-border hover:bg-card/60 shadow-xs relative overflow-hidden group">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 group-hover:text-foreground/80 transition-colors">{label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground tracking-tight">{value}</span>
              <span className="text-sm font-medium text-muted-foreground">{unit}</span>
            </div>
          </div>
          <div className={`p-3 rounded-2xl transition-colors ${statusColors[status]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
        {trend !== undefined && (
          <div className="flex items-center gap-1.5 mt-5 text-sm font-medium">
            {trend > 0 ? (
              <>
                <div className="flex items-center gap-1 text-green-500 bg-green-500/10 px-2 py-0.5 rounded-md">
                  <TrendingUp className="w-4 h-4" />
                  <span>+{trend}%</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1 text-destructive bg-destructive/10 px-2 py-0.5 rounded-md">
                  <TrendingDown className="w-4 h-4" />
                  <span>{trend}%</span>
                </div>
              </>
            )}
            <span className="text-muted-foreground text-xs ml-1">vs last period</span>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
