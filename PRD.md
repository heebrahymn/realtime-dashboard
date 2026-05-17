# Product Requirements Document (PRD)
**Project:** Realtime Multi-API Dashboard
**Date:** May 2026
**Primary Purpose:** High-impact technical portfolio piece

## 1. Overview
The Realtime Dashboard is a single-page application (SPA) built with React and TypeScript. It consumes three distinct public APIs (CoinGecko, OpenWeather, GitHub) to display live-updating data through premium, interactive data visualizations. 

The primary goal of this project is to demonstrate modern frontend architecture, state management, and performance optimization to potential employers and technical recruiters.

## 2. Core Technologies
*   **Framework:** React (via Vite)
*   **Language:** TypeScript
*   **UI State Management:** Zustand
*   **Server State & Polling:** React Query (TanStack Query)
*   **Data Visualization:** Nivo (D3-based)
*   **Data Validation:** Zod
*   **Testing:** Jest (Unit/Integration) + Cypress (E2E)
*   **Performance Monitoring:** Webpack/Vite Bundle Analyzer

## 3. Architecture & Structure
The project will utilize a **Feature-Sliced Design (FSD)** inspired structure to demonstrate enterprise-level organization.

### 3.1 Folder Structure
```
src/
├── app/          # Global setup (Providers, Router setup, Global CSS)
├── pages/        # Route components (Overview, Crypto, Weather, GitHub)
├── features/     # Core domain logic
│   ├── crypto/   # api, components, hooks, types
│   ├── weather/  # api, components, hooks, types
│   ├── github/   # api, components, hooks, types
├── shared/       # Reusable components (Layout, UI primitives, formats)
```

### 3.2 Data Flow
1.  **Zustand:** Manages purely global UI state (e.g., Sidebar open/collapsed state, Dark/Light mode preferences).
2.  **React Query:** Manages all external data fetching, caching, and background polling. Deduplicates requests across widgets.
3.  **Zod:** Sits between the API fetch and React Query. Parses incoming JSON to guarantee type safety before it enters the application state.

## 4. Key Features & Pages
1.  **Overview Page (`/`):** The landing dashboard. Displays summary widgets from all three APIs side-by-side.
2.  **Crypto Page (`/crypto`):** Deep dive into CoinGecko data. Features line charts for historical price data and market cap comparisons.
3.  **Weather Page (`/weather`):** Deep dive into OpenWeather data. Features bar charts for temperature forecasts and radar charts for atmospheric data.
4.  **GitHub Page (`/github`):** Deep dive into GitHub API data. Features calendar heatmaps for contribution activity and pie charts for language breakdowns.

## 5. Non-Functional Requirements
### 5.1 Performance
*   **Bundle Size:** Kept under 500kb (gzipped). Nivo chart components must be dynamically imported (lazy-loaded).
*   **Layout Stability:** Skeleton loaders must have strict CSS height/width constraints to prevent Cumulative Layout Shift (CLS) when charts load.

### 5.2 Resilience & Error Handling
*   **Runtime Validation:** All API responses validated by Zod to prevent crashes from silent API changes.
*   **Graceful Degradation:** Localized Error Boundaries wrap each widget. If an API rate limit (429) or error occurs, the widget falls back to static JSON mock data with a warning badge, ensuring the portfolio always looks fully functional.

### 5.3 API Constraints
*   **Polling:** CoinGecko polled every 60s. Weather and GitHub polled every 5m or on-mount only, respecting public tier rate limits.

## 6. Testing Strategy
*   **Unit Tests (Jest):** Coverage for utility functions, Zod schema validation, and Zustand store logic.
*   **Component Tests (React Testing Library):** Verification of Skeleton states and Error Boundary fallbacks.
*   **E2E Tests (Cypress):** Critical user journeys (navigation, sidebar toggle). Network requests will be stubbed with fixture data to prevent CI/CD failures due to external API limits.

## 7. Decision Log Summary
*   *FSD Architecture:* Chosen over layered architecture for better scalability and modularity.
*   *Zustand + React Query:* Chosen over Redux to separate pure UI state from server cache state.
*   *Zod Validation + Mock Fallbacks:* Implemented to guarantee a flawless portfolio viewing experience, even if public APIs are down or rate-limited.
