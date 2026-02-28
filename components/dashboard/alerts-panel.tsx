import type { HealthMetric } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface AlertsPanelProps {
  alerts: HealthMetric[];
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  const hasAlerts = alerts && alerts.length > 0;

  return (
    <Card className="p-6 border-border/50 bg-card/40 backdrop-blur-md shadow-xs h-full flex flex-col">
      <h3 className="text-lg font-semibold text-foreground mb-5 tracking-tight">Health Alerts</h3>

      <div className="flex-1 flex flex-col justify-center">
        {hasAlerts ? (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-4 p-4 bg-destructive/5 border border-destructive/10 rounded-xl"
              >
                <div className="p-2 bg-destructive/10 rounded-lg shrink-0">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground tracking-tight">
                    {alert.type.replace('_', ' ')} Attention
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Your {alert.type.toLowerCase().replace('_', ' ')} is currently reading at <span className="font-medium text-foreground">{alert.value} {alert.unit}</span>.
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center bg-green-500/5 rounded-2xl border border-green-500/10">
            <div className="p-3 bg-green-500/10 rounded-full mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-base font-semibold text-foreground tracking-tight">All clear from our end.</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-[200px]">No anomalies detected in your recent health data.</p>
          </div>
        )}
      </div>
    </Card>
  );
}
