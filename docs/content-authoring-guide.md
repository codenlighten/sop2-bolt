# Cryptocurrency Crime Investigation Platform
## Content Authoring Guide

This guide provides instructions for creating and modifying content for the Cryptocurrency Crime Investigation Training Platform.

## Table of Contents
1. [Content Structure](#content-structure)
2. [Adding New Chapters](#adding-new-chapters)
3. [Creating Interactive Exercises](#creating-interactive-exercises)
4. [Adding Quizzes](#adding-quizzes)
5. [Defining Badges and Achievements](#defining-badges-and-achievements)
6. [Content Best Practices](#content-best-practices)
7. [Localization Guidelines](#localization-guidelines)

## Content Structure

### Overview

The platform's content is organized hierarchically:

1. **Learning Paths**: Collections of chapters forming a coherent curriculum
2. **Chapters**: Main content units covering specific topics
3. **Sections**: Subdivisions within chapters
4. **Interactive Elements**: Exercises, simulations, and quizzes
5. **Badges & Certificates**: Achievements awarded for completing content

### File Organization

Content is stored in the following locations:

- **Static Data**: `/src/data/` directory
  - `chapters.ts`: Chapter definitions
  - `badges.ts`: Badge definitions
  - `certificates.ts`: Certificate definitions
  - `learningPaths.ts`: Learning path definitions
  - `milestones.ts`: Milestone definitions

- **Page Content**: `/src/pages/` directory
  - Each chapter has a corresponding page component
  - Pages contain the actual educational content

- **Interactive Components**: `/src/components/` directory
  - Reusable interactive elements
  - Simulations and exercises

## Adding New Chapters

### Step 1: Define Chapter in Data File

Add a new chapter definition to `src/data/chapters.ts`:

```typescript
export const chapters: Chapter[] = [
  // Existing chapters...
  {
    id: 'new-chapter-id',
    title: 'New Chapter Title',
    description: 'Brief description of the chapter content',
    icon: 'IconName', // From lucide-react
    badges: [badges.find(b => b.id === 'related_badge_id')!],
    estimatedTime: 60, // in minutes
    prerequisites: ['previous-chapter-id'],
    objectives: [
      'Learning objective 1',
      'Learning objective 2',
      'Learning objective 3'
    ],
    requirements: [
      'Any special requirements or tools'
    ]
  }
];
```

### Step 2: Create Chapter Page Component

Create a new file in `src/pages/` directory:

```jsx
// src/pages/NewChapter.tsx
import React from 'react';
import { QuizCard } from '../components/QuizCard';
import { YourInteractiveComponent } from '../components/YourInteractiveComponent';
import { ArrowRight } from 'lucide-react';

const quizQuestions = [
  {
    question: "Your question here?",
    options: [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4"
    ],
    correctAnswer: 0, // Index of correct option
    explanation: "Explanation of the correct answer"
  },
  // More questions...
];

interface NewChapterProps {
  onComplete?: () => void;
}

export function NewChapter({ onComplete }: NewChapterProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          New Chapter Title
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            1.1 Section Title
          </h2>
          <div className="prose prose-blue max-w-none">
            <p>
              Your educational content goes here. This can include text,
              images, code examples, and other educational material.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                Important Concept
              </h3>
              <p className="text-blue-900">
                Highlighted information about an important concept.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            1.2 Interactive Section
          </h2>
          <div className="prose prose-blue max-w-none mb-6">
            <p>
              Introduction to the interactive exercise.
            </p>
          </div>
          <YourInteractiveComponent />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Knowledge Check
          </h2>
          <QuizCard questions={quizQuestions} moduleId="new_chapter_quiz" />
        </section>

        <div className="flex justify-end mt-8">
          <button
            onClick={onComplete}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            Complete Chapter
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
```

### Step 3: Update App.tsx

Add the new chapter to the rendering logic in `App.tsx`:

```jsx
// In the renderPage function
function renderPage() {
  switch (currentPage) {
    // Existing cases...
    case 'new-chapter-id':
      return <NewChapter onComplete={handleChapterComplete} />;
    // Other cases...
    default:
      return <LandingPage onStart={handleStart} />;
  }
}
```

### Step 4: Add to Learning Path

If applicable, add the chapter to a learning path in `src/data/learningPaths.ts`:

```typescript
export const learningPaths: LearningPath[] = [
  {
    id: 'path-id',
    name: 'Path Name',
    description: 'Path description',
    chapters: [
      // Existing chapters...
      'new-chapter-id'
    ],
    // Other properties...
  }
];
```

## Creating Interactive Exercises

### Step 1: Design the Exercise

1. Define the learning objectives
2. Determine the interaction model (drag-and-drop, click, simulation, etc.)
3. Plan the scoring mechanism
4. Design the user interface

### Step 2: Create the Component

Create a new file in `src/components/` directory:

```jsx
// src/components/YourInteractiveComponent.tsx
import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { Shield, CheckCircle } from 'lucide-react';

interface YourInteractiveComponentProps {
  moduleId?: string;
}

export function YourInteractiveComponent({ moduleId = 'default_module_id' }: YourInteractiveComponentProps) {
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { updateSimulationScore } = useProgress();

  const handleInteraction = () => {
    // Logic for the interactive exercise
    // Calculate score based on user actions
    const calculatedScore = 85; // Example score
    
    setScore(calculatedScore);
    setIsComplete(true);
    
    // Update user progress
    updateSimulationScore(moduleId, calculatedScore);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Interactive Exercise Title
        </h3>
        <p className="text-gray-600">
          Instructions for the interactive exercise go here.
        </p>
      </div>

      {/* Interactive elements go here */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        {/* Example interactive element */}
        <button
          onClick={handleInteraction}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Interact with Exercise
        </button>
      </div>

      {/* Completion message */}
      {isComplete && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-green-900">Exercise Complete!</h4>
              <p className="text-green-700">
                You've completed this exercise with a score of {score}/100.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

### Step 3: Implement Drag-and-Drop (if needed)

For drag-and-drop exercises, use the DND Kit library:

```jsx
import {
  DndContext,
  DragEndEvent,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor
} from '@dnd-kit/core';

// Inside your component:
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
    // Update state based on the drag and drop action
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
```

### Step 4: Implement Progress Tracking

Ensure the exercise updates user progress:

```jsx
// When the exercise is completed:
const finalScore = calculateScore();
updateSimulationScore(moduleId, finalScore);
```

## Adding Quizzes

### Step 1: Define Quiz Questions

Create an array of quiz questions:

```javascript
const quizQuestions = [
  {
    question: "What is the primary purpose of blockchain in cryptocurrency?",
    options: [
      "To enable anonymous transactions",
      "To maintain a secure, decentralized ledger",
      "To avoid taxation",
      "To increase transaction speed"
    ],
    correctAnswer: 1,
    explanation: "Blockchain technology provides a secure, decentralized ledger that records all transactions without requiring a trusted third party."
  },
  {
    question: "Which of these is NOT a common cryptocurrency wallet type?",
    options: [
      "Hardware wallet",
      "Paper wallet",
      "Cloud wallet",
      "Mobile wallet"
    ],
    correctAnswer: 2,
    explanation: "While hardware, paper, and mobile wallets are common cryptocurrency storage methods, 'cloud wallet' is not a standard term in the industry. Online/web wallets and custodial wallets are the closest equivalents."
  }
  // Add more questions as needed
];
```

### Step 2: Add the QuizCard Component

Add the QuizCard component to your page:

```jsx
<section className="mb-12">
  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
    Knowledge Check
  </h2>
  <QuizCard 
    questions={quizQuestions} 
    moduleId="your_module_id" 
  />
</section>
```

### Step 3: Quiz Best Practices

1. **Question Types**:
   - Multiple choice (4 options recommended)
   - True/False questions
   - Scenario-based questions

2. **Difficulty Progression**:
   - Start with basic knowledge questions
   - Progress to application questions
   - End with analysis or evaluation questions

3. **Writing Effective Questions**:
   - Be clear and concise
   - Avoid double negatives
   - Ensure only one correct answer
   - Make incorrect options plausible
   - Provide detailed explanations

4. **Coverage**:
   - Include questions that cover all key learning objectives
   - Balance easy, medium, and difficult questions
   - Focus on practical application of knowledge

## Defining Badges and Achievements

### Step 1: Create Badge Definitions

Add new badges to `src/data/badges.ts`:

```typescript
export const badges: Badge[] = [
  // Existing badges...
  {
    id: 'your_badge_id',
    name: 'Badge Name',
    description: 'Description of what this badge represents',
    icon: 'IconName', // From lucide-react
    requirements: [
      { type: 'quiz', threshold: 80, moduleId: 'module_quiz_id' },
      { type: 'simulation', threshold: 85, moduleId: 'module_simulation_id' }
    ],
    tier: 'silver', // 'bronze', 'silver', or 'gold'
    points: 100,
    unlockMessage: 'Congratulations! You've demonstrated expertise in...',
    prerequisites: ['prerequisite_badge_id'] // Optional
  }
];
```

### Step 2: Create Certificate Definitions

Add new certificates to `src/data/certificates.ts`:

```typescript
export const certificates: Certificate[] = [
  // Existing certificates...
  {
    id: 'your_certificate_id',
    title: 'Certificate Title',
    description: 'Description of what this certificate represents',
    requirements: {
      minBadges: 5,
      requiredBadges: ['badge_id_1', 'badge_id_2'],
      minTotalScore: 85
    },
    metadata: {
      issuer: 'Your Organization',
      validityPeriod: 24, // months
      accreditation: 'Accrediting body',
      level: 'advanced'
    },
    template: {
      backgroundColor: '#f8fafc',
      textColor: '#1e293b',
      borderStyle: 'double',
      logoUrl: '/logo.png'
    }
  }
];
```

### Step 3: Associate Badges with Chapters

Update the chapter definition in `src/data/chapters.ts`:

```typescript
{
  id: 'chapter_id',
  title: 'Chapter Title',
  description: 'Chapter description',
  icon: 'IconName',
  badges: [badges.find(b => b.id === 'your_badge_id')!],
  // Other properties...
}
```

## Content Best Practices

### Educational Content

1. **Clarity and Conciseness**:
   - Use clear, straightforward language
   - Avoid jargon unless necessary (and define when used)
   - Break complex concepts into smaller, manageable parts

2. **Structured Learning**:
   - Begin with an overview
   - Present content in logical sequence
   - Reinforce with examples and applications
   - Conclude with summary and next steps

3. **Engagement**:
   - Use varied content formats (text, interactive elements, visuals)
   - Include real-world examples and case studies
   - Ask reflective questions
   - Provide immediate feedback

4. **Accessibility**:
   - Use descriptive headings and subheadings
   - Provide alt text for images
   - Ensure sufficient color contrast
   - Use consistent navigation patterns

### Interactive Elements

1. **Purpose-Driven**:
   - Each interactive element should have a clear learning objective
   - Align with the content being taught
   - Provide meaningful feedback

2. **Usability**:
   - Clear instructions
   - Intuitive controls
   - Responsive design for different devices
   - Appropriate difficulty level

3. **Feedback**:
   - Immediate response to user actions
   - Explanations for correct and incorrect answers
   - Progress indicators
   - Encouraging messaging

## Localization Guidelines

### Preparing Content for Translation

1. **Text Extraction**:
   - Keep UI text separate from code
   - Use string constants for all displayed text
   - Avoid hardcoded strings in components

2. **String Format**:
   - Avoid concatenating strings
   - Use template literals with named placeholders
   - Consider word order differences in other languages

3. **Cultural Considerations**:
   - Avoid culture-specific references
   - Use universal examples where possible
   - Be aware of different legal frameworks

### Translation Process

1. **File Organization**:
   - Create a `locales` directory
   - Organize translations by language code
   - Use JSON format for translation files

2. **Translation Keys**:
   - Use descriptive, hierarchical keys
   - Group by feature or component
   - Include context comments for translators

3. **Implementation**:
   - Use a translation library (i18next recommended)
   - Support language switching
   - Handle pluralization and formatting

### Example Translation Structure

```
src/
└── locales/
    ├── en/
    │   ├── common.json
    │   ├── auth.json
    │   └── chapters/
    │       ├── introduction.json
    │       └── blockchain.json
    └── es/
        ├── common.json
        ├── auth.json
        └── chapters/
            ├── introduction.json
            └── blockchain.json
```

Example translation file (`en/chapters/introduction.json`):

```json
{
  "title": "Introduction to Cryptocurrency Crime",
  "description": "Overview of cryptocurrency investigations and this handbook",
  "sections": {
    "purpose": {
      "title": "Purpose of this SOP Handbook",
      "paragraph1": "The rapid evolution of financial technology has introduced cryptocurrency as both a tool for legitimate economic growth and a conduit for illicit activities.",
      "paragraph2": "This handbook is designed to equip law enforcement officers with the necessary knowledge and strategies to detect, investigate, and prosecute cryptocurrency-related crimes effectively."
    }
  }
}
```