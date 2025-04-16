import React, { useState } from 'react';
import { Gavel, AlertTriangle, CheckCircle, XCircle, ArrowRight, FileText, Scale, Shield } from 'lucide-react';

interface Case {
  id: string;
  title: string;
  description: string;
  evidence: {
    type: string;
    description: string;
    blockchainData: string;
  };
  defenseArguments: Array<{
    id: string;
    argument: string;
    responses: Array<{
      id: string;
      text: string;
      isCorrect: boolean;
      explanation: string;
    }>;
  }>;
}

const cases: Case[] = [
  {
    id: '1',
    title: 'Cryptocurrency Money Laundering Case',
    description: 'Prosecution presents evidence of funds moving through multiple wallets and mixers.',
    evidence: {
      type: 'Blockchain Transaction Records',
      description: 'Transaction trail showing funds moving from identified criminal wallet through multiple addresses',
      blockchainData: 'Transaction 0xABC → Suspect Wallet → Mixer → Exchange'
    },
    defenseArguments: [
      {
        id: 'ownership',
        argument: 'The wallet could belong to anyone. How can you prove my client owns it?',
        responses: [
          {
            id: 'r1',
            text: 'The blockchain is public, anyone could own this wallet.',
            isCorrect: false,
            explanation: 'This response concedes the defense\'s point without presenting evidence.'
          },
          {
            id: 'r2',
            text: 'KYC records from the exchange and IP logs link the wallet to the defendant.',
            isCorrect: true,
            explanation: 'This response provides concrete evidence connecting the wallet to the defendant.'
          },
          {
            id: 'r3',
            text: 'The defendant must prove they don\'t own it.',
            isCorrect: false,
            explanation: 'This incorrectly shifts the burden of proof to the defendant.'
          }
        ]
      },
      {
        id: 'tampering',
        argument: 'Blockchain data can be manipulated. How do we know this evidence is reliable?',
        responses: [
          {
            id: 'r4',
            text: 'The immutable nature of blockchain makes tampering impossible without massive computing power.',
            isCorrect: true,
            explanation: 'This explains the technical security of blockchain evidence.'
          },
          {
            id: 'r5',
            text: 'We have a witness who saw the transactions.',
            isCorrect: false,
            explanation: 'Witness testimony is not relevant to blockchain immutability.'
          },
          {
            id: 'r6',
            text: 'The evidence speaks for itself.',
            isCorrect: false,
            explanation: 'This fails to address the specific concern about data integrity.'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'NFT Fraud Investigation',
    description: 'Defendant accused of selling fake NFTs through compromised marketplace.',
    evidence: {
      type: 'Smart Contract Analysis',
      description: 'Forensic analysis of smart contract showing unauthorized modifications',
      blockchainData: 'Contract 0xDEF deployed with malicious code'
    },
    defenseArguments: [
      {
        id: 'contract_understanding',
        argument: 'Smart contracts are complex. How can the jury understand this evidence?',
        responses: [
          {
            id: 'r7',
            text: 'Our expert will explain the key concepts in simple terms.',
            isCorrect: true,
            explanation: 'This addresses the complexity while ensuring evidence is accessible.'
          },
          {
            id: 'r8',
            text: 'The jury doesn\'t need to understand the technical details.',
            isCorrect: false,
            explanation: 'This dismisses legitimate concerns about evidence comprehension.'
          }
        ]
      }
    ]
  }
];

export function CrossExaminationGame() {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [currentArgument, setCurrentArgument] = useState(0);
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);

  const handleCaseSelect = (case_: Case) => {
    setSelectedCase(case_);
    setCurrentArgument(0);
    setSelectedResponse(null);
    setShowResult(false);
  };

  const handleResponseSubmit = () => {
    if (!selectedCase || !selectedResponse) return;

    const argument = selectedCase.defenseArguments[currentArgument];
    const response = argument.responses.find(r => r.id === selectedResponse);

    if (response?.isCorrect) {
      setScore(prev => prev + 1);
    }
    setTotalAttempts(prev => prev + 1);
    setShowResult(true);
  };

  const handleNextArgument = () => {
    if (!selectedCase) return;
    
    if (currentArgument < selectedCase.defenseArguments.length - 1) {
      setCurrentArgument(prev => prev + 1);
      setSelectedResponse(null);
      setShowResult(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Courtroom Cross-Examination Training
        </h3>
        <p className="text-gray-600">
          Practice defending blockchain evidence against common defense arguments.
          Select appropriate responses to strengthen your case.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Case Selection */}
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Select a Case:</h4>
          <div className="space-y-4">
            {cases.map(case_ => (
              <button
                key={case_.id}
                className={`w-full p-4 text-left rounded-lg border transition-colors ${
                  selectedCase?.id === case_.id
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
                onClick={() => handleCaseSelect(case_)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Gavel className="w-5 h-5 text-blue-600" />
                  <h5 className="font-medium text-gray-900">{case_.title}</h5>
                </div>
                <p className="text-sm text-gray-600">{case_.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Cross-Examination */}
        <div>
          {selectedCase ? (
            <div className="space-y-6">
              {/* Evidence Presentation */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Evidence:</h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-500">Type</div>
                    <div className="text-gray-900">{selectedCase.evidence.type}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Description</div>
                    <div className="text-gray-900">{selectedCase.evidence.description}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Blockchain Data</div>
                    <div className="font-mono text-sm text-gray-900">{selectedCase.evidence.blockchainData}</div>
                  </div>
                </div>
              </div>

              {/* Defense Argument */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Defense Argument:</h4>
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                    <p className="text-yellow-800">
                      {selectedCase.defenseArguments[currentArgument].argument}
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Options */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Your Response:</h4>
                <div className="space-y-3">
                  {selectedCase.defenseArguments[currentArgument].responses.map(response => (
                    <button
                      key={response.id}
                      className={`w-full p-4 text-left rounded-lg border transition-colors ${
                        selectedResponse === response.id
                          ? 'bg-blue-50 border-blue-200'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedResponse(response.id)}
                      disabled={showResult}
                    >
                      {response.text}
                    </button>
                  ))}
                </div>

                {!showResult && (
                  <button
                    className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleResponseSubmit}
                    disabled={!selectedResponse}
                  >
                    Submit Response
                  </button>
                )}
              </div>

              {/* Results */}
              {showResult && selectedResponse && (
                <div>
                  {selectedCase.defenseArguments[currentArgument].responses.find(
                    r => r.id === selectedResponse
                  )?.isCorrect ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-green-900">Excellent Response!</h4>
                          <p className="text-green-700">
                            {selectedCase.defenseArguments[currentArgument].responses.find(
                              r => r.id === selectedResponse
                            )?.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-red-900">Could Be Stronger</h4>
                          <p className="text-red-700">
                            {selectedCase.defenseArguments[currentArgument].responses.find(
                              r => r.id === selectedResponse
                            )?.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentArgument < selectedCase.defenseArguments.length - 1 && (
                    <button
                      className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      onClick={handleNextArgument}
                    >
                      Next Argument
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Scale className="w-8 h-8 mx-auto mb-2" />
                <p>Select a case to begin cross-examination</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Score */}
      <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Performance</h4>
            <p className="text-blue-800">
              Successful Arguments: {score} / {totalAttempts}
              {totalAttempts > 0 && ` (${Math.round((score / totalAttempts) * 100)}%)`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}