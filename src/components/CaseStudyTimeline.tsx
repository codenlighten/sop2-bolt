import React, { useState } from 'react';
import { Calendar, AlertTriangle, Shield, Database, ArrowRight, FileText, Globe, Lock } from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  details: {
    impact: string;
    investigation: string;
    lessons: string[];
  };
  icon: typeof Calendar;
  transactionData?: {
    amount: string;
    wallet: string;
    status: string;
  };
}

const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    date: 'May 7, 2021',
    title: 'Attack Detected',
    description: 'DarkSide ransomware detected, critical systems shut down',
    details: {
      impact: 'Colonial Pipeline halts 5,500 miles of pipeline operations, affecting fuel supply to East Coast',
      investigation: 'IT team identifies ransomware strain, FBI notified immediately',
      lessons: [
        'Critical infrastructure vulnerability to cyber attacks',
        'Importance of immediate incident response',
        'Need for offline backup systems'
      ]
    },
    icon: AlertTriangle,
    transactionData: {
      amount: '75 BTC demanded',
      wallet: 'bc1q...wn54',
      status: 'Pending Payment'
    }
  },
  {
    id: '2',
    date: 'May 8, 2021',
    title: 'Ransom Payment',
    description: 'Company pays 75 BTC ($4.4 million) ransom',
    details: {
      impact: 'Financial loss, but potential to restore operations quickly',
      investigation: 'FBI begins tracking cryptocurrency transaction',
      lessons: [
        'Cryptocurrency enables quick ransom payments',
        'Transaction traceability on blockchain',
        'Need for corporate crypto payment protocols'
      ]
    },
    icon: Database,
    transactionData: {
      amount: '75 BTC paid',
      wallet: 'bc1q...wn54',
      status: 'Payment Confirmed'
    }
  },
  {
    id: '3',
    date: 'May 12, 2021',
    title: 'Operations Restored',
    description: 'Pipeline operations gradually resume',
    details: {
      impact: 'Fuel delivery restored to East Coast markets',
      investigation: 'Analysis of attack vectors continues',
      lessons: [
        'Balance between payment and resistance',
        'Importance of recovery procedures',
        'Need for better cybersecurity measures'
      ]
    },
    icon: Shield,
    transactionData: {
      amount: '75 BTC tracked',
      wallet: 'Multiple exchanges',
      status: 'Under Surveillance'
    }
  },
  {
    id: '4',
    date: 'June 7, 2021',
    title: 'FBI Recovery',
    description: 'DOJ announces recovery of 63.7 BTC ($2.3 million)',
    details: {
      impact: 'First major ransomware payment recovery',
      investigation: 'FBI traced funds through multiple wallets to seized exchange account',
      lessons: [
        'Blockchain forensics effectiveness',
        'International cooperation importance',
        'Value of patience in crypto investigations'
      ]
    },
    icon: Globe,
    transactionData: {
      amount: '63.7 BTC recovered',
      wallet: 'Seized exchange wallet',
      status: 'Funds Recovered'
    }
  }
];

export function CaseStudyTimeline() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  const handleEventClick = (event: TimelineEvent) => {
    setSelectedEvent(event);
    setExpandedEvent(event.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Colonial Pipeline Ransomware Attack Timeline
        </h3>
        <p className="text-gray-600">
          Explore how this landmark cryptocurrency crime case unfolded and was investigated.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200"></div>
        
        <div className="space-y-8">
          {timelineEvents.map((event) => {
            const Icon = event.icon;
            const isExpanded = expandedEvent === event.id;
            
            return (
              <div key={event.id} className="relative">
                <button
                  className={`relative flex items-start gap-4 p-4 w-full text-left transition-colors rounded-lg ${
                    isExpanded ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleEventClick(event)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isExpanded ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      isExpanded ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <span className="text-sm text-gray-500">{event.date}</span>
                    </div>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </button>

                {isExpanded && (
                  <div className="mt-4 ml-16 space-y-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Impact</h5>
                          <p className="text-gray-600">{event.details.impact}</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Investigation</h5>
                          <p className="text-gray-600">{event.details.investigation}</p>
                        </div>
                      </div>

                      {event.transactionData && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-2">Transaction Data</h5>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <div className="text-gray-500">Amount</div>
                              <div className="font-mono">{event.transactionData.amount}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Wallet</div>
                              <div className="font-mono">{event.transactionData.wallet}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Status</div>
                              <div className="font-medium">{event.transactionData.status}</div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mt-4">
                        <h5 className="font-medium text-gray-900 mb-2">Key Lessons</h5>
                        <ul className="space-y-2">
                          {event.details.lessons.map((lesson, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                              <span className="text-gray-600">{lesson}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Investigation Insight</h4>
            <p className="text-blue-800">
              This case demonstrates how blockchain analysis and international cooperation can
              lead to successful recovery of cryptocurrency ransoms, even after payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}