# \# Three.js Playable Ad Prototype

# 

# A lightweight, performant 3D playable ad prototype built with Three.js, TypeScript, and Vite. Designed with responsive UI overlays and satisfying gameplay feedback (Juice).

# 

# \---

# 

# \## Technical Highlights \& Architecture

# 

# \* \*\*Framework \& Build System\*\*: Powered by Vite and TypeScript for fast HMR and strict type safety.

# \* \*\*Component Lifecycle \& Event Binding\*\*: Modular design separating scene control (`SceneController`), player state (`PlayerController`), and UI binding (`afterResourcesLoaded`).

# \* \*\*Game-Feel \& Visual Feedback\*\*:

# &#x20; \* \*\*Custom Particle System\*\*: Programmatic particle burst effect simulating crystal debris on impact without relying on external heavy JSON bundles.

# &#x20; \* \*\*Dynamic Mesh Deformation\*\*: Progressive mesh shrinkage with lower boundary clamping (`0.5x`) to maintain gameplay visibility while rewarding player progression.

# &#x20; \* \*\*Juice \& Polish\*\*: Elastic scale animations (`punchScale`) synchronized on impact frames alongside floating point rewards (`NumberSpawner`).

# \* \*\*Responsive Layout\*\*: Flexible CSS overlay using rem/vh units to support seamless layout scaling across both portrait mobile and landscape desktop screens.

# 

# \---

# 

# \## Tech Stack

# 

# \* \*\*Core\*\*: Three.js, TypeScript

# \* \*\*Build Tool\*\*: Vite

# \* \*\*Assets\*\*: GLTF/GLB models, custom CSS overlays

# 

# \---

# 

# \## Getting Started

# 

# \### Prerequisites

# Node.js (v16+ recommended)

# 

# \### Installation \& Run

# 

# 1\. Clone the repository:

# &#x20;  ```bash

# &#x20;  git clone <YOUR\_REPOSITORY\_URL>

