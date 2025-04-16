import React, { useState, useEffect } from 'react';
import { useProgress } from '../context/ProgressContext';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverEvent,
  useDroppable,
  useDraggable
} from '@dnd-kit/core';
import { Database, Hash, Clock, ArrowRight, Binary, CheckCircle } from 'lucide-react';

interface BlockComponent {
  id: string;
  type: 'prevHash' | 'timestamp' | 'nonce' | 'transactions' | 'merkleRoot';
  name: string;
  description: string;
  icon: typeof Database;
}

const blockComponents: BlockComponent[] = [
  {
    id: 'prevHash',
    type: 'prevHash',
    name: 'Previous Block Hash',
    description: 'Links to the previous block in the chain',
    icon: Hash
  },
  {
    id: 'timestamp',
    type: 'timestamp',
    name: 'Timestamp',
    description: 'When the block was created',
    icon: Clock
  },
  {
    id: 'nonce',
    type: 'nonce',
    name: 'Nonce',
    description: 'Number used for mining',
    icon: Binary
  },
  {
    id: 'transactions',
    type: 'transactions',
    name: 'Transactions List',
    description: 'All transactions in this block',
    icon: Database
  },
  {
    id: 'merkleRoot',
    type: 'merkleRoot',
    name: 'Merkle Root',
    description: 'Hash of all transactions',
    icon: Hash
  }
];

interface DroppableZone {
  id: string;
  type: BlockComponent['type'];
  label: string;
}

const droppableZones: DroppableZone[] = [
  { id: 'zone1', type: 'prevHash', label: 'Previous Block Hash' },
  { id: 'zone2', type: 'timestamp', label: 'Block Timestamp' },
  { id: 'zone3', type: 'nonce', label: 'Block Nonce' },
  { id: 'zone4', type: 'transactions', label: 'Transactions' },
  { id: 'zone5', type: 'merkleRoot', label: 'Merkle Root' }
];

function DraggableComponent({ component, isDragging = false }: { component: BlockComponent; isDragging?: boolean }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: component.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const Icon = component.icon;
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-white rounded-lg border ${
        isDragging ? 'border-blue-400 shadow-lg' : 'border-gray-200'
      } p-4 cursor-move transition-all duration-200 hover:shadow-md touch-none`}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <div className="font-medium text-gray-900">{component.name}</div>
          <div className="text-sm text-gray-500">{component.description}</div>
        </div>
      </div>
    </div>
  );
}

function DroppableZone({ 
  zone, 
  placedComponent, 
  isOver 
}: { 
  zone: DroppableZone; 
  placedComponent: BlockComponent | null;
  isOver: boolean;
}) {
  const { setNodeRef } = useDroppable({
    id: zone.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 rounded-lg border-2 transition-colors duration-200 ${
        isOver
          ? 'border-blue-400 bg-blue-50'
          : placedComponent
            ? 'border-solid border-gray-200 bg-white'
            : 'border-dashed border-gray-300 bg-gray-50'
      }`}
    >
      <div className="font-medium text-gray-900 mb-2">{zone.label}</div>
      {placedComponent && (
        <DraggableComponent component={placedComponent} />
      )}
    </div>
  );
}

export function BlockchainPuzzle({ moduleId = 'blockchain_puzzle' }) {
  const [placedComponents, setPlacedComponents] = useState<Record<string, string>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [dragOverZoneId, setDragOverZoneId] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  const { updateSimulationScore } = useProgress();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    })
  );

  useEffect(() => {
    // Check completion status whenever placedComponents changes
    const allCorrect = droppableZones.every(zone => {
      const placedComponent = blockComponents.find(c => c.id === placedComponents[zone.id]);
      return placedComponent?.type === zone.type;
    });

    if (allCorrect && !isComplete) {
      setIsComplete(true);
      const newScore = 100;
      setScore(newScore);
      updateSimulationScore(moduleId, newScore);
    }
  }, [placedComponents, isComplete, moduleId, updateSimulationScore]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    setDragOverZoneId(over ? over.id as string : null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    setDragOverZoneId(null);
    const { active, over } = event;

    if (over) {
      const componentId = active.id as string;
      const zoneId = over.id as string;
      const component = blockComponents.find(c => c.id === componentId);
      const zone = droppableZones.find(z => z.id === zoneId);

      if (component && zone) {
        setPlacedComponents(prev => {
          const newPlaced = { ...prev };
          
          // Remove from previous zone if it exists
          Object.keys(newPlaced).forEach(key => {
            if (newPlaced[key] === componentId) {
              delete newPlaced[key];
            }
          });
          
          // Place in new zone
          newPlaced[zoneId] = componentId;

          return newPlaced;
        });
      }
    }
  };

  const getPlacedComponent = (zoneId: string): BlockComponent | null => {
    const componentId = placedComponents[zoneId];
    return componentId ? blockComponents.find(c => c.id === componentId) || null : null;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Build a Blockchain Block
        </h3>
        <p className="text-gray-600">
          Drag and drop the components to their correct positions in the block structure.
        </p>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {/* Available Components */}
        <div className="mb-8">
          <h4 className="font-medium text-gray-900 mb-4">Available Components:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blockComponents.filter(component => 
              !Object.values(placedComponents).includes(component.id)
            ).map(component => (
              <DraggableComponent key={component.id} component={component} />
            ))}
          </div>
        </div>

        {/* Block Structure */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 mb-4">Block Structure:</h4>
          {droppableZones.map(zone => (
            <DroppableZone
              key={zone.id}
              zone={zone}
              placedComponent={getPlacedComponent(zone.id)}
              isOver={dragOverZoneId === zone.id}
            />
          ))}
        </div>

        <DragOverlay>
          {activeId ? (
            <DraggableComponent
              component={blockComponents.find(c => c.id === activeId)!}
              isDragging={true}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Educational Notes */}
      <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-2">Understanding Block Structure:</h4>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Previous Block Hash links blocks together, creating the chain
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Merkle Root efficiently summarizes all transactions in the block
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Nonce is adjusted during mining to find a valid block hash
            </span>
          </li>
        </ul>
      </div>

      {/* Completion Message */}
      {isComplete && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-green-900">Perfect! Block Complete</h4>
              <p className="text-green-700">
                You've correctly assembled all components of a blockchain block.
                Score: {score}/100
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}