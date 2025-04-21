import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Users, Star, CheckCircle, AlertTriangle, Mail, Building2, Globe } from 'lucide-react';

export function PricingPlans() {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'standard' | 'law-enforcement'>('standard');
  const [showSuccess, setShowSuccess] = useState(false);
  const [department, setDepartment] = useState('');
  const [badgeNumber, setBadgeNumber] = useState('');
  const [preferredLocation, setPreferredLocation] = useState('');
  const [teamSize, setTeamSize] = useState('1');

  const handleMasterclassRequest = () => {
    const subject = encodeURIComponent('Masterclass Reservation Request - Cryptocurrency Crime Investigation');
    const body = encodeURIComponent(`
Dear SmartLedger Team,

I would like to reserve a spot for the upcoming Cryptocurrency Crime Investigation Masterclass.

Professional Details:
- Department/Organization: ${department}
- Badge/ID Number: ${badgeNumber}

Contact Information:
- Name: ${user?.email?.split('@')[0] || ''}
- Email: ${user?.email || ''}

Training Requirements:
- Number of Attendees: ${teamSize}
- Preferred Location: ${preferredLocation || 'Flexible'}

Please provide information about:
1. Upcoming masterclass dates and locations
2. Group discount options
3. Required documentation for law enforcement verification
4. Available payment methods

I look forward to your response and joining the masterclass.

Best regards,
${user?.email?.split('@')[0] || 'Prospective Attendee'}
    `.trim());

    window.location.href = `mailto:YourFriends@smartledger.solutions?subject=${subject}&body=${body}`;
    setShowSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Training Plans
        </h2>
        <p className="mt-4 text-xl text-gray-600">
          Choose the training program that best fits your needs
        </p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mt-8 max-w-md mx-auto">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span>Your email client has been opened with a pre-filled reservation request. Please send the email to complete your reservation.</span>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Self-Paced Course */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Self-Paced Online Course
                </h3>
                <p className="text-gray-500">On-Demand Training</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {/* Plan Selection Tabs */}
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className={`flex-1 py-2 px-4 text-sm font-medium ${
                    selectedPlan === 'standard' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedPlan('standard')}
                >
                  Standard
                </button>
                <button
                  className={`flex-1 py-2 px-4 text-sm font-medium ${
                    selectedPlan === 'law-enforcement' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedPlan('law-enforcement')}
                >
                  Law Enforcement
                </button>
              </div>

              {/* Standard Pricing */}
              {selectedPlan === 'standard' && (
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">Standard Access</h4>
                    <span className="text-2xl font-bold text-gray-900">$500</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Complete course access with standard features and support</p>
                  <div>
                    <stripe-buy-button
                      buy-button-id="buy_btn_1R1XgPRtONmLrAcUD1BhCeP0"
                      publishable-key="pk_live_51PM96FRtONmLrAcUFyuYL2gKeSIVjRhqRPATlfUNMJJ4CEVcEISX8kVLRLOwCoD4t2jBrJQnKtvb4jcUO3vTzTYf006zenj43T"
                    >
                    </stripe-buy-button>
                  </div>
                </div>
              )}

              {/* Law Enforcement Pricing */}
              {selectedPlan === 'law-enforcement' && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-blue-900">Law Enforcement Special Rate</h4>
                    <span className="text-2xl font-bold text-blue-900">$50</span>
                  </div>
                  <p className="text-sm text-blue-700 mb-4">Special pricing for verified law enforcement professionals</p>
                  <div>
                    <stripe-buy-button
                      buy-button-id="buy_btn_1R1Xf3RtONmLrAcUykcNNSIj"
                      publishable-key="pk_live_51PM96FRtONmLrAcUFyuYL2gKeSIVjRhqRPATlfUNMJJ4CEVcEISX8kVLRLOwCoD4t2jBrJQnKtvb4jcUO3vTzTYf006zenj43T"
                    >
                    </stripe-buy-button>
                  </div>
                </div>
              )}
            </div>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Full access to all 10+ interactive modules</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>50+ hands-on exercises</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Self-paced access</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Certification upon completion</span>
              </li>
            </ul>
          </div>
        </div>

        {/* In-Person Masterclass */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  In-Person Masterclass
                </h3>
                <p className="text-gray-500">Advanced Training</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-baseline">
                <span className="text-4xl font-extrabold text-gray-900">
                  $500
                </span>
                <span className="ml-1 text-gray-500">/attendee</span>
              </div>
              <p className="mt-1 text-sm text-green-600">
                Special law enforcement pricing
              </p>
              <p className="mt-1 text-sm text-gray-500">
                <s>$2,500 regular price</s>
              </p>
            </div>

            {/* Additional Information Fields */}
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department/Agency
                </label>
                <div className="relative">
                  <Building2 className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your department"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Badge/ID Number
                </label>
                <div className="relative">
                  <Shield className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    value={badgeNumber}
                    onChange={(e) => setBadgeNumber(e.target.value)}
                    className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your badge number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Location
                </label>
                <div className="relative">
                  <Globe className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <select
                    value={preferredLocation}
                    onChange={(e) => setPreferredLocation(e.target.value)}
                    className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select preferred location</option>
                    <option value="New York">New York</option>
                    <option value="Washington DC">Washington DC</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="Miami">Miami</option>
                    <option value="Chicago">Chicago</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Attendees
                </label>
                <div className="relative">
                  <Users className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <select
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="1">1 Attendee</option>
                    <option value="2-5">2-5 Attendees</option>
                    <option value="6-10">6-10 Attendees</option>
                    <option value="10+">10+ Attendees</option>
                  </select>
                </div>
              </div>
            </div>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Everything in the online course</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Hands-on forensic training with real-world cases</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Private consultation with forensic experts</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Certificate of Advanced Blockchain Investigations</span>
              </li>
            </ul>

            <button
              onClick={handleMasterclassRequest}
              className="mt-8 w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Mail className="w-5 h-5 mr-2" />
              Reserve Your Spot
            </button>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="mt-12 max-w-3xl mx-auto">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Important Notes:</h4>
              <ul className="mt-2 space-y-2 text-blue-800">
                <li>After purchase, you'll receive an access code via email to unlock the course</li>
                <li>Law enforcement pricing requires verification with an official email domain</li>
                <li>In-person masterclass dates and locations will be announced after registration</li>
                <li>Group discounts available for departments sending multiple officers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}