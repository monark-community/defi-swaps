
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Plus, Minus, TrendingUp, BarChart3, Droplets } from "lucide-react";

interface Pool {
  pair: string;
  tvl: number;
  volume24h: number;
  fees24h: number;
  apy: number;
}

interface LiquidityPoolsProps {
  pools: Pool[];
}

const LiquidityPools = ({ pools }: LiquidityPoolsProps) => {
  const [activePool, setActivePool] = useState<Pool | null>(null);
  const [addAmount1, setAddAmount1] = useState('');
  const [addAmount2, setAddAmount2] = useState('');

  return (
    <div className="space-y-6">
      {/* Pool Overview */}
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Droplets className="w-5 h-5" />
            Liquidity Pools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-gray-300 text-sm mb-1">Total Value Locked</div>
              <div className="text-2xl font-bold text-white">
                ${(pools.reduce((sum, pool) => sum + pool.tvl, 0) / 1000000).toFixed(1)}M
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-gray-300 text-sm mb-1">24h Volume</div>
              <div className="text-2xl font-bold text-white">
                ${(pools.reduce((sum, pool) => sum + pool.volume24h, 0) / 1000000).toFixed(1)}M
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-gray-300 text-sm mb-1">24h Fees</div>
              <div className="text-2xl font-bold text-white">
                ${(pools.reduce((sum, pool) => sum + pool.fees24h, 0) / 1000).toFixed(0)}K
              </div>
            </div>
          </div>

          {/* Pool List */}
          <div className="space-y-4">
            {pools.map((pool, index) => (
              <Card 
                key={pool.pair}
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => setActivePool(pool)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {pool.pair.split('/')[0][0]}
                        </div>
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold ml-[-8px]">
                          {pool.pair.split('/')[1][0]}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-white">{pool.pair}</div>
                        <div className="text-sm text-gray-400">
                          TVL: ${(pool.tvl / 1000000).toFixed(1)}M
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-sm text-gray-400">24h Volume</div>
                        <div className="font-semibold text-white">
                          ${(pool.volume24h / 1000000).toFixed(1)}M
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">24h Fees</div>
                        <div className="font-semibold text-white">
                          ${(pool.fees24h / 1000).toFixed(0)}K
                        </div>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className="bg-green-600/20 text-green-300"
                      >
                        {pool.apy}% APY
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add/Remove Liquidity */}
      {activePool && (
        <Card className="bg-white/5 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white">
              Manage Liquidity - {activePool.pair}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="add" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/10">
                <TabsTrigger value="add" className="data-[state=active]:bg-white/20">
                  Add Liquidity
                </TabsTrigger>
                <TabsTrigger value="remove" className="data-[state=active]:bg-white/20">
                  Remove Liquidity
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="add" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">
                      {activePool.pair.split('/')[0]} Amount
                    </label>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <Input
                        type="number"
                        placeholder="0.0"
                        value={addAmount1}
                        onChange={(e) => setAddAmount1(e.target.value)}
                        className="border-0 bg-transparent text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">
                      {activePool.pair.split('/')[1]} Amount
                    </label>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <Input
                        type="number"
                        placeholder="0.0"
                        value={addAmount2}
                        onChange={(e) => setAddAmount2(e.target.value)}
                        className="border-0 bg-transparent text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Estimated LP Tokens</span>
                    <span className="text-white">0.0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Share of Pool</span>
                    <span className="text-white">0.00%</span>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Liquidity
                </Button>
              </TabsContent>
              
              <TabsContent value="remove" className="space-y-4">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">25%</div>
                    <Progress value={25} className="w-full" />
                    <div className="flex justify-between mt-2 text-sm text-gray-400">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {[25, 50, 75, 100].map((percentage) => (
                      <Button
                        key={percentage}
                        variant="outline"
                        size="sm"
                        className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                      >
                        {percentage}%
                      </Button>
                    ))}
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">You will receive</span>
                      <span className="text-white"></span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">0.0 {activePool.pair.split('/')[0]}</span>
                      <span className="text-white">0.0 {activePool.pair.split('/')[1]}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    <Minus className="w-4 h-4 mr-2" />
                    Remove Liquidity
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LiquidityPools;
