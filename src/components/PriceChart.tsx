
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, BarChart3, Clock } from "lucide-react";

interface Token {
  symbol: string;
  name: string;
  price: number;
  change: number;
  logo: string;
}

interface PriceChartProps {
  fromToken: Token;
  toToken: Token;
}

// Mock price data
const generatePriceData = (basePrice: number) => {
  const data = [];
  let currentPrice = basePrice;
  
  for (let i = 0; i < 24; i++) {
    const change = (Math.random() - 0.5) * 0.1;
    currentPrice = currentPrice * (1 + change);
    data.push({
      time: `${i}:00`,
      price: currentPrice,
      volume: Math.random() * 1000000
    });
  }
  
  return data;
};

const PriceChart = ({ fromToken, toToken }: PriceChartProps) => {
  const exchangeRate = fromToken.price / toToken.price;
  const priceData = generatePriceData(exchangeRate);
  
  return (
    <Card className="bg-white/5 backdrop-blur-lg border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            {fromToken.symbol}/{toToken.symbol} Price Chart
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
              24H
            </Badge>
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
              <Clock className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Price Info */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">
                {exchangeRate.toFixed(6)} {toToken.symbol}
              </div>
              <div className="text-sm text-gray-400">
                1 {fromToken.symbol} = {exchangeRate.toFixed(6)} {toToken.symbol}
              </div>
            </div>
            <div className={`flex items-center gap-1 ${
              fromToken.change >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              <TrendingUp className="w-4 h-4" />
              <span className="font-semibold">
                {fromToken.change >= 0 ? '+' : ''}{fromToken.change}%
              </span>
            </div>
          </div>
          
          {/* Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  domain={['dataMin * 0.99', 'dataMax * 1.01']}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                  formatter={(value: number) => [value.toFixed(6), `${fromToken.symbol}/${toToken.symbol}`]}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Chart Stats */}
          <div className="grid grid-cols-4 gap-4 pt-4 border-t border-white/10">
            <div className="text-center">
              <div className="text-sm text-gray-400">24h High</div>
              <div className="font-semibold text-white">
                {(exchangeRate * 1.05).toFixed(6)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400">24h Low</div>
              <div className="font-semibold text-white">
                {(exchangeRate * 0.95).toFixed(6)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400">24h Volume</div>
              <div className="font-semibold text-white">
                ${(Math.random() * 10000000).toFixed(0)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400">Liquidity</div>
              <div className="font-semibold text-white">
                ${(Math.random() * 50000000).toFixed(0)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceChart;
