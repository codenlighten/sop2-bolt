import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  MarkerType,
  NodeTypes,
  useNodesState,
  useEdgesState,
  Position,
  Handle
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Search, AlertTriangle, ArrowRight, Shield, Database, Building2, Wallet } from 'lucide-react';

interface WalletNode extends Node {
  data: {
    label: string;
    type: 'wallet' | 'exchange' | 'mixer' | 'darkmarket';
    amount: string;
    riskLevel: 'high' | 'medium' | 'low';
  };
}

interface Transaction extends Edge {
  data: {
    amount: string;
    timestamp: string;
  };
}

const CustomNode = ({ data }: { data: WalletNode['data'] }) => {
  const getIcon = () => {
    switch (data.type) {
      case 'exchange':
        return <Building2 className="w-5 h-5" />;
      case 'mixer':
        return <Database className="w-5 h-5" />;
      case 'darkmarket':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Wallet className="w-5 h-5" />;
    }
  };

  const getBgColor = () => {
    switch (data.riskLevel) {
      case 'high':
        return 'bg-red-50 border-red-200';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200';
      case 'low':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getBgColor()} min-w-[200px]`}>
      <Handle type="target" position={Position.Left} id="in" />
      <div className="flex items-center gap-2 mb-2">
        {getIcon()}
        <span className="font-medium">{data.label}</span>
      </div>
      <div className="text-sm">
        <div className="text-gray-600">Amount: {data.amount}</div>
        <div className={`mt-1 text-xs px-2 py-0.5 rounded-full inline-block ${
          data.riskLevel === 'high'
            ? 'bg-red-100 text-red-700'
            : data.riskLevel === 'medium'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-green-100 text-green-700'
        }`}>
          {data.riskLevel.toUpperCase()} RISK
        </div>
      </div>
      <Handle type="source" position={Position.Right} id="out" />
    </div>
  );
};

const nodeTypes: NodeTypes = {
  custom: CustomNode
};

const initialNodes: WalletNode[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 0, y: 100 },
    data: {
      label: 'Source Wallet',
      type: 'wallet',
      amount: '10 BTC',
      riskLevel: 'high'
    }
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 300, y: 0 },
    data: {
      label: 'Mixer Service',
      type: 'mixer',
      amount: '5 BTC',
      riskLevel: 'high'
    }
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 300, y: 200 },
    data: {
      label: 'Exchange A',
      type: 'exchange',
      amount: '3 BTC',
      riskLevel: 'medium'
    }
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 600, y: 100 },
    data: {
      label: 'Dark Market',
      type: 'darkmarket',
      amount: '2 BTC',
      riskLevel: 'high'
    }
  }
];

const initialEdges: Transaction[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    sourceHandle: 'out',
    targetHandle: 'in',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    data: {
      amount: '5 BTC',
      timestamp: '2025-05-01 10:00'
    }
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    sourceHandle: 'out',
    targetHandle: 'in',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    data: {
      amount: '3 BTC',
      timestamp: '2025-05-01 10:05'
    }
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    sourceHandle: 'out',
    targetHandle: 'in',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    data: {
      amount: '2 BTC',
      timestamp: '2025-05-01 10:15'
    }
  }
];

export function MoneyFlowTracker() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<WalletNode | null>(null);
  const [walletAddress, setWalletAddress] = useState('');

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node as WalletNode);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API call to fetch transaction data
    console.log('Searching for wallet:', walletAddress);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Cryptocurrency Money Flow Analysis
        </h3>
        <p className="text-gray-600">
          Track and visualize how cryptocurrency moves between wallets, exchanges, and other services.
          Identify potential money laundering patterns and high-risk transactions.
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="Enter wallet address (e.g., 1A1zP1...QGefi2)"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </form>

      {/* Flow Visualization */}
      <div className="h-[500px] border border-gray-200 rounded-lg mb-6">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      {/* Selected Node Details */}
      {selectedNode && (
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-900 mb-2">
                Entity Analysis: {selectedNode.data.label}
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-blue-900">Current Balance</div>
                  <div className="text-blue-800">{selectedNode.data.amount}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-blue-900">Risk Assessment</div>
                  <div className={`text-sm px-2 py-1 rounded-full inline-block ${
                    selectedNode.data.riskLevel === 'high'
                      ? 'bg-red-100 text-red-700'
                      : selectedNode.data.riskLevel === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                  }`}>
                    {selectedNode.data.riskLevel.toUpperCase()} RISK LEVEL
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-blue-900">Recommended Actions</div>
                  <ul className="space-y-2">
                    {selectedNode.data.riskLevel === 'high' && (
                      <>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                          <span className="text-blue-800">Flag for immediate investigation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                          <span className="text-blue-800">Monitor all connected addresses</span>
                        </li>
                      </>
                    )}
                    {selectedNode.data.riskLevel === 'medium' && (
                      <>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                          <span className="text-blue-800">Continue monitoring transactions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                          <span className="text-blue-800">Review connected wallet patterns</span>
                        </li>
                      </>
                    )}
                    {selectedNode.data.riskLevel === 'low' && (
                      <li className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                        <span className="text-blue-800">Routine monitoring sufficient</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Educational Notes */}
      <div className="mt-8 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-yellow-900">Money Laundering Patterns:</h4>
            <ul className="mt-2 space-y-2">
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                <span className="text-yellow-800">
                  Watch for funds moving through multiple intermediaries in short time periods
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                <span className="text-yellow-800">
                  Mixer services and dark markets are high-risk indicators
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                <span className="text-yellow-800">
                  Multiple small transactions may indicate structuring attempts
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}