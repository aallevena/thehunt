# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The Hunt is a scavenger hunt experience application in early development. Built with modern Next.js (App Router), TypeScript, and Tailwind CSS. Runs on Vercel with PlanetScale as the PostgreSQL database provider.

## Code Standards

- **TypeScript required**: All new code must be written in TypeScript
- **Modern Next.js patterns**: Use App Router, Server Components, and latest Next.js features
- **Database**: All database schemas and queries must be valid PostgreSQL (PlanetScale)

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
- **Next.js 16.0.1**: Modern App Router with Server Components by default
- **React 19.2.0**: Latest React version
- **TypeScript 5**: Strict mode enabled (required for all code)
- **Tailwind CSS 4**: Utility-first styling with PostCSS
- **Database**: PlanetScale (PostgreSQL-compatible)
- **Deployment**: Vercel

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

## Database

- **Provider**: PlanetScale (PostgreSQL-compatible)
- **Connection**: Use `DATABASE_URL` environment variable
- **Schema changes**: All migrations and schemas must use valid PostgreSQL syntax
- **Note**: PlanetScale is MySQL-based but PostgreSQL-compatible; verify syntax compatibility when adding database features

## Future Planned Features

- User authentication system
- PlanetScale database integration
- Scavenger hunt game mechanics
- Progress tracking
- Team collaboration features

## Environment Variables

Copy `.env.example` to `.env.local` for local development. Currently contains placeholders for:
- `DATABASE_URL`: PlanetScale PostgreSQL connection string (future)
- `AUTH_SECRET`: Authentication secret (future)
