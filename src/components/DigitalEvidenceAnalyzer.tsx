import React, { useState } from 'react';
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
import { HardDrive, Smartphone, FileText, Key, AlertTriangle, CheckCircle, XCircle, ArrowRight, Shield } from 'lucide-react';

interface EvidenceItem {
  id: string;
  type: 'hardware_wallet' | 'mobile_device' | 'paper_wallet' | 'seed_phrase';
  name: string;
  description: string;
  imageUrl: string;
  handlingInstructions: string[];
  icon: typeof HardDrive;
}

const evidenceItems: EvidenceItem[] = [
  {
    id: 'ledger',
    type: 'hardware_wallet',
    name: 'Ledger Nano X',
    description: 'Hardware cryptocurrency wallet found on desk',
    imageUrl: 'https://sentinelnode.online/wp-content/uploads/2025/03/DALL·E-2025-03-06-15.41.40-A-professional-studio-photograph-of-a-Ledger-Nano-X-cryptocurrency-hardware-wallet-on-a-white-background.-The-device-is-sleek-modern-and-slightly-op.webp',
    handlingInstructions: [
      'Photograph in original location',
      'Document serial number',
      'Place in anti-static bag',
      'Do not attempt to power on'
    ],
    icon: HardDrive
  },
  {
    id: 'phone',
    type: 'mobile_device',
    name: 'Mobile Phone with Crypto Apps',
    description: 'Unlocked smartphone showing crypto wallet applications',
    imageUrl: 'https://sentinelnode.online/wp-content/uploads/2025/03/DALL·E-2025-03-06-15.41.29-A-professional-studio-photograph-of-a-modern-mobile-phone-on-a-white-background.-The-phone-has-a-sleek-minimalistic-design-with-a-large-edge-to-edge-.webp',
    handlingInstructions: [
      'Enable airplane mode immediately',
      'Screenshot visible apps',
      'Document wallet addresses',
      'Place in Faraday bag'
    ],
    icon: Smartphone
  },
  {
    id: 'paper_wallet',
    type: 'paper_wallet',
    name: 'Paper Wallet',
    description: 'Paper containing QR codes and public/private keys',
    imageUrl: 'https://sentinelnode.online/wp-content/uploads/2025/03/DALL·E-2025-03-06-15.41.37-A-professional-studio-photograph-of-a-cryptocurrency-paper-wallet-on-a-white-background.-The-wallet-is-a-printed-document-featuring-a-QR-code-and-alph.webp',
    handlingInstructions: [
      'Photograph before handling',
      'Handle with gloves',
      'Store in evidence bag',
      'Document all visible codes'
    ],
    icon: FileText
  },
  {
    id: 'seed_phrase',
    type: 'seed_phrase',
    name: 'Recovery Seed Phrase',
    description: 'Handwritten list of 12-24 words for wallet recovery',
    imageUrl: 'https://sentinelnode.online/wp-content/uploads/2025/03/DALL·E-2025-03-06-15.41.33-A-professional-studio-photograph-of-a-cryptocurrency-recovery-seed-phrase-backup-card-on-a-white-background.-The-card-is-metallic-or-sturdy-paper-fea.webp',
    handlingInstructions: [
      'Photograph in place',
      'Document word sequence',
      'Check for duplicates',
      'Preserve original order'
    ],
    icon: Key
  }
];

interface Category {
  id: string;
  type: EvidenceItem['type'];
  name: string;
  description: string;
}

const categories: Category[] = [
  {
    id: 'cat_hardware',
    type: 'hardware_wallet',
    name: 'Hardware Wallets',
    description: 'Physical devices storing cryptocurrency'
  },
  {
    id: 'cat_mobile',
    type: 'mobile_device',
    name: 'Mobile Devices',
    description: 'Phones and tablets with crypto applications'
  },
  {
    id: 'cat_paper',
    type: 'paper_wallet',
    name: 'Paper Wallets',
    description: 'Physical documents with crypto keys'
  },
  {
    id: 'cat_seed',
    type: 'seed_phrase',
    name: 'Seed Phrases',
    description: 'Recovery words for wallet access'
  }
];

function DraggableItem({ item, isDragging }: { item: EvidenceItem; isDragging?: boolean }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const Icon = item.icon;
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-white rounded-lg border ${
        isDragging ? 'border-blue-400 shadow-lg' : 'border-gray-200'
      } overflow-hidden cursor-move transition-all duration-200 hover:shadow-md touch-none`}
    >
      <div className="relative aspect-video">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-contain"
          draggable={false}
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-5 h-5 text-blue-600" />
          <h3 className="font-medium text-gray-900">{item.name}</h3>
        </div>
        <p className="text-sm text-gray-600">{item.description}</p>
      </div>
    </div>
  );
}

function DroppableCategory({ 
  category, 
  items, 
  isOver 
}: { 
  category: Category; 
  items: string[];
  isOver: boolean;
}) {
  const { setNodeRef } = useDroppable({
    id: category.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 rounded-lg border-2 transition-colors duration-200 ${
        isOver
          ? 'border-blue-400 bg-blue-50'
          : 'border-dashed border-gray-300 bg-gray-50'
      }`}
    >
      <h4 className="font-medium text-gray-900 mb-2">{category.name}</h4>
      <p className="text-sm text-gray-600 mb-4">{category.description}</p>
      <div className="space-y-4 min-h-[100px]">
        {items.map(itemId => {
          const item = evidenceItems.find(i => i.id === itemId);
          if (!item) return null;
          
          const isCorrect = item.type === category.type;
          return (
            <div
              key={itemId}
              className={`relative ${
                isCorrect ? 'bg-green-50' : 'bg-red-50'
              } rounded-lg p-2 transition-all duration-200`}
            >
              <DraggableItem item={item} />
              {isCorrect ? (
                <CheckCircle className="absolute top-2 right-2 w-6 h-6 text-green-600" />
              ) : (
                <XCircle className="absolute top-2 right-2 w-6 h-6 text-red-600" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DigitalEvidenceAnalyzer({ moduleId = 'evidence_analyzer' }) {
  const [categorizedItems, setCategorizedItems] = useState<Record<string, string[]>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<EvidenceItem | null>(null);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [dragOverCategory, setDragOverCategory] = useState<string | null>(null);
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

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setSelectedItem(evidenceItems.find(item => item.id === event.active.id) || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    setDragOverCategory(over ? over.id as string : null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    setDragOverCategory(null);
    const { active, over } = event;

    if (over) {
      const itemId = active.id as string;
      const categoryId = over.id as string;
      const item = evidenceItems.find(i => i.id === itemId);
      const category = categories.find(c => c.id === categoryId);

      if (item && category) {
        setCategorizedItems(prev => {
          const newCategorized = { ...prev };
          
          // Remove item from previous category if it exists
          Object.keys(newCategorized).forEach(catId => {
            newCategorized[catId] = newCategorized[catId]?.filter(id => id !== itemId) || [];
          });

          // Add to new category
          newCategorized[categoryId] = [...(newCategorized[categoryId] || []), itemId];

          // Check if all items are correctly categorized
          const allCorrect = evidenceItems.every(item => {
            const placedInCategory = Object.entries(newCategorized).find(
              ([catId, items]) => items.includes(item.id)
            );
            if (!placedInCategory) return false;
            const category = categories.find(c => c.id === placedInCategory[0]);
            return category?.type === item.type;
          });

          if (allCorrect) {
            setIsComplete(true);
            const newScore = 100;
            setScore(newScore);
            updateSimulationScore(moduleId, newScore);
          }

          return newCategorized;
        });
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Digital Evidence Classification
        </h3>
        <p className="text-gray-600">
          Drag and drop evidence items into their correct categories. Learn proper handling
          procedures for each type of digital evidence.
        </p>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {/* Available Evidence */}
        <div className="mb-8">
          <h4 className="font-medium text-gray-900 mb-4">Available Evidence:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {evidenceItems.filter(item => 
              !Object.values(categorizedItems).flat().includes(item.id)
            ).map(item => (
              <DraggableItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Evidence Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map(category => (
            <DroppableCategory
              key={category.id}
              category={category}
              items={categorizedItems[category.id] || []}
              isOver={dragOverCategory === category.id}
            />
          ))}
        </div>

        <DragOverlay>
          {activeId && (
            <DraggableItem
              item={evidenceItems.find(i => i.id === activeId)!}
              isDragging={true}
            />
          )}
        </DragOverlay>
      </DndContext>

      {/* Selected Item Details */}
      {selectedItem && (
        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-900 mb-2">
                Handling Instructions: {selectedItem.name}
              </h4>
              <ul className="space-y-2">
                {selectedItem.handlingInstructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                    <span className="text-blue-800">{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Completion Message */}
      {isComplete && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-green-900">Perfect! Classification Complete</h4>
              <p className="text-green-700">
                You've correctly classified all digital evidence items.
                Score: {score}/100
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}