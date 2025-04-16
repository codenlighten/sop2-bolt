import React, { useState } from 'react';
import { ArrowRight, Database, Lock, Key } from 'lucide-react';

interface Block {
  id: number;
  hash: string;
  prevHash: string;
  timestamp: string;
  transactions: Transaction[];
}

interface Transaction {
  from: string;
  to: string;
  amount: string;
  type: string;
}

export function BlockchainSimulator() {
  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: 1,
      hash: "0x8f7d...3e2a",
      prevHash: "0x0000...0000",
      timestamp: new Date(Date.now() - 600000).toISOString(),
      transactions: [
        {
          from: "0x742d...1a3b",
          to: "0x9f3c...4d2e",
          amount: "0.5 BTC",
          type: "Transfer"
        }
      ]
    },
    {
      id: 2,
      hash: "0x2e1a...9c4b",
      prevHash: "0x8f7d...3e2a",
      timestamp: new Date(Date.now() - 300000).toISOString(),
      transactions: [
        {
          from: "0x9f3c...4d2e",
          to: "0x5e2b...8a1c",
          amount: "0.3 BTC",
          type: "Smart Contract"
        }
      ]
    },
    {
      id: 3,
      hash: "0x6b3c...1d7e",
      prevHash: "0x2e1a...9c4b",
      timestamp: new Date().toISOString(),
      transactions: [
        {
          from: "0x5e2b...8a1c",
          to: "0x3a4d...7f2e",
          amount: "0.2 BTC",
          type: "DeFi Swap"
        }
      ]
    }
  ]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Database className="w-5 h-5 text-blue-600" />
        Live Blockchain Simulation
      </h3>

      <div className="space-y-4">
        {blocks.map((block, index) => (
          <div key={block.id} className="relative">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-gray-900">Block #{block.id}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(block.timestamp).toLocaleString()}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="text-sm font-medium text-gray-500">Hash</div>
                  <div className="font-mono text-sm text-gray-900">{block.hash}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Previous Hash</div>
                  <div className="font-mono text-sm text-gray-900">{block.prevHash}</div>
                </div>
              </div>

              <div className="space-y-3">
                {block.transactions.map((tx, txIndex) => (
                  <div key={txIndex} className="bg-white rounded p-3 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Key className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-900">{tx.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="text-xs text-gray-500">From</div>
                        <div className="font-mono text-sm text-gray-900 truncate">{tx.from}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-xs text-gray-500">To</div>
                        <div className="font-mono text-sm text-gray-900 truncate">{tx.to}</div>
                      </div>
                      <div className="ml-2">
                        <div className="text-xs text-gray-500">Amount</div>
                        <div className="text-sm font-medium text-gray-900">{tx.amount}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {index < blocks.length - 1 && (
              <div className="absolute left-1/2 -translate-x-1/2 h-4 w-px bg-gray-200 my-2" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-2">How to Read This Simulation:</h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full" />
            Each block contains transactions and is linked by its hash
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full" />
            Previous hash ensures chain integrity - changing one block affects all following blocks
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full" />
            Timestamps show when each block was added to the chain
          </li>
        </ul>
      </div>
    </div>
  );
}