import { useState } from "react";
import SymbolSearch from "@/components/SymbolSearch";
import OptionsChain from "@/components/OptionsChain";
import OptionsMetrics from "@/components/OptionsMetrics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TrendingUp } from "lucide-react";

export default function Dashboard() {
  const [selectedSymbol, setSelectedSymbol] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - in real app this would come from Alpaca API
  const mockData = {
    AAPL: {
      currentPrice: 152.50,
      options: [
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
        }
      ],
      metrics: {
        totalOptions: 47,
        discountedOptions: 12,
        avgDiscount: 0.078,
        maxDiscount: 0.145,
        highVolumeOptions: 8,
        avgImpliedVolatility: 0.31
      }
    }
  };

  const handleSearch = async (symbol: string) => {
    setIsLoading(true);
    setSelectedSymbol(symbol);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const currentData = selectedSymbol && mockData[selectedSymbol as keyof typeof mockData];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Options Analyzer</h1>
          <p className="text-muted-foreground">
            Find undervalued call options using Black-Scholes pricing model
          </p>
        </div>
      </div>

      <SymbolSearch onSearch={handleSearch} />

      {!selectedSymbol && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Welcome to Options Analyzer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <TrendingUp className="h-4 w-4" />
              <AlertDescription>
                Search for a stock symbol above to start analyzing options for potential discounts. 
                The system will compare market prices with theoretical fair values calculated using the Black-Scholes model.
              </AlertDescription>
            </Alert>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 rounded-md bg-muted/30">
                <h4 className="font-medium mb-2">1. Search Symbol</h4>
                <p className="text-muted-foreground">Enter a stock ticker to fetch its options chain</p>
              </div>
              <div className="p-4 rounded-md bg-muted/30">
                <h4 className="font-medium mb-2">2. Analyze Options</h4>
                <p className="text-muted-foreground">Review Greeks, implied volatility, and fair value calculations</p>
              </div>
              <div className="p-4 rounded-md bg-muted/30">
                <h4 className="font-medium mb-2">3. Find Discounts</h4>
                <p className="text-muted-foreground">Identify options trading below their theoretical fair value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading && (
        <Card>
          <CardContent className="py-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-3">Loading options data for {selectedSymbol}...</span>
            </div>
          </CardContent>
        </Card>
      )}

      {currentData && !isLoading && (
        <div className="space-y-6">
          <OptionsMetrics 
            symbol={selectedSymbol} 
            metrics={currentData.metrics} 
          />
          
          <OptionsChain 
            symbol={selectedSymbol}
            currentPrice={currentData.currentPrice}
            options={currentData.options}
          />
        </div>
      )}
    </div>
  );
}