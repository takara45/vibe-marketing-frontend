# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run dev` - Start development server
- `npm run build` - Build the application
- `npm start` - Start production server
- `npm run lint` - Run linting
- `npm run test` - Run all tests
- `npm run test:watch` - Run tests in watch mode

### Testing
- Single test: `npm test -- [test-file-name]`
- Coverage reports are generated in `/coverage/` directory
- Test setup uses Jest with jsdom environment for React components

## Project Architecture

### Tech Stack
- **Frontend**: Next.js 15.2.4 with TypeScript, React 18
- **Styling**: Tailwind CSS with Radix UI components
- **State Management**: Zustand stores (located in `lib/store/`)
- **AI Integration**: Google Gemini API via `@google/genai` SDK
- **Testing**: Jest with Testing Library
- **Data Fetching**: TanStack React Query

### Application Structure

#### Core Directories
- `app/` - Next.js App Router pages and API routes
- `components/` - React components organized by feature
- `lib/` - Utilities, API clients, stores, and shared logic
- `hooks/` - Custom React hooks

#### Key Features
1. **AI-Powered Ad Generation**: Uses Gemini API for ad text, keywords, and optimization suggestions
2. **Campaign Management**: Full CRUD operations for Google Ads campaigns
3. **Analytics Dashboard**: Real-time performance tracking and insights
4. **Responsive Design**: Mobile-first with Radix UI components

### State Management
Uses Zustand with separate stores for different domains:
- `useUserStore` - User authentication and profile
- `useCampaignStore` - Campaign data and operations
- `useAnalyticsStore` - Analytics and performance data
- `useUIStore` - UI state and preferences
- `useGoogleAdsAIStore` - Google Ads AI specific data

### API Integration

#### Gemini API (`lib/gemini-api.ts`)
Main functions for AI-powered features:
- `generateAdText()` - Creates headlines and descriptions
- `generateKeywordSuggestions()` - Keyword research
- `analyzePerformance()` - Campaign performance insights
- `generateOptimizationSuggestions()` - Campaign optimization recommendations
- `generateResponsePartAds()` - Responsive search ads

#### Configuration
- Environment variables for API keys stored in `.env.local`
- Gemini model: `gemini-2.0-flash-live-001` (configurable)
- API client initialized in each function with error handling

### Component Organization

#### Campaign Components (`components/campaigns/`)
- `campaign-list.tsx` - Campaign overview table
- `campaign-details.tsx` - Individual campaign view
- `tabs/` - Campaign detail tabs (performance, AI suggestions, etc.)

#### AI Components
- `ai-suggestions-tab.tsx` - Main AI features interface with 5 tabs:
  - Ad Text generation
  - Response Part ads (Japanese interface)
  - Keyword suggestions
  - Performance analysis
  - Optimization recommendations

#### UI Components (`components/ui/`)
- Consistent Radix UI-based design system
- Tailwind CSS with design tokens
- Fully accessible components

### Authentication & Data Flow
- `AuthProvider` wraps the app for authentication context
- `QueryProvider` handles React Query configuration
- API routes follow Next.js App Router conventions in `app/api/`

### Testing Strategy
- Component tests use Testing Library
- API tests for Gemini integration
- Jest configuration supports TypeScript and path aliases
- Coverage tracking for `lib/` and `components/`

## Important Implementation Details

### AI Feature Implementation
When working on AI features, the main integration point is `lib/gemini-api.ts`. The component `ai-suggestions-tab.tsx` demonstrates the complete implementation pattern:
1. State management for loading/error states
2. Mock data for development/demo purposes
3. Error handling with user-friendly messages
4. Structured response parsing from Gemini API

### Environment Setup
Ensure these environment variables are configured:
- `NEXT_PUBLIC_GEMINI_API_KEY` - Gemini API key
- `NEXT_PUBLIC_GEMINI_MODEL` - Model name (defaults to gemini-2.0-flash-live-001)

### Internationalization
The application supports both English and Japanese interfaces, particularly in AI-generated content sections. Some components use Japanese labels and text.

### Development Best Practices
- Always run `npm run lint` before committing
- Test AI features with real API calls during development
- Use the existing mock data patterns for consistent testing
- Follow the established component structure in `components/campaigns/tabs/`