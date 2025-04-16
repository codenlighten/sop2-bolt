/**
 * Represents a cryptocurrency transaction
 */
export interface Transaction {
  /** Unique transaction hash */
  hash: string;
  /** Source wallet or entity */
  from: string;
  /** Destination wallet or entity */
  to: string;
  /** Transaction amount with currency unit */
  amount: string;
  /** Transaction type classification */
  type: 'transfer' | 'mixer' | 'exchange' | 'darkmarket';
  /** ISO timestamp of the transaction */
  timestamp: string;
  /** Number of block confirmations */
  confirmations: number;
  /** Transaction fee paid */
  fee: string;
  /** Risk indicators associated with the transaction */
  indicators?: string[];
  /** Additional metadata about the transaction */
  metadata?: {
    /** Exchange name if applicable */
    exchange?: string;
    /** Service name for mixer transactions */
    service?: string;
    /** Notes from analysis */
    notes?: string[];
  };
}

/**
 * Represents a block in the blockchain
 */
export interface Block {
  /** Block hash */
  hash: string;
  /** Previous block hash */
  previousHash: string;
  /** Block height/number */
  height: number;
  /** ISO timestamp of block creation */
  timestamp: string;
  /** Transactions included in this block */
  transactions: Transaction[];
  /** Block size in bytes */
  size: number;
  /** Block difficulty target */
  difficulty: number;
  /** Miner/validator address */
  miner: string;
  /** Total fees collected in this block */
  fees: string;
}

/**
 * Represents a wallet or entity on the blockchain
 */
export interface WalletEntity {
  /** Wallet address */
  address: string;
  /** Entity type classification */
  type: 'individual' | 'exchange' | 'mixer' | 'merchant' | 'unknown';
  /** Total number of transactions */
  transactionCount: number;
  /** First seen timestamp */
  firstSeen: string;
  /** Last seen timestamp */
  lastSeen: string;
  /** Total value received */
  totalReceived: string;
  /** Total value sent */
  totalSent: string;
  /** Current balance */
  balance: string;
  /** Number of interactions with mixing services */
  mixerInteractions: number;
  /** Number of interactions with dark markets */
  darkMarketInteractions: number;
  /** Indicators of transaction structuring */
  structuringIndicators: number;
  /** Known labels or tags */
  labels?: string[];
  /** Risk score between 0 and 1 */
  riskScore?: number;
}

/**
 * Represents a cryptocurrency exchange
 */
export interface Exchange {
  /** Exchange identifier */
  id: string;
  /** Exchange name */
  name: string;
  /** Country of registration */
  country: string;
  /** Regulatory status */
  regulated: boolean;
  /** KYC requirements level */
  kycLevel: 'none' | 'basic' | 'enhanced';
  /** Supported cryptocurrencies */
  supportedCurrencies: string[];
  /** Known wallet addresses */
  wallets: string[];
  /** Risk assessment */
  riskAssessment: {
    /** Overall risk score */
    score: number;
    /** Specific risk factors */
    factors: string[];
    /** Last assessment date */
    lastUpdated: string;
  };
}

/**
 * Represents a mixing service
 */
export interface MixerService {
  /** Service identifier */
  id: string;
  /** Service name */
  name: string;
  /** Known wallet addresses */
  wallets: string[];
  /** Minimum mixing amount */
  minimumAmount: string;
  /** Maximum mixing amount */
  maximumAmount: string;
  /** Service fee percentage */
  fee: number;
  /** Risk assessment */
  riskAssessment: {
    /** Risk level */
    level: 'high' | 'extreme';
    /** Known illicit activity */
    illicitActivity: string[];
    /** Regulatory status */
    regulatoryStatus: string;
  };
}