<div align="center">

# 🌿 AURA ZENITH
### *Ultra-Luxury 3D Spa & Wellness Sanctuary*

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r168-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/R3F-v8.17-black?style=for-the-badge&logo=three.js&logoColor=00D8FF)](https://docs.pmnd.rs/react-three-fiber)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.10-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Ready-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg?style=for-the-badge)](LICENSE)

*An immersive, executive-grade digital wellness experience featuring real-time 3D WebGL scenes, native Web Audio ambient soundscapes, interactive body tension mapping, and a VIP reservation system.*

[Live Demo](#-vercel-frontend-deployment) • [Key Features](#-key-features) • [Deployment Guide](#-vercel-frontend-deployment) • [GitHub Upload](#-github-repository-upload) • [Tech Stack](#%EF%B8%8F-technology-stack)

---

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

</div>

<br />

## 📖 Table of Contents
- [✨ Key Features](#-key-features)
- [🎨 3D Interactive WebGL Modules](#-3d-interactive-webgl-modules)
- [🛠️ Technology Stack](#%EF%B8%8F-technology-stack)
- [📁 Project Architecture](#-project-architecture)
- [🚀 Quick Start & Local Setup](#-quick-start--local-setup)
- [🌐 Vercel Frontend Deployment](#-vercel-frontend-deployment)
- [🐙 GitHub Repository Upload](#-github-repository-upload)
- [⚡ Performance & Graphics Optimization](#-performance--graphics-optimization)
- [📄 License & Credits](#-license--credits)

---

## ✨ Key Features

- **🗿 Interactive 3D Hero Scene**: Real-time stacked Zen balance stones & blooming lotus flower with mouse parallax tracking, metallic reflection planes, and golden sparkle particle physics.
- **🧍 3D Interactive Body Focus Map**: Visual silhouette hotspot target mapping localized muscle tension (neck, shoulders, lower back, face, feet) to curated luxury treatments.
- **🏛️ 3D Sanctuary Suite Explorer**: 360° interactive viewport inspecting Hydrotherapy Thermal Pools, Himalayan Pink Salt Caves, and Acoustic Sound Bath Chambers.
- **🧴 3D Botanical Elixir Showcase**: Interactive glass bottle renderers for signature 24K gold jasmine oils and organic marine serums with material roughness/metalness controls.
- **📅 VIP 4-Step Luxury Reservation Engine**: Interactive booking wizard supporting treatment selection, custom add-ons (*Dom Pérignon, CBD thermal oil, 24K gold accents*), date/time slots, therapist preferences, digital QR pass rendering, and `.ics` calendar export.
- **🎵 Real-Time Web Audio Synthesizer**: Native browser audio engine generating Tibetan singing bowls, bamboo rain, and ocean wave white noise with independent volume sliders.
- **🤖 AI Spa Consultation Quiz**: 3-stage recommendation wizard diagnosing stress levels to generate customized spa therapy remedies.
- **💬 AI Spa Concierge Assistant**: Floating interactive widget offering immediate guidance on spa etiquette, gift cards, and reservation rules.
- **🎁 VIP Digital Gift Card Designer**: Custom digital voucher creator with live preview, recipient email dispatch, and instant voucher code generation.
- **💳 Sovereign VIP Membership Matrix**: Comparative tier benefits grid for Bronze, Emerald, and Diamond Sovereign members.

---

## 🎨 3D Interactive WebGL Modules

| Module Component | Description | R3F / Three.js Features |
| :--- | :--- | :--- |
| `HeroZenScene.jsx` | Stacked Zen stones hero banner | Mesh Standard Materials, Particle Systems, OrbitControls, Water Reflective Plane |
| `BodyMap3D.jsx` | 3D Body focus tension selector | Interactive Raycasting, Hotspot Mesh Highlights, Animated Camera Transitions |
| `RoomExplorer3D.jsx` | 360° Sanctuary Suite explorer | Environment Maps, Lighting Rigging, Smooth Camera Interpolation |
| `ElixirShowcase3D.jsx` | Glass bottle product renderer | Transmission Glass Physics, Dynamic Light Rotation, Metallic Sheen |

---

## 🛠️ Technology Stack

### **Frontend & Framework**
- **Core Library**: [React 18](https://reactjs.org/) (Hooks, Context, Dynamic Modals)
- **Build Tool**: [Vite 5](https://vitejs.dev/) (Lightning-fast HMR & ESM bundling)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) & [PostCSS](https://postcss.org/) with custom HSL dark mode theme tokens

### **3D Graphics & Audio**
- **3D Engine**: [Three.js r168](https://threejs.org/)
- **React 3D Binding**: [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) & [@react-three/drei](https://github.com/pmndrs/drei)
- **Audio Engine**: Native Browser **Web Audio API** (Oscillators, Gain Nodes, White Noise Generators)

### **Icons & Utilities**
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Celebration Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 📁 Project Architecture

```
aura-zenith-3d-spa/
├── public/                 # Static assets, textures & favicon
├── src/
│   ├── components/         # Core UI Components & Modals
│   │   ├── 3d/             # WebGL 3D React Three Fiber Scenes
│   │   │   ├── BodyMap3D.jsx         # Interactive Body Tension Map
│   │   │   ├── ElixirShowcase3D.jsx  # 3D Glass Bottle Product Showcase
│   │   │   ├── HeroZenScene.jsx      # Zen Stone & Lotus Hero Canvas
│   │   │   └── RoomExplorer3D.jsx    # 360° Suite Viewport Explorer
│   │   ├── BookingModal.jsx          # VIP 4-Step Booking Engine
│   │   ├── ConciergeChat.jsx         # AI Concierge Chatbot Widget
│   │   ├── ConsultationQuiz.jsx      # AI Wellness Prescription Wizard
│   │   ├── Footer.jsx                # Luxury Spa Footer & Hours
│   │   ├── Gallery3D.jsx             # Visual Showcase & Grid
│   │   ├── GiftCardDesigner.jsx      # VIP Gift Card Generator
│   │   ├── Memberships.jsx           # Membership Tier Matrix
│   │   ├── MyReservationsModal.jsx   # Client Pass & Ticket Manager
│   │   ├── Navbar.jsx                # Sticky Navigation & Quick Actions
│   │   ├── SendVoucherModal.jsx      # Digital Voucher Email Dispatcher
│   │   ├── ServicesMenu.jsx          # Categorized Treatments Menu
│   │   ├── SoundscapePlayer.jsx      # Web Audio Ambient Synthesizer
│   │   └── Testimonials.jsx          # Sovereign Client Reviews
│   ├── App.jsx             # Main Application Container & Modal State
│   ├── main.jsx            # React Root Mounting Entry point
│   └── index.css           # Global Styles, HSL Color Tokens & Custom Utilities
├── .gitignore              # Git Ignore Rules
├── index.html              # HTML5 Entry Point & Meta Tags
├── package.json            # Dependencies & Project Scripts
├── postcss.config.js       # PostCSS Tailwind Configuration
├── tailwind.config.js      # Tailwind Custom Theme Tokens
├── vercel.json             # Vercel Deployment Configuration
└── vite.config.js          # Vite Bundler Setup
```

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/aura-zenith-3d-spa.git
   cd aura-zenith-3d-spa
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   *Navigate to `http://localhost:5173` in your browser.*

4. **Build for Production**
   ```bash
   npm run build
   ```
   *Optimized build files will be generated in the `dist/` folder.*

5. **Preview Production Build Locally**
   ```bash
   npm run preview
   ```

---

## 🌐 Vercel Frontend Deployment

This project is pre-configured for seamless deployment on [Vercel](https://vercel.com/).

### Method 1: Import via Vercel Dashboard (Recommended)

1. Push your repository to **GitHub** (see [GitHub Upload section](#-github-repository-upload)).
2. Log into your [Vercel Dashboard](https://vercel.com/dashboard).
3. Click **"Add New..."** → **"Project"**.
4. Select your **`aura-zenith-3d-spa`** repository from GitHub.
5. Vercel will automatically detect **Vite** configuration:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**. Your 3D Spa application will be live in seconds!

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally (or run via npx)
npm install -g vercel

# Log in to your Vercel account
vercel login

# Deploy to preview environment
vercel

# Deploy to production environment
vercel --prod
```

> 💡 **Note**: The included `vercel.json` ensures all client-side routes redirect cleanly to `index.html` and enables browser caching for 3D textures & static JavaScript assets.

---

## 🐙 GitHub Repository Upload

Follow these commands to publish this repository to your GitHub account:

### 1. Initialize Git & Make First Commit

```bash
# Initialize local git repository
git init

# Stage all files
git add .

# Create initial commit
git commit -m "feat: initial commit - Aura Zenith 3D Spa & Wellness Sanctuary"

# Rename default branch to main
git branch -M main
```

### 2. Create Repository on GitHub

1. Go to [GitHub New Repository](https://github.com/new).
2. Name the repository: `aura-zenith-3d-spa`.
3. Keep it **Public** (or **Private**).
4. **Do NOT** check "Add a README file" or `.gitignore` (as we already created them).
5. Click **Create repository**.

### 3. Connect Remote & Push

```bash
# Link local repo to GitHub (Replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/aura-zenith-3d-spa.git

# Push main branch to GitHub
git push -u origin main
```

---

## ⚡ Performance & Graphics Optimization

- **GPU Hardware Acceleration**: Real-time canvas components leverage WebGL hardware acceleration through Three.js r168.
- **Code Splitting**: Dynamic React component imports optimize bundle size for fast initial paint.
- **60 FPS Framerate Lock**: Canvas scenes use `useFrame` requestAnimationFrame hooks optimized for desktop and mobile displays.
- **Clean asset caching**: `vercel.json` provides strict static asset caching header definitions.

---

## 📄 License & Credits

- **License**: Released under the [MIT License](LICENSE).
- **Design & Concept**: Aura Zenith Luxury Wellness Experience.
- **Audio Synthesizer**: Built with native Web Audio API oscillators.

---

<div align="center">
  <sub>Built with precision and luxury for modern digital wellness.</sub>
</div>
