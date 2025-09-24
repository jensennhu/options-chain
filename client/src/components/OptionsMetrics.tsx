import { TrendingUp, TrendingDown, Activity, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricsData {
  totalOptions: number;
  discountedOptions: number;
  avgDiscount: number;
  maxDiscount: number;
  highVolumeOptions: number;
  avgImpliedVolatility: number;
}

interface OptionsMetricsProps {
  symbol: string;
  metrics: MetricsData;
}

export default function OptionsMetrics({ symbol, metrics }: OptionsMetricsProps) {
  const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;

  const metricCards = [
    {
      title: "Total Options",
      value: metrics.totalOptions.toLocaleString(),
      icon: Activity,
      color: "text-chart-1",
      testId: "metric-total"
    },
    {
      title: "Discounted Options",
      value: metrics.discountedOptions.toLocaleString(),
      icon: TrendingDown,
      color: "text-primary",
      testId: "metric-discounted"
    },
    {
      title: "Average Discount",
      value: formatPercent(metrics.avgDiscount),
      icon: Target,
      color: "text-chart-2",
      testId: "metric-avg-discount"
    },
    {
      title: "Maximum Discount",
      value: formatPercent(metrics.maxDiscount),
      icon: TrendingUp,
      color: "text-chart-3",
      testId: "metric-max-discount"
    },
    {
      title: "High Volume Options",
      value: metrics.highVolumeOptions.toLocaleString(),
      icon: Activity,
      color: "text-chart-4",
      testId: "metric-high-volume"
    },
    {
      title: "Avg Implied Volatility",
      value: formatPercent(metrics.avgImpliedVolatility),
      icon: TrendingUp,
      color: "text-chart-5",
      testId: "metric-avg-iv"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Market Metrics for {symbol}</h3>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metricCards.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title} className="hover-elevate">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div 
                  className="text-2xl font-bold font-mono"
                  data-testid={metric.testId}
                >
                  {metric.value}
                </div>
                <p className="text-xs text-muted-foreground">
                  {metric.title === "Discounted Options" && "Options trading below fair value"}
                  {metric.title === "Total Options" && "Available call options"}
                  {metric.title === "Average Discount" && "Mean discount across all options"}
                  {metric.title === "Maximum Discount" && "Largest discount opportunity"}
                  {metric.title === "High Volume Options" && "Options with volume > 1000"}
                  {metric.title === "Avg Implied Volatility" && "Market expectation of volatility"}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}