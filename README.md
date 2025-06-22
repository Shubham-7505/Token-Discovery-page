# Axiom Discover Replica – Token Table UI

Built with Next.js 14 App Router, Tailwind CSS, TypeScript, React Query, Redux Toolkit.

Features

Real-time Data: Mocked live price updates via custom React hook.

Timeframes: Switch between 1h, 24h, and 7d percentage changes.

Sorting: Sort by Pair, Price, Market Cap, Liquidity, Volume, TXNS.

Infinite Scroll: Load more rows as you scroll.

UI Components: Tooltips, Popovers, Modals (Radix UI via shadcn/ui).

Theme Support: Light and Dark mode toggling with next-themes.

Performance: Production build optimized, Lighthouse score > 90.

Project Structure

─ src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout with providers & theme
│   │   ├── page.tsx          # Landing page
│   │   └── discover/
│   │       └── page.tsx      # DiscoverPage with TokenTable
│   ├── components/
│   │   ├── table/
│   │   │   ├── TokenTable.tsx
│   │   │   └── TableRow.tsx
│   │   └── ThemeToggle.tsx   # Theme switch button
│   ├── hooks/
│   │   ├── useMockLiveData.ts
│   │   ├── useSort.ts
│   │   └── usePagination.ts
│   ├── lib/
│   │   └── utils.ts          # generateMockData
│   ├── redux/                # Redux slice and store
│   └── types/                # TypeScript types
├── tailwind.config.ts
├── next.config.js
└── README.md

Getting Started

1. Install dependencies
  
```bash
npm install
```
2. Run development server
 
```bash
Run development server
```
3. Open in browser

  Navigate to http://localhost:3000 and go to /discover.

Production Build

1. Build
```bash
npm run build
```

2. Start
```bash 
npm start
```

3. Analyze
``` bash
lighthouse http://localhost:3000/discover --view
```
