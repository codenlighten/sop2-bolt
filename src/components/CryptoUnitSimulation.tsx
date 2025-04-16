import React, { useState } from 'react';
import { 
  Users, 
  Database, 
  Shield, 
  Brain,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search
} from 'lucide-react';

interface TeamMember {
  id: string;
  role: string;
  skills: string[];
  icon: typeof Users;
  assigned: boolean;
}

interface Case {
  id: string;
  title: string;
  description: string;
  requiredRoles: string[];
  status: 'unsolved' | 'in_progress' | 'solved';
}

const availableMembers: TeamMember[] = [
  {
    id: '1',
    role: 'Blockchain Forensics Expert',
    skills: [
      'Transaction tracing',
      'Wallet clustering',
      'Forensic tools expertise',
      'Data analysis'
    ],
    icon: Database,
    assigned: false
  },
  {
    id: '2',
    role: 'Cybercrime Analyst',
    skills: [
      'Malware analysis',
      'Dark web investigation',
      'OSINT techniques',
      'Network forensics'
    ],
    icon: Shield,
    assigned: false
  },
  {
    id: '3',
    role: 'Financial Investigator',
    skills: [
      'AML compliance',
      'Financial analysis',
      'Asset tracing',
      'Bank liaison'
    ],
    icon: Brain,
    assigned: false
  }
];

const cases: Case[] = [
  {
    id: '1',
    title: 'Ransomware Payment Investigation',
    description: 'Track $500,000 in Bitcoin payments to ransomware operators through multiple mixers.',
    requiredRoles: ['Blockchain Forensics Expert', 'Cybercrime Analyst'],
    status: 'unsolved'
  },
  {
    id: '2',
    title: 'Exchange Hack Analysis',
    description: 'Investigate unauthorized withdrawals from a major cryptocurrency exchange.',
    requiredRoles: ['Blockchain Forensics Expert', 'Financial Investigator'],
    status: 'unsolved'
  },
  {
    id: '3',
    title: 'Dark Market Takedown',
    description: 'Identify operators of a dark web marketplace accepting cryptocurrency payments.',
    requiredRoles: ['Cybercrime Analyst', 'Financial Investigator'],
    status: 'unsolved'
  }
];

export function CryptoUnitSimulation() {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [teamAssignments, setTeamAssignments] = useState<Record<string, string[]>>({});
  const [caseStatuses, setCaseStatuses] = useState<Record<string, Case['status']>>(
    cases.reduce((acc, c) => ({ ...acc, [c.id]: c.status }), {})
  );

  const handleAssignment = (caseId: string, memberId: string) => {
    setTeamAssignments(prev => ({
      ...prev,
      [caseId]: [...(prev[caseId] || []), memberId]
    }));

    // Check if all required roles are assigned
    const currentCase = cases.find(c => c.id === caseId);
    const assignedMembers = [...(teamAssignments[caseId] || []), memberId]
      .map(id => availableMembers.find(m => m.id === id)?.role);
    
    if (currentCase && 
        currentCase.requiredRoles.every(role => assignedMembers.includes(role))) {
      setCaseStatuses(prev => ({
        ...prev,
        [caseId]: 'solved'
      }));
    } else {
      setCaseStatuses(prev => ({
        ...prev,
        [caseId]: 'in_progress'
      }));
    }
  };

  const isAssigned = (memberId: string, caseId: string) => {
    return teamAssignments[caseId]?.includes(memberId);
  };

  const getMemberById = (id: string) => {
    return availableMembers.find(m => m.id === id);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Crypto Crime Unit Simulation
        </h3>
        <p className="text-gray-600">
          Assign team members to cases based on their expertise and required skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cases List */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Active Cases</h4>
          {cases.map((case_) => {
            const status = caseStatuses[case_.id];
            
            return (
              <button
                key={case_.id}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${
                  selectedCase?.id === case_.id
                    ? 'ring-2 ring-blue-500 ring-opacity-50'
                    : ''
                } ${
                  status === 'solved'
                    ? 'bg-green-50 border-green-200'
                    : status === 'in_progress'
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-gray-50 border-gray-200'
                }`}
                onClick={() => setSelectedCase(case_)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900">{case_.title}</h5>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    status === 'solved'
                      ? 'bg-green-100 text-green-700'
                      : status === 'in_progress'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                  }`}>
                    {status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{case_.description}</p>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-900">Required Roles:</div>
                  <div className="flex flex-wrap gap-2">
                    {case_.requiredRoles.map((role, index) => (
                      <span
                        key={index}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Team Assignment */}
        <div>
          {selectedCase ? (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Assign Team Members</h4>
                <div className="space-y-4">
                  {availableMembers.map((member) => {
                    const isAlreadyAssigned = isAssigned(member.id, selectedCase.id);
                    const Icon = member.icon;

                    return (
                      <button
                        key={member.id}
                        className={`w-full text-left p-4 rounded-lg border transition-colors ${
                          isAlreadyAssigned
                            ? 'bg-green-50 border-green-200'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                        onClick={() => !isAlreadyAssigned && handleAssignment(selectedCase.id, member.id)}
                        disabled={isAlreadyAssigned}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-medium text-gray-900">{member.role}</h5>
                              {isAlreadyAssigned && (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              )}
                            </div>
                            <div className="mt-2 space-y-1">
                              {member.skills.map((skill, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                  <span>{skill}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {caseStatuses[selectedCase.id] === 'solved' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div>
                      <h5 className="font-medium text-green-900">Case Team Assembled!</h5>
                      <p className="text-green-700">
                        You've assigned all required roles for this investigation.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Search className="w-8 h-8 mx-auto mb-2" />
                <p>Select a case to assign team members</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}