
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Star, TrendingUp, ChevronDown } from "lucide-react";

interface Token {
  symbol: string;
  name: string;
  price: number;
  change: number;
  logo: string;
}

interface TokenSelectorProps {
  selectedToken: Token;
  onTokenSelect: (token: Token) => void;
  tokens: Token[];
}

const TokenSelector = ({ selectedToken, onTokenSelect, tokens }: TokenSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTokens = tokens.filter(token =>
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTokenSelect = (token: Token) => {
    onTokenSelect(token);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{selectedToken.logo}</span>
            <span className="font-semibold text-white">{selectedToken.symbol}</span>
            <ChevronDown className="w-4 h-4 text-gray-300" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-white/20 text-white">
        <DialogHeader>
          <DialogTitle>Select a Token</DialogTitle>
        </DialogHeader>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search name or paste address"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>

        {/* Popular Tokens */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
            <Star className="w-4 h-4" />
            Popular Tokens
          </div>
          <div className="flex flex-wrap gap-2">
            {['ETH', 'USDC', 'USDT', 'BTC'].map((symbol) => {
              const token = tokens.find(t => t.symbol === symbol);
              if (!token) return null;
              
              return (
                <Button
                  key={symbol}
                  variant="outline"
                  size="sm"
                  onClick={() => handleTokenSelect(token)}
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  <span className="mr-1">{token.logo}</span>
                  {symbol}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Token List */}
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {filteredTokens.map((token) => (
            <Card
              key={token.symbol}
              className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => handleTokenSelect(token)}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
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
                    <div className={`text-sm flex items-center gap-1 ${
                      token.change >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      <TrendingUp className="w-3 h-3" />
                      {token.change >= 0 ? '+' : ''}{token.change}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTokens.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No tokens found matching "{searchQuery}"
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TokenSelector;
