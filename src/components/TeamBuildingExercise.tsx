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
import { 
  Database, 
  Shield, 
  Brain, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  Globe,
  Search,
  Users,
  Briefcase,
  Award,
  FileText,
  AlertTriangle,
  Lock,
  Building2
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  skills: string[];
  experience: string[];
  certifications: string[];
  specialties: string[];
  icon: typeof Database;
  availability: 'available' | 'assigned' | 'unavailable';
  location: string;
  languages: string[];
  clearance: 'top_secret' | 'secret' | 'confidential';
  trainingNeeds: string[];
}

const availableMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Blockchain Forensics Expert',
    skills: [
      'Transaction tracing',
      'Wallet clustering',
      'Python scripting',
      'Chainalysis expert',
      'Smart contract analysis',
      'DeFi protocol investigation'
    ],
    experience: [
      '5 years blockchain forensics',
      'Former exchange compliance',
      'Led major ransomware cases',
      'Recovered $10M+ in stolen crypto'
    ],
    certifications: [
      'Certified Blockchain Expert',
      'SANS Cryptocurrency Investigation',
      'Chainalysis Certified Investigator',
      'CFE (Certified Fraud Examiner)'
    ],
    specialties: [
      'DeFi exploit investigation',
      'Cross-chain tracking',
      'Mixer tracing techniques',
      'Asset recovery'
    ],
    icon: Database,
    availability: 'available',
    location: 'New York',
    languages: ['English', 'Mandarin'],
    clearance: 'top_secret',
    trainingNeeds: [
      'Advanced DeFi security',
      'New privacy protocols'
    ]
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    role: 'Cybercrime Investigator',
    skills: [
      'Malware analysis',
      'Dark web operations',
      'Network forensics',
      'OSINT specialist',
      'Cryptocurrency tracing',
      'Digital evidence handling'
    ],
    experience: [
      '8 years cyber investigations',
      'Former FBI cyber division',
      'Military intelligence background',
      'Led dark market takedowns'
    ],
    certifications: [
      'GCFA (GIAC Certified Forensic Analyst)',
      'CISSP',
      'EnCE (EnCase Certified Examiner)',
      'AccessData Certified Examiner'
    ],
    specialties: [
      'Ransomware investigation',
      'Dark market operations',
      'Cryptocurrency crime',
      'Digital forensics'
    ],
    icon: Shield,
    availability: 'available',
    location: 'Washington DC',
    languages: ['English', 'Spanish'],
    clearance: 'top_secret',
    trainingNeeds: [
      'Advanced malware analysis',
      'New ransomware techniques'
    ]
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    role: 'Financial Intelligence Analyst',
    skills: [
      'AML compliance',
      'Risk assessment',
      'Financial modeling',
      'Regulatory reporting',
      'Blockchain analytics',
      'Pattern recognition'
    ],
    experience: [
      '6 years financial crimes',
      'Banking compliance officer',
      'FinCEN regulations expert',
      'International case coordination'
    ],
    certifications: [
      'CAMS (Certified AML Specialist)',
      'CFA (Chartered Financial Analyst)',
      'CFE (Certified Fraud Examiner)',
      'ACAMS Advanced Certification'
    ],
    specialties: [
      'Money laundering detection',
      'Terrorist financing',
      'Sanctions compliance',
      'International cooperation'
    ],
    icon: Brain,
    availability: 'available',
    location: 'Miami',
    languages: ['English', 'Spanish', 'Portuguese'],
    clearance: 'secret',
    trainingNeeds: [
      'DeFi compliance frameworks',
      'New FATF guidelines'
    ]
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Technical Operations Specialist',
    skills: [
      'Hardware wallet forensics',
      'Mobile device analysis',
      'Evidence collection',
      'Data recovery',
      'Chain of custody',
      'Tool development'
    ],
    experience: [
      '7 years digital forensics',
      'Device exploitation expert',
      'Custom tool development',
      'Training program lead'
    ],
    certifications: [
      'GCFE (GIAC Certified Forensic Examiner)',
      'CCFP (Certified Cyber Forensics Professional)',
      'ACE (AccessData Certified Examiner)',
      'Hardware Forensics Specialist'
    ],
    specialties: [
      'Hardware wallet recovery',
      'Mobile forensics',
      'Evidence preservation',
      'Training development'
    ],
    icon: Lock,
    availability: 'available',
    location: 'Los Angeles',
    languages: ['English', 'Korean'],
    clearance: 'secret',
    trainingNeeds: [
      'New hardware wallet models',
      'Advanced mobile forensics'
    ]
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    role: 'Legal & Compliance Advisor',
    skills: [
      'Cryptocurrency law',
      'International cooperation',
      'Evidence admissibility',
      'Regulatory compliance',
      'Case preparation',
      'Policy development'
    ],
    experience: [
      '10 years legal practice',
      'Prosecutor background',
      'International cases',
      'Policy development'
    ],
    certifications: [
      'JD (Juris Doctor)',
      'CAMS (Certified AML Specialist)',
      'Cryptocurrency Law Specialist',
      'International Law Certificate'
    ],
    specialties: [
      'Legal framework development',
      'International cooperation',
      'Evidence preparation',
      'Training programs'
    ],
    icon: Building2,
    availability: 'available',
    location: 'Chicago',
    languages: ['English', 'French'],
    clearance: 'top_secret',
    trainingNeeds: [
      'New crypto regulations',
      'International law updates'
    ]
  }
];

interface Position {
  id: string;
  title: string;
  requirements: string[];
  responsibilities: string[];
  teamSize: number;
  location: string;
  clearanceRequired: 'top_secret' | 'secret' | 'confidential';
  caseTypes: string[];
  skillsRequired: string[];
  certifications: string[];
}

const positions: Position[] = [
  {
    id: 'pos1',
    title: 'Cryptocurrency Crime Unit Lead',
    requirements: [
      'Advanced blockchain analysis',
      'Team leadership experience',
      'Case management expertise',
      'International cooperation'
    ],
    responsibilities: [
      'Lead complex investigations',
      'Coordinate with agencies',
      'Manage team resources',
      'Develop investigation strategy'
    ],
    teamSize: 5,
    location: 'Washington DC',
    clearanceRequired: 'top_secret',
    caseTypes: [
      'Major ransomware',
      'International money laundering',
      'Dark market operations',
      'High-profile fraud'
    ],
    skillsRequired: [
      'Blockchain forensics',
      'Team leadership',
      'Strategic planning',
      'Agency coordination'
    ],
    certifications: [
      'GCFA',
      'CAMS',
      'CFE'
    ]
  },
  {
    id: 'pos2',
    title: 'Technical Operations Manager',
    requirements: [
      'Digital forensics expertise',
      'Tool development experience',
      'Training program management',
      'Evidence handling protocols'
    ],
    responsibilities: [
      'Manage technical operations',
      'Develop forensic procedures',
      'Train team members',
      'Maintain equipment'
    ],
    teamSize: 3,
    location: 'Los Angeles',
    clearanceRequired: 'secret',
    caseTypes: [
      'Hardware wallet forensics',
      'Mobile device analysis',
      'Evidence collection',
      'Tool development'
    ],
    skillsRequired: [
      'Digital forensics',
      'Training development',
      'Technical leadership',
      'Evidence handling'
    ],
    certifications: [
      'GCFE',
      'CCFP',
      'ACE'
    ]
  },
  {
    id: 'pos3',
    title: 'Financial Intelligence Lead',
    requirements: [
      'AML expertise',
      'Financial investigation experience',
      'Regulatory knowledge',
      'International cooperation'
    ],
    responsibilities: [
      'Lead financial analysis',
      'Coordinate with banks',
      'Develop compliance procedures',
      'Train team members'
    ],
    teamSize: 4,
    location: 'Miami',
    clearanceRequired: 'secret',
    caseTypes: [
      'Money laundering',
      'Terrorist financing',
      'Sanctions violations',
      'Financial fraud'
    ],
    skillsRequired: [
      'Financial analysis',
      'AML compliance',
      'Risk assessment',
      'Team coordination'
    ],
    certifications: [
      'CAMS',
      'CFA',
      'CFE'
    ]
  }
];

interface Case {
  id: string;
  title: string;
  type: string;
  description: string;
  requiredSkills: string[];
  teamSize: number;
  duration: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'active' | 'complete';
}

const cases: Case[] = [
  {
    id: 'case1',
    title: 'Major Ransomware Investigation',
    type: 'Ransomware',
    description: 'International ransomware group targeting critical infrastructure',
    requiredSkills: [
      'Blockchain analysis',
      'Malware investigation',
      'International cooperation',
      'Asset recovery'
    ],
    teamSize: 5,
    duration: '6-12 months',
    priority: 'high',
    status: 'pending'
  },
  {
    id: 'case2',
    title: 'Dark Market Takedown',
    type: 'Dark Markets',
    description: 'Major cryptocurrency-based dark market investigation',
    requiredSkills: [
      'Dark web investigation',
      'Blockchain tracing',
      'Financial analysis',
      'International coordination'
    ],
    teamSize: 4,
    duration: '3-6 months',
    priority: 'high',
    status: 'pending'
  },
  {
    id: 'case3',
    title: 'Exchange Hack Investigation',
    type: 'Exchange Security',
    description: 'Investigation of major cryptocurrency exchange breach',
    requiredSkills: [
      'Exchange forensics',
      'Asset tracking',
      'Technical analysis',
      'International cooperation'
    ],
    teamSize: 3,
    duration: '2-4 months',
    priority: 'medium',
    status: 'pending'
  }
];

function DraggableMember({ member, isDragging = false }: { member: TeamMember; isDragging?: boolean }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: member.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const Icon = member.icon;
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
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{member.name}</h3>
          <p className="text-sm text-gray-600">{member.role}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {member.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DroppablePosition({ 
  position, 
  assignedMembers,
  isOver 
}: { 
  position: Position;
  assignedMembers: TeamMember[];
  isOver: boolean;
}) {
  const { setNodeRef } = useDroppable({
    id: position.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 rounded-lg border-2 transition-colors duration-200 ${
        isOver
          ? 'border-blue-400 bg-blue-50'
          : assignedMembers.length > 0
            ? 'border-solid border-gray-200 bg-white'
            : 'border-dashed border-gray-300 bg-gray-50'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium text-gray-900">{position.title}</h4>
        <span className="text-sm text-gray-500">
          {assignedMembers.length} / {position.teamSize} members
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="text-sm text-gray-700">Required Skills:</div>
        <div className="flex flex-wrap gap-1">
          {position.skillsRequired.map((skill, index) => (
            <span
              key={index}
              className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {assignedMembers.map(member => (
          <DraggableMember key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}

export function TeamBuildingExercise({ moduleId = 'team_building' }) {
  const [assignments, setAssignments] = useState<Record<string, string[]>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [showSkillMatch, setShowSkillMatch] = useState(false);
  const [showTeamAnalysis, setShowTeamAnalysis] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
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
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (over) {
      const memberId = active.id as string;
      const positionId = over.id as string;
      const member = availableMembers.find(m => m.id === memberId);
      const position = positions.find(p => p.id === positionId);

      if (member && position) {
        setAssignments(prev => {
          const newAssignments = { ...prev };
          
          // Remove from previous position if exists
          Object.keys(newAssignments).forEach(key => {
            newAssignments[key] = newAssignments[key].filter(id => id !== memberId);
          });
          
          // Add to new position
          if (!newAssignments[positionId]) {
            newAssignments[positionId] = [];
          }
          
          if (newAssignments[positionId].length < position.teamSize) {
            newAssignments[positionId] = [...newAssignments[positionId], memberId];
          }

          // Check if all positions are properly staffed
          const allPositionsStaffed = positions.every(pos => {
            const assigned = newAssignments[pos.id]?.length || 0;
            return assigned === pos.teamSize;
          });

          if (allPositionsStaffed) {
            setIsComplete(true);
            const newScore = calculateTeamScore(newAssignments);
            setScore(newScore);
            updateSimulationScore(moduleId, newScore);
          }

          return newAssignments;
        });
      }
    }
  };

  const calculateTeamScore = (teamAssignments: Record<string, string[]>): number => {
    let totalScore = 0;
    let positionsEvaluated = 0;

    positions.forEach(position => {
      const assignedMembers = (teamAssignments[position.id] || [])
        .map(id => availableMembers.find(m => m.id === id))
        .filter((m): m is TeamMember => m !== undefined);

      if (assignedMembers.length === position.teamSize) {
        // Skill match score
        const skillMatchScore = assignedMembers.reduce((score, member) => {
          const matchedSkills = position.skillsRequired.filter(
            skill => member.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
          ).length;
          return score + (matchedSkills / position.skillsRequired.length);
        }, 0) / assignedMembers.length;

        // Certification match score
        const certMatchScore = assignedMembers.reduce((score, member) => {
          const matchedCerts = position.certifications.filter(
            cert => member.certifications.some(c => c.includes(cert))
          ).length;
          return score + (matchedCerts / position.certifications.length);
        }, 0) / assignedMembers.length;

        // Clearance match score
        const clearanceScore = assignedMembers.every(
          member => member.clearance === position.clearanceRequired
        ) ? 1 : 0;

        // Location match score
        const locationScore = assignedMembers.reduce((score, member) => 
          score + (member.location === position.location ? 1 : 0)
        , 0) / assignedMembers.length;

        const positionScore = (
          skillMatchScore * 0.4 +
          certMatchScore * 0.3 +
          clearanceScore * 0.2 +
          locationScore * 0.1
        ) * 100;

        totalScore += positionScore;
        positionsEvaluated++;
      }
    });

    return positionsEvaluated > 0 ? Math.round(totalScore / positionsEvaluated) : 0;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Crypto Crime Unit Team Building
        </h3>
        <p className="text-gray-600">
          Build effective cryptocurrency crime investigation teams by matching skills,
          experience, and certifications to different roles and cases.
        </p>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Available Team Members */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Available Team Members:</h4>
            <div className="space-y-4">
              {availableMembers.filter(member => 
                !Object.values(assignments).flat().includes(member.id)
              ).map(member => (
                <DraggableMember key={member.id} member={member} />
              ))}
            </div>

            {/* Case Selection */}
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-4">Active Cases:</h4>
              <div className="space-y-4">
                {cases.map(case_ => (
                  <button
                    key={case_.id}
                    className={`w-full p-4 rounded-lg border text-left transition-colors ${
                      selectedCase?.id === case_.id
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedCase(case_)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{case_.title}</h5>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        case_.priority === 'high'
                          ? 'bg-red-100 text-red-700'
                          : case_.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                      }`}>
                        {case_.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{case_.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {case_.requiredSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Team Positions */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Team Positions:</h4>
            <div className="space-y-6">
              {positions.map(position => (
                <DroppablePosition
                  key={position.id}
                  position={position}
                  assignedMembers={
                    (assignments[position.id] || [])
                      .map(id => availableMembers.find(m => m.id === id))
                      .filter((m): m is TeamMember => m !== undefined)
                  }
                  isOver={false}
                />
              ))}
            </div>

            {isComplete && (
              <div className="mt-6 space-y-4">
                <div className={`p-4 rounded-lg ${
                  score >= 90
                    ? 'bg-green-50 border border-green-200'
                    : score >= 70
                      ? 'bg-yellow-50 border border-yellow-200'
                      : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-start gap-3">
                    {score >= 90 ? (
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    ) : score >= 70 ? (
                      <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                    )}
                    <div>
                      <h4 className={`font-medium ${
                        score >= 90
                          ? 'text-green-900'
                          : score >= 70
                            ? 'text-yellow-900'
                            : 'text-red-900'
                      }`}>
                        Team Composition Score: {score}%
                      </h4>
                      <p className={
                        score >= 90
                          ? 'text-green-700'
                          : score >= 70
                            ? 'text-yellow-700'
                            : 'text-red-700'
                      }>
                        {score >= 90
                          ? 'Excellent team composition with strong skill matches!'
                          : score >= 70
                            ? 'Good team composition, but some improvements possible.'
                            : 'Team composition needs significant improvement.'}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowSkillMatch(!showSkillMatch)}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  {showSkillMatch ? 'Hide' : 'Show'} Skill Match Analysis
                </button>

                {showSkillMatch && (
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h5 className="font-medium text-blue-900 mb-3">Skill Match Analysis:</h5>
                    {positions.map(position => {
                      const assignedMembers = (assignments[position.id] || [])
                        .map(id => availableMembers.find(m => m.id === id))
                        .filter((m): m is TeamMember => m !== undefined);

                      return (
                        <div key={position.id} className="mb-4">
                          <h6 className="font-medium text-blue-800">{position.title}</h6>
                          <div className="mt-2 space-y-2">
                            {position.skillsRequired.map((skill, index) => {
                              const matchedMembers = assignedMembers.filter(member =>
                                member.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
                              );

                              return (
                                <div key={index} className="flex items-center gap-2">
                                  {matchedMembers.length > 0 ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-red-600" />
                                  )}
                                  <span className={
                                    matchedMembers.length > 0
                                      ? 'text-green-700'
                                      : 'text-red-700'
                                  }>
                                    {skill}: {matchedMembers.length} team members
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <button
                  onClick={() => setShowTeamAnalysis(!showTeamAnalysis)}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  {showTeamAnalysis ? 'Hide' : 'Show'} Team Analysis
                </button>

                {showTeamAnalysis && (
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <h5 className="font-medium text-purple-900 mb-3">Team Strengths:</h5>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-1" />
                          <span className="text-purple-800">
                            Diverse skill coverage across critical areas
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-1" />
                          <span className="text-purple-800">
                            Strong certifications and qualifications
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-1" />
                          <span className="text-purple-800">
                            Appropriate security clearance levels
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <h5 className="font-medium text-yellow-900 mb-3">Training Needs:</h5>
                      <ul className="space-y-2">
                        {Object.values(assignments).flat().map(id => {
                          const member = availableMembers.find(m => m.id === id);
                          if (!member) return null;
                          return member.trainingNeeds.map((need, index) => (
                            <li key={`${id}-${index}`} className="flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                              <span className="text-yellow-800">
                                {member.name}: {need}
                              </span>
                            </li>
                          ));
                        })}
                      </ul>
                    </div>

                    {selectedCase && (
                      <div className="bg-green-50 rounded-lg p- 4 border border-green-200">
                        <h5 className="font-medium text-green-900 mb-3">Case Readiness Analysis:</h5>
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm font-medium text-green-800 mb-2">Required Skills Coverage:</div>
                            <div className="space-y-2">
                              {selectedCase.requiredSkills.map((skill, index) => {
                                const hasSkill = Object.values(assignments).flat().some(id => {
                                  const member = availableMembers.find(m => m.id === id);
                                  return member?.skills.some(s => 
                                    s.toLowerCase().includes(skill.toLowerCase())
                                  );
                                });

                                return (
                                  <div key={index} className="flex items-center gap-2">
                                    {hasSkill ? (
                                      <CheckCircle className="w-4 h-4 text-green-600" />
                                    ) : (
                                      <XCircle className="w-4 h-4 text-red-600" />
                                    )}
                                    <span className={hasSkill ? 'text-green-700' : 'text-red-700'}>
                                      {skill}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <div>
                            <div className="text-sm font-medium text-green-800 mb-2">Team Size:</div>
                            <div className="flex items-center gap-2">
                              {Object.values(assignments).flat().length >= selectedCase.teamSize ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-600" />
                              )}
                              <span className={
                                Object.values(assignments).flat().length >= selectedCase.teamSize
                                  ? 'text-green-700'
                                  : 'text-red-700'
                              }>
                                {Object.values(assignments).flat().length} / {selectedCase.teamSize} required members
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <DragOverlay>
          {activeId && (
            <DraggableMember
              member={availableMembers.find(m => m.id === activeId)!}
              isDragging={true}
            />
          )}
        </DragOverlay>
      </DndContext>

      {/* Educational Tips */}
      <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-2">Team Building Best Practices:</h4>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Ensure diverse skill coverage across blockchain analysis, cybercrime, and financial investigation
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Consider security clearance requirements for sensitive investigations
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Balance technical expertise with investigative experience
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
            <span className="text-blue-800">
              Plan for ongoing training and skill development
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}