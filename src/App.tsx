import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './shared/components/Layout';

// Lazy load pages for professional code splitting and performance optimization
const Overview = lazy(() => import('./pages/Overview').then(m => ({ default: m.Overview })));
const Crypto = lazy(() => import('./pages/Crypto').then(m => ({ default: m.Crypto })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes standard stale time
    },
  },
});

const PageLoader = () => (
  <div className="w-full h-[60vh] flex flex-col items-center justify-center space-y-4 animate-pulse">
    <div className="h-10 w-48 bg-neutral-light rounded-md"></div>
    <div className="h-4 w-72 bg-neutral-light rounded-md"></div>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <Suspense fallback={<PageLoader />}>
                  <Overview />
                </Suspense>
              }
            />
            <Route
              path="crypto"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Crypto />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
