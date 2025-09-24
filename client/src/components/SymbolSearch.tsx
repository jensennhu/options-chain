import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SymbolSearchProps {
  onSearch: (symbol: string) => void;
}

export default function SymbolSearch({ onSearch }: SymbolSearchProps) {
  const [symbol, setSymbol] = useState("");
  const [suggestions] = useState([
    "AAPL", "TSLA", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "SPY", "QQQ"
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symbol.trim()) {
      onSearch(symbol.toUpperCase());
    }
  };

  const handleSuggestionClick = (suggestedSymbol: string) => {
    setSymbol(suggestedSymbol);
    onSearch(suggestedSymbol);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter symbol (e.g. AAPL)"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="pl-10"
            data-testid="input-symbol-search"
          />
        </div>
        <Button type="submit" data-testid="button-search">
          Search
        </Button>
      </form>
      
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground font-medium">Popular:</span>
        {suggestions.map((suggestedSymbol) => (
          <Button
            key={suggestedSymbol}
            variant="outline"
            size="sm"
            onClick={() => handleSuggestionClick(suggestedSymbol)}
            data-testid={`button-symbol-${suggestedSymbol}`}
          >
            {suggestedSymbol}
          </Button>
        ))}
      </div>
    </Card>
  );
}