# Cryptocurrency Crime Investigation Platform
## Technical Reference Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Component Reference](#component-reference)
3. [Context API Documentation](#context-api-documentation)
4. [Data Models](#data-models)
5. [Utility Functions](#utility-functions)
6. [Interactive Components](#interactive-components)
7. [Performance Considerations](#performance-considerations)
8. [Security Implementation](#security-implementation)

## Architecture Overview

### Technology Stack

The Cryptocurrency Crime Investigation Platform is built using:

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS 3.4.1
- **State Management**: React Context API
- **Routing**: Custom routing implementation
- **Data Visualization**: ReactFlow, Recharts, D3.js
- **Interactive Elements**: DND Kit
- **PDF Generation**: jsPDF, html2canvas
- **Icons**: Lucide React

### Application Structure

The application follows a modular architecture:

```
src/
├── components/       # Reusable UI components
├── context/          # Global state management
├── data/             # Static data and configurations
├── pages/            # Page components for each module
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── App.tsx           # Main application component
└── main.tsx          # Application entry point
```

### Data Flow

1. **User Authentication**:
   - User credentials → AuthContext → User session
   - Session state maintained in AuthContext

2. **Progress Tracking**:
   - User actions → ProgressContext → Local storage
   - Progress data retrieved on application load

3. **Analytics**:
   - User interactions → AnalyticsContext → Local storage
   - Analytics data used for progress visualization

4. **Content Delivery**:
   - Static content from data/ directory
   - Dynamic content generated based on user progress

## Component Reference

### Core Components

#### `App.tsx`

The main application component that handles routing and layout.

**Props**: None

**State**:
- `currentPage`: Current active page
- `showProgress`: Boolean to toggle progress overview
- `showCompletion`: Boolean to show chapter completion modal
- `showMobileMenu`: Boolean to control mobile menu visibility

**Methods**:
- `handleStart()`: Navigates to introduction page
- `handleChapterComplete()`: Marks current chapter as complete
- `handleContinue()`: Navigates to next chapter

#### `Header.tsx`

Navigation header component.

**Props**:
- `currentPage`: Current page identifier
- `onNavigate`: Function to handle navigation

**Usage**:
```jsx
<Header 
  currentPage="introduction" 
  onNavigate={setCurrentPage} 
/>
```

#### `Sidebar.tsx`

Side navigation component.

**Props**:
- `onNavigate`: Function to handle navigation
- `currentPage`: Current page identifier
- `onShowProgress`: Function to show progress overview

**Usage**:
```jsx
<Sidebar 
  onNavigate={setCurrentPage}
  currentPage={currentPage}
  onShowProgress={() => setShowProgress(true)}
/>
```

### Interactive Components

#### `BlockchainVisualizer.tsx`

Interactive blockchain visualization using ReactFlow.

**Props**: None

**State**:
- `nodes`: Array of blockchain nodes
- `edges`: Array of connections between nodes
- `selectedNode`: Currently selected node

**Methods**:
- `onNodeClick()`: Handles node selection

#### `CrimeSceneWalkthrough.tsx`

Interactive crime scene investigation simulation.

**Props**:
- `moduleId`: Identifier for progress tracking

**State**:
- `foundEvidence`: Set of discovered evidence IDs
- `selectedEvidence`: Currently selected evidence item
- `gameComplete`: Boolean indicating completion status

**Methods**:
- `handleEvidenceClick()`: Processes evidence selection
- `updateSimulationScore()`: Updates user progress

## Context API Documentation

### AuthContext

Manages user authentication state.

**Provider**: `AuthProvider`

**Hook**: `useAuth()`

**State**:
- `user`: Current authenticated user or null
- `loading`: Boolean indicating authentication status

**Methods**:
- `signIn(email, password)`: Authenticates user
- `signUp(email, password)`: Creates new user account
- `signOut()`: Logs out current user
- `resetPassword(email)`: Initiates password reset
- `updatePassword(newPassword)`: Updates user password

**Usage**:
```jsx
const { user, signIn, signOut } = useAuth();
```

### ProgressContext

Tracks user progress through the training program.

**Provider**: `ProgressProvider`

**Hook**: `useProgress()`

**State**:
- `progress`: User progress data
- `earnedBadges`: Array of earned badge objects
- `earnedCertificates`: Array of earned certificate objects
- `isCourseCompleted`: Boolean indicating course completion

**Methods**:
- `updateQuizScore(moduleId, score)`: Updates quiz scores
- `updateSimulationScore(moduleId, score)`: Updates simulation scores
- `completeChapter(chapterId)`: Marks chapter as complete
- `checkBadgeEligibility(badgeId)`: Checks if badge requirements are met
- `checkCertificateEligibility(certificateId)`: Checks if certificate requirements are met
- `resetProgress()`: Resets all progress data

**Usage**:
```jsx
const { progress, updateQuizScore, completeChapter } = useProgress();
```

### AnalyticsContext

Collects and manages user analytics data.

**Provider**: `AnalyticsProvider`

**Hook**: `useAnalytics()`

**Methods**:
- `startSession()`: Begins tracking a new user session
- `endSession()`: Ends current tracking session
- `trackChapterAccess(chapterId)`: Records chapter access
- `trackExerciseCompletion(exerciseId, score)`: Records exercise completion
- `trackEngagement(action, details)`: Records user engagement
- `getAnalytics()`: Retrieves analytics data

**Usage**:
```jsx
const { trackExerciseCompletion, getAnalytics } = useAnalytics();
```

## Data Models

### User

```typescript
interface User {
  id: string;
  name: string;
  role: 'officer' | 'admin' | 'instructor';
  bookmarks: string[];
  notes: Record<string, string>;
  progress: {
    completedChapters: string[];
    earnedBadges: string[];
    quizScores: Record<string, number>;
    simulationScores: Record<string, number>;
    lastAccessed: string;
    currentChapter?: string;
    timeSpent: Record<string, number>;
    completedExercises: string[];
    failedAttempts: Record<string, number>;
  };
  preferences: {
    darkMode: boolean;
    notifications: {
      progress: boolean;
      newContent: boolean;
      certificates: boolean;
    };
    accessibility: {
      fontSize: number;
      highContrast: boolean;
      screenReader: boolean;
    };
  };
}
```

### Chapter

```typescript
interface Chapter {
  id: string;
  title: string;
  description: string;
  icon: string;
  badges: Badge[];
  estimatedTime: number;
  prerequisites?: string[];
  objectives: string[];
  requirements?: string[];
}
```

### Badge

```typescript
interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirements: Array<{
    type: 'quiz' | 'simulation' | 'exercise';
    threshold: number;
    moduleId: string;
  }>;
  tier: 'bronze' | 'silver' | 'gold';
  points: number;
  unlockMessage?: string;
  prerequisites?: string[];
}
```

### Certificate

```typescript
interface Certificate {
  id: string;
  title: string;
  description: string;
  requirements: {
    minBadges: number;
    requiredBadges: string[];
    minTotalScore: number;
    minTimeSpent?: number;
    requiredExercises?: string[];
  };
  metadata: {
    issuer: string;
    validityPeriod: number;
    accreditation?: string;
    level: 'basic' | 'intermediate' | 'advanced' | 'expert';
  };
  template: {
    backgroundColor: string;
    textColor: string;
    borderStyle: string;
    logoUrl: string;
  };
}
```

### Analytics

```typescript
interface Analytics {
  userId: string;
  sessions: Array<{
    start: string;
    end: string;
    chapters: string[];
    exercises: string[];
    points: number;
  }>;
  progress: {
    completion: number;
    averageScore: number;
    totalTime: number;
    engagement: number;
  };
  achievements: {
    badges: Record<string, string>;
    certificates: Record<string, string>;
    points: number;
    rank: string;
  };
}
```

## Utility Functions

### Blockchain Utilities

#### `calculateRiskScore(transaction)`

Calculates a risk score for a cryptocurrency transaction.

**Parameters**:
- `transaction`: Transaction object

**Returns**: Number between 0 and 1 (higher = riskier)

**Example**:
```javascript
import { calculateRiskScore } from '../utils/blockchain';

const riskScore = calculateRiskScore(transaction);
if (riskScore > 0.7) {
  console.log('High-risk transaction detected');
}
```

#### `formatBlockchainAddress(address)`

Formats a blockchain address for display by truncating the middle.

**Parameters**:
- `address`: Full blockchain address

**Returns**: Formatted address string

**Example**:
```javascript
import { formatBlockchainAddress } from '../utils/blockchain';

// Returns "0x742d...f44e"
const displayAddress = formatBlockchainAddress("0x742d35Cc6634C0532925a3b844Bc454e4438f44e");
```

### Evidence Utilities

#### `validateChainOfCustody(evidence)`

Validates the chain of custody documentation for digital evidence.

**Parameters**:
- `evidence`: DigitalEvidence object

**Returns**: Boolean indicating validity

**Example**:
```javascript
import { validateChainOfCustody } from '../utils/evidence';

if (!validateChainOfCustody(evidence)) {
  console.error('Chain of custody documentation is incomplete');
}
```

#### `getEvidenceHandlingInstructions(type)`

Gets handling instructions for different types of digital evidence.

**Parameters**:
- `type`: Evidence type string

**Returns**: Array of handling instruction strings

**Example**:
```javascript
import { getEvidenceHandlingInstructions } from '../utils/evidence';

const instructions = getEvidenceHandlingInstructions('hardware_wallet');
// Display instructions to the user
```

### Investigation Utilities

#### `validateMLATRequest(request)`

Validates an MLAT request for completeness and correctness.

**Parameters**:
- `request`: InternationalRequest object

**Returns**: Boolean indicating validity

**Example**:
```javascript
import { validateMLATRequest } from '../utils/investigation';

if (validateMLATRequest(mlatRequest)) {
  console.log('MLAT request is valid and ready for submission');
}
```

#### `formatForensicReport(report)`

Formats a forensic report for presentation.

**Parameters**:
- `report`: ForensicReport object

**Returns**: Formatted report string

**Example**:
```javascript
import { formatForensicReport } from '../utils/investigation';

const formattedReport = formatForensicReport(report);
// Display or export the formatted report
```

## Interactive Components

### Simulation Components

#### `BlockchainSimulator`

Simulates blockchain transactions and block creation.

**Features**:
- Visualizes blocks and transactions
- Demonstrates transaction confirmation process
- Shows blockchain immutability

**Implementation Notes**:
- Uses React state to manage simulation steps
- Updates transaction status based on user actions
- Provides educational tooltips and explanations

#### `CrimeSceneWalkthrough`

Interactive crime scene investigation simulation.

**Features**:
- Clickable evidence items
- Proper evidence handling instructions
- Chain of custody documentation
- Score tracking

**Implementation Notes**:
- Uses click events to discover evidence
- Tracks found evidence in state
- Updates progress context on completion

### Analysis Components

#### `ForensicWalletTracer`

Tool for tracing cryptocurrency transactions.

**Features**:
- Transaction visualization
- Risk assessment
- Pattern recognition
- Investigation recommendations

**Implementation Notes**:
- Displays sample transaction data
- Highlights suspicious patterns
- Provides analysis of transaction risk

#### `CrossChainAnalyzer`

Visualizes cross-chain money laundering techniques.

**Features**:
- Multi-blockchain transaction flow
- Risk indicators for different services
- Investigation guidance

**Implementation Notes**:
- Uses ReactFlow for visualization
- Provides detailed node information on click
- Highlights high-risk services and patterns

## Performance Considerations

### Optimization Techniques

1. **Code Splitting**
   - Each page is loaded dynamically
   - Heavy components are lazy-loaded
   - Third-party libraries are chunked separately

2. **Render Optimization**
   - React.memo for expensive components
   - useCallback for event handlers
   - useMemo for computed values
   - Virtual lists for large data sets

3. **Asset Management**
   - Images are loaded from external URLs
   - SVG icons from Lucide React
   - Proper image sizing and optimization

### Performance Metrics

Target performance metrics:
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms

## Security Implementation

### Authentication

The platform uses a simple authentication system:

- Email/password authentication
- Password reset functionality
- Session management
- Role-based access control

### Data Protection

- All progress data is stored in localStorage
- Sensitive data is not stored in client-side storage
- Form validation prevents injection attacks
- Content Security Policy implementation

### Best Practices

- Regular dependency updates
- Input sanitization
- Proper error handling
- No sensitive data exposure
- Secure authentication flows