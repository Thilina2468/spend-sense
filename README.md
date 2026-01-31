# Spend Sense

A full-stack expense tracking application built with Next.js, React, and Firebase.

## Features

- Track expenses with categories
- View monthly spending summaries
- Export/import expenses via CSV
- User authentication with Firebase Auth
- Real-time database with Firestore

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Backend:** Next.js API Routes
- **Database:** Firebase Firestore
- **Auth:** Firebase Authentication
- **Package Manager:** Bun

## Getting Started

### Prerequisites

- Node.js 18+ or Bun 1.3+
- Firebase project

### Installation

1. Clone the repository
```bash
git clone https://github.com/Thilina2468/spend-sense.git
cd spend-sense
```

2. Install dependencies
```bash
bun install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

4. Add your Firebase credentials to `.env.local`

5. Run the development server
```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/              # API routes
│   ├── page.tsx          # Landing page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
└── lib/
    └── firebase.ts       # Firebase configuration
```

## Development

### Build
```bash
bun run build
```

### Lint
```bash
bun run lint
```

## License

MIT
