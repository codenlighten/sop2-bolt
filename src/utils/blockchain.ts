import { Transaction, Block, WalletEntity } from '../types/blockchain';

/**
 * Calculates a risk score for a cryptocurrency transaction
 * 
 * The risk score is determined by multiple factors:
 * - Transaction amount (higher amounts = higher risk)
 * - Entity type (mixers and dark markets are high risk)
 * - Number of risk indicators
 * 
 * @param {Transaction} transaction - The transaction to analyze
 * @returns {number} Risk score between 0 and 1 (higher = riskier)
 */
export const calculateRiskScore = (transaction: Transaction): number => {
  let score = 0;
  
  // Add risk based on amount
  const amount = parseFloat(transaction.amount.replace(/[^0-9.]/g, ''));
  if (amount > 100000) score += 0.3; // Large transactions over $100k
  else if (amount > 10000) score += 0.2; // Significant transactions over $10k
  
  // Add risk based on entity type
  if (transaction.type === 'mixer') score += 0.4; // Mixing services are high risk
  else if (transaction.type === 'darkmarket') score += 0.4; // Dark markets are high risk
  
  // Add risk based on indicators (0.1 per indicator)
  if (transaction.indicators) {
    score += transaction.indicators.length * 0.1;
  }
  
  // Cap the score at 1.0
  return Math.min(score, 1);
};

/**
 * Determines the risk level category based on a numeric risk score
 * 
 * Risk levels:
 * - High: score >= 0.7
 * - Medium: score >= 0.4
 * - Low: score < 0.4
 * 
 * @param {number} score - Risk score between 0 and 1
 * @returns {'high' | 'medium' | 'low'} Risk level category
 */
export const getRiskLevel = (score: number): 'high' | 'medium' | 'low' => {
  if (score >= 0.7) return 'high';
  if (score >= 0.4) return 'medium';
  return 'low';
};

/**
 * Formats a blockchain address for display by truncating the middle portion
 * 
 * Example:
 * Input: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
 * Output: "0x742d...f44e"
 * 
 * @param {string} address - Full blockchain address
 * @returns {string} Formatted address with middle section truncated
 */
export const formatBlockchainAddress = (address: string): string => {
  if (!address) return '';
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Determines transaction confirmation status based on number of confirmations
 * 
 * Status levels:
 * - pending: 0 confirmations
 * - confirming: 1-5 confirmations
 * - confirmed: 6+ confirmations
 * 
 * @param {number} confirmations - Number of block confirmations
 * @returns {'pending' | 'confirming' | 'confirmed'} Transaction status
 */
export const getTransactionStatus = (confirmations: number): 'pending' | 'confirming' | 'confirmed' => {
  if (confirmations === 0) return 'pending';
  if (confirmations < 6) return 'confirming';
  return 'confirmed';
};

/**
 * Validates a blockchain transaction hash format
 * 
 * @param {string} hash - Transaction hash to validate
 * @returns {boolean} True if hash format is valid
 */
export const isValidTransactionHash = (hash: string): boolean => {
  // Transaction hashes are 64 character hex strings
  const hexPattern = /^[0-9a-fA-F]{64}$/;
  return hexPattern.test(hash);
};

/**
 * Calculates the total value of transactions in a block
 * 
 * @param {Block} block - Block containing transactions
 * @returns {number} Total value in the block's native currency
 */
export const calculateBlockValue = (block: Block): number => {
  return block.transactions.reduce((total, tx) => {
    const amount = parseFloat(tx.amount.replace(/[^0-9.]/g, ''));
    return total + (isNaN(amount) ? 0 : amount);
  }, 0);
};

/**
 * Analyzes a wallet entity for suspicious patterns
 * 
 * Checks for:
 * - High volume of transactions
 * - Interaction with high-risk entities
 * - Unusual transaction patterns
 * 
 * @param {WalletEntity} wallet - Wallet to analyze
 * @returns {string[]} Array of identified risk factors
 */
export const analyzeWalletPatterns = (wallet: WalletEntity): string[] => {
  const riskFactors: string[] = [];

  // Check transaction volume
  if (wallet.transactionCount > 1000) {
    riskFactors.push('High transaction volume');
  }

  // Check for mixer interactions
  if (wallet.mixerInteractions > 0) {
    riskFactors.push('Known mixer service interactions');
  }

  // Check for dark market interactions
  if (wallet.darkMarketInteractions > 0) {
    riskFactors.push('Dark market interactions detected');
  }

  // Check transaction patterns
  if (wallet.structuringIndicators > 3) {
    riskFactors.push('Potential structuring behavior');
  }

  return riskFactors;
};

/**
 * Formats a cryptocurrency amount with proper decimal places
 * 
 * @param {string} amount - Amount to format
 * @param {string} currency - Currency code (e.g., 'BTC', 'ETH')
 * @returns {string} Formatted amount with appropriate decimals
 */
export const formatCryptoAmount = (amount: string, currency: string): string => {
  const value = parseFloat(amount.replace(/[^0-9.]/g, ''));
  if (isNaN(value)) return amount;

  // Different currencies have different decimal standards
  const decimals = {
    BTC: 8,
    ETH: 18,
    USDT: 6
  }[currency] || 8;

  return `${value.toFixed(decimals)} ${currency}`;
};