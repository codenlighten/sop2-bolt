# Cryptocurrency Crime Investigation Platform
## Developer Guide

This guide provides detailed information for developers who want to extend, customize, or contribute to the Cryptocurrency Crime Investigation Training Platform.

## Table of Contents
1. [Development Environment Setup](#development-environment-setup)
2. [Project Structure](#project-structure)
3. [Adding New Features](#adding-new-features)
4. [Component Development](#component-development)
5. [State Management](#state-management)
6. [Testing](#testing)
7. [Build and Deployment](#build-and-deployment)
8. [Contributing Guidelines](#contributing-guidelines)

## Development Environment Setup

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher
- **Git**: For version control
- **Code Editor**: VS Code (recommended) with the following extensions:
  - ESLint
  - Prettier
  - TypeScript
  - Tailwind CSS IntelliSense

### Initial Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-organization/crypto-crime-sop.git
   cd crypto-crime-sop
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Development Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

## Project Structure

```
crypto-crime-sop/
├── docs/                  # Documentation
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   ├── context/           # React Context providers
│   ├── data/              # Static data files
│   ├── pages/             # Page components
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main application component
│   ├── index.css          # Global styles
│   └── main.tsx           # Application entry point
├── .env                   # Environment variables
├── .eslintrc.js           # ESLint configuration
├── index.html             # HTML template
├── package.json           # Project dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

### Key Directories

#### `/src/components/`

Contains all reusable UI components, organized by feature or functionality:

- **UI Components**: Buttons, cards, modals, etc.
- **Interactive Components**: Simulations, exercises, visualizations
- **Layout Components**: Header, sidebar, footer, etc.

#### `/src/context/`

Contains React Context providers for global state management:

- `AuthContext.tsx`: Authentication state
- `ProgressContext.tsx`: User progress tracking
- `AnalyticsContext.tsx`: User analytics data

#### `/src/data/`

Contains static data files defining the content structure:

- `chapters.ts`: Chapter definitions
- `badges.ts`: Badge definitions
- `certificates.ts`: Certificate definitions
- `learningPaths.ts`: Learning path definitions

#### `/src/pages/`

Contains page components for each chapter and major section:

- `LandingPage.tsx`: Home page
- `Introduction.tsx`: Introduction chapter
- `BlockchainFundamentals.tsx`: Blockchain fundamentals chapter
- And so on for each chapter

#### `/src/types/`

Contains TypeScript type definitions:

- `index.ts`: Core type definitions
- `blockchain.ts`: Blockchain-specific types
- `evidence.ts`: Evidence-related types
- `investigation.ts`: Investigation-related types

#### `/src/utils/`

Contains utility functions:

- `blockchain.ts`: Blockchain-related utilities
- `evidence.ts`: Evidence-handling utilities
- `investigation.ts`: Investigation-related utilities

## Adding New Features

### General Process

1. **Plan the Feature**:
   - Define requirements and acceptance criteria
   - Design the user interface and interactions
   - Identify required components and data structures

2. **Create Components**:
   - Develop new components in `/src/components/`
   - Use TypeScript for type safety
   - Follow the established component patterns

3. **Update Data Models**:
   - Add or modify type definitions in `/src/types/`
   - Update data files in `/src/data/` if needed

4. **Integrate with State Management**:
   - Update context providers if needed
   - Ensure proper state updates and persistence

5. **Add to Pages**:
   - Integrate the new feature into relevant pages
   - Update navigation if needed

6. **Test**:
   - Test the feature thoroughly
   - Ensure it works across different devices and browsers

7. **Document**:
   - Update documentation to reflect the new feature
   - Add comments to complex code sections

### Example: Adding a New Interactive Component

1. Create the component file:

```jsx
// src/components/NewInteractiveComponent.tsx
import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { Shield, CheckCircle } from 'lucide-react';

interface NewInteractiveComponentProps {
  moduleId?: string;
}

export function NewInteractiveComponent({ 
  moduleId = 'default_module_id' 
}: NewInteractiveComponentProps) {
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { updateSimulationScore } = useProgress();

  const handleComplete = (calculatedScore: number) => {
    setScore(calculatedScore);
    setIsComplete(true);
    updateSimulationScore(moduleId, calculatedScore);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          New Interactive Component
        </h3>
        <p className="text-gray-600">
          Instructions for using this component.
        </p>
      </div>

      {/* Interactive content goes here */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        {/* Example interactive element */}
        <button
          onClick={() => handleComplete(85)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Complete Exercise
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

2. Add the component to a page:

```jsx
// In a page component
import { NewInteractiveComponent } from '../components/NewInteractiveComponent';

// Inside the render function
<section className="mb-12">
  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
    New Interactive Section
  </h2>
  <div className="prose prose-blue max-w-none mb-6">
    <p>
      Introduction to the new interactive component.
    </p>
  </div>
  <NewInteractiveComponent moduleId="custom_module_id" />
</section>
```

## Component Development

### Component Structure

Follow this structure for new components:

```jsx
import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { Icon1, Icon2 } from 'lucide-react';

// Define props interface
interface ComponentProps {
  prop1: string;
  prop2?: number;
}

// Component function
export function ComponentName({ prop1, prop2 = 0 }: ComponentProps) {
  // State hooks
  const [state1, setState1] = useState(initialValue);
  
  // Context hooks
  const { contextValue } = useProgress();
  
  // Event handlers
  const handleEvent = () => {
    // Event handling logic
  };
  
  // Render
  return (
    <div className="component-container">
      {/* Component content */}
    </div>
  );
}
```

### Styling Guidelines

The platform uses Tailwind CSS for styling:

1. **Use Tailwind Classes**:
   - Prefer Tailwind utility classes over custom CSS
   - Follow the established color scheme and spacing

2. **Responsive Design**:
   - Use responsive prefixes (`sm:`, `md:`, `lg:`)
   - Test on multiple screen sizes
   - Ensure mobile-friendly interactions

3. **Accessibility**:
   - Use semantic HTML elements
   - Include proper ARIA attributes
   - Ensure sufficient color contrast
   - Support keyboard navigation

4. **Component Variants**:
   - Use conditional classes for variants
   - Create reusable patterns for common variations

### Example Component with Tailwind

```jsx
function AlertCard({ 
  type = 'info',
  title, 
  children 
}: { 
  type?: 'info' | 'warning' | 'error' | 'success';
  title: string;
  children: React.ReactNode;
}) {
  // Determine styles based on type
  const styles = {
    info: {
      container: 'bg-blue-50 border-blue-200',
      title: 'text-blue-900',
      content: 'text-blue-800',
      icon: <Info className="w-5 h-5 text-blue-600" />
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200',
      title: 'text-yellow-900',
      content: 'text-yellow-800',
      icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />
    },
    error: {
      container: 'bg-red-50 border-red-200',
      title: 'text-red-900',
      content: 'text-red-800',
      icon: <XCircle className="w-5 h-5 text-red-600" />
    },
    success: {
      container: 'bg-green-50 border-green-200',
      title: 'text-green-900',
      content: 'text-green-800',
      icon: <CheckCircle className="w-5 h-5 text-green-600" />
    }
  }[type];

  return (
    <div className={`rounded-lg p-4 border ${styles.container}`}>
      <div className="flex items-start gap-3">
        {styles.icon}
        <div>
          <h4 className={`font-medium ${styles.title} mb-2`}>{title}</h4>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  );
}
```

## State Management

### Context API

The platform uses React Context API for state management:

1. **AuthContext**: Manages user authentication
2. **ProgressContext**: Tracks user progress
3. **AnalyticsContext**: Collects usage analytics

### Local Storage

User progress and settings are persisted in localStorage:

- `userProgress`: User progress data
- `userAnalytics`: User analytics data
- `userPreferences`: User preference settings

### State Management Best Practices

1. **Context Organization**:
   - Keep contexts focused on specific concerns
   - Avoid putting too much in a single context
   - Consider performance implications

2. **State Updates**:
   - Use immutable update patterns
   - Batch related state updates
   - Consider using reducers for complex state

3. **Performance Optimization**:
   - Use `useMemo` and `useCallback` for expensive operations
   - Split contexts to avoid unnecessary re-renders
   - Implement memoization for complex components

### Example: Adding a New Context

```jsx
// src/context/NewContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Define the context type
interface NewContextType {
  value1: string;
  value2: number;
  updateValue1: (newValue: string) => void;
  updateValue2: (newValue: number) => void;
}

// Create the context
const NewContext = createContext<NewContextType | undefined>(undefined);

// Create the provider component
export function NewProvider({ children }: { children: React.ReactNode }) {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState(0);

  const updateValue1 = (newValue: string) => {
    setValue1(newValue);
    // Additional logic if needed
  };

  const updateValue2 = (newValue: number) => {
    setValue2(newValue);
    // Additional logic if needed
  };

  return (
    <NewContext.Provider value={{
      value1,
      value2,
      updateValue1,
      updateValue2
    }}>
      {children}
    </NewContext.Provider>
  );
}

// Create the hook
export function useNewContext() {
  const context = useContext(NewContext);
  if (context === undefined) {
    throw new Error('useNewContext must be used within a NewProvider');
  }
  return context;
}
```

## Testing

### Testing Strategy

The platform uses a comprehensive testing approach:

1. **Unit Tests**: Test individual functions and components
2. **Integration Tests**: Test component interactions
3. **End-to-End Tests**: Test complete user flows

### Unit Testing

For unit testing components and utilities:

```jsx
// Example component test
import { render, screen, fireEvent } from '@testing-library/react';
import { QuizCard } from '../components/QuizCard';

// Mock the progress context
jest.mock('../context/ProgressContext', () => ({
  useProgress: () => ({
    updateQuizScore: jest.fn()
  })
}));

const mockQuestions = [
  {
    question: "Test question?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correctAnswer: 1,
    explanation: "Explanation text"
  }
];

describe('QuizCard', () => {
  it('renders questions correctly', () => {
    render(<QuizCard questions={mockQuestions} moduleId="test_module" />);
    
    expect(screen.getByText("Test question?")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
    expect(screen.getByText("Option 4")).toBeInTheDocument();
  });

  it('shows explanation after selecting an answer', () => {
    render(<QuizCard questions={mockQuestions} moduleId="test_module" />);
    
    // Click on an option
    fireEvent.click(screen.getByText("Option 2"));
    
    // Explanation should be visible
    expect(screen.getByText("Explanation text")).toBeInTheDocument();
  });
});
```

### Integration Testing

For testing component interactions:

```jsx
// Example integration test
import { render, screen, fireEvent } from '@testing-library/react';
import { ProgressProvider } from '../context/ProgressContext';
import { Introduction } from '../pages/Introduction';

describe('Introduction Page', () => {
  it('completes chapter when button is clicked', () => {
    const mockCompleteChapter = jest.fn();
    
    // Mock the progress context
    jest.mock('../context/ProgressContext', () => ({
      useProgress: () => ({
        completeChapter: mockCompleteChapter,
        progress: {
          completedChapters: [],
          earnedBadges: [],
          quizScores: {},
          simulationScores: {}
        }
      })
    }));
    
    render(
      <ProgressProvider>
        <Introduction onComplete={() => {}} />
      </ProgressProvider>
    );
    
    // Find and click the complete button
    const completeButton = screen.getByText(/complete chapter/i);
    fireEvent.click(completeButton);
    
    // Check if completeChapter was called
    expect(mockCompleteChapter).toHaveBeenCalledWith('introduction');
  });
});
```

### End-to-End Testing

For testing complete user flows:

```javascript
// Example Cypress test
describe('User Authentication', () => {
  it('allows a user to sign in', () => {
    cy.visit('/');
    
    // Click sign in button
    cy.contains('Sign In').click();
    
    // Fill in credentials
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    
    // Submit the form
    cy.contains('button', 'Sign In').click();
    
    // Verify successful login
    cy.contains('Welcome back').should('be.visible');
    cy.url().should('include', '/introduction');
  });
});
```

## Build and Deployment

### Build Process

The build process uses Vite to create optimized production assets:

```bash
npm run build
```

This creates a `dist` directory with the following:

- HTML files
- JavaScript bundles (chunked and minified)
- CSS files (processed and minified)
- Static assets (copied from `public/`)

### Build Configuration

The build is configured in `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          dndkit: ['@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities'],
          flow: ['reactflow'],
          pdf: ['jspdf', 'html2canvas']
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react']
  },
  server: {
    port: 3000,
    host: true
  }
});
```

### Deployment Options

#### Static Hosting

For static hosting (Netlify, Vercel, etc.):

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist` directory to your hosting provider.

3. Configure redirects for SPA routing:

   For Netlify, create a `netlify.toml` file:
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

#### Docker Deployment

For containerized deployment:

1. Create a `Dockerfile`:
   ```dockerfile
   FROM node:18-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build

   FROM nginx:alpine
   COPY --from=build /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. Create an `nginx.conf` file:
   ```
   server {
       listen 80;
       server_name localhost;
       root /usr/share/nginx/html;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

3. Build and run the Docker container:
   ```bash
   docker build -t crypto-crime-sop .
   docker run -p 8080:80 crypto-crime-sop
   ```

## Contributing Guidelines

### Code Style

The project follows these code style guidelines:

1. **TypeScript**:
   - Use TypeScript for all new code
   - Define interfaces for props and state
   - Use proper type annotations
   - Avoid `any` type

2. **Formatting**:
   - Use 2 spaces for indentation
   - Maximum line length of 100 characters
   - Use semicolons
   - Use single quotes for strings

3. **Naming Conventions**:
   - PascalCase for components and types
   - camelCase for variables and functions
   - UPPER_CASE for constants
   - Descriptive, meaningful names

4. **Component Organization**:
   - One component per file
   - Group related components in directories
   - Co-locate component tests

### Git Workflow

1. **Branching Strategy**:
   - `main`: Production-ready code
   - `develop`: Integration branch
   - `feature/*`: New features
   - `bugfix/*`: Bug fixes
   - `hotfix/*`: Urgent production fixes

2. **Commit Messages**:
   - Use the imperative mood ("Add feature" not "Added feature")
   - Start with a capital letter
   - Keep the first line under 50 characters
   - Provide detailed description if needed

3. **Pull Requests**:
   - Create a PR for each feature or fix
   - Reference related issues
   - Provide a clear description
   - Include screenshots for UI changes
   - Ensure all tests pass

### Code Review Process

1. **Review Checklist**:
   - Code follows style guidelines
   - Tests are included and pass
   - Documentation is updated
   - No unnecessary dependencies
   - Performance considerations addressed

2. **Review Comments**:
   - Be constructive and specific
   - Explain the reasoning behind suggestions
   - Link to relevant documentation
   - Use a respectful tone

3. **Approval Process**:
   - At least one approval required
   - Address all review comments
   - Ensure CI checks pass
   - Squash commits if needed

### Documentation

All code should be properly documented:

1. **Component Documentation**:
   - Purpose and usage
   - Props with types and descriptions
   - Examples

2. **Function Documentation**:
   - Purpose
   - Parameters and return values
   - Examples for complex functions

3. **Code Comments**:
   - Explain "why" not "what"
   - Comment complex logic
   - TODO comments for future improvements

### Example Documentation Comment

```typescript
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
 * 
 * @example
 * const riskScore = calculateRiskScore(transaction);
 * if (riskScore > 0.7) {
 *   console.log('High-risk transaction detected');
 * }
 */
export const calculateRiskScore = (transaction: Transaction): number => {
  // Implementation...
};
```