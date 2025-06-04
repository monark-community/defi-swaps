
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Copy, ExternalLink, LogOut } from "lucide-react";

interface WalletConnectionProps {
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;
}

const WALLETS = [
  { name: 'MetaMask', icon: '🦊', popular: true },
  { name: 'WalletConnect', icon: '🔗', popular: true },
  { name: 'Coinbase Wallet', icon: '🔵', popular: false },
  { name: 'Trust Wallet', icon: '🛡️', popular: false }
];

const WalletConnection = ({ isConnected, setIsConnected }: WalletConnectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const mockAddress = "0x1234...5678";
  const mockBalance = "12.4589";

  const handleConnect = (walletName: string) => {
    setSelectedWallet(walletName);
    // Simulate connection delay
    setTimeout(() => {
      setIsConnected(true);
      setIsOpen(false);
    }, 1500);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setSelectedWallet(null);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText("0x1234567890abcdef1234567890abcdef12345678");
  };

  if (isConnected) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Wallet className="w-4 h-4 mr-2" />
            {mockAddress}
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-slate-900 border-white/20 text-white">
          <DialogHeader>
            <DialogTitle>Wallet Connected</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-300">Address</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyAddress}
                      className="text-gray-300 hover:text-white"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-300 hover:text-white"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="font-mono text-sm mb-3">0x1234567890abcdef1234567890abcdef12345678</div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">ETH Balance</span>
                  <span className="font-semibold">{mockBalance} ETH</span>
                </div>
                <div className="text-sm text-gray-400">≈ $30,567.12</div>
              </CardContent>
            </Card>
            
            <Button
              onClick={handleDisconnect}
              variant="destructive"
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Disconnect Wallet
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
          <Wallet className="w-4 h-4 mr-2" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-white/20 text-white">
        <DialogHeader>
          <DialogTitle>Connect a Wallet</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {WALLETS.map((wallet) => (
            <Card 
              key={wallet.name}
              className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => handleConnect(wallet.name)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{wallet.icon}</span>
                    <div>
                      <div className="font-semibold">{wallet.name}</div>
                      {selectedWallet === wallet.name && (
                        <div className="text-sm text-blue-400">Connecting...</div>
                      )}
                    </div>
                  </div>
                  {wallet.popular && (
                    <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                      Popular
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-sm text-gray-400 text-center mt-4">
          By connecting a wallet, you agree to FluidSwap's Terms of Service and Privacy Policy.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnection;
