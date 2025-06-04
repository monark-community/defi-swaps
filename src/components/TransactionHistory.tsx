
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { History, ExternalLink, ArrowUpDown, Plus, Minus, CheckCircle, XCircle, Clock } from "lucide-react";

interface Transaction {
  id: string;
  type: 'swap' | 'add' | 'remove';
  tokenA: string;
  tokenB: string;
  amountA: string;
  amountB: string;
  status: 'completed' | 'failed' | 'pending';
  timestamp: string;
  hash: string;
  gasUsed: string;
  gasFee: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'swap',
    tokenA: 'ETH',
    tokenB: 'USDC',
    amountA: '2.5',
    amountB: '6,125.80',
    status: 'completed',
    timestamp: '2 hours ago',
    hash: '0xabc123...',
    gasUsed: '145,234',
    gasFee: '12.45'
  },
  {
    id: '2',
    type: 'add',
    tokenA: 'ETH',
    tokenB: 'USDC',
    amountA: '1.0',
    amountB: '2,450.32',
    status: 'completed',
    timestamp: '1 day ago',
    hash: '0xdef456...',
    gasUsed: '234,567',
    gasFee: '18.92'
  },
  {
    id: '3',
    type: 'swap',
    tokenA: 'USDT',
    tokenB: 'ETH',
    amountA: '5,000.00',
    amountB: '2.04',
    status: 'failed',
    timestamp: '2 days ago',
    hash: '0xghi789...',
    gasUsed: '98,765',
    gasFee: '8.76'
  },
  {
    id: '4',
    type: 'remove',
    tokenA: 'UNI',
    tokenB: 'ETH',
    amountA: '150.0',
    amountB: '0.52',
    status: 'pending',
    timestamp: '3 days ago',
    hash: '0xjkl012...',
    gasUsed: '187,432',
    gasFee: '15.23'
  }
];

const TransactionHistory = () => {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'swap':
        return <ArrowUpDown className="w-4 h-4" />;
      case 'add':
        return <Plus className="w-4 h-4" />;
      case 'remove':
        return <Minus className="w-4 h-4" />;
      default:
        return <ArrowUpDown className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-600/20 text-green-300';
      case 'failed':
        return 'bg-red-600/20 text-red-300';
      case 'pending':
        return 'bg-yellow-600/20 text-yellow-300';
      default:
        return 'bg-gray-600/20 text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Transaction Summary */}
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <History className="w-5 h-5" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-gray-300 text-sm mb-1">Total Transactions</div>
              <div className="text-2xl font-bold text-white">{MOCK_TRANSACTIONS.length}</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-gray-300 text-sm mb-1">Total Volume</div>
              <div className="text-2xl font-bold text-white">$24,567</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-gray-300 text-sm mb-1">Gas Fees Paid</div>
              <div className="text-2xl font-bold text-white">$55.36</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-gray-300 text-sm mb-1">Success Rate</div>
              <div className="text-2xl font-bold text-green-400">75%</div>
            </div>
          </div>

          {/* Transaction List */}
          <div className="space-y-4">
            {MOCK_TRANSACTIONS.map((tx, index) => (
              <div key={tx.id}>
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                          {getTransactionIcon(tx.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-white capitalize">
                              {tx.type === 'add' ? 'Add Liquidity' : 
                               tx.type === 'remove' ? 'Remove Liquidity' : 'Swap'}
                            </span>
                            <Badge variant="secondary" className={getStatusColor(tx.status)}>
                              {getStatusIcon(tx.status)}
                              <span className="ml-1 capitalize">{tx.status}</span>
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-400">
                            {tx.amountA} {tx.tokenA} → {tx.amountB} {tx.tokenB}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {tx.timestamp} • Gas: ${tx.gasFee}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-300 hover:text-white"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Transaction Details */}
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Hash:</span>
                          <div className="text-white font-mono">{tx.hash}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Gas Used:</span>
                          <div className="text-white">{tx.gasUsed}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Gas Fee:</span>
                          <div className="text-white">${tx.gasFee}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {index < MOCK_TRANSACTIONS.length - 1 && (
                  <Separator className="bg-white/10 my-4" />
                )}
              </div>
            ))}
          </div>

          {MOCK_TRANSACTIONS.length === 0 && (
            <div className="text-center py-12">
              <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <div className="text-gray-400 text-lg mb-2">No transactions yet</div>
              <div className="text-gray-500">Your transaction history will appear here</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionHistory;
