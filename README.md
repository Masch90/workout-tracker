# Workout Tracker

A personal progressive overload workout tracker built with Svelte 5.

## Overview
This app helps you build a daily workout habit by tracking a set of core exercises and automatically increasing your targets over time. It uses a progressive overload system: every 5 days, your repetition and time targets increase, helping you get stronger and fitter at a sustainable pace.

- **Built with Svelte 5** and modern runes for reactivity
- **Local storage** for persistent progress (no login required)
- **Modular architecture**: clean separation of data, logic, and UI
- **Customizable start date** and easy-to-edit exercise list
- **Automatic target increases** for both repetition and time-based exercises
- **Simple, elegant UI** with local exercise images

## Features
- Track daily progress for a set of core exercises
- Progressive overload: targets increase every 5 days
- Supports both repetition and time-based exercises
- Change your start date at any time
- All data is stored locally in your browser
- Responsive and mobile-friendly

## How It Works
1. **Start with a base target** (e.g., 5 reps, 1:30 plank)
2. **Complete your exercises daily**
3. **Every 5 days**, your targets increase (e.g., +1 rep, +5 seconds)
4. **Your progress and start date are saved** in your browser
5. **You can change your start date** at any time using the date picker

## Setup & Development

1. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```
3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal)

## Building for Production
```bash
npm run build
# or
pnpm build
```

Preview the production build with:
```bash
npm run preview
```

## Customization
- **Exercises:** Edit `src/lib/data/exercises.ts` to add, remove, or change exercises
- **Progression rules:** Edit `DEFAULT_CONFIG` in the same file
- **Images:** Place your own images in `static/assets/` and update the exercise data

## Tech Stack
- [Svelte 5](https://github.com/sveltejs/svelte)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

Enjoy building your daily workout habit! 💪
