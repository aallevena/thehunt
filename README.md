# The Hunt

A scavenger hunt experience built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (planned)
- **Auth**: TBD (planned)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Git configured with your identity

### Setup

1. **Configure Git** (if not already done):
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

2. **Install dependencies** (if needed):
```bash
npm install
```

3. **Run the development server**:
```bash
npm run dev
```

4. **Open your browser** to [http://localhost:3000](http://localhost:3000)

The page auto-updates as you edit files in the `src/app` directory.

## Project Structure

```
thehunt/
├── src/
│   └── app/          # App Router pages and layouts
├── public/           # Static assets
└── ...config files
```

## Deployment

This app is designed to be deployed on [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with one click

## Future Features

- User authentication and login
- PostgreSQL database integration
- Scavenger hunt game logic
- Progress tracking
- Team collaboration features

## Development

This project uses modern Next.js features including:
- App Router for file-based routing
- Server Components by default
- Turbopack for fast development builds
- TypeScript for type safety
- ESLint for code quality
