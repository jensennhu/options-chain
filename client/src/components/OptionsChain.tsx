import { useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface OptionData {
  strike: number;
  expiry: string;
  bid: number;
  ask: number;
  last: number;
  volume: number;
  openInterest: number;
  impliedVolatility: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  fairValue: number;
  discount: number;
}

interface OptionsChainProps {
  symbol: string;
  currentPrice: number;
  options: OptionData[];
}

export default function OptionsChain({ symbol, currentPrice, options }: OptionsChainProps) {
  const [sortBy, setSortBy] = useState<keyof OptionData>('discount');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (column: keyof OptionData) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const sortedOptions = [...options].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    const modifier = sortOrder === 'asc' ? 1 : -1;
    return (aVal < bVal ? -1 : aVal > bVal ? 1 : 0) * modifier;
  });

  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;
  const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{symbol} Options Chain</span>
          <div className="flex items-center gap-4 text-sm">
            <span>Current Price: <span className="font-mono font-medium">{formatCurrency(currentPrice)}</span></span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover-elevate" 
                  onClick={() => handleSort('strike')}
                  data-testid="header-strike"
                >
                  Strike
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover-elevate" 
                  onClick={() => handleSort('expiry')}
                  data-testid="header-expiry"
                >
                  Expiry
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover-elevate" 
                  onClick={() => handleSort('last')}
                  data-testid="header-last"
                >
                  Last
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover-elevate" 
                  onClick={() => handleSort('bid')}
                  data-testid="header-bid-ask"
                >
                  Bid/Ask
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover-elevate" 
                  onClick={() => handleSort('volume')}
                  data-testid="header-volume"
                >
                  Volume
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover-elevate" 
                  onClick={() => handleSort('impliedVolatility')}
                  data-testid="header-iv"
                >
                  IV
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover-elevate" 
                  onClick={() => handleSort('delta')}
                  data-testid="header-delta"
                >
                  Delta
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover-elevate" 
                  onClick={() => handleSort('fairValue')}
                  data-testid="header-fair-value"
                >
                  Fair Value
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover-elevate" 
                  onClick={() => handleSort('discount')}
                  data-testid="header-discount"
                >
                  Discount
                </TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedOptions.map((option, index) => (
                <TableRow 
                  key={`${option.strike}-${option.expiry}`}
                  data-testid={`row-option-${index}`}
                  className="hover-elevate"
                >
                  <TableCell className="font-mono font-medium">
                    {formatCurrency(option.strike)}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {option.expiry}
                  </TableCell>
                  <TableCell className="font-mono">
                    {formatCurrency(option.last)}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {formatCurrency(option.bid)}/{formatCurrency(option.ask)}
                  </TableCell>
                  <TableCell className="font-mono">
                    {option.volume.toLocaleString()}
                  </TableCell>
                  <TableCell className="font-mono">
                    {formatPercent(option.impliedVolatility)}
                  </TableCell>
                  <TableCell className="font-mono">
                    {option.delta.toFixed(3)}
                  </TableCell>
                  <TableCell className="font-mono">
                    {formatCurrency(option.fairValue)}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={option.discount > 0.1 ? "default" : option.discount > 0.05 ? "secondary" : "outline"}
                      className="font-mono"
                      data-testid={`badge-discount-${index}`}
                    >
                      {option.discount > 0 ? (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      )}
                      {formatPercent(Math.abs(option.discount))}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="outline"
                      data-testid={`button-analyze-${index}`}
                      onClick={() => console.log('Analyze option:', option)}
                    >
                      Analyze
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}