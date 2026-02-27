import type { HealthMetric } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface AlertsPanelProps {
  alerts: HealthMetric[];
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  const hasAlerts = alerts && alerts.length > 0;

  return (
    <Card className="p-6 border border-border">
      <h3 className="text-lg font-bold text-foreground mb-4">Health Alerts</h3>
      {hasAlerts ? (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start gap-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
            >
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {alert.type.replace('_', ' ').toUpperCase()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Current: {alert.value} {alert.unit}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mb-2" />
          <p className="text-sm font-medium text-foreground">All metrics normal</p>
          <p className="text-xs text-muted-foreground mt-1">No alerts at this time</p>
        </div>
      )}
    </Card>
  );
}
