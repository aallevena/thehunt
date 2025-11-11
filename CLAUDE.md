# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The Hunt is a scavenger hunt experience application in early development. Currently scaffolded with Next.js 15+ using the App Router, TypeScript, and Tailwind CSS. Future plans include PostgreSQL database integration, user authentication, and scavenger hunt game logic.

## Development Commands

```bash
# Install dependencies (if needed)
npm install

# Start development server (uses Turbopack)
npm run dev
# Access at http://localhost:3000

# Type checking without emitting files
npm run type-check

# Linting
npm run lint

# Production build
npm run build

# Start production server
npm start
```

## Architecture

### Tech Stack
- **Next.js 16.0.1**: App Router with Server Components by default
- **React 19.2.0**: Latest React version
- **TypeScript 5**: Strict mode enabled
- **Tailwind CSS 4**: Utility-first styling with PostCSS
- **Deployment**: Vercel-optimized

### Project Structure

```
thehunt/
├── src/
│   └── app/              # Next.js App Router
│       ├── layout.tsx    # Root layout with Geist fonts
│       ├── page.tsx      # Home page
│       └── globals.css   # Global Tailwind styles
├── public/               # Static assets (Next.js logo, Vercel logo)
└── ...config files
```

### TypeScript Configuration

- Path alias: `@/*` maps to `./src/*`
- Target: ES2017
- JSX mode: `react-jsx` (React 19 JSX transform)
- Strict mode enabled with full type checking

### Styling

- Tailwind CSS 4 with dark mode support via `dark:` prefix
- Custom fonts: Geist Sans and Geist Mono (loaded via next/font/google)
- Design uses zinc color palette with responsive breakpoints

### Key Patterns

1. **Server Components by default**: All components in `src/app` are Server Components unless marked with 'use client'
2. **Font optimization**: Fonts loaded in root layout with CSS variables (`--font-geist-sans`, `--font-geist-mono`)
3. **Metadata**: Uses Next.js Metadata API for SEO (see layout.tsx)

## Future Planned Features

- User authentication system
- PostgreSQL database (connection string placeholder in .env.example)
- Scavenger hunt game mechanics
- Progress tracking
- Team collaboration features

## Environment Variables

Copy `.env.example` to `.env.local` for local development. Currently contains placeholders for:
- `DATABASE_URL`: PostgreSQL connection (future)
- `AUTH_SECRET`: Authentication secret (future)
