# Zova Tek - React Application

A production-ready, high-performance React application built with Vite, Tailwind CSS, and Framer Motion. Migrated from static HTML to a modern, scalable component architecture.

## 🚀 Tech Stack

- **Framework:** React 18.3+ with Vite
- **Styling:** Tailwind CSS 3.4+ (via PostCSS)
- **Animation:** Framer Motion 11.0+
- **Routing:** React Router DOM v6
- **Icons:** Lucide React
- **3D Graphics:** Three.js (for Hero Globe)

## 📦 Project Structure

```
zova/
├── public/
│   ├── assets/images/        # Logo and brand assets
│   ├── images/              # Content images
│   └── favicon_io/          # Favicon files
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx   # Navigation with mobile menu
│   │   │   └── Footer.jsx   # Apple-style footer
│   │   └── home/
│   │       ├── Hero.jsx     # Hero section with 3D globe
│   │       ├── About.jsx    # About section
│   │       ├── Solutions.jsx # Services showcase
│   │       └── CTA.jsx      # Call-to-action section
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Tailwind directives & custom styles
├── index-react.html         # HTML entry point
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Design System

### Colors
- **Accent:** `#00B5E2` (Cerulean)
- **Background:** `#FFFFFF` / `#F4F5F7`
- **Text Primary:** `#050505` (Obsidian)
- **Text Secondary:** `#171717` (Neutral)
- **Border:** `#E5E7EB`

### Typography
- **Font Family:** Inter (Google Fonts)
- **Weights:** 400, 500, 600, 700, 800

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Opens at `http://localhost:3000`

### Build for Production
```bash
npm run build
```
Output in `dist/` folder

### Preview Production Build
```bash
npm run preview
```

## 🎭 Animation Features

### Framer Motion Implementations
- **Scroll Reveal:** Sections fade and slide up as you scroll
- **Mobile Menu:** Smooth slide-in/out with AnimatePresence
- **Hover Effects:** Interactive cards with spring animations
- **Stagger Children:** Sequential animation of child elements

### Performance Optimizations
- **GPU Acceleration:** Transform-based animations
- **Mobile-First:** Disabled heavy animations on small screens
- **Three.js Globe:** Optimized WebGL rendering with cleanup

## 📱 Responsive Design

- **Mobile:** < 768px (Simplified animations, stacked layout)
- **Tablet:** 768px - 1024px
- **Desktop:** 1024px - 1920px
- **Large Screens:** 1920px+ (Max container 1600px-1920px)

## 🔧 Configuration

### Tailwind Config
Custom colors, animations, and keyframes are defined in `tailwind.config.js`

### Vite Config
- Dev server port: 3000
- Auto-open browser
- React plugin with Fast Refresh

## 🚦 Component Architecture

### Layout Components
- **Navbar:** Sticky header with dropdown menu and mobile hamburger
- **Footer:** Contact links and copyright information

### Home Components
- **Hero:** Interactive 3D globe with Three.js
- **About:** Brand story with image
- **Solutions:** Three service cards with animated mockups
- **CTA:** Conversion section

## 📄 Key Files

### `package.json`
Dependencies and build scripts

### `tailwind.config.js`
Custom Tailwind configuration with brand colors and animations

### `App.jsx`
Main application component assembling all sections

### `Solutions.jsx`
Most complex component featuring:
- Browser mockup with typing animation
- Visual identity poster with floating shapes
- Portfolio scroll with infinite animation

## 🌐 Deployment

The application can be deployed to:
- **Vercel** (recommended for Vite apps)
- **Netlify**
- **GitHub Pages**
- **Any static hosting service**

### Build Command
```bash
npm run build
```

### Output Directory
```bash
dist/
```

## 📧 Contact

- **Email:** zovatek@gmail.com
- **Instagram:** [@zovatek](https://instagram.com/zovatek)

## 📝 License

© 2026 ZOVA TEK. All rights reserved.

---

Built with ❤️ using React, Vite, and Tailwind CSS
