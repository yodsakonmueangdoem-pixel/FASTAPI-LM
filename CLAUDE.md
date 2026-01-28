# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start Vite development server on port 8080
- `npm run build` - Production build
- `npm run build:dev` - Development build mode
- `npm run lint` - Run ESLint
- `npm run test` - Run Vitest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run preview` - Preview production build

## Project Architecture

This is a multi-section AI companion dashboard built with React 18, TypeScript, and Vite. The application features four distinct AI prediction systems, each with its own page and color theme:

### Core Structure

**Page-based routing** via React Router:
- `/` - Landing page (Index.tsx)
- `/flight` - Flight price prediction (FlightPricePage.tsx)
- `/depression` - Depression risk assessment (DepressionPage.tsx)
- `/animal` - Animal image classification (AnimalClassificationPage.tsx)
- `/movie` - Movie/TV show recommendations (MovieRecommendationPage.tsx)

**Layout components** in `src/components/layout/`:
- `Navbar` - Navigation across all pages
- `PageContainer` - Consistent page layout with dynamic accent colors

**UI components** in `src/components/ui/`:
- shadcn/ui components (Radix UI primitives)
- Custom `ResultCard` for displaying prediction results
- All components use class-variance-authority for variants

### State Management

- **React Query** (`@tanstack/react-query`) for server state
- Local component state with `useState` for form data
- No global state management library

### Form Handling

- **React Hook Form** for form management
- **Zod** for schema validation (when validators are present)
- Forms typically use controlled components with state

### Styling System

**Tailwind CSS** with custom design tokens defined in `src/index.css`:

- **Theme colors**: Each AI feature has semantic colors
  - `--flight` (blue): Flight price prediction
  - `--health` (green): Depression assessment
  - `--animal` (orange): Animal classification
  - `--movie` (purple): Movie recommendations
- **Gradient utilities**: `.bg-gradient-{flight,health,animal,movie,primary}`
- **Custom utilities**: `.card-hover`, `.glass` for common effects

**Typography**: Noto Sans Thai (primary) + Inter (fallback)

### Component Patterns

**Page components** follow this structure:
```tsx
export const FeaturePage = () => {
  const [formData, setFormData] = useState<FeatureFormData>({...});
  const [result, setResult] = useState<ResultType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    // Validation
    // API call (currently mocked)
    // Result handling with toast notifications
  };

  return (
    <PageContainer
      title="Thai title"
      subtitle="Thai subtitle"
      accentColor="flight|health|animal|movie"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form section */}
        {/* Results section */}
      </div>
    </PageContainer>
  );
};
```

**Animation**: Uses Framer Motion for:
- Loading states (rotating icons)
- Result card animations (fade in, slide up)
- Hover effects on cards

### TypeScript Configuration

**Relaxed strictness** (`tsconfig.json`):
- `noImplicitAny: false`
- `strictNullChecks: false`
- `noUnusedLocals: false`
- `noUnusedParameters: false`

**Path aliases**: `@/*` maps to `./src/*`

### UI Libraries

- **Radix UI**: Headless component primitives
- **Lucide React**: Icons
- **Sonner**: Toast notifications
- **Recharts**: Data visualization
- **Framer Motion**: Animations

### Language

All UI text is in **Thai** with English code comments and variable names.

## Key Architectural Decisions

1. **Feature-based theming**: Each AI feature has its own color scheme for visual distinction
2. **Mock predictions**: All AI endpoints are currently mocked with setTimeout() - ready for backend integration
3. **Responsive grid**: Two-column layout (lg:grid-cols-2) with form on left, results on right
4. **Form validation**: Client-side validation with toast errors before "API calls"
5. **Component composition**: Heavy use of shadcn/ui primitives with custom wrappers
