import React, { useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  MarkerType,
  NodeTypes,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import { 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Shield, 
  Database, 
  Building2, 
  Wallet,
  Globe,
  Link,
  FileText,
  Search
} from 'lucide-react';

interface ChainNode extends Node {
  data: {
    label: string;
    type: 'exchange' | 'bridge' | 'wallet' | 'mixer' | 'defi';
    chain: string;
    amount: string;
    riskLevel: 'high' | 'medium' | 'low';
    details?: {
      exchangeInfo?: {
        name: string;
        kyc: boolean;
        jurisdiction: string;
      };
      bridgeInfo?: {
        protocol: string;
        securityAudits: boolean;
      };
      mixerInfo?: {
        service: string;
        knownRisk: string;
      };
    };
  };
}

const initialNodes: ChainNode[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 0, y: 100 },
    data: {
      label: 'Exchange Withdrawal',
      type: 'exchange',
      chain: 'Bitcoin',
      amount: '10 BTC',
      riskLevel: 'medium',
      details: {
        exchangeInfo: {
          name: 'Binance',
          kyc: true,
          jurisdiction: 'Global'
        }
      }
    }
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 250, y: 0 },
    data: {
      label: 'Bridge Transfer',
      type: 'bridge',
      chain: 'Cross-Chain',
      amount: '10 BTC → 150 ETH',
      riskLevel: 'high',
      details: {
        bridgeInfo: {
          protocol: 'RenBridge',
          securityAudits: true
        }
      }
    }
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 250, y: 200 },
    data: {
      label: 'Tornado Cash',
      type: 'mixer',
      chain: 'Ethereum',
      amount: '150 ETH',
      riskLevel: 'high',
      details: {
        mixerInfo: {
          service: 'Tornado Cash',
          knownRisk: 'OFAC Sanctioned'
        }
      }
    }
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 500, y: 100 },
    data: {
      label: 'DeFi Protocol',
      type: 'defi',
      chain: 'Ethereum',
      amount: '150 ETH → 1M USDT',
      riskLevel: 'medium',
      details: {
        bridgeInfo: {
          protocol: 'Uniswap V3',
          securityAudits: true
        }
      }
    }
  },
  {
    id: '5',
    type: 'custom',
    position: { x: 750, y: 100 },
    data: {
      label: 'Final Exchange',
      type: 'exchange',
      chain: 'Multiple',
      amount: '1M USDT',
      riskLevel: 'high',
      details: {
        exchangeInfo: {
          name: 'Unregulated Exchange',
          kyc: false,
          jurisdiction: 'Unknown'
        }
      }
    }
  }
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    label: 'Cross-Chain Bridge',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    animated: true,
    label: 'Mixer',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    animated: true,
    label: 'DeFi Swap',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    animated: true,
    label: 'DeFi Swap',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    animated: true,
    label: 'Exchange Deposit',
    markerEnd: { type: MarkerType.ArrowClosed }
  }
];

const CustomNode = ({ data }: { data: ChainNode['data'] }) => {
  const getIcon = () => {
    switch (data.type) {
      case 'exchange':
        return <Building2 className="w-5 h-5" />;
      case 'bridge':
        return <Link className="w-5 h-5" />;
      case 'mixer':
        return <Database className="w-5 h-5" />;
      case 'defi':
        return <Globe className="w-5 h-5" />;
      default:
        return <Wallet className="w-5 h-5" />;
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${
      data.riskLevel === 'high'
        ? 'bg-red-50 border-red-200'
        : data.riskLevel === 'medium'
          ? 'bg-yellow-50 border-yellow-200'
          : 'bg-green-50 border-green-200'
    } min-w-[200px]`}>
      <div className="flex items-center gap-2 mb-2">
        {getIcon()}
        <span className="font-medium">{data.label}</span>
      </div>
      <div className="text-sm space-y-1">
        <div className="text-gray-600">Chain: {data.chain}</div>
        <div className="text-gray-600">Amount: {data.amount}</div>
        <div className={`mt-2 text-xs px-2 py-0.5 rounded-full inline-block ${
          data.riskLevel === 'high'
            ? 'bg-red-100 text-red-700'
            : data.riskLevel === 'medium'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-green-100 text-green-700'
        }`}>
          {data.riskLevel.toUpperCase()} RISK
        </div>
      </div>
    </div>
  );
};

const nodeTypes: NodeTypes = {
  custom: CustomNode
};

export function CrossChainAnalyzer() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<ChainNode | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNode(node as ChainNode);
    setShowDetails(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Cross-Chain Money Laundering Analysis
        </h3>
        <p className="text-gray-600">
          Visualize and analyze how criminals move funds across different blockchains to obscure
          their origin. Learn to identify high-risk services and common laundering patterns.
        </p>
      </div>

      <div className="h-[500px] border border-gray-200 rounded-lg mb-6">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      {selectedNode && showDetails && (
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">Entity Analysis:</h4>
            {selectedNode.data.details?.exchangeInfo && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">
                    Exchange: {selectedNode.data.details.exchangeInfo.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">
                    KYC Status: {selectedNode.data.details.exchangeInfo.kyc ? 'Verified' : 'None'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">
                    Jurisdiction: {selectedNode.data.details.exchangeInfo.jurisdiction}
                  </span>
                </div>
              </div>
            )}
            {selectedNode.data.details?.bridgeInfo && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Link className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">
                    Protocol: {selectedNode.data.details.bridgeInfo.protocol}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">
                    Security Audits: {selectedNode.data.details.bridgeInfo.securityAudits ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            )}
            {selectedNode.data.details?.mixerInfo && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">
                    Service: {selectedNode.data.details.mixerInfo.service}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="text-red-600">
                    Risk: {selectedNode.data.details.mixerInfo.knownRisk}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-3">Investigation Steps:</h4>
            <ul className="space-y-2">
              {selectedNode.data.type === 'exchange' && (
                <>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                    <span className="text-blue-800">
                      Submit exchange data request for KYC information
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                    <span className="text-blue-800">
                      Track deposit and withdrawal patterns
                    </span>
                  </li>
                </>
              )}
              {selectedNode.data.type === 'bridge' && (
                <>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                    <span className="text-blue-800">
                      Monitor both source and destination chains
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                    <span className="text-blue-800">
                      Analyze bridge smart contract interactions
                    </span>
                  </li>
                </>
              )}
              {selectedNode.data.type === 'mixer' && (
                <>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                    <span className="text-blue-800">
                      Document OFAC compliance implications
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                    <span className="text-blue-800">
                      Track common withdrawal patterns
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-8 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-900">Common Laundering Patterns:</h4>
            <ul className="mt-2 space-y-2">
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                <span className="text-yellow-800">
                  Chain-hopping through multiple bridges to break transaction trails
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                <span className="text-yellow-800">
                  Using mixers on different chains to further obscure origins
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                <span className="text-yellow-800">
                  Converting between different asset types through DeFi protocols
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                <span className="text-yellow-800">
                  Final cashout through unregulated exchanges in lenient jurisdictions
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}