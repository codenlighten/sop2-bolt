# Cryptocurrency Crime Investigation Platform
## API Reference

This document provides detailed information about the internal APIs, hooks, and utilities available in the Cryptocurrency Crime Investigation Training Platform.

## Table of Contents
1. [Context APIs](#context-apis)
2. [Component Props](#component-props)
3. [Type Definitions](#type-definitions)
4. [Utility Functions](#utility-functions)
5. [Event Handling](#event-handling)

## Context APIs

### AuthContext

Manages user authentication and session state.

#### Provider

```jsx
import { AuthProvider } from '../context/AuthContext';

function App() {
  return (
    <AuthProvider>
      {/* Application components */}
    </AuthProvider>
  );
}
```

#### Hook

```jsx
import { useAuth } from '../context/AuthContext';

function ProfileComponent() {
  const { user, signOut } = useAuth();
  
  return (
    <div>
      <p>Welcome, {user?.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

#### API Reference

| Method | Parameters | Return Value | Description |
|--------|------------|--------------|-------------|
| `signIn` | `email: string, password: string` | `Promise<{ error: Error \| null }>` | Authenticates a user with email and password |
| `signUp` | `email: string, password: string` | `Promise<{ error: Error \| null }>` | Creates a new user account |
| `signOut` | None | `Promise<void>` | Logs out the current user |
| `resetPassword` | `email: string` | `Promise<{ error: Error \| null }>` | Sends a password reset email |
| `updatePassword` | `newPassword: string` | `Promise<{ error: Error \| null }>` | Updates the user's password |

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `user` | `User \| null` | Current authenticated user or null if not authenticated |
| `loading` | `boolean` | Indicates if authentication operation is in progress |

### ProgressContext

Tracks and manages user progress through the training program.

#### Provider

```jsx
import { ProgressProvider } from '../context/ProgressContext';

function App() {
  return (
    <ProgressProvider>
      {/* Application components */}
    </ProgressProvider>
  );
}
```

#### Hook

```jsx
import { useProgress } from '../context/ProgressContext';

function ChapterComponent() {
  const { completeChapter, progress } = useProgress();
  
  const handleComplete = () => {
    completeChapter('introduction');
  };
  
  return (
    <div>
      <button onClick={handleComplete}>Mark as Complete</button>
      <p>Completed chapters: {progress.completedChapters.length}</p>
    </div>
  );
}
```

#### API Reference

| Method | Parameters | Return Value | Description |
|--------|------------|--------------|-------------|
| `updateQuizScore` | `moduleId: string, score: number` | `void` | Updates quiz score for a specific module |
| `updateSimulationScore` | `moduleId: string, score: number` | `void` | Updates simulation score for a specific module |
| `completeChapter` | `chapterId: string` | `void` | Marks a chapter as completed |
| `checkBadgeEligibility` | `badgeId: string` | `boolean` | Checks if user has met requirements for a badge |
| `checkCertificateEligibility` | `certificateId: string` | `boolean` | Checks if user has met requirements for a certificate |
| `resetProgress` | None | `void` | Resets all user progress data |

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `progress` | `User['progress']` | User's progress data |
| `earnedBadges` | `Badge[]` | Array of earned badge objects |
| `earnedCertificates` | `Certificate[]` | Array of earned certificate objects |
| `isCourseCompleted` | `boolean` | Indicates if the entire course is completed |

### AnalyticsContext

Collects and manages user analytics data.

#### Provider

```jsx
import { AnalyticsProvider } from '../context/AnalyticsContext';

function App() {
  return (
    <AnalyticsProvider>
      {/* Application components */}
    </AnalyticsProvider>
  );
}
```

#### Hook

```jsx
import { useAnalytics } from '../context/AnalyticsContext';

function ExerciseComponent() {
  const { trackExerciseCompletion } = useAnalytics();
  
  const handleComplete = (score) => {
    trackExerciseCompletion('blockchain_puzzle', score);
  };
  
  return (
    <div>
      {/* Exercise content */}
    </div>
  );
}
```

#### API Reference

| Method | Parameters | Return Value | Description |
|--------|------------|--------------|-------------|
| `startSession` | None | `void` | Begins tracking a new user session |
| `endSession` | None | `void` | Ends current tracking session |
| `trackChapterAccess` | `chapterId: string` | `void` | Records chapter access |
| `trackExerciseCompletion` | `exerciseId: string, score: number` | `void` | Records exercise completion |
| `trackEngagement` | `action: string, details?: Record<string, any>` | `void` | Records user engagement |
| `getAnalytics` | None | `Analytics \| null` | Retrieves analytics data |

## Component Props

### Interactive Components

#### `BlockchainPuzzle`

Interactive drag-and-drop exercise for learning blockchain structure.

**Props**:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `moduleId` | `string` | `'blockchain_puzzle'` | No | Identifier for progress tracking |

**Usage**:

```jsx
<BlockchainPuzzle moduleId="custom_module_id" />
```

#### `CrimeSceneWalkthrough`

Interactive crime scene investigation simulation.

**Props**:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `moduleId` | `string` | `'crime_scene'` | No | Identifier for progress tracking |

**Usage**:

```jsx
<CrimeSceneWalkthrough moduleId="evidence_collection" />
```

#### `QuizCard`

Displays interactive quiz questions with scoring.

**Props**:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `questions` | `QuizQuestion[]` | - | Yes | Array of quiz questions |
| `moduleId` | `string` | - | Yes | Identifier for progress tracking |

**QuizQuestion Type**:

```typescript
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
```

**Usage**:

```jsx
const questions = [
  {
    question: "What is blockchain?",
    options: ["A database", "A programming language", "A company", "A device"],
    correctAnswer: 0,
    explanation: "Blockchain is a type of distributed database."
  }
];

<QuizCard questions={questions} moduleId="blockchain_basics" />
```

### Display Components

#### `BadgeDisplay`

Displays a badge with its details and status.

**Props**:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `badge` | `Badge` | - | Yes | Badge object to display |
| `earned` | `boolean` | `false` | No | Whether the badge has been earned |
| `progress` | `number` | `0` | No | Progress percentage toward earning the badge |

**Usage**:

```jsx
<BadgeDisplay 
  badge={blockchainExpertBadge}
  earned={true}
  progress={100}
/>
```

#### `CertificateDisplay`

Displays a certificate with its requirements and status.

**Props**:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `certificate` | `Certificate` | - | Yes | Certificate object to display |
| `earned` | `boolean` | `false` | No | Whether the certificate has been earned |
| `progress` | `{ earnedBadges: number; totalScore: number; }` | - | No | Progress toward certificate requirements |

**Usage**:

```jsx
<CertificateDisplay 
  certificate={investigatorCertificate}
  earned={false}
  progress={{ earnedBadges: 6, totalScore: 85 }}
/>
```

## Type Definitions

### Core Types

#### `User`

```typescript
interface User {
  id: string;
  email: string;
}
```

#### `Chapter`

```typescript
interface Chapter {
  id: string;
  title: string;
  description: string;
  icon: string;
  badges: Badge[];
}
```

#### `Badge`

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
}
```

#### `Certificate`

```typescript
interface Certificate {
  id: string;
  title: string;
  description: string;
  requirements: {
    minBadges: number;
    requiredBadges: string[];
    minTotalScore: number;
  };
}
```

#### `LearningPath`

```typescript
interface LearningPath {
  id: string;
  name: string;
  description: string;
  chapters: string[];
  targetTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  skills: string[];
  certificate?: string;
}
```

### Blockchain Types

#### `Transaction`

```typescript
interface Transaction {
  hash: string;
  from: string;
  to: string;
  amount: string;
  type: 'transfer' | 'mixer' | 'exchange' | 'darkmarket';
  timestamp: string;
  confirmations: number;
  fee: string;
  indicators?: string[];
  metadata?: {
    exchange?: string;
    service?: string;
    notes?: string[];
  };
}
```

#### `Block`

```typescript
interface Block {
  hash: string;
  previousHash: string;
  height: number;
  timestamp: string;
  transactions: Transaction[];
  size: number;
  difficulty: number;
  miner: string;
  fees: string;
}
```

### Evidence Types

#### `DigitalEvidence`

```typescript
interface DigitalEvidence {
  id: string;
  type: 'hardware_wallet' | 'mobile_device' | 'computer' | 'paper_wallet' | 'seed_phrase';
  name: string;
  description: string;
  location: string;
  collectionTimestamp: string;
  collectedBy: string;
  status: 'collected' | 'processing' | 'analyzed' | 'stored';
  handlingInstructions: string[];
  technicalDetails: {
    deviceModel?: string;
    serialNumber?: string;
    deviceState?: 'on' | 'off' | 'locked' | 'unlocked';
    notes: string[];
  };
  legalConsiderations: string[];
  chainOfCustody: {
    steps: string[];
    documentation: string[];
    storage: string;
    accessLog: Array<{
      timestamp: string;
      person: string;
      purpose: string;
      actions: string[];
    }>;
  };
  documentation: Array<{
    type: 'photo' | 'document' | 'log';
    reference: string;
    timestamp: string;
    description: string;
  }>;
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

const transaction = {
  from: '0x742d...1a3b',
  to: 'Mixer Service',
  amount: '10.0 BTC',
  type: 'mixer',
  // other properties...
};

const riskScore = calculateRiskScore(transaction);
console.log(`Risk score: ${riskScore}`); // e.g., "Risk score: 0.8"
```

#### `getRiskLevel(score)`

Determines the risk level category based on a numeric risk score.

**Parameters**:
- `score`: Risk score between 0 and 1

**Returns**: `'high' | 'medium' | 'low'` risk level category

**Example**:
```javascript
import { getRiskLevel } from '../utils/blockchain';

const riskLevel = getRiskLevel(0.8);
console.log(`Risk level: ${riskLevel}`); // "Risk level: high"
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
// ["Document original location", "Photograph before handling", ...]
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

#### `getJurisdictionRequirements(country)`

Gets jurisdiction-specific requirements for international requests.

**Parameters**:
- `country`: Target country string

**Returns**: Array of requirement strings

**Example**:
```javascript
import { getJurisdictionRequirements } from '../utils/investigation';

const requirements = getJurisdictionRequirements('Switzerland');
// ["Dual criminality evidence", "German/French/Italian translations", ...]
```

## Event Handling

### DND Kit Integration

The platform uses DND Kit for drag-and-drop functionality in interactive exercises.

#### Basic Implementation

```jsx
import {
  DndContext,
  DragEndEvent,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor
} from '@dnd-kit/core';

function DragDropComponent() {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over) {
      // Handle successful drop
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      {/* Draggable and droppable components */}
    </DndContext>
  );
}
```

### ReactFlow Integration

The platform uses ReactFlow for interactive flow diagrams.

#### Basic Implementation

```jsx
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';

function FlowDiagramComponent() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = (event, node) => {
    // Handle node selection
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      fitView
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
}
```

### PDF Generation

The platform uses jsPDF and html2canvas for certificate generation.

#### Basic Implementation

```jsx
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

async function generateCertificate(certificateElement) {
  try {
    const canvas = await html2canvas(certificateElement);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });
    
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('certificate.pdf');
  } catch (error) {
    console.error('Error generating certificate:', error);
  }
}
```