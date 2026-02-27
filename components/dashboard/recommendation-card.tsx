import type { Recommendation } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Zap } from 'lucide-react';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      case 'medium':
        return <Zap className="w-5 h-5 text-accent" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      nutrition: 'bg-green-500/10 text-green-600',
      exercise: 'bg-blue-500/10 text-blue-600',
      sleep: 'bg-purple-500/10 text-purple-600',
      stress: 'bg-orange-500/10 text-orange-600',
      medication: 'bg-red-500/10 text-red-600',
    };
    return colors[category] || 'bg-primary/10 text-primary';
  };

  return (
    <Card className="p-4 border border-border hover:border-primary/50 transition-colors">
      <div className="flex gap-3">
        <div className="shrink-0">
          {getPriorityIcon(recommendation.priority)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-semibold text-foreground text-sm">{recommendation.title}</h4>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {recommendation.description}
              </p>
            </div>
            <span className={`px-2 py-1 rounded text-xs font-medium shrink-0 ${getCategoryColor(recommendation.category)}`}>
              {recommendation.category.charAt(0).toUpperCase() + recommendation.category.slice(1)}
            </span>
          </div>
          {recommendation.estimatedImpact && (
            <p className="text-xs text-accent mt-2">
              Impact: {recommendation.estimatedImpact}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
