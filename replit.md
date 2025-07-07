# Gerenciador de Banco de Dados - DB Manager

## Project Overview
A unified Next.js database management web application with React, PostgreSQL integration, and full Portuguese/English internationalization. Built for Vercel deployment with proper API routes and unified architecture.

## Recent Changes (July 2025)
- **COMPLETE CONVERSION**: Converted entire application to pure React JavaScript with Node.js backend
- **ELIMINATED TYPESCRIPT**: Removed all TypeScript, Vite, and Next.js dependencies for clean deployment
- **REMOVED UNNECESSARY FILES**: Cleaned up project structure, removed client/, server/, shared/ folders
- **PURE JAVASCRIPT**: Single HTML file with React via CDN, Ant Design UI components
- **VERCEL-READY STRUCTURE**: Created Vercel-compatible API routes with proper ES modules
- **UNIFIED ARCHITECTURE**: Single-page React app with Express API backend
- **MEMORY-BASED STORAGE**: Implemented shared in-memory storage for user data and databases
- **FULL PORTUGUESE INTERFACE**: Complete translation system with language switcher
- **AUTHENTICATION SYSTEM**: Cookie-based authentication with secure sessions
- **RESPONSIVE DESIGN**: Mobile-first design with Ant Design components

## Current Architecture

### Pure React JavaScript + Node.js Structure
```
public/
└── index.html               # Single-page React application with CDN dependencies

api/                         # Vercel-compatible serverless functions
├── auth/
│   ├── register.js         # User registration endpoint
│   ├── login.js            # User authentication endpoint
│   ├── user.js             # Get current user endpoint
│   └── logout.js           # User logout endpoint
└── databases/
    ├── index.js            # Database CRUD operations
    └── [key]/
        └── records.js      # Record management for specific database

shared/
└── storage.js              # In-memory storage for users, databases, and records

server.js                   # Express server for development
vercel.json                 # Vercel deployment configuration
```

### Key Features
- **Authentication**: Secure cookie-based sessions with bcrypt password hashing
- **Database Management**: Full CRUD operations for databases and records
- **API Tokens**: External API access with read/write permissions
- **Internationalization**: Complete PT/EN language support
- **Responsive Design**: Mobile, tablet, desktop optimized
- **Real-time Updates**: React Query for efficient data synchronization

### Database Schema
- **users**: User accounts with authentication
- **databases**: User-owned database containers
- **records**: JSON data storage with flexible schema
- **apiTokens**: External API access tokens
- **sessions**: Session management (handled by cookies)

## User Preferences
- **Primary Language**: Portuguese (PT-BR)
- **Secondary Language**: English as option
- **Authentication**: Simple username/password with optional email
- **Data Storage**: PostgreSQL with JSON fields for flexible records
- **Deployment**: Vercel-compatible architecture
- **UI Framework**: Shadcn UI with Tailwind CSS
- **Responsive**: Mobile-first design with desktop optimization

## Technical Requirements
- **Framework**: Next.js with App Router
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React icons
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Query for server state
- **Authentication**: Cookie-based sessions
- **Internationalization**: Custom i18n system with localStorage persistence

## Development Status
- ✅ Pure JavaScript application implemented
- ✅ Authentication system with secure sessions
- ✅ Complete database management interface
- ✅ Full Portuguese/English translation
- ✅ API endpoints for external access
- ✅ Responsive design for all devices
- ✅ Memory-based storage system
- ✅ Ant Design UI components integrated
- ✅ All TypeScript/Vite/Next.js dependencies removed
- ✅ Project structure cleaned and optimized

## Next Steps
1. Update workflow to use Next.js dev server
2. Push database schema changes
3. Test complete functionality
4. Verify Vercel deployment compatibility