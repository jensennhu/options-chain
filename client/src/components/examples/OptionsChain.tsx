import OptionsChain from '../OptionsChain';

export default function OptionsChainExample() {
  // Mock options data for demonstration
  const mockOptions = [
    {
      strike: 150,
      expiry: '2024-01-19',
      bid: 5.20,
      ask: 5.40,
      last: 5.30,
      volume: 1250,
      openInterest: 5600,
      impliedVolatility: 0.28,
      delta: 0.65,
      gamma: 0.025,
      theta: -0.08,
      vega: 0.15,
      fairValue: 6.20,
      discount: 0.145
    },
    {
      strike: 155,
      expiry: '2024-01-19',
      bid: 3.10,
      ask: 3.30,
      last: 3.25,
      volume: 890,
      openInterest: 3200,
      impliedVolatility: 0.31,
      delta: 0.45,
      gamma: 0.030,
      theta: -0.06,
      vega: 0.18,
      fairValue: 3.80,
      discount: 0.095
    },
    {
      strike: 160,
      expiry: '2024-02-16',
      bid: 2.80,
      ask: 3.00,
      last: 2.95,
      volume: 450,
      openInterest: 1800,
      impliedVolatility: 0.35,
      delta: 0.35,
      gamma: 0.028,
      theta: -0.04,
      vega: 0.22,
      fairValue: 2.85,
      discount: -0.035
    }
  ];

  return <OptionsChain symbol="AAPL" currentPrice={152.50} options={mockOptions} />;
}