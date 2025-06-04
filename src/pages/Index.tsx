
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowDown, Wallet, Settings, History, TrendingUp, BarChart3, Zap } from "lucide-react";
import WalletConnection from "@/components/WalletConnection";
import TokenSelector from "@/components/TokenSelector";
import LiquidityPools from "@/components/LiquidityPools";
import PriceChart from "@/components/PriceChart";
import TransactionHistory from "@/components/TransactionHistory";

// Mock token data
const TOKENS = [
  { symbol: 'ETH', name: 'Ethereum', price: 2450.32, change: 2.45, logo: '⟠' },
  { symbol: 'USDC', name: 'USD Coin', price: 1.0, change: 0.01, logo: '💲' },
  { symbol: 'USDT', name: 'Tether', price: 1.0, change: -0.02, logo: '₮' },
  { symbol: 'BTC', name: 'Bitcoin', price: 43250.0, change: 1.85, logo: '₿' },
  { symbol: 'UNI', name: 'Uniswap', price: 8.45, change: -1.23, logo: '🦄' },
  { symbol: 'LINK', name: 'Chainlink', price: 14.82, change: 3.21, logo: '🔗' }
];

// Mock liquidity pools
const POOLS = [
  { pair: 'ETH/USDC', tvl: 245000000, volume24h: 45000000, fees24h: 135000, apy: 12.5 },
  { pair: 'USDC/USDT', tvl: 180000000, volume24h: 82000000, fees24h: 246000, apy: 8.3 },
  { pair: 'ETH/BTC', tvl: 95000000, volume24h: 15000000, fees24h: 45000, apy: 15.7 },
  { pair: 'UNI/ETH', tvl: 32000000, volume24h: 8500000, fees24h: 25500, apy: 18.9 }
];

const Index = () => {
  const [fromToken, setFromToken] = useState(TOKENS[0]);
  const [toToken, setToToken] = useState(TOKENS[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('swap');
  const [priceImpact, setPriceImpact] = useState(0);

  // AMM calculation using x*y=k formula
  const calculateSwap = (inputAmount: number, inputReserve: number, outputReserve: number) => {
    const inputAmountWithFee = inputAmount * 0.997; // 0.3% fee
    const numerator = inputAmountWithFee * outputReserve;
    const denominator = inputReserve + inputAmountWithFee;
    return numerator / denominator;
  };

  // Calculate price impact
  const calculatePriceImpact = (inputAmount: number, outputAmount: number) => {
    const spotPrice = fromToken.price / toToken.price;
    const executionPrice = inputAmount / outputAmount;
    return ((executionPrice - spotPrice) / spotPrice) * 100;
  };

  useEffect(() => {
    if (fromAmount && !isNaN(parseFloat(fromAmount))) {
      const amount = parseFloat(fromAmount);
      // Mock reserves for calculation
      const inputReserve = 1000000;
      const outputReserve = 1000000 * (fromToken.price / toToken.price);
      
      const output = calculateSwap(amount, inputReserve, outputReserve);
      setToAmount(output.toFixed(6));
      
      const impact = calculatePriceImpact(amount, output);
      setPriceImpact(impact);
    } else {
      setToAmount('');
      setPriceImpact(0);
    }
  }, [fromAmount, fromToken, toToken]);

  const handleSwap = () => {
    if (!isConnected) return;
    
    // Simulate swap transaction
    console.log(`Swapping ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`);
    
    // Reset form
    setFromAmount('');
    setToAmount('');
    setPriceImpact(0);
  };

  const swapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    
    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">FluidSwap</h1>
              <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                v1.0
              </Badge>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setActiveTab('swap')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'swap' ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Swap
              </button>
              <button
                onClick={() => setActiveTab('pools')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'pools' ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Pools
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'history' ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                History
              </button>
            </nav>

            <WalletConnection isConnected={isConnected} setIsConnected={setIsConnected} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Trading Interface */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'swap' && (
              <>
                {/* Swap Card */}
                <Card className="bg-white/5 backdrop-blur-lg border-white/10">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center gap-2">
                        <ArrowDown className="w-5 h-5" />
                        Swap Tokens
                      </CardTitle>
                      <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* From Token */}
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">From</label>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="flex items-center justify-between">
                          <Input
                            type="number"
                            placeholder="0.0"
                            value={fromAmount}
                            onChange={(e) => setFromAmount(e.target.value)}
                            className="border-0 bg-transparent text-2xl font-semibold text-white placeholder:text-gray-500 focus:ring-0"
                          />
                          <TokenSelector
                            selectedToken={fromToken}
                            onTokenSelect={setFromToken}
                            tokens={TOKENS}
                          />
                        </div>
                        <div className="flex justify-between mt-2 text-sm text-gray-400">
                          <span>≈ ${(parseFloat(fromAmount || '0') * fromToken.price).toFixed(2)}</span>
                          <span>Balance: 12.4589</span>
                        </div>
                      </div>
                    </div>

                    {/* Swap Button */}
                    <div className="flex justify-center">
                      <Button
                        onClick={swapTokens}
                        variant="ghost"
                        size="sm"
                        className="rounded-full p-2 bg-white/10 hover:bg-white/20 border border-white/20"
                      >
                        <ArrowDown className="w-4 h-4 text-white" />
                      </Button>
                    </div>

                    {/* To Token */}
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">To</label>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="flex items-center justify-between">
                          <Input
                            type="number"
                            placeholder="0.0"
                            value={toAmount}
                            readOnly
                            className="border-0 bg-transparent text-2xl font-semibold text-white placeholder:text-gray-500 focus:ring-0"
                          />
                          <TokenSelector
                            selectedToken={toToken}
                            onTokenSelect={setToToken}
                            tokens={TOKENS}
                          />
                        </div>
                        <div className="flex justify-between mt-2 text-sm text-gray-400">
                          <span>≈ ${(parseFloat(toAmount || '0') * toToken.price).toFixed(2)}</span>
                          <span>Balance: 2,485.92</span>
                        </div>
                      </div>
                    </div>

                    {/* Price Impact & Slippage */}
                    {parseFloat(fromAmount || '0') > 0 && (
                      <div className="bg-white/5 rounded-lg p-3 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Price Impact</span>
                          <span className={`${Math.abs(priceImpact) > 5 ? 'text-red-400' : 'text-green-400'}`}>
                            {priceImpact > 0 ? '+' : ''}{priceImpact.toFixed(2)}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Max Slippage</span>
                          <span className="text-white">{slippage}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Gas Fee</span>
                          <span className="text-white">~$12.45</span>
                        </div>
                      </div>
                    )}

                    {/* Swap Button */}
                    <Button
                      onClick={handleSwap}
                      disabled={!isConnected || !fromAmount || parseFloat(fromAmount) <= 0}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 text-lg"
                    >
                      {!isConnected ? 'Connect Wallet' : 'Swap Tokens'}
                    </Button>
                  </CardContent>
                </Card>

                {/* Price Chart */}
                <PriceChart fromToken={fromToken} toToken={toToken} />
              </>
            )}

            {activeTab === 'pools' && <LiquidityPools pools={POOLS} />}
            {activeTab === 'history' && <TransactionHistory />}
          </div>

          {/* Right Column - Market Info */}
          <div className="space-y-6">
            {/* Market Overview */}
            <Card className="bg-white/5 backdrop-blur-lg border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Market Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {TOKENS.slice(0, 4).map((token) => (
                  <div key={token.symbol} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{token.logo}</span>
                      <div>
                        <div className="font-semibold text-white">{token.symbol}</div>
                        <div className="text-sm text-gray-400">{token.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-white">
                        ${token.price.toLocaleString()}
                      </div>
                      <div className={`text-sm ${token.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {token.change >= 0 ? '+' : ''}{token.change}%
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Pools */}
            <Card className="bg-white/5 backdrop-blur-lg border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Top Pools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {POOLS.slice(0, 3).map((pool, index) => (
                  <div key={pool.pair} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{pool.pair}</span>
                      <Badge variant="secondary" className="bg-green-600/20 text-green-300">
                        {pool.apy}% APY
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">TVL</span>
                        <div className="text-white font-medium">
                          ${(pool.tvl / 1000000).toFixed(1)}M
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-400">Volume 24h</span>
                        <div className="text-white font-medium">
                          ${(pool.volume24h / 1000000).toFixed(1)}M
                        </div>
                      </div>
                    </div>
                    {index < POOLS.length - 1 && <Separator className="bg-white/10" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
