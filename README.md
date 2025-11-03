# CodeFolio Frontend 🎨

A modern, production-ready portfolio application built with React, Vite, and modern web technologies. Features advanced animations, a full admin dashboard, GraphQL integration, and beautiful glassmorphism design.

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Build](https://img.shields.io/badge/Build-Passing-brightgreen)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![Vite](https://img.shields.io/badge/Vite-7.2.2-yellow)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

### 🎯 Core Features
- **Modern Design** - Glassmorphism, custom color scheme, responsive layout
- **Animations** - GSAP ScrollTrigger, parallax effects, smooth transitions
- **3D Graphics** - Three.js integration with WebGPU rendering
- **Particle Effects** - Animated background particles
- **Admin Dashboard** - Full CRUD operations for portfolio data
- **Authentication** - JWT-based login system
- **GraphQL API** - 11 queries + 11 mutations
- **Error Handling** - React Error Boundaries with graceful fallbacks
- **Notifications** - Toast system for user feedback

### 🎨 Design System
- Custom color palette (Night, Ocean, Mist, Sand)
- Tailwind CSS v4 with custom extensions
- Responsive grid & layout utilities
- Dark/Light mode support
- Accessibility-first approach

### ⚡ Performance
- Production build: 697 kB gzipped JS
- CSS optimized: 7 kB gzipped
- Code splitting ready
- Lazy loading support
- Smooth 60 FPS animations

### 📱 Responsive
- Mobile-first design
- Tailwind breakpoints (sm, md, lg, xl, 2xl)
- Touch-friendly interactive elements
- Optimized for all screen sizes

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (with npm)
- Backend GraphQL server running on `http://localhost:4000`

### Installation

```bash
# Clone repository
git clone https://github.com/YassineElHassani/codefolio-frontend.git
cd codefolio-frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_GRAPHQL_URI=http://localhost:4000/graphql
VITE_CONTACT_EMAIL=your-email@example.com
VITE_APP_NAME=CodeFolio
VITE_APP_VERSION=1.0.0
```

---

## 📖 Documentation

- [UI System Guide](./UI_SYSTEM_GUIDE.md) - Component library & hooks
- [Phase 6 Complete](./PHASE_6_COMPLETE.md) - Final deliverables
- [Getting Started](./GETTING_STARTED.md) - Setup instructions

---

## 🚀 Development

### Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview build
npm run lint     # Run linter
```

---

## ✨ Status: Production Ready ✅

- ✅ 1,693 modules compiling successfully
- ✅ 0 linting errors
- ✅ All features implemented
- ✅ Error boundaries & notifications
- ✅ Mobile responsive design
- ✅ GraphQL integration

**Built with ❤️ | Ready for deployment**
