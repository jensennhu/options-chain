import OptionsMetrics from '../OptionsMetrics';

export default function OptionsMetricsExample() {
  const mockMetrics = {
    totalOptions: 47,
    discountedOptions: 12,
    avgDiscount: 0.078,
    maxDiscount: 0.145,
    highVolumeOptions: 8,
    avgImpliedVolatility: 0.31
  };

  return <OptionsMetrics symbol="AAPL" metrics={mockMetrics} />;
}