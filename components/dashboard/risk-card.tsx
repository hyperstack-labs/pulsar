import type { RiskScore } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

interface RiskCardProps {
  risk: RiskScore;
}

export function RiskCard({ risk }: RiskCardProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'text-destructive bg-destructive/10';
      case 'high':
        return 'text-yellow-600 bg-yellow-500/10';
      case 'moderate':
        return 'text-orange-600 bg-orange-500/10';
      default:
        return 'text-green-600 bg-green-500/10';
    }
  };

  const getBorderColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'border-destructive/30';
      case 'high':
        return 'border-yellow-500/30';
      case 'moderate':
        return 'border-orange-500/30';
      default:
        return 'border-green-500/30';
    }
  };

  return (
    <Card className={`p-4 border-2 ${getBorderColor(risk.riskLevel)}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-accent" />
            <h3 className="font-semibold text-foreground">{risk.disease}</h3>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-6">
              <div>
                <p className="text-xs text-muted-foreground">Risk Score</p>
                <p className="text-lg font-bold text-foreground">{risk.score}%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Forecast</p>
                <p className="text-lg font-bold text-foreground">{risk.yearsForecast} yrs</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskColor(risk.riskLevel)}`}>
              {risk.riskLevel.charAt(0).toUpperCase() + risk.riskLevel.slice(1)}
            </div>
          </div>
          {risk.factors.length > 0 && (
            <div className="mt-3">
              <p className="text-xs text-muted-foreground mb-1">Key Factors:</p>
              <div className="flex flex-wrap gap-2">
                {risk.factors.slice(0, 2).map((factor, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                  >
                    {factor}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
