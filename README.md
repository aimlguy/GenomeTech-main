GenomeTech: Advanced Genome Pattern Recognition

GenomeTech is a modern web application for comparing advanced pattern matching algorithms—FM-Index and Suffix Array—on genomic sequences. It provides real-time performance analysis, interactive visualizations, and a user-friendly interface for exploring DNA sequence search algorithms.

Features

- Compare Algorithms: Run and compare FM-Index and Suffix Array for pattern matching in DNA sequences.
- Performance Profiling: Real-time metrics for time, memory, and CPU usage.
- 3D DNA Visualization: Interactive 3D helix highlighting pattern matches using Three.js.
- Search History: Replay and review previous searches.
- Custom Color Schemes: Switch between color schemes for better visualization.
- Complexity Analysis: Visual and textual explanation of algorithmic complexity.

Algorithms Implemented

- Suffix Array: Efficient substring search using sorted suffixes and binary search.
- FM-Index:Space-efficient full-text index using Burrows-Wheeler Transform and Occurrence tables.

Tech Stack

-Frontend: React, TypeScript, TailwindCSS
- Visualization:Three.js, @react-three/fiber, @react-three/drei
- Charts: Recharts
-Tooling:Vite, ESLint

Getting Started

Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

Installation
bash
cd project
npm install


Running Locally
bash
npm run dev

Visit `http://localhost:5173` in your browser.

Building for Production
bash
npm run build


Linting
bash
npm run lint


Project Structure

- `src/algorithms/` — FMIndex and SuffixArray implementations
- `src/components/` — UI components (search, visualization, charts, etc.)
- `src/utils/` — Utility functions (performance monitoring, color schemes, export)
- `src/types/` — TypeScript type definitions

Usage
1. Enter a DNA sequence and a pattern to search.
2. View results for both algorithms side-by-side.
3. Explore performance metrics and visualizations.
4. Interact with the 3D DNA helix to see where matches occur.
5. Review or replay previous searches from history.

License
This project is for educational and research purposes.
