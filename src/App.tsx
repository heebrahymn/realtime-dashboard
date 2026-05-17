import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './shared/components/Layout';

// Lazy load pages for professional code splitting and performance optimization
const Overview = lazy(() => import('./pages/Overview').then(m => ({ default: m.Overview })));
const Crypto = lazy(() => import('./pages/Crypto').then(m => ({ default: m.Crypto })));
const Weather = lazy(() => import('./pages/Weather').then(m => ({ default: m.Weather })));
const Github = lazy(() => import('./pages/Github').then(m => ({ default: m.Github })));
const Ngx = lazy(() => import('./pages/Ngx').then(m => ({ default: m.Ngx })));
const Spotify = lazy(() => import('./pages/Spotify').then(m => ({ default: m.Spotify })));
const Facebook = lazy(() => import('./pages/Facebook').then(m => ({ default: m.Facebook })));
const Semrush = lazy(() => import('./pages/Semrush').then(m => ({ default: m.Semrush })));

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
            <Route
              path="weather"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Weather />
                </Suspense>
              }
            />
            <Route
              path="github"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Github />
                </Suspense>
              }
            />
            <Route
              path="ngx"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Ngx />
                </Suspense>
              }
            />
            <Route
              path="spotify"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Spotify />
                </Suspense>
              }
            />
            <Route
              path="facebook"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Facebook />
                </Suspense>
              }
            />
            <Route
              path="semrush"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Semrush />
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
