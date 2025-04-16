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
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Search, AlertTriangle, ArrowRight, Shield, Database, Building2, Wallet, Clock, Hash, FileText } from 'lucide-react';

interface BlockNode extends Node {
  data: {
    label: string;
    type: 'block' | 'transaction' | 'info';
    hash?: string;
    prevHash?: string;
    timestamp?: string;
    nonce?: string;
    merkleRoot?: string;
    transactions?: Transaction[];
  };
}

interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: string;
  timestamp: string;
}

const CustomBlockNode = ({ data }: { data: BlockNode['data'] }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[300px]">
      <div className="flex items-center gap-2 mb-3">
        <Database className="w-5 h-5 text-blue-600" />
        <h3 className="font-medium text-gray-900">Block</h3>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-mono text-gray-600">{data.hash}</span>
        </div>
        <div className="flex items-center gap-2">
          <ArrowRight className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-mono text-gray-600">{data.prevHash}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">{data.timestamp}</span>
        </div>
        {data.transactions && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="text-sm font-medium text-gray-700 mb-2">Transactions:</div>
            {data.transactions.map((tx, index) => (
              <div key={index} className="text-xs bg-gray-50 rounded p-2 mb-2">
                <div className="flex items-center gap-1">
                  <Wallet className="w-3 h-3 text-gray-500" />
                  <span className="font-mono">{tx.from.substring(0, 8)}...</span>
                  <ArrowRight className="w-3 h-3 text-gray-500" />
                  <span className="font-mono">{tx.to.substring(0, 8)}...</span>
                </div>
                <div className="mt-1 text-gray-600">{tx.amount}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CustomInfoNode = ({ data }: { data: { label: string; description: string } }) => {
  return (
    <div className="bg-blue-50 rounded-lg border border-blue-200 p-4 max-w-[250px]">
      <div className="flex items-center gap-2 mb-2">
        <Shield className="w-5 h-5 text-blue-600" />
        <h3 className="font-medium text-blue-900">{data.label}</h3>
      </div>
      <p className="text-sm text-blue-800">{data.description}</p>
    </div>
  );
};

const nodeTypes: NodeTypes = {
  block: CustomBlockNode,
  info: CustomInfoNode
};

const initialNodes: BlockNode[] = [
  {
    id: 'block1',
    type: 'block',
    position: { x: 0, y: 0 },
    data: {
      type: 'block',
      hash: '0x8f7d3e2a1b4c5d6e',
      prevHash: '0x0000000000000000',
      timestamp: '2025-03-01 10:00:00',
      transactions: [
        {
          id: '1',
          from: '0x742d1a3b4c5d6e7f',
          to: '0x9f3c4d2e5b6a7c8d',
          amount: '0.5 BTC',
          timestamp: '2025-03-01 09:55:00'
        }
      ]
    }
  },
  {
    id: 'block2',
    type: 'block',
    position: { x: 400, y: 0 },
    data: {
      type: 'block',
      hash: '0x2e1a9c4b8d7f6e5a',
      prevHash: '0x8f7d3e2a1b4c5d6e',
      timestamp: '2025-03-01 10:15:00',
      transactions: [
        {
          id: '2',
          from: '0x9f3c4d2e5b6a7c8d',
          to: '0x5e2b8a1c7d4f3e9b',
          amount: '0.3 BTC',
          timestamp: '2025-03-01 10:10:00'
        }
      ]
    }
  },
  {
    id: 'block3',
    type: 'block',
    position: { x: 800, y: 0 },
    data: {
      type: 'block',
      hash: '0x6b3c1d7e9a4f2e8b',
      prevHash: '0x2e1a9c4b8d7f6e5a',
      timestamp: '2025-03-01 10:30:00',
      transactions: [
        {
          id: '3',
          from: '0x5e2b8a1c7d4f3e9b',
          to: '0x3a4d7f2e8b1c5d9a',
          amount: '0.2 BTC',
          timestamp: '2025-03-01 10:25:00'
        }
      ]
    }
  },
  {
    id: 'info1',
    type: 'info',
    position: { x: 200, y: -150 },
    data: {
      type: 'info',
      label: 'Block Chain',
      description: 'Each block contains transactions and links to the previous block via its hash, forming an immutable chain.'
    }
  },
  {
    id: 'info2',
    type: 'info',
    position: { x: 600, y: -150 },
    data: {
      type: 'info',
      label: 'Transaction Flow',
      description: 'Follow the money trail through multiple transactions and blocks to identify patterns and connections.'
    }
  }
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: 'block1',
    target: 'block2',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#3b82f6' }
  },
  {
    id: 'e2-3',
    source: 'block2',
    target: 'block3',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#3b82f6' }
  }
];

export function BlockchainVisualizer() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<BlockNode | null>(null);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node as BlockNode);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Interactive Blockchain Explorer
        </h3>
        <p className="text-gray-600">
          Visualize how transactions are stored in blocks and how blocks are linked together.
          Click on blocks to see detailed information.
        </p>
      </div>

      <div className="h-[600px] border border-gray-200 rounded-lg mb-6">
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

      {selectedNode && selectedNode.data.type === 'block' && (
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-900 mb-2">
                Block Analysis
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-blue-900">Block Hash</div>
                  <div className="font-mono text-sm text-blue-800">{selectedNode.data.hash}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-blue-900">Previous Block</div>
                  <div className="font-mono text-sm text-blue-800">{selectedNode.data.prevHash}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-blue-900">Timestamp</div>
                  <div className="text-sm text-blue-800">{selectedNode.data.timestamp}</div>
                </div>
                {selectedNode.data.transactions && (
                  <div>
                    <div className="text-sm font-medium text-blue-900 mb-2">Transactions</div>
                    <div className="space-y-2">
                      {selectedNode.data.transactions.map((tx, index) => (
                        <div key={index} className="bg-white rounded p-3 border border-blue-200">
                          <div className="flex items-center gap-2 mb-1">
                            <Wallet className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-blue-900">Transaction {index + 1}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <div className="text-blue-800">From:</div>
                              <div className="font-mono text-blue-900">{tx.from}</div>
                            </div>
                            <div>
                              <div className="text-blue-800">To:</div>
                              <div className="font-mono text-blue-900">{tx.to}</div>
                            </div>
                            <div>
                              <div className="text-blue-800">Amount:</div>
                              <div className="text-blue-900">{tx.amount}</div>
                            </div>
                            <div>
                              <div className="text-blue-800">Time:</div>
                              <div className="text-blue-900">{tx.timestamp}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-900">Investigation Tips:</h4>
            <ul className="mt-2 space-y-2">
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                <span className="text-yellow-800">
                  Follow transaction flows through multiple blocks to identify patterns
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                <span className="text-yellow-800">
                  Look for connections between wallet addresses across different transactions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                <span className="text-yellow-800">
                  Use timestamps to establish transaction timelines and relationships
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}