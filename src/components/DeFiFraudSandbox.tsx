import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle, 
  XCircle, 
  DollarSign, 
  Wallet, 
  BarChart, 
  Zap,
  Scale,
  Shield
} from 'lucide-react';

interface TokenData {
  price: number;
  liquidity: number;
  holders: number;
  totalSupply: number;
}

interface FlashLoanData {
  borrowAmount: number;
  targetDex: string;
  priceImpact: number;
  profitPotential: number;
}

const initialTokenData: TokenData = {
  price: 1.00,
  liquidity: 1000000,
  holders: 1000,
  totalSupply: 1000000
};

const initialFlashLoanData: FlashLoanData = {
  borrowAmount: 100000,
  targetDex: 'DEX A',
  priceImpact: 0.1,
  profitPotential: 500
};

export function DeFiFraudSandbox() {
  const [tokenData, setTokenData] = useState<TokenData>(initialTokenData);
  const [flashLoanData, setFlashLoanData] = useState<FlashLoanData>(initialFlashLoanData);
  const [simulationStep, setSimulationStep] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<'rugpull' | 'flashloan' | null>(null);

  const simulateRugPull = () => {
    setSelectedScenario('rugpull');
    setSimulationStep(0);
    setTokenData(initialTokenData);
  };

  const simulateFlashLoan = () => {
    setSelectedScenario('flashloan');
    setSimulationStep(0);
    setFlashLoanData(initialFlashLoanData);
  };

  const nextStep = () => {
    setSimulationStep(prev => prev + 1);
    
    if (selectedScenario === 'rugpull') {
      switch (simulationStep) {
        case 0:
          setTokenData(prev => ({
            ...prev,
            price: prev.price * 1.5,
            holders: prev.holders + 500
          }));
          break;
        case 1:
          setTokenData(prev => ({
            ...prev,
            price: prev.price * 2,
            holders: prev.holders + 1000,
            liquidity: prev.liquidity * 1.5
          }));
          break;
        case 2:
          setTokenData(prev => ({
            ...prev,
            price: prev.price * 0.1,
            liquidity: prev.liquidity * 0.1
          }));
          break;
      }
    } else if (selectedScenario === 'flashloan') {
      switch (simulationStep) {
        case 0:
          setFlashLoanData(prev => ({
            ...prev,
            borrowAmount: prev.borrowAmount,
            priceImpact: prev.priceImpact * 2
          }));
          break;
        case 1:
          setFlashLoanData(prev => ({
            ...prev,
            profitPotential: prev.profitPotential * 3
          }));
          break;
        case 2:
          setFlashLoanData(prev => ({
            ...prev,
            borrowAmount: 0,
            profitPotential: 0
          }));
          break;
      }
    }
  };

  const renderRugPullSteps = () => {
    const steps = [
      {
        title: 'Initial Hype Phase',
        description: 'Token price increases as marketing creates FOMO',
        indicators: [
          'Rapid price increase',
          'Growing holder count',
          'Social media promotion'
        ]
      },
      {
        title: 'Peak Investment',
        description: 'Maximum liquidity and holder participation reached',
        indicators: [
          'All-time high price',
          'Large number of holders',
          'High trading volume'
        ]
      },
      {
        title: 'Exit Scam',
        description: 'Developers sell holdings and remove liquidity',
        indicators: [
          'Sudden price crash',
          'Liquidity removal',
          'Developer wallets emptied'
        ]
      }
    ];

    return (
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${
              index === simulationStep
                ? 'bg-blue-50 border-blue-200'
                : index < simulationStep
                  ? 'bg-green-50 border-green-200'
                  : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {index < simulationStep ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : index === simulationStep ? (
                <ArrowRight className="w-5 h-5 text-blue-600" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
              )}
              <h4 className="font-medium text-gray-900">{step.title}</h4>
            </div>
            <p className="text-gray-600 mb-2">{step.description}</p>
            <div className="space-y-1">
              {step.indicators.map((indicator, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  <span>{indicator}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderFlashLoanSteps = () => {
    const steps = [
      {
        title: 'Borrow Large Amount',
        description: 'Take flash loan from lending protocol',
        indicators: [
          'No collateral required',
          'Must repay in same transaction',
          'Large borrowing power'
        ]
      },
      {
        title: 'Market Manipulation',
        description: 'Use borrowed funds to impact prices across DEXs',
        indicators: [
          'Price discrepancy created',
          'Multiple DEX interaction',
          'High slippage impact'
        ]
      },
      {
        title: 'Profit Taking',
        description: 'Exploit price differences and repay loan',
        indicators: [
          'Arbitrage execution',
          'Loan repayment',
          'Profit extraction'
        ]
      }
    ];

    return (
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${
              index === simulationStep
                ? 'bg-blue-50 border-blue-200'
                : index < simulationStep
                  ? 'bg-green-50 border-green-200'
                  : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {index < simulationStep ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : index === simulationStep ? (
                <ArrowRight className="w-5 h-5 text-blue-600" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
              )}
              <h4 className="font-medium text-gray-900">{step.title}</h4>
            </div>
            <p className="text-gray-600 mb-2">{step.description}</p>
            <div className="space-y-1">
              {step.indicators.map((indicator, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  <span>{indicator}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          DeFi Fraud Detection Sandbox
        </h3>
        <p className="text-gray-600">
          Explore common DeFi exploits like rug pulls and flash loan attacks.
          Learn to identify warning signs and protect against these threats.
        </p>
      </div>

      {/* Scenario Selection */}
      {!selectedScenario && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <button
            className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 text-left"
            onClick={() => simulateRugPull()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-red-600" />
              </div>
              <h4 className="text-lg font-medium text-gray-900">Rug Pull Simulation</h4>
            </div>
            <p className="text-gray-600">
              Watch how malicious token creators build hype and liquidity before
              suddenly removing funds and crashing the price.
            </p>
          </button>

          <button
            className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 text-left"
            onClick={() => simulateFlashLoan()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
              <h4 className="text-lg font-medium text-gray-900">Flash Loan Attack</h4>
            </div>
            <p className="text-gray-600">
              Learn how attackers use flash loans to manipulate prices across
              multiple DEXs and exploit arbitrage opportunities.
            </p>
          </button>
        </div>
      )}

      {selectedScenario && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Simulation Steps */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Attack Simulation:</h4>
            {selectedScenario === 'rugpull' ? renderRugPullSteps() : renderFlashLoanSteps()}
            
            {simulationStep < 3 && (
              <button
                className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={nextStep}
              >
                Next Step
              </button>
            )}
          </div>

          {/* Live Metrics */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Live Metrics:</h4>
            {selectedScenario === 'rugpull' ? (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500">Token Price</div>
                      <div className="text-2xl font-semibold text-gray-900">
                        ${tokenData.price.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Liquidity</div>
                      <div className="text-2xl font-semibold text-gray-900">
                        ${tokenData.liquidity.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Holders</div>
                      <div className="text-2xl font-semibold text-gray-900">
                        {tokenData.holders.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Total Supply</div>
                      <div className="text-2xl font-semibold text-gray-900">
                        {tokenData.totalSupply.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {simulationStep === 3 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-red-900">Rug Pull Complete</h4>
                        <p className="text-red-700">
                          Developers have removed liquidity and sold their tokens,
                          leaving investors with worthless assets.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500">Borrowed Amount</div>
                      <div className="text-2xl font-semibold text-gray-900">
                        ${flashLoanData.borrowAmount.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Target DEX</div>
                      <div className="text-2xl font-semibold text-gray-900">
                        {flashLoanData.targetDex}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Price Impact</div>
                      <div className="text-2xl font-semibold text-gray-900">
                        {flashLoanData.priceImpact.toFixed(2)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Profit Potential</div>
                      <div className="text-2xl font-semibold text-gray-900">
                        ${flashLoanData.profitPotential.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {simulationStep === 3 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-yellow-900">Flash Loan Attack Complete</h4>
                        <p className="text-yellow-700">
                          Attacker has exploited price differences between DEXs and
                          extracted profit from the protocol.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Prevention Tips */}
            <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Prevention Tips:</h4>
                  <ul className="mt-2 space-y-2">
                    {selectedScenario === 'rugpull' ? (
                      <>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                          <span className="text-blue-800">
                            Check token contract for minting capabilities and ownership
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                          <span className="text-blue-800">
                            Verify liquidity lock periods and vesting schedules
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                          <span className="text-blue-800">
                            Research team background and audit reports
                          </span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                          <span className="text-blue-800">
                            Implement price oracle security measures
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                          <span className="text-blue-800">
                            Use time-weighted average prices (TWAP)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                          <span className="text-blue-800">
                            Add borrowing limits and circuit breakers
                          </span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedScenario && (
        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            onClick={() => {
              setSelectedScenario(null);
              setSimulationStep(0);
            }}
          >
            Reset Simulation
          </button>
        </div>
      )}
    </div>
  );
}