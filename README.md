# ⚡ Infinite Telemetry: Real-Time Multi-Platform Dashboard

A premium, glassmorphic telemetry control center that merges **real-world live API connections** with a **deterministic Infinite Simulation Sandbox** to monitor cross-platform performance. Built for high performance, visual beauty, and real-time responsiveness.

🔗 **Vercel Live Demo**: [https://realtime-dashboard-rho.vercel.app/](https://realtime-dashboard-rho.vercel.app/)

---

## 🎨 Design & Visual Aesthetic

This dashboard is built with a premium **glassmorphism** design system, sporting rich gradients, dynamic micro-interactions, responsive grids, and subtle glowing hovers that feel alive. High-contrast indigo, emerald, and orange highlights structure the data into high-fidelity comparative visual layers.

---

## 🚀 Key Features: What You Can Do

### 1. 📊 Central Overview Hub
* **Aggregate Telemetry Grid**: Get an instant bird's-eye view of your entire social, search, finance, development, and weather metrics.
* **Smart Navigation Badges**: Jump into deep diagnostic pages directly by clicking any active telemetry cards.

### 2. 🔍 Semrush Competitor Analysis (Dynamic Sandbox)
* **Search Any Domain**: Enter any website URL to instantly compile rich SEO stats.
* **Deterministic Brand Seed**: Searches are computed using a unique domain-hashing seed. Searching a giant like `google.com` yields massive enterprise metrics ($90+$ authority, $100\text{M}+$ traffic), while small blogs scale down to niche values—perfectly matching real-world expectations!
* **12-Month Traffic Trends**: Plots a beautiful wave curve comparing Organic vs Paid traffic using Recharts area charts.
* **Competitor Overlap Radar**: Visualize search engine keyword overlaps using Recharts radar grids.
* **Intent-Badged Keywords**: Analyze high-yield search terms with badges indicating informational, navigational, commercial, or transactional intents.

### 3. 🎵 Spotify Listening Stream (Dynamic Sandbox)
* **Interactive Player**: Test play/pause toggle states, volume controls, and timeline seeks that update track progress in real-time.
* **Live Lyric Scroller**: Experience a simulated real-time synchronized lyrics feed matching active playback positions.
* **Sound Wave Attributes**: Nivo line graphs plot weekly listening duration alongside attribute gauges (danceability, energy, acousticness).
* **Top Tracks**: Track monthly favorites with popularity bars and duration indicators.

### 4. 📈 Facebook Ads & Page Insights (Dynamic Sandbox)
* **Campaign Ads Manager**: Pause or activate simulated ad campaigns, adjust daily budgets with micro-increment controls, and monitor live CTR, CPR, and Impressions.
* **Impression Metrics**: Monotone Nivo charts map organic versus paid weekly reaches.
* **Demographic Breakdown**: Track gender and age-group engagement using styled split-percentage trackers.

### 5. 💻 GitHub Profile & Repo Analyzer (Live API)
* **100% Real-Time Queries**: Search any public GitHub username to instantly query their official profile.
* **Live Repositories**: Pulls real public repository feeds sorted by recent updates, displaying exact stars, forks, and programming languages directly from GitHub's servers.

### 6. 🪙 Crypto Real-Time Markets (Live API)
* **Live Financial Feeds**: Pulls real-time prices, market cap ranks, and 24h price changes directly from the **CoinGecko API**.
* **Price History Charts**: Renders active 7-day sparkline charts for major crypto assets.

### 7. 🇳🇬 NGX Nigeria Stock Simulator (Dynamic Sandbox)
* **Blue-Chip Trackers**: Track Nigeria's elite stocks (Dangote Cement, MTN Nigeria, BUA Foods, Guaranty Trust).
* **Live Orderbook**: Displays a responsive buy/sell order book feed.

### 8. 🌦️ Weather Station (Live API Enabled)
* **Live OpenWeather Integration**: Fully prepared to load real-time atmospheric updates and forecasts for any city globally when an API key is provided.

---

## 🛠️ Technology Stack

* **Core Framework**: React 19 + TypeScript + Vite 8 (Ultra-fast build cycles under 0.5s)
* **Styles**: Tailwind CSS v4 + Vanilla CSS Variables (Premium Dark/Glassmorphic variables)
* **Visualizations**: Recharts (Radar, Area, Line) + Nivo Charts (Impressions, Streams)
* **State & Querying**: React Query (TanStack Query v5) for robust caching and key-forced search re-fetches
* **Type Safety**: Zod Schemas for runtime API payload validation

---

## 💻 Local Development Setup

To run the telemetry dashboard locally:

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/heebrahymn/realtime-dashboard.git
cd realtime-dashboard

# Install packages
npm install
```

### 2. Configure Live API Tokens (Optional)
Create a `.env` file in the root folder to unlock live meteorological fetches:
```env
VITE_OPENWEATHER_API_KEY=your_openweather_key_here
VITE_GITHUB_TOKEN=your_github_token_here
```

### 3. Launch the Server
```bash
npm run dev
```
Open `http://localhost:5173` to explore your real-time command center!

### 4. Build for Production
```bash
npm run build
```
Vite will compile and package a highly optimized production bundle into the `/dist` directory.

---

## 🌐 Deployment on Vercel

This repository is optimized for one-click Vercel deployments. It includes `vercel.json` rewrite routing rules to ensure React Router client-side path handling operates perfectly under CDN edge caching.
