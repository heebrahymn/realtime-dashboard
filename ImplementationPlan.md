# Realtime Dashboard Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Scaffold a real-time portfolio dashboard using Feature-Sliced Design, strict design tokens, and setup the foundation for live API integrations with Zustand and React Query.

**Architecture:** A Vite+React Single Page Application utilizing Feature-Sliced Design (`app`, `pages`, `features`, `shared`). State is split between Zustand (UI) and React Query (Server), with runtime validation via Zod and strict styling via Tailwind CSS based on DESIGN.md.

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS, Zustand, React Query, Nivo, Zod, React Router DOM.

---

### Task 1: Initialize Project and Clean Boilerplate

**Files:**
- Create: `package.json` (via npm init)
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`

**Step 1: Write the failing test**
N/A - Project initialization step.

**Step 2: Run test to verify it fails**
N/A

**Step 3: Write minimal implementation**
Run: `npm create vite@latest . -- --template react-ts`
Run: `npm install`
Run: `npm install -D tailwindcss postcss autoprefixer`
Run: `npx tailwindcss init -p`

**Step 4: Run test to verify it passes**
Run: `npm run build`
Expected: PASS (builds successfully)

**Step 5: Commit**
```bash
git init
git add .
git commit -m "chore: initialize vite react-ts project"
```

### Task 2: Configure Tailwind and Design Tokens

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/index.css`
- Modify: `index.html`

**Step 1: Write the failing test**
N/A - configuration step.

**Step 2: Run test to verify it fails**
N/A

**Step 3: Write minimal implementation**

Update `index.html` to include fonts:
```html
<link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap" rel="stylesheet">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Update `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#6366F1', hover: '#4F46E5' },
        secondary: '#20970B',
        neutral: { DEFAULT: '#9C9C9C', light: '#E8E8EC' },
        surface: '#FFFFFF',
        background: '#FAFAFA',
        text: { primary: '#0A0A0A', secondary: '#6B6B6B' },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        display: ['General Sans', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 8px 30px rgba(0,0,0,0.08)',
        glow: '0 4px 12px rgba(99,102,241,0.35)',
      }
    },
  },
  plugins: [],
}
```

Update `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-text-primary font-body antialiased;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-display tracking-tight text-text-primary;
  }
}
```

**Step 4: Run test to verify it passes**
Run: `npm run build`
Expected: PASS

**Step 5: Commit**
```bash
git add .
git commit -m "feat: configure design tokens and typography"
```

### Task 3: Install Core Dependencies and Setup FSD Folders

**Files:**
- Create: `src/app/`, `src/pages/`, `src/features/crypto/`, `src/shared/components/`

**Step 1: Write the failing test**
N/A - Setup step.

**Step 2: Run test to verify it fails**
N/A

**Step 3: Write minimal implementation**
Run: `npm install zustand @tanstack/react-query @nivo/core @nivo/line zod react-router-dom lucide-react`
Run: `mkdir -p src/app src/pages src/features/crypto/api src/features/crypto/components src/features/crypto/hooks src/shared/components src/shared/lib src/shared/ui`

**Step 4: Run test to verify it passes**
Run: `npm run build`
Expected: PASS

**Step 5: Commit**
```bash
git add .
git commit -m "chore: install core deps and setup FSD structure"
```

### Task 4: Implement Zustand UI Store

**Files:**
- Create: `src/shared/lib/store.ts`

**Step 1: Write the failing test**
*(Skipping strict TDD here for store setup as we haven't configured Jest yet, we will verify by building)*

**Step 3: Write minimal implementation**
```typescript
import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
```

**Step 4: Run test to verify it passes**
Run: `npx tsc --noEmit`
Expected: PASS

**Step 5: Commit**
```bash
git add src/shared/lib/store.ts
git commit -m "feat: add zustand ui store"
```

### Task 5: Implement Shared Layout Shell

**Files:**
- Create: `src/shared/components/Layout.tsx`

**Step 3: Write minimal implementation**
```tsx
import React from 'react';
import { useUIStore } from '../lib/store';
import { Menu } from 'lucide-react';
import { Outlet, Link } from 'react-router-dom';

export const Layout = () => {
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 border-r border-neutral-light bg-surface flex flex-col`}>
        <div className="h-14 flex items-center justify-between px-4 border-b border-neutral-light">
          {isSidebarOpen && <span className="font-display font-bold text-xl">Dashboard</span>}
          <button onClick={toggleSidebar} className="p-2 hover:bg-background rounded-md text-text-secondary">
            <Menu size={20} />
          </button>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link to="/" className="p-2 rounded-md hover:bg-neutral-light font-medium text-sm transition-colors">Overview</Link>
          <Link to="/crypto" className="p-2 rounded-md hover:bg-neutral-light font-medium text-sm transition-colors">Crypto</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};
```

**Step 4: Run test to verify it passes**
Run: `npx tsc --noEmit`
Expected: PASS

**Step 5: Commit**
```bash
git add src/shared/components/Layout.tsx
git commit -m "feat: implement layout shell with sidebar"
```

### Task 6: App Routing and Providers Setup

**Files:**
- Modify: `src/App.tsx`
- Create: `src/pages/Overview.tsx`
- Create: `src/pages/Crypto.tsx`

**Step 3: Write minimal implementation**

`src/pages/Overview.tsx`:
```tsx
export const Overview = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Overview</h1>
    <p className="text-text-secondary">System status and top-level metrics.</p>
  </div>
);
```

`src/pages/Crypto.tsx`:
```tsx
export const Crypto = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Crypto Markets</h1>
    <p className="text-text-secondary">Live CoinGecko data.</p>
  </div>
);
```

`src/App.tsx`:
```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './shared/components/Layout';
import { Overview } from './pages/Overview';
import { Crypto } from './pages/Crypto';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Overview />} />
            <Route path="crypto" element={<Crypto />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
```

**Step 4: Run test to verify it passes**
Run: `npx tsc --noEmit`
Expected: PASS

**Step 5: Commit**
```bash
git add src/
git commit -m "feat: setup react router and tanstack query provider"
```
