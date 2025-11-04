# MCP Registry - Full Stack Setup Guide

This project has been converted from a static GitHub Pages site to a full-stack application with:
- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: PostgreSQL

## 📁 Project Structure

```
demo-mcp-registry/
├── frontend/                 # React Vite application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── contexts/        # Context API providers
│   │   ├── services/        # API service layer
│   │   └── App.jsx          # Main app component
│   └── package.json
├── backend/                  # Express API server
│   ├── db/                  # Database connection and schema
│   ├── routes/              # API routes
│   ├── middleware/          # Error handling and validation
│   ├── utils/               # Custom error classes
│   ├── scripts/             # Migration and seeding scripts
│   └── server.js            # Express server entry point
├── v0/                      # Original server data (for seeding)
└── package.json             # Root package for running both servers
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..

# Install backend dependencies
cd backend && npm install && cd ..
```

### 2. Set Up PostgreSQL Database

Create a PostgreSQL database:

```bash
# Using psql
createdb mcp_registry

# Or in PostgreSQL shell
psql
CREATE DATABASE mcp_registry;
\q
```

### 3. Configure Environment Variables

Copy the example env files and update with your settings:

```bash
# Backend configuration
cp backend/.env.example backend/.env
# Edit backend/.env with your PostgreSQL credentials

# Frontend configuration
cp frontend/.env.example frontend/.env
# Update if your API runs on a different port
```

**Backend `.env` example:**
```env
DATABASE_URL=postgresql://username:password@localhost:5432/mcp_registry
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Frontend `.env` example:**
```env
VITE_API_URL=http://localhost:3000/api
```

### 4. Run Database Migrations

```bash
npm run migrate
```

### 5. Seed the Database

Load the existing server data from `v0/servers`:

```bash
npm run seed
```

### 6. Start the Development Servers

Run both frontend and backend simultaneously:

```bash
npm run dev
```

Or run them separately:

```bash
# Terminal 1 - Backend (http://localhost:3000)
npm run dev:backend

# Terminal 2 - Frontend (http://localhost:5173)
npm run dev:frontend
```

### 7. Access the Application

- **Frontend**: http://localhost:5173
- **API Health Check**: http://localhost:3000/health
- **API Servers**: http://localhost:3000/api/servers

## 📚 API Documentation

### Endpoints

#### GET `/api/servers`
List all servers with pagination and filtering.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20, max: 100)
- `search` (string): Search in name and description
- `status` (string): Filter by status

**Example:**
```bash
curl "http://localhost:3000/api/servers?page=1&limit=10&search=github"
```

#### GET `/api/servers/:name`
Get a single server by name.

**Example:**
```bash
curl "http://localhost:3000/api/servers/modelcontextprotocol/servers"
```

#### POST `/api/servers`
Create a new server.

**Request Body:**
```json
{
  "name": "org/server-name",
  "description": "Server description",
  "status": "active",
  "repository": { "url": "https://github.com/..." },
  "version": "1.0.0",
  "packages": [],
  "meta": {}
}
```

#### PUT `/api/servers/:name`
Update an existing server.

#### DELETE `/api/servers/:name`
Delete a server.

## 🎨 Features

### Frontend
- ✅ React with Vite (fast HMR)
- ✅ Context API for state management
- ✅ Dark/Light theme toggle
- ✅ Server search and filtering
- ✅ Pagination
- ✅ Error boundary for error handling
- ✅ Responsive design
- ✅ VS Code installation links

### Backend
- ✅ Express REST API
- ✅ PostgreSQL with raw queries
- ✅ CRUD operations for servers
- ✅ Input validation
- ✅ Error handling middleware
- ✅ CORS configuration
- ✅ Request logging

## 🛠️ Development Scripts

### Root Level
- `npm run dev` - Run both frontend and backend
- `npm run dev:frontend` - Run only frontend
- `npm run dev:backend` - Run only backend
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed database with initial data

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run migrate` - Run migrations
- `npm run seed` - Seed database

### Frontend
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔧 Configuration

### Database Schema

The `servers` table includes:
- `id` - Serial primary key
- `name` - Unique server name
- `description` - Server description
- `status` - Server status (active/inactive)
- `repository` - JSONB repository info
- `version` - Server version
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp (auto-updated)
- `schema_url` - MCP schema URL
- `remotes` - JSONB remote configurations
- `packages` - JSONB package information
- `meta` - JSONB metadata

### CORS

The backend is configured to accept requests from the frontend origin (default: http://localhost:5173). Update `FRONTEND_URL` in backend `.env` if needed.

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check PostgreSQL is running
pg_isready

# Check connection string in backend/.env
# Format: postgresql://username:password@host:port/database
```

### Port Already in Use
```bash
# Backend (port 3000)
lsof -ti:3000 | xargs kill -9

# Frontend (port 5173)
lsof -ti:5173 | xargs kill -9
```

### Migration Errors
```bash
# Drop and recreate database
dropdb mcp_registry
createdb mcp_registry
npm run migrate
npm run seed
```

## 📦 Deployment

### Backend
- Set `NODE_ENV=production` in environment
- Use a PostgreSQL hosting service (e.g., Railway, Supabase, AWS RDS)
- Set `DATABASE_URL` to production database
- Deploy to Node.js hosting (e.g., Railway, Render, Heroku)

### Frontend
- Build the production bundle: `cd frontend && npm run build`
- Deploy the `dist` folder to static hosting (e.g., Vercel, Netlify, Cloudflare Pages)
- Set `VITE_API_URL` to production API endpoint

## 📝 License

ISC

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
