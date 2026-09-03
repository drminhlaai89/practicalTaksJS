# Playable Ad Prototype - Three.js

A lightweight 3D playable ad built with Three.js, TypeScript, and Vite.

## Overview
- **Tech Stack**: Three.js, TypeScript, Vite, CSS3.
- **UI & Layout**: Responsive mobile-first overlay for portrait/landscape screens.
- **Gameplay Loop**: Interactive digging mechanic synced with character animation frames.
- **Juice & Game-Feel**: 
  - Programmatic particle burst effect on impact.
  - Progressive crystal mesh shrinkage with a 0.5x scale clamp limit.
  - Floating score rewards and elastic button/mesh scaling (`punchScale`).

## Setup & Run

```bash
# Install dependencies
npm install

# Run dev server directly via Vite
npx vite